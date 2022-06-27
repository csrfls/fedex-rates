const underscoreToCapitalize = require('../utils/underscoreToCapitalize')

function ratesParse(rates) {
  return new Promise((resolve) => {
    const ratesGroup = [];

    if (!rates['RateReply']) return resolve([])
    if (!rates['RateReply']['RateReplyDetails']) return resolve([])

    rates['RateReply']['RateReplyDetails'].forEach(ratesElement => {
      let rate = {
        price: 0,
        currency: 'mxn',
        service_level: {
          name: '',
          token: ''
        }
      }
      if (ratesElement['ServiceType']['_text']) {
        rate.service_level.name = underscoreToCapitalize(ratesElement['ServiceType']['_text'])
        rate.service_level.token = ratesElement['ServiceType']['_text']
      }
  
      if (ratesElement['RatedShipmentDetails']) {
        ratesElement['RatedShipmentDetails'].forEach(rateDetail => {
          if(rateDetail['ShipmentRateDetail'].RateType['_text'] === 'RATED_ACCOUNT_SHIPMENT') {
            rate.price = rateDetail['ShipmentRateDetail'].TotalNetChargeWithDutiesAndTaxes.Amount['_text']
          }
        }) 
      }
      ratesGroup.push(rate)
    })

    resolve(ratesGroup)
  })
}

module.exports = ratesParse