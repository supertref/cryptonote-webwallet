<template>
  <div class="card">
    <simplert :useRadius="true" :useIcon="true" ref="simplert" />
    <div class="card-body">
      <h6 class="slim-card-title mg-b-15">Your Addresses <span v-if="addresses.length > 1">({{addresses.length}})</span></h6>
      <div class="card-text mg-b-15">
        <div class="dropdown dropdown-demo">
          <a href="#" class="dd-link" data-toggle="dropdown">
            <div>
              <i class="icon ion-ios-pricetags-outline mg-r-10" />
              <span v-if="!selectedAddress">Select an address</span>
              <span v-if="selectedAddress" class="hide-mobile">{{selectedAddress}}</span>
              <address-box v-if="selectedAddress" class="show-mobile" :address="selectedAddress" />
              <i class="fa fa-angle-down mg-l-10"></i>
            </div>
          </a>
          <div class="dropdown-menu pd-5">
            <nav class="nav dropdown-nav">
              <a href="javascript:void(0)" @click="changeAddress()" class="nav-link" v-show="selectedAddress"><i class="icon ion-ios-pricetags-outline mg-r-10"></i> All addresses</a>
              <a href="javascript:void(0)" @click="changeAddress(item.address)" class="nav-link" v-for="item in addresses" :key="item.id">
                <i class="icon ion-ios-pricetags-outline mg-r-10" v-show="selectedAddress !== item.address"></i>
                <i class="icon ion-ios-pricetags mg-r-10" v-show="selectedAddress === item.address"></i>
                <span class="hide-mobile">{{item.address}}</span>
                <address-box class="show-mobile" :address="item.address" />
                &nbsp;<span  class="hide-mobile">(<amount :value="item.balance.available + item.balance.locked" />)</span>
              </a>
            </nav>
          </div>
        </div>
      </div>
      <div class="card-text mg-b-15 row">
        <div class="col-lg-2 col-sm-6">
          <a href="javascript:void(0)" @click="createAddress()" class="card-link"><i class="fa fa-plus" /> Create address</a>
        </div>
        <div class="col-lg-2 col-sm-6">
          <transition name="fade">
              <a href="javascript:void(0)" @click="copyAddress(selectedAddress)" class="card-link" v-show="selectedAddress && this.view.copied"><i class="fa fa-copy" /> Copy Address</a>
          </transition>
        </div>
        <div class="col-lg-2 col-sm-6">
          <transition name="fade">
            <router-link :to="'/addresses/' + selectedAddress + '/transactions/new'" class="card-link" v-show="selectedAddress"><i class="fa fa-send" /> Send money</router-link>
          </transition>
        </div>
        <div class="col-lg-2 col-sm-6">
          <transition name="fade">
            <a href="javascript:void(0)" @click="removeAddress(selectedAddress)" class="card-link tx-danger" v-show="selectedAddress"><i class="fa fa-minus" /> Remove address</a>
          </transition>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import MessageBox from '@/lib/ui/MessageBox'
import Amount from '@/components/common/ui/Amount'
import AddressBox from '@/components/common/ui/AddressBox'

export default {
  props: ['selectedAddress', 'addresses'],

  components: {
    Amount,
    AddressBox
  },

  data () {
    return {
      view: {
        copied: true
      }
    }
  },

  methods: {
    changeAddress (address) {
      this.$emit('changed', address)
    },

    createAddress () {
      this.$emit('createAddress')
    },

    removeAddress (address) {
      const self = this
      const messageBox = new MessageBox(this)
      messageBox.confirm('Removing address', 'Are you sure about remove this address?', () => {
        self.$emit('removeAddress', address)
      })
    },

    copyAddress (address) {
      const self = this
      this.view.copied = false

      this.$copyText(address)

      setTimeout(function () {
        self.view.copied = true
      }, 300)
    }
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

@media only screen and (max-width: 999px) {
    .hide-mobile {
      display: none
    }

    .show-mobile {
      display: block
    }
}

@media only screen and (min-width: 1000px) {
    .hide-mobile {
      display: block
    }

    .show-mobile {
      display: none
    }
}
</style>
