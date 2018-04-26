<template>
  <div class="card">
    <simplert :useRadius="true" :useIcon="true" ref="simplert" />
    <div class="card-body">
      <h6 class="slim-card-title mg-b-15">{{$t('dashboard.yourAddresses')}} ({{addresses.length}})</h6>
      <div class="card-text mg-b-15">
        <addresses-list :selectedAddress="selectedAddress" @changed="changeAddress" :addresses="addresses" />
      </div>
      <div class="card-text mg-b-15 row">
        <div class="col-lg-2 col-sm-6">
          <a href="javascript:void(0)" @click="createAddress()" class="card-link"><i class="fa fa-plus" /> {{$t('dashboard.createAddress')}}</a>
        </div>
        <div class="col-lg-2 col-sm-6">
          <transition name="fade">
              <a href="javascript:void(0)" @click="copyAddress(selectedAddress)" class="card-link" v-show="selectedAddress && this.view.copied"><i class="fa fa-copy" /> {{$t('dashboard.copyAddress')}}</a>
          </transition>
        </div>
        <div class="col-lg-2 col-sm-6">
          <transition name="fade">
            <router-link :to="'/addresses/' + selectedAddress + '/transactions/new'" class="card-link" v-show="selectedAddress"><i class="fa fa-send" /> {{$t('dashboard.sendMoney')}}</router-link>
          </transition>
        </div>
        <div class="col-lg-2 col-sm-6">
          <transition name="fade">
            <a href="javascript:void(0)" @click="removeAddress(selectedAddress)" class="card-link tx-danger" v-show="this.view.selectedBalance === 0 && selectedAddress"><i class="fa fa-minus" /> {{$t('dashboard.removeAddress')}}</a>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MessageBox from '@/lib/ui/MessageBox'
import AddressesList from '@/components/pages/home/AddressesList'

export default {
  props: ['selectedAddress', 'addresses'],

  components: {
    AddressesList
  },

  data () {
    return {
      view: {
        copied: true,
        selectedBalance: 0
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
    },

    createAddress () {
      this.$emit('createAddress')
    },

    removeAddress (address) {
      const self = this
      const messageBox = new MessageBox(this)
      messageBox.confirm(this.$t('messages.removeAddress.title'), this.$t('messages.removeAddress.message'), () => {
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
</style>
