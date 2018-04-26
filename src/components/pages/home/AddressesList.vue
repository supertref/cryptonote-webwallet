<template>
  <div class="dropdown dropdown-demo">
    <a href="#" class="dd-link" data-toggle="dropdown" style="width: 100%; juti">
      <div style="justify-content: left">
        <i class="icon ion-ios-pricetags-outline mg-r-10" />
        <span v-if="!selectedAddress">{{$t('dashboard.selectAnAddress')}}</span>
        <span v-if="selectedAddress && !useShortAddress" class="hide-mobile">{{selectedAddress}}</span>
        <span v-if="selectedAddress && useShortAddress" class="hide-mobile"><address-box :address="selectedAddress" /></span>
        <address-box v-if="selectedAddress" class="show-mobile" :address="selectedAddress" />
        <i class="fa fa-angle-down mg-l-10" style=" float:right"></i>
      </div>
    </a>
    <div class="dropdown-menu pd-5">
      <nav class="nav dropdown-nav">
        <a href="javascript:void(0)" @click="changeAddress()" class="nav-link" v-show="selectedAddress && !hideAllAddressOption"><i class="icon ion-ios-pricetags-outline mg-r-10"></i> {{$t('dashboard.allAddresses')}}</a>
        <a href="javascript:void(0)" @click="changeAddress(item)" class="nav-link" v-for="item in addresses" :key="item.id">
          <i class="icon ion-ios-pricetags-outline mg-r-10" v-show="selectedAddress !== item.address"></i>
          <i class="icon ion-ios-pricetags mg-r-10" v-show="selectedAddress === item.address"></i>
          <span class="hide-mobile" v-if="!useShortAddress">{{item.address}}</span>
          <span class="hide-mobile" v-if="useShortAddress">  <address-box :address="item.address" /></span>
          <address-box class="show-mobile" :address="item.address" />
          &nbsp;<span  class="hide-mobile">(<amount :value="item.balance.available + item.balance.locked" />)</span>
        </a>
      </nav>
    </div>
  </div>
</template>

<script>
import AddressBox from '@/components/common/ui/AddressBox'
import Amount from '@/components/common/ui/Amount'

export default {
  components: {
    Amount,
    AddressBox
  },
  props: ['selectedAddress', 'addresses', 'useShortAddress', 'hideAllAddressOption'],

  data () {
    return {
      view: {
        selectedBalance: null,
        selectedAddress: null
      }
    }
  },

  methods: {
    changeAddress (item) {
      if (!item) {
        this.view.selectedBalance = null
        this.$emit('changed', null)
      } else {
        this.view.selectedBalance = item.balance.available + item.balance.locked
        this.$emit('changed', item)
      }
    }
  }
}
</script>

<style scoped="scoped">
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
