import AddressController from '@/lib/controllers/AddressController'
import TransactionController from '@/lib/controllers/TransactionController'
import ResourceHelper from '@/lib/helpers/ResourceHelper'
import DashboardController from '@/lib/controllers/DashboardController'
import ContactController from '@/lib/controllers/ContactController'
import UserController from '@/lib/controllers/UserController'
import AlertController from '@/lib/controllers/AlertController'
import TickerController from '@/lib/controllers/TickerController'

export default {
  getController (controller, vueContext) {
    switch (controller) {
      case 'alert':
        return new AlertController(vueContext, {
          resourceHelper: new ResourceHelper()
        })
      case 'ticker':
        return new TickerController(vueContext, {
          resourceHelper: new ResourceHelper()
        })
      case 'contact':
        return new ContactController(vueContext, {
          resourceHelper: new ResourceHelper()
        })
      case 'user':
        return new UserController(vueContext, {
          resourceHelper: new ResourceHelper()
        })
      case 'address':
        return new AddressController(vueContext, {
          resourceHelper: new ResourceHelper()
        })
      case 'transaction':
        return new TransactionController(vueContext, {
          resourceHelper: new ResourceHelper()
        })
      case 'dashboard':
        return new DashboardController(vueContext, {
          addressController: new AddressController(vueContext, {
            resourceHelper: new ResourceHelper()
          }),
          transactionController: new TransactionController(vueContext, {
            resourceHelper: new ResourceHelper()
          })
        })
      default:
        return null
    }
  }
}
