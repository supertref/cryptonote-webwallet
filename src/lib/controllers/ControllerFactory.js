import AddressController from '@/lib/controllers/AddressController'
import TransactionController from '@/lib/controllers/TransactionController'
import ResourceHelper from '@/lib/helpers/ResourceHelper'
import DashboardController from '@/lib/controllers/DashboardController'
import UserController from '@/lib/controllers/UserController'

export default {
  getController (controller, vueContext) {
    switch (controller) {
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
