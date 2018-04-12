import Logger from '@/lib/Logger'

const logger = new Logger('TickerController')

class TickerController {
  constructor (vueContext, dependencies) {
    this.vueContext = vueContext
    this.resourceHelper = dependencies.resourceHelper
  }

  saveContact (symbol) {
    var self = this
    return new Promise((resolve, reject) => {
      logger.info(`Getting ticker information`)

      let endpoint = `/api/v1/tickers/${symbol}`

      self.resourceHelper.get(endpoint)
        .then(resolve)
        .catch(reject)
    })
  }

  convert (symbolFrom, currencyTo, amount) {
    var self = this
    return new Promise((resolve, reject) => {
      logger.info(`Converting symbol`)

      let endpoint = `/api/v1/conversions`

      self.resourceHelper.post(endpoint, {
        ticker: {
          from: symbolFrom,
          to: currencyTo
        },
        amount: amount
      })
        .then(resolve)
        .catch(reject)
    })
  }
}

export default TickerController
