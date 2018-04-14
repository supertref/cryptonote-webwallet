import Logger from '@/lib/Logger'
import EventBus from '@/lib/EventBus'

const logger = new Logger('AlertController')

class AlertController {
  constructor (vueContext, dependencies) {
    this.vueContext = vueContext
    this.resourceHelper = dependencies.resourceHelper
  }

  getAlerts () {
    var self = this
    return new Promise((resolve, reject) => {
      logger.info(`Getting alerts for current user`)

      self.resourceHelper.get('/api/v1/me/alerts?offset=0&limit=5&sort=-createdAt', true)
        .then(resolve)
        .catch(reject)
    })
  }

  getUnreadAlerts () {
    var self = this
    return new Promise((resolve, reject) => {
      logger.info(`Getting unread alerts for current user`)

      self.resourceHelper.get('/api/v1/me/alerts/unread', true)
        .then(alerts => {
          if (alerts.length > 0) {
            EventBus.$emit('new-alerts', alerts)
          }
          return alerts
        })
        .then(resolve)
        .catch(reject)
    })
  }
}

export default AlertController
