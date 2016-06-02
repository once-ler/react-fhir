require('babel-polyfill');

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  apiHost: process.env.APIHOST || 'localhost',
  apiPort: process.env.APIPORT,
  app: {
    title: 'Animal Census',
    description: 'Animal Census',
    head: {
      titleTemplate: 'Animal Census: %s',
      meta: [
        {name: 'description', content: 'Animal Census'},
        {charset: 'utf-8'},
        {property: 'og:site_name', content: 'Animal Census'}
      ]
    }
  },

}, environment);
