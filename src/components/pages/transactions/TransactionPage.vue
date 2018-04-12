<template>
  <page title="Transaction" :subTitle="this.view.id">
    <div class="row row-xs">
      <div class="col-sm-6 col-lg-4">
        <div class="card card-status">
          <div class="media">
            <i class="icon fa fa-money tx-success"></i>
            <div class="media-body">
              <h1><amount :value="this.transaction.amount" :isFixed="false" /></h1>
              <p>Amount</p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm-6 col-lg-4 mg-t-10 mg-sm-t-0">
        <div class="card card-status" v-if="this.transaction.status !== 2">
          <div class="media">
            <i class="icon fa fa-chain-broken tx-gray"></i>
            <div class="media-body">
              <h1>Waiting</h1>
              <p>Blockchain confirmation</p>
            </div>
          </div>
        </div>

        <div class="card card-status" v-if="this.transaction.status === 2">
          <div class="media">
            <i class="icon fa fa-chain tx-info"></i>
            <div class="media-body">
              <h1>Confirmed</h1>
              <p>Blockchain confirmation</p>
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
              <p>Fee</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="section-wrapper mg-t-10">
      <label class="section-title">Informations</label>
      <div class="row">
        <div class="col-lg-12">
          <p class="invoice-info-row">
            <span>From:</span>
            <span>{{this.transaction.from}}</span>
          </p>
          <p class="invoice-info-row">
            <span>To:</span>
            <span>{{this.transaction.to.address}}</span>
          </p>
          <p class="invoice-info-row">
            <span>Payment Id:</span>
            <span>{{this.parsePaymentId()}}</span>
          </p>
          <p class="invoice-info-row">
            <span>Hash:</span>
            <span>{{this.transaction.transactionHash}}</span>
          </p>
          <p class="invoice-info-row">
            <span>Amount:</span>
            <amount :value="this.transaction.amount" :isFixed="false" />
          </p>
          <p class="invoice-info-row">
            <span>Fee:</span>
            <amount :value="this.transaction.fee" :isFixed="false" />
          </p>
          <p class="invoice-info-row">
            <span>Anonymity:</span>
            <span v-if="this.transaction.extra.anonymity">{{this.transaction.extra.anonymity}}</span>
            <span v-if="!this.transaction.extra.anonymity">N/A</span>
          </p>
          <p class="invoice-info-row">
            <span>Status:</span>
            <span v-if="this.transaction.status === 2"><i class="fa fa-chain tx-info"></i> Confirmed</span>
            <span v-if="this.transaction.status !== 2"><i class="fa fa-chain-broken tx-gray"></i> Waiting confirmations</span>
          </p>
          <p class="invoice-info-row">
            <span>Created at:</span>
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
