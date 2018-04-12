import Logger from '@/lib/Logger'

const logger = new Logger('ContactController')

class AddressController {
  constructor (vueContext, dependencies) {
    this.vueContext = vueContext
    this.resourceHelper = dependencies.resourceHelper
  }

  saveContact (contact) {
    var self = this
    return new Promise((resolve, reject) => {
      logger.info(`Saving contact for the current user`)

      let endpoint = '/api/v1/contacts'

      if (contact.id) {
        endpoint += `/${contact.id}`
        self.resourceHelper.put(endpoint, contact)
          .then(resolve)
          .catch(reject)
      } else {
        self.resourceHelper.post(endpoint, contact)
          .then(resolve)
          .catch(reject)
      }
    })
  }

  getContacts (pagination, sort) {
    var self = this
    return new Promise((resolve, reject) => {
      logger.info(`Getting contacts`)

      let endpoint = '/api/v1/contacts?'

      if (sort) {
        endpoint += `&sort=${sort}`
      }

      if (pagination) {
        endpoint += `&offset=${pagination.offset}&limit=${pagination.limit}`
      }

      self.resourceHelper.get(endpoint)
        .then(resolve)
        .catch(reject)
    })
  }

  getContact (id) {
    var self = this
    return new Promise((resolve, reject) => {
      logger.info(`Getting the contact by id ${id}`)

      let endpoint = `/api/v1/contacts/${id}`

      self.resourceHelper.get(endpoint)
        .then(resolve)
        .catch(reject)
    })
  }

  deleteContact (id) {
    var self = this
    return new Promise((resolve, reject) => {
      logger.info(`Deleting the contact by id ${id}`)

      let endpoint = `/api/v1/contacts/${id}`

      self.resourceHelper.delete(endpoint)
        .then(resolve)
        .catch(reject)
    })
  }
}

export default AddressController
