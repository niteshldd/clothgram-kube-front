const _slugify = require('./helpers/slugify')

module.exports = {

  seo: {
    useUrlDispatcher: JSON.parse(process.env.SEO_USE_URL_DISPATCHER || true),
    productUrlPathMapper: (product) => {
      let destPath = ''
      if (product.category && product.category.length > 0) {
        for (let i = 0; i < product.category.length; i++) {
          if (typeof product.category[i].name !== 'undefined') {
            const firstValidCat = product.category[i]
            destPath = (firstValidCat.path ? (firstValidCat.path) : _slugify(firstValidCat.name)) + '/' + (product.slug ? product.slug : _slugify(product.name + '-' + product.id))
            break
          }
        }
      }
      if (destPath === '') {
        destPath = (product.slug ? product.slug : _slugify(product.name + '-' + product.id))
      }
      destPath += '.html'
      console.log('Dest. product path = ', destPath)
      return destPath
    },
    categoryUrlPathMapper: (category) => {
      const destSlug = (category.url_path ? category.url_path + '/': '') + category.url_key
      console.log('Dest. cat path = ', destSlug)
      return destSlug
    },
  },




  magento: {
    url: process.env.MAGENTO_URL || 'http://192.168.1.27/rest',
    consumerKey: process.env.MAGENTO_CONSUMER_KEY || 'i3t6232q8j0hldre811zc6fohw084voy',
    consumerSecret: process.env.MAGENTO_CONSUMER_SECRET || '2nooqvicliqwrv94792isa12pn896lxo',
    accessToken: process.env.MAGENTO_ACCESS_TOKEN || '5t9cix6ffds4bcva9dcib3u17dega5wl',
    accessTokenSecret: process.env.MAGENTO_ACCESS_TOKEN_SECRET || 'z3dy4j3cr1ne3ez76jlyo6g9rfxtcnh6',
    storeId: process.env.MAGENTO_STORE_ID || 1,
    currencyCode: process.env.MAGENTO_CURRENCY_CODE || 'INR',
    msi: { enabled: process.env.MAGENTO_MSI_ENABLED || false, stockId: process.env.MAGENTO_MSI_STOCK_ID || 1 }
  },

  vuestorefront: {
    invalidateCache: JSON.parse(typeof process.env.VS_INVALIDATE_CACHE === 'undefined' ? false : process.env.VS_INVALIDATE_CACHE),
    invalidateCacheUrl: process.env.VS_INVALIDATE_CACHE_URL || 'http://localhost:3000/invalidate?key=aeSu7aip&tag='
  },

  product: {
    expandConfigurableFilters: ['manufacturer'],
    synchronizeCatalogSpecialPrices: process.env.PRODUCTS_SPECIAL_PRICES || true,
    renderCatalogRegularPrices: process.env.PRODUCTS_RENDER_PRICES || false,
    excludeDisabledProducts: process.env.PRODUCTS_EXCLUDE_DISABLED || false
  },

  kue: {}, // default KUE config works on local redis instance. See KUE docs for non standard redis connections

  db: {
    driver: 'elasticsearch',
    url: process.env.DATABASE_URL || 'http://localhost:9200',
    indexName: process.env.INDEX_NAME || 'vue_storefront_catalog'
  },

  elasticsearch: {
    apiVersion: process.env.ELASTICSEARCH_API_VERSION || '5.6'
  },

  redis: {
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: process.env.REDIS_PORT || 6379,
    auth: process.env.REDIS_AUTH || false,
    db: process.env.REDIS_DB || 0
  },

  passport: {
    jwtSecret: "MyS3cr3tK3Y",
    jwtSession: {
      session: false
    }
  }

}
