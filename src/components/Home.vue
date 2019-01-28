<template>
  <page :title="$t('dashboard.title')">
    <div class="card card-dash-one mg-t-20">
      <div class="row no-gutters">
        <div class="col-lg-3">
          <i class="icon ion-shuffle"></i>
          <div class="dash-content">
            <label class="tx-primary">{{$t('dashboard.balance')}}</label>
            <h2 v-if="this.view.isLoaded"><amount :value="this.view.dashboard.balance.total" /></h2>
            <h2 v-if="!this.view.isLoaded"><i class="fa fa-spinner fa-spin " /></h2>
          </div>
        </div>
        <div class="col-lg-3">
          <i class="icon fa fa-lock"></i>
          <div class="dash-content">
            <label class="tx-danger">{{$t('dashboard.locked')}}</label>
            <h2 v-if="this.view.isLoaded"><amount :value="this.view.dashboard.balance.locked" /></h2>
            <h2 v-if="!this.view.isLoaded"><i class="fa fa-spinner fa-spin " /></h2>
          </div>
        </div>
        <div class="col-lg-3">
          <i class="icon fa fa-money"></i>
          <div class="dash-content">
            <label class="tx-success">{{$t('dashboard.value')}} ({{this.view.to}})</label>
            <h2 v-if="this.view.isLoaded"><convert-coin :to="this.view.to" :amount="this.view.dashboard.balance.total" decimals="8" /></h2>
            <h2 v-if="!this.view.isLoaded"><i class="fa fa-spinner fa-spin " /></h2>
          </div>
        </div>
        <div class="col-lg-3">
          <i class="icon ion-social-bitcoin"></i>
          <div class="dash-content">
            <label class="tx-purple">{{$t('dashboard.value')}} (BTC)</label>
            <h2 v-if="this.view.isLoaded"><convert-coin to="BTC" :amount="this.view.dashboard.balance.total" /></h2>
            <h2 v-if="!this.view.isLoaded"><i class="fa fa-spinner fa-spin " /></h2>
          </div>
        </div>
      </div>
    </div>

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
            <router-link v-if="selectedAddress" :to="'/addresses/' + selectedAddress + '/transactions'"><i class="fa fa-angle-down mg-r-5"></i>{{$t('dashboard.viewAllHistory')}}</router-link>
            <router-link v-if="!selectedAddress" :to="'/addresses/transactions'"><i class="fa fa-angle-down mg-r-5"></i>{{$t('dashboard.viewAllHistory')}}</router-link>
          </div>
        </transactions-card>
      </div>
    </div>
  </page>
</template>

<script>
import Page from '@/components/common/page/Page'
import Amount from '@/components/common/ui/Amount'
import ConvertCoin from '@/components/common/ui/ConvertCoin'
import AddressesBox from '@/components/pages/home/AddressesBox'
import TransactionsCard from '@/components/pages/transactions/TransactionsCard'
import ControllerFactory from '@/lib/controllers/ControllerFactory'
import Config from '@/Config'
import EventBus from '@/lib/EventBus'

export default {
  components: {
    Page,
    AddressesBox,
    Amount,
    TransactionsCard,
    ConvertCoin
  },

  data () {
    const userController = ControllerFactory.getController('user', this)

    return {
      view: {
        selectedAddress: this.$route.params.address,
        to: userController.getCurrentUser().defaultCurrency || Config.defaultCurrency,
        dashboard: {
          balance: {
            available: 0,
            locked: 0,
            total: 0
          },
          addresses: [],
          transactions: []
        },
        isLoaded: false
      }
    }
  },

  mounted () {
    this.loadDashboard()

    EventBus.$on('new-alerts', alerts => {
      this.checkAlerts(alerts)
    })
  },

  methods: {
    checkAlerts (alerts) {
      let updateScreen = false
      alerts.forEach(item => {
        if (item.type === 'TRANSACTION_NEW' || item.type === 'TRANSACTION_CONFIRMED') {
          console.log('TESTE', item.data.to, this.view.selectedAddress, item.data.to === this.view.selectedAddress)
          if (item.data.to.address === this.view.selectedAddress || !this.view.selectedAddress) {
            updateScreen = true
          }
        }
      })

      if (updateScreen) {
        this.loadDashboard(this.view.selectedAddress, true)
      }
    },

    changeAddress (address) {
      this.loadDashboard(address)
        .then(() => {
          if (address) {
            this.view.selectedBalance = address.balance.available + address.balance.locked
            this.view.selectedAddress = address.address
          } else {
            this.view.selectedBalance = null
            this.view.selectedAddress = null
          }
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
            return self.changeAddress(r)
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
            self.selectedBalance = null
            return self.changeAddress()
          })
          .then(resolve)
          .catch(reject)
      })
    },

    loadDashboard (item, supressLoading) {
      const self = this
      const dashboardController = ControllerFactory.getController('dashboard', this)
      const address = item ? item.address : null

      return new Promise((resolve, reject) => {
        const chain = Promise.resolve()

        chain
          .then(() => {
            self.view.isLoaded = false || supressLoading
            return dashboardController.getDashboard(address, supressLoading)
          })
          .then(r => {
            self.view.dashboard = r
            self.view.isLoaded = true

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
   max-width: 165px;
   overflow: hidden;
   white-space: nowrap;
   text-overflow: ellipsis;
}
</style>
