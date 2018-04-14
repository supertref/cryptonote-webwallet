<template>
    <div class="media">
      <i v-if="alert.type==='TRANSACTION_NEW'" class="fa fa-chain-broken"  style="font-size: 50px" />
      <i v-if="alert.type==='TRANSACTION_CONFIRMED'" class="fa fa-chain text-success"  style="font-size: 50px" />

      <div class="media-body">
        <p v-if="alert.type==='TRANSACTION_NEW'">{{$t('alerts.newTransaction')}}</p>
        <p v-if="alert.type==='TRANSACTION_CONFIRMED'" >{{$t('alerts.transactionConfirmed')}}</p>
        <p>
          <i v-if="alert.data.amount >= 0" class="icon ion-android-arrow-up text-success" />
          <i v-if="alert.data.amount < 0" class="icon ion-android-arrow-down text-danger" />
          <amount :value="alert.data.amount" :isFixed="true" />
          {{view.symbol}}
        </p>
        <span>{{alert.createdAt | moment-formatted}}</span>
        <router-link :to="{ name: 'transaction', params: { id: alert.data.id }}">
          <i class="fa fa-share"/>
        </router-link>
      </div>
    </div>
</template>
<script>
import Amount from '@/components/common/ui/Amount'
import Config from '@/Config'

export default {
  components: {
    Amount
  },

  data () {
    return {
      view: {
        symbol: Config.symbol
      }
    }
  },

  props: ['alert']
}
</script>
