<template>
  <page :title="$t('transaction.title')" :subTitle="this.view.id">
    <div class="row row-xs">
      <div class="col-sm-6 col-lg-4">
        <div class="card card-status">
          <div class="media">
            <i class="icon fa fa-money tx-success"></i>
            <div class="media-body">
              <h1><amount :value="this.transaction.amount" :isFixed="false" /></h1>
              <p>{{$t('common.amount')}}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm-6 col-lg-4 mg-t-10 mg-sm-t-0">
        <div class="card card-status" v-if="this.transaction.status !== 2">
          <div class="media">
            <i class="icon fa fa-chain-broken tx-gray"></i>
            <div class="media-body">
              <h1>{{$t('transaction.waiting')}}</h1>
              <p>{{$t('transaction.blockchainConfirmation')}}</p>
            </div>
          </div>
        </div>

        <div class="card card-status" v-if="this.transaction.status === 2">
          <div class="media">
            <i class="icon fa fa-chain tx-info"></i>
            <div class="media-body">
              <h1>{{$t('common.confirmed')}}</h1>
              <p>{{$t('transaction.blockchainConfirmation')}}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm-6 col-lg-4 mg-t-10 mg-sm-t-0">
        <div class="card card-status">
          <div class="media">
            <i class="icon fa fa-cloud-upload tx-primary"></i>
            <div class="media-body">
              <h1><amount :value="this.transaction.fee" /></h1>
              <p>{{$t('common.fee')}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="section-wrapper mg-t-10">
      <label class="section-title">{{$t('transaction.informations')}}</label>
      <div class="row">
        <div class="col-lg-12">
          <p class="invoice-info-row">
            <span>{{$t('common.from')}}:</span>
            <span>{{this.transaction.from}}</span>
          </p>
          <p class="invoice-info-row">
            <span>{{$t('common.to')}}:</span>
            <span>{{this.transaction.to.address}}</span>
          </p>
          <p class="invoice-info-row">
            <span>{{$t('common.paymentId')}}:</span>
            <span>{{this.parsePaymentId()}}</span>
          </p>
          <p class="invoice-info-row">
            <span>{{$t('common.hash')}}:</span>
            <span>{{this.transaction.transactionHash}}</span>
          </p>
          <p class="invoice-info-row">
            <span>{{$t('common.amount')}}:</span>
            <amount :value="this.transaction.amount" :isFixed="false" />
          </p>
          <p class="invoice-info-row">
            <span>{{$t('common.fee')}}:</span>
            <amount :value="this.transaction.fee" :isFixed="false" />
          </p>
          <p class="invoice-info-row">
            <span>{{$t('common.anonymity')}}:</span>
            <span v-if="this.transaction.extra.anonymity">{{this.transaction.extra.anonymity}}</span>
            <span v-if="!this.transaction.extra.anonymity">{{$t('common.na')}}</span>
          </p>
          <p class="invoice-info-row">
            <span>{{$t('common.status')}}:</span>
            <span v-if="this.transaction.status === 2"><i class="fa fa-chain tx-info"></i> {{$t('common.confirmed')}}</span>
            <span v-if="this.transaction.status !== 2"><i class="fa fa-chain-broken tx-gray"></i> {{$t('common.waitingConfirmation')}}</span>
          </p>
          <p class="invoice-info-row">
            <span>{{$t('common.createdAt')}}:</span>
            <span><i class="fa fa-calendar tx-info"></i> {{transaction.createdAt | moment-formatted}}</span>
          </p>
          <p class="invoice-info-row">
            <span>{{view.to}}:</span>
            <span v-if="transaction.amount < 0" class="tx-danger"><i class="fa fa-money"></i> <convert-coin :to="view.to" :amount="transaction.amount" /> {{view.to}}</span>
            <span v-if="transaction.amount >= 0"><i class="fa fa-money tx-info"></i> <convert-coin :to="view.to" :amount="transaction.amount" /> {{view.to}}</span>
          </p>
          <p class="invoice-info-row">
            <span>BTC:</span>
            <span v-if="transaction.amount < 0" class="tx-danger"><i class="icon ion-social-bitcoin"></i> <convert-coin to="BTC" :amount="transaction.amount" /> BTC</span>
            <span v-if="transaction.amount >= 0"><i class="icon ion-social-bitcoin tx-info"></i> <convert-coin to="BTC" :amount="transaction.amount" /> BTC</span>
          </p>
        </div>
      </div>
    </div>
  </page>
</template>

<script>
import Page from '@/components/common/page/Page'
import ControllerFactory from '@/lib/controllers/ControllerFactory'
import Amount from '@/components/common/ui/Amount'
import ConvertCoin from '@/components/common/ui/ConvertCoin'
import Config from '@/Config'

export default {
  components: {
    Page,
    Amount,
    ConvertCoin
  },

  data () {
    const userController = ControllerFactory.getController('user', this)

    return {
      view: {
        id: this.$route.params.id,
        config: Config,
        to: userController.getCurrentUser().to || Config.defaultCurrency
      },
      transaction: {
        from: 'Anonymous',
        extra: {
          paymentId: '',
          anonymity: ''
        }
      }
    }
  },

  mounted () {
    this.loadTransaction()
  },

  methods: {
    loadTransaction () {
      const transactionController = ControllerFactory.getController('transaction', this)
      const self = this

      transactionController.getTransactionById(this.view.id)
        .then(transaction => {
          self.transaction = transaction
        })
    },

    parsePaymentId () {
      return Buffer.from(this.transaction.extra.paymentId, 'hex').toString()
    }
  }

}
</script>

<style scoped>
.media-body h1 {
   max-width: 250px;
   overflow: hidden;
   white-space: nowrap;
   text-overflow: ellipsis;
}
</style>
