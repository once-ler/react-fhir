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
    title: 'React FHIR',
    description: 'React FHIR',
    head: {
      titleTemplate: 'React FHIR: %s',
      meta: [
        {name: 'description', content: 'React FHIR'},
        {charset: 'utf-8'},
        {property: 'og:site_name', content: 'React FHIR'}
      ]
    }
  },

}, environment);
