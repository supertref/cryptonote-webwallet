import Vue from 'vue'
import UserController from '@/lib/controllers/UserController'
import Logger from '@/lib/Logger'
import EventBus from '@/lib/EventBus'

const logger = new Logger('ResourceHelper')

class ResourceHelper {
  _do (method, url, data, supressLoading) {
    var self = this

    return new Promise((resolve, reject) => {
      let p = null
      this.userController = new UserController(this, {resourceHelper: this})

      const headers = {
        Authorization: 'Bearer ' + self.userController.getCurrentToken()
      }

      logger.debug('Default Headers')
      logger.debug(headers)

      switch (method) {
        case 'get':
          p = Vue.http.get(url, { headers })
          break
        case 'post':
          p = Vue.http.post(url, data, { headers })
          break
        case 'delete':
          p = Vue.http.delete(url, data, { headers })
          break
        case 'put':
          p = Vue.http.put(url, data, { headers })
          break
      }

      if (!supressLoading) {
        EventBus.$emit('loading', true)
      }
      p
        .then(res => {
          if (!supressLoading) {
            EventBus.$emit('loading', false)
          }
          resolve(res.body)
        })
        .catch(e => {
          if (!supressLoading) {
            EventBus.$emit('loading', false)
          }
          reject(e)
        })
    })
  }

  get (url, supressLoading) {
    return this._do('get', url, null, supressLoading)
  }

  post (url, data, supressLoading) {
    return this._do('post', url, data, supressLoading)
  }

  delete (url, data, supressLoading) {
    return this._do('delete', url, data, supressLoading)
  }

  put (url, data, supressLoading) {
    return this._do('put', url, data, supressLoading)
  }
}

export default ResourceHelper
