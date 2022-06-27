## Install

```sh
npm install fedex-rates
```

## Usage

```node
const fedex = require('fedex-rates');

const credentials = {
  key: '',
  password: '',
  accountNumber: '',
  meterNumber: ''
}

const quote_params = {
  address_from: {
    zip: "64000",
    country: "MX"
  },
  address_to: {
    zip: "64000",
    country: "MX"
  },
  parcel: {
    length: 25,
    width: 28,
    height: 46,
    distance_unit: "cm",
    weight: 6.5,
    mass_unit: "kg"
  }
}

rates = fedex.Rates.get(credentials, quote_params);
rates.then(response => console.log(response))

```