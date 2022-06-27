const convert = require('xml-js')
const request = require('request')

function requestFedex (xmlBody) {
  return new Promise((resolve) => {
    request({
      method: 'POST',
      url: 'https://wsbeta.fedex.com:443/xml',
      headers: {
        'Content-Type': 'application/json'
      },
      body: xmlBody
    }, function (error, response, body) {
      if (error) return resolve({})

      if (response.statusCode === 200) {
        const options = {
          compact: true,
          ignoreComment: true,
          spaces: 2
        }  
        return resolve(JSON.parse(convert.xml2json(body, options)))
      }

      return resolve({})
    })
  })
}

module.exports = requestFedex