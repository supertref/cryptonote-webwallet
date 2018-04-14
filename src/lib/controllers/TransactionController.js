import Logger from '@/lib/Logger'

const logger = new Logger('TransactionController')

class TransactionController {
  constructor (vueContext, dependencies) {
    this.vueContext = vueContext
    this.resourceHelper = dependencies.resourceHelper
  }

  getTransactions (address, pagination, sort, supressLoading) {
    var self = this
    return new Promise((resolve, reject) => {
      logger.info(`Getting the transactions ${address}`)

      let endpoint = ''

      if (address) {
        endpoint = `/api/v1/addresses/${address}/transactions`
      } else {
        endpoint = '/api/v1/transactions'
      }

      endpoint += '?'

      if (sort) {
        endpoint += `&sort=${sort}`
      }

      if (pagination) {
        endpoint += `&offset=${pagination.offset}&limit=${pagination.limit}`
      }

      self.resourceHelper.get(endpoint, supressLoading)
        .then(resolve)
        .catch(reject)
    })
  }

  createTransaction (transaction) {
    var self = this
    return new Promise((resolve, reject) => {
      logger.info(`Creating a new transaction`)
      logger.debug(transaction)

      self.resourceHelper.post('/api/v1/transactions', transaction)
        .then(resolve)
        .catch(reject)
    })
  }

  getTransactionById (id) {
    var self = this
    return new Promise((resolve, reject) => {
      self.resourceHelper.get(`/api/v1/transactions/${id}`)
        .then(resolve)
        .catch(reject)
    })
  }
}

export default TransactionController
