<template>
  <page title="Dashboard 01">
    <div class="card card-dash-one mg-t-20">
      <div class="row no-gutters">
        <div class="col-lg-3">
          <i class="icon ion-shuffle"></i>
          <div class="dash-content">
            <label class="tx-primary">Balance</label>
            <h2><amount :value="this.view.dashboard.balance.total" /></h2>
          </div><!-- dash-content -->
        </div><!-- col-3 -->
        <div class="col-lg-3">
          <i class="icon fa fa-lock"></i>
          <div class="dash-content">
            <label class="tx-danger">Locked</label>
            <h2><amount :value="this.view.dashboard.balance.locked" /></h2>
          </div><!-- dash-content -->
        </div>
        <div class="col-lg-3">
          <i class="icon fa fa-money"></i>
          <div class="dash-content">
            <label class="tx-success">Value (R$)</label>
            <h2>465,183</h2>
          </div><!-- dash-content -->
        </div><!-- col-3 -->
        <div class="col-lg-3">
          <i class="icon ion-social-bitcoin"></i>
          <div class="dash-content">
            <label class="tx-purple">Value (BTC)</label>
            <h2>781,524</h2>
          </div><!-- dash-content -->
        </div><!-- col-3 -->
      </div><!-- row -->
    </div><!-- card -->

    <div class="row row-sm mg-t-20">
      <div class="col-lg-12 mg-t-20 mg-lg-t-0">
        <addresses-box
          :selectedAddress="this.view.selectedAddress"
          :addresses="this.view.dashboard.addresses"
          @changed="changeAddress"
          @createAddress="createAddress"
          @removeAddress="removeAddress" />
      </div>
    </div>

    <div class="row row-sm mg-t-20">
      <div class="col-lg-12 mg-t-20 mg-lg-t-0">
        <div class="card card-table">
          <div class="card-header">
            <h6 class="slim-card-title">Transaction History</h6>
          </div>
          <div class="table-responsive">
            <table class="table mg-b-0 tx-13">
              <thead>
                <tr class="tx-10">
                  <th>Address</th>
                  <th width="20%">Amount</th>
                  <th width="20%">Date</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="transaction in this.view.dashboard.transactions" :key="transaction.id">
                  <td>
                    <a href="#" class="tx-inverse tx-14 tx-medium d-block"><address-box :address="transaction.from" /></a>
                  </td>
                  <td>
                    <span v-if="transaction.amount < 0" class="tx-danger"><i class="icon ion-android-arrow-down mg-r-5"></i><amount :value="transaction.amount" /></span>
                    <span v-if="transaction.amount >= 0" class="tx-success"><i class="icon ion-android-arrow-up mg-r-5"></i><amount :value="transaction.amount" /></span>

                    <span class="tx-11 d-block" v-if="transaction.status === 2"><span class="square-8 bg-info mg-r-5 rounded-circle"></span>Confirmed</span>
                    <span class="tx-11 d-block" v-if="transaction.status !== 2"><span class="square-8 bg-warning mg-r-5 rounded-circle"></span>Waiting confirmation</span>
                  </td>
                  <td>{{transaction.createdAt | moment-from}}
                  <span class="tx-11 d-block">{{transaction.createdAt | moment-formatted}}</span></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="card-footer tx-12 pd-y-15 bg-transparent">
            <a href="#"><i class="fa fa-angle-down mg-r-5"></i>View All Transaction History</a>
          </div>
        </div>
      </div>
    </div>
  </page>
</template>

<script>
import Page from '@/components/common/page/Page'
import Amount from '@/components/common/ui/Amount'
import AddressBox from '@/components/common/ui/AddressBox'
import AddressesBox from '@/components/pages/home/AddressesBox'
import ControllerFactory from '@/lib/controllers/ControllerFactory'

export default {
  components: {
    Page,
    AddressesBox,
    Amount,
    AddressBox
  },

  data () {
    return {
      view: {
        selectedAddress: this.$route.params.address,
        dashboard: {
          balance: {
            available: 0,
            locked: 0,
            total: 0
          },
          addresses: [],
          transactions: []
        }
      }
    }
  },

  mounted () {
    this.loadDashboard()
  },

  methods: {
    changeAddress (address) {
      const self = this

      this.loadDashboard(address)
        .then(() => {
          self.view.selectedAddress = address
        })
    },

    createAddress () {
      const self = this
      const addressController = ControllerFactory.getController('address', this)

      return new Promise((resolve, reject) => {
        const chain = Promise.resolve()

        chain
          .then(() => {
            return addressController.createAddress()
          })
          .then(r => {
            return self.changeAddress(r.address)
          })
          .then(resolve)
          .catch(reject)
      })
    },

    removeAddress (address) {
      const self = this
      const addressController = ControllerFactory.getController('address', this)

      return new Promise((resolve, reject) => {
        const chain = Promise.resolve()

        chain
          .then(() => {
            return addressController.removeAddress(address)
          })
          .then(r => {
            self.selectedAddress = null
            return self.changeAddress()
          })
          .then(resolve)
          .catch(reject)
      })
    },

    loadDashboard (address) {
      const self = this
      const dashboardController = ControllerFactory.getController('dashboard', this)

      return new Promise((resolve, reject) => {
        const chain = Promise.resolve()

        chain
          .then(() => {
            return dashboardController.getDashboard(address)
          })
          .then(r => {
            self.view.dashboard = r
            return r
          })
          .then(resolve)
          .catch(reject)
      })
    }
  }
}
</script>
