const xmlParse = require('./xmlParse')
const requestFedex = require('./requestFedex')
const ratesParse =  require('./ratesParse')

const Fedex = {
  Rates: {
    get: async function(credentials, quote_params) {
      xmlBody = xmlParse(credentials, quote_params)
      getRates = await requestFedex(xmlBody)
      rates = await ratesParse(getRates)
      return rates
    }
  }
}

module.exports = Fedex;