<template>
  <page title="My Wallet">
    <div class="card card-dash-one mg-t-20">
      <div class="row no-gutters">
        <div class="col-lg-3">
          <i class="icon ion-shuffle"></i>
          <div class="dash-content">
            <label class="tx-primary">Balance</label>
            <h2 ><amount :value="this.view.dashboard.balance.total" /></h2>
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
        <transactions-card :transactions="this.view.dashboard.transactions">
          <div class="card-footer tx-12 pd-y-15 bg-transparent"
            v-if="this.view.dashboard.transactions.totalCount > 10">
            <router-link v-if="selectedAddress" :to="'/addresses/' + selectedAddress + '/transactions'"><i class="fa fa-angle-down mg-r-5"></i>View All Transaction History</router-link>
            <router-link v-if="!selectedAddress" :to="'/addresses/transactions'"><i class="fa fa-angle-down mg-r-5"></i>View All Transaction History</router-link>
          </div>
        </transactions-card>
      </div>
    </div>
  </page>
</template>

<script>
import Page from '@/components/common/page/Page'
import Amount from '@/components/common/ui/Amount'
import AddressesBox from '@/components/pages/home/AddressesBox'
import TransactionsCard from '@/components/pages/transactions/TransactionsCard'
import ControllerFactory from '@/lib/controllers/ControllerFactory'

export default {
  components: {
    Page,
    AddressesBox,
    Amount,
    TransactionsCard
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
            self.selectedAddress = ''
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

            if (address) {
              self.selectedAddress = address
            } else {
              self.selectedAddress = ''
            }
            return r
          })
          .then(resolve)
          .catch(reject)
      })
    }
  }
}
</script>

<style>
.dash-content h2 {
   max-width: 170px;
   overflow: hidden;
   white-space: nowrap;
   text-overflow: ellipsis;
}
</style>
