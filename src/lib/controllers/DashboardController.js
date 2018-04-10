import Logger from '@/lib/Logger'

const logger = new Logger('DashboardController')

class DashboardController {
  constructor (vueContext, dependencies) {
    this.vueContext = vueContext
    this.addressController = dependencies.addressController
    this.transactionController = dependencies.transactionController
  }

  getDashboard (address) {
    var self = this

    return new Promise((resolve, reject) => {
      logger.info('Getting dashboard info')
      let dashboard = {
      }

      const chain = Promise.resolve()

      chain
        .then(function () {
          return self.addressController.getBalance(address)
        })
        .then(function (r) {
          dashboard.balance = r
          return self.addressController.getAddresses()
        })
        .then(function (r) {
          dashboard.addresses = r
          return self.transactionController.getTransactions(address, {limit: 10, offset: 0}, '-createdAt')
        })
        .then(function (r) {
          dashboard.transactions = r

          logger.info('Returning the dashboard object')
          logger.info(dashboard)
          return dashboard
        })
        .then(resolve)
        .catch(reject)
    })
  }
}

export default DashboardController
