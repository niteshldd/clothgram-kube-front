const program = require('commander')
const config = require('config')
const common = require('../migrations/.common')
const es = require('../src/lib/elastic')

program
  .command('rebuild')
  .option('-i|--indexName <indexName>', 'name of the Elasticsearch index', config.elasticsearch.indices[0])
  .action((cmd) => { // TODO: add parallel processing
    if (!cmd.indexName) {
      console.error('error: indexName must be specified');
      process.exit(1);
    }

    console.log('** Hello! I am going to rebuild EXISTING ES index to fix the schema')
    const originalIndex = cmd.indexName
    const tempIndex = originalIndex + '_' + Math.round(+new Date() / 1000)

    console.log(`** Creating temporary index ${tempIndex}`)
    es.createIndex(common.db, tempIndex, '', (err) => {
      if (err) {
        console.log(err)
      }

      console.log(`** Putting the mappings on top of ${tempIndex}`)
      es.putMappings(common.db, tempIndex, (err) => {
        if (err) {
          console.error(err.meta ? err.meta : err)
        }

        console.log(`** We will reindex ${originalIndex} with the current schema`)
        es.reIndex(common.db, originalIndex, tempIndex, (err) => {
          if (err) {
            console.log(err)
          }

          console.log('** Removing the original index')
          es.deleteIndex(common.db, originalIndex, (err) => {
            if (err) {
              console.log(err)
            }

            console.log('** Creating alias')
            es.putAlias(common.db, tempIndex, originalIndex, (err) => {
              console.log('Done! Bye!')
              process.exit(0)
            })
          })
        })
      })
    })
  })

program
  .command('new')
  .option('-i|--indexName <indexName>', 'name of the Elasticsearch index', config.elasticsearch.indices[0])
  .action((cmd) => { // TODO: add parallel processing
    if (!cmd.indexName) {
      console.error('error: indexName must be specified');
      process.exit(1);
    }

    console.log('** Hello! I am going to create NEW ES index')
    const indexName = cmd.indexName
    es.createIndex(common.db, indexName, '', (err) => {
      if (err) {
        console.log(err)
      }

      console.log('Done! Bye!')
      process.exit(0)
    })
  })

program
  .on('command:*', () => {
    console.error('Invalid command: %s\nSee --help for a list of available commands.', program.args.join(' '));
    process.exit(1);
  });

program
  .parse(process.argv)

process.on('unhandledRejection', (reason, p) => {
  console.error(`Unhandled Rejection at: Promise ${p}, reason: ${reason}`)
  // application specific logging, throwing an error, or other logic here
})

process.on('uncaughtException', (exception) => {
  console.error(exception) // to see your exception details in the console
  // if you are on production, maybe you can send the exception details to your
  // email as well ?
})
