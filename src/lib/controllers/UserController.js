import jwtDecode from 'jwt-decode'
import EventBus from '@/lib/EventBus'
import Logger from '@/lib/Logger'

const logger = new Logger('UserController')

class UserController {
  constructor (vueContext, dependencies) {
    this.vueContext = vueContext
    this.resourceHelper = dependencies.resourceHelper
  }

  createUser (user) {
    const self = this
    return new Promise((resolve, reject) => {
      this.resourceHelper.post('/api/v1/users', user)
        .then(res => {
          return self.registerUserFromResponse(res)
        })
        .then(resolve)
        .catch(reject)
    })
  }

  confirmUser (userId, confirmationKey) {
    return new Promise((resolve, reject) => {
      this.resourceHelper.post(`/api/v1/users/${userId}/confirm/${confirmationKey}`)
        .then(resolve)
        .catch(reject)
    })
  }

  updateCurrentUser (user) {
    var self = this

    return new Promise((resolve, reject) => {
      this.resourceHelper.put('/api/v1/users/me', user)
        .then(res => {
          return self.updateToken()
        })
        .then(resolve)
        .catch(reject)
    })
  }

  getCurrentUserFromServer () {
    var self = this

    return new Promise((resolve, reject) => {
      var chain = Promise.resolve()
      var rUser = null

      chain
        .then(() => {
          return self.resourceHelper.get('/api/v1/users/me', true)
        })
        .then(user => {
          rUser = user
          return self.updateToken()
        })
        .then(() => {
          return rUser
        })
        .then(resolve)
        .catch(error => {
          if (error.status === 403) {
            resolve(null)
          } else {
            reject(error)
          }
        })
    })
  }

  resetPassword (userId, key, newPassword) {
    return new Promise((resolve, reject) => {
      this.resourceHelper.post(`/api/v1/users/${userId}/reset-password/${key}`, {newPassword})
        .then(resolve)
        .catch(reject)
    })
  }

  login (email, password) {
    const self = this

    return new Promise((resolve, reject) => {
      this.resourceHelper.post('/api/v1/users/auth', {email, password})
        .then(user => {
          localStorage.setItem('currentUserToken', user.token)

          return self.registerUserFromResponse(user)
        })
        .then(resolve)
        .catch(reject)
    })
  }

  updateToken () {
    const self = this

    return new Promise((resolve, reject) => {
      this.resourceHelper.post('/api/v1/users/auth/tokens', undefined, true)
        .then(user => {
          localStorage.setItem('currentUserToken', user.token)
          return self.registerUserFromResponse(user)
        })
        .then(resolve)
        .catch(reject)
    })
  }

  registerUserFromResponse (user) {
    // sending to the app the new user

    if (user.token) {
      localStorage.setItem('currentUserToken', user.token)
    }
    EventBus.$emit('new-user', user)

    return user
  }

  logout () {
    logger.info('Removing the current user token')

    localStorage.removeItem('currentUserToken')
    localStorage.removeItem('currentUser')
    EventBus.$emit('new-user', null)
  }

  getCurrentUser () {
    logger.info('Trying to get user information')
    const token = localStorage.getItem('currentUserToken')
    logger.debug(token)

    if (token) {
      try {
        const user = jwtDecode(token)

        logger.info('A valid token was found')
        logger.debug(user)
        return jwtDecode(token)
      } catch (e) {
        logger.warn('The current token is invalid')
        return null
      }
    } else {
      return null
    }
  }

  getCurrentToken () {
    return localStorage.getItem('currentUserToken')
  }
}

export default UserController
