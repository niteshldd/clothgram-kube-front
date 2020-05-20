Consumer Key - i3t6232q8j0hldre811zc6fohw084voy
Consumer Secret - 2nooqvicliqwrv94792isa12pn896lxo
Access Token - 5t9cix6ffds4bcva9dcib3u17dega5wl
Access Token Secret - z3dy4j3cr1ne3ez76jlyo6g9rfxtcnh6

Use this to solve - https://github.com/bitnami/bitnami-docker-magento/issues/89

$ php /opt/bitnami/magento/htdocs/bin/magento sampledata:deploy
$ php /opt/bitnami/magento/htdocs/bin/magento setup:upgrade
$ chown -R bitnami:daemon /opt/bitnami/magento/htdocs


php bin/magento setup:di:compile;