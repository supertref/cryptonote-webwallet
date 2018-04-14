import Logger from '@/lib/Logger'

const logger = new Logger('AddressController')

class AddressController {
  constructor (vueContext, dependencies) {
    this.vueContext = vueContext
    this.resourceHelper = dependencies.resourceHelper
  }

  getBalance (address, supressLoading) {
    var self = this

    return new Promise((resolve, reject) => {
      let endpoint = '/api/v1/addresses'
      if (address) {
        endpoint += '/' + address
      }

      endpoint += '/balance'

      logger.info(`Getting the balance for the address ${address}`)

      self.resourceHelper.get(endpoint, supressLoading)
        .then(resolve)
        .catch(reject)
    })
  }

  removeAddress (address) {
    var self = this

    return new Promise((resolve, reject) => {
      self.resourceHelper.delete('/api/v1/addresses/' + address)
        .then(resolve)
        .catch(reject)
    })
  }

  createAddress () {
    var self = this
    return new Promise((resolve, reject) => {
      logger.info(`Creating a new address for the current user`)

      self.resourceHelper.post('/api/v1/addresses')
        .then(resolve)
        .catch(reject)
    })
  }

  getAddresses (supressLoading) {
    var self = this
    return new Promise((resolve, reject) => {
      logger.info(`Getting the addresses`)

      self.resourceHelper.get('/api/v1/addresses', supressLoading)
        .then(resolve)
        .catch(reject)
    })
  }
}

export default AddressController
