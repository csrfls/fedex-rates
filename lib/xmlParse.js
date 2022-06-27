const convert = require('xml-js')

function xmlParse (credentials, quote_params) {
  const { key, password, accountNumber, meterNumber } = credentials
  const { address_from, address_to, parcel } = quote_params

  const {
    weight,
    length,
    width,
    height,
    mass_unit = "KG",
    distance_unit = "CM"
  } = parcel

  const jxml = {
    "RateRequest": {
      "_attributes": {
        "xmlns": "http://fedex.com/ws/rate/v13"
      },
      "WebAuthenticationDetail": {
        "UserCredential": {
          "Key": key,
          "Password": password
        }
      },
      "ClientDetail": {
        "AccountNumber": accountNumber,
        "MeterNumber": meterNumber,
        "Localization": {
          "LanguageCode": "es",
          "LocaleCode": "mx"
        }
      },
      "Version": {
        "ServiceId": "crs",
        "Major": "13",
        "Intermediate": "0",
        "Minor": "0"
      },
      "ReturnTransitAndCommit": "true",
      "RequestedShipment": {
        "DropoffType": "REGULAR_PICKUP",
        "PackagingType": "YOUR_PACKAGING",
        "Shipper": {
          "Address": {
            "StreetLines": {},
            "City": {},
            "StateOrProvinceCode": "XX",
            "PostalCode": address_from.zip,
            "CountryCode": address_from.country
          }
        },
        "Recipient": {
          "Address": {
            "StreetLines": {},
            "City": {},
            "StateOrProvinceCode": "XX",
            "PostalCode": address_to.zip,
            "CountryCode": address_to.country,
            "Residential": "false"
          }
        },
        "ShippingChargesPayment": {
          "PaymentType": "SENDER"
        },
        "RateRequestTypes": "ACCOUNT",
        "PackageCount": "1",
        "RequestedPackageLineItems": {
          "GroupPackageCount": "1",
          "Weight": {
            "Units": mass_unit.toUpperCase(),
            "Value": weight
          },
          "Dimensions": {
            "Length": length,
            "Width": width,
            "Height": height,
            "Units": distance_unit.toUpperCase()
          }
        }
      }
    }
  }
  
  const options = {
    compact: true,
    ignoreComment: true,
    spaces: 2
  }

  const xml = convert.json2xml(JSON.stringify(jxml), options)

  return xml
}

module.exports = xmlParse