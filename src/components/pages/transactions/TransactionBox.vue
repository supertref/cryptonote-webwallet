<template>
  <div class="section-wrapper">
    <simplert :useIcon="true" ref="simplert" />
    <contacts-list-modal id="modal" @selected="contactSelected" />

    <div class="row">
      <div class="col-lg-8">
        <label class="section-title">New Transaction</label>
        <p class="mg-b-20 mg-sm-b-40">Use this form to send money to another address.</p>
      </div>
      <div class="col-lg-4">
        <div class="">

        </div>
      </div>
    </div>

    <div class="form-layout">
      <div class="row mg-b-25">
        <div class="col-lg-8">
          <div class="form-group">
            <label class="form-control-label">From: <span class="tx-danger">*</span></label>
            <input class="form-control" type="text" readonly name="from" v-model="transaction.from" placeholder="From address">
          </div>
        </div>
        <div class="col-lg-4">
          <div class="form-group">
            <label class="form-control-label" for="amount">Amount: <span class="tx-danger">*</span></label>
            <div class="input-group">
              <money class="form-control" name="amount" id="amount" v-model="transaction.to.fakeAmount" placeholder=""></money>
              <div class="input-group-append">
                  <div class="input-group-text">{{view.config.symbol}}</div>
              </div>
            </div>
            <div>
              <label class="tx-primary" style="padding-right: 10px" title="Total"><i class="fa fa-money"></i> <amount :value="this.address.balance.available" /></label>
              <label class="tx-danger" title="Locked"><i class="fa fa-lock"></i> <amount :value="this.address.balance.locked" /></label>
            </div>
          </div>
        </div>
        <div class="col-lg-8">
          <div class="form-group mg-b-10-force">
            <label class="form-control-label">To: <span class="tx-danger">*</span></label>
            <div class="input-group">
              <input class="form-control" type="text" name="address" v-model="transaction.to.address" placeholder="To address">
              <div class="input-group-append">
                  <div class="input-group-text"><a href="#modal" class="modal-effect btn btn-link btn-sm" data-toggle="modal" data-effect="effect-flip-vertical" style="padding: 0px"><i class="fa fa-search" /></a></div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="form-group">
            <label class="form-control-label" for="fee">Fee: <span class="tx-danger">*</span></label>
            <div class="input-group">
              <money class="form-control" name="fee" id="fee" v-model="transaction.fakeFee" placeholder=""></money>
              <div class="input-group-append">
              <div class="input-group-text">{{view.config.symbol}}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-8">
          <div class="form-group mg-b-10-force">
            <label class="form-control-label">Payment Id: <span class="tx-danger">*</span></label>
            <div class="input-group">
              <input maxlength="32" class="form-control" type="text" name="paymentId" v-model="transaction.extra.fakePaymentId" placeholder="Payment ID">
              <div class="input-group-append">
                <div class="input-group-text">
                  <button @click="newPaymentID()" class="btn btn-link" style="padding: 0px" title="Click here to generate a new Payment ID">
                    <i class="fa fa-plus-circle" />
                  </button>
                </div>
              </div>
            </div>
            <small class="form-text text-muted">{{this.transaction.extra.paymentId}}</small>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="form-group mg-b-10-force">
            <label class="form-control-label">Anonymity Level: <span class="tx-danger">*</span></label>
            <div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" v-model="transaction.extra.anonymity" name="anonymityLevel" id="anonymityLevel1" value="1">
                <label class="form-check-label" for="anonymityLevel1">1</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" v-model="transaction.extra.anonymity" name="anonymityLevel" id="anonymityLevel2" value="2">
                <label class="form-check-label" for="anonymityLevel2">2</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" v-model="transaction.extra.anonymity" name="anonymityLevel" id="anonymityLevel3" value="3">
                <label class="form-check-label" for="anonymityLevel3">3</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" v-model="transaction.extra.anonymity" name="anonymityLevel" id="anonymityLevel4" value="4">
                <label class="form-check-label" for="anonymityLevel4">4</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" v-model="transaction.extra.anonymity" name="anonymityLevel" id="anonymityLevel5" value="5">
                <label class="form-check-label" for="anonymityLevel5">5</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" v-model="transaction.extra.anonymity" name="anonymityLevel" id="anonymityLevel6" value="6">
                <label class="form-check-label" for="anonymityLevel6">6</label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="form-layout-footer">
        <button @click="sendTransaction" class="btn btn-primary bd-0">Send</button>
        <router-link :to="'/dashboard/addresses/' + this.$route.params.address" class="btn btn-secondary bd-0">Cancel</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import uuidv1 from 'uuid/v1'
import ControllerFactory from '@/lib/controllers/ControllerFactory'
import MessageBox from '@/lib/ui/MessageBox'
import Amount from '@/components/common/ui/Amount'
import Config from '@/Config'
import ContactsListModal from '@/components/pages/contacts/ContactsListModal'

export default {
  components: {
    Amount,
    ContactsListModal
  },

  data () {
    return {
      view: {
        config: Config
      },
      transaction: {
        from: this.$route.params.address,
        fakeFee: Config.minimumFee / Config.defaultUnit,
        to: {
          address: '',
          amount: 0,
          fakeAmount: 0
        },
        extra: {
          anonymity: 3,
          fakePaymentId: '',
          paymentId: ''
        }
      },
      address: {
        balance: {
          available: 0,
          locked: 0
        }
      }
    }
  },

  computed: {
    paymentIdHex () {
      if (this.transaction.extra.fakePaymentId) {
        let bufStr = Buffer.from(this.transaction.extra.fakePaymentId.padEnd(32, ' '), 'utf8')
        return bufStr.toString('hex')
      } else {
        return ''
      }
    }
  },

  watch: {
    paymentIdHex (val) {
      this.transaction.extra.paymentId = val
    }
  },

  mounted () {
    this.loadAddress()
  },

  methods: {
    newPaymentID () {
      this.transaction.extra.fakePaymentId = uuidv1().toString().replace(/-/g, '')
    },

    sendTransaction () {
      const transactionController = ControllerFactory.getController('transaction', this)
      const messageBox = new MessageBox(this)
      const self = this

      const newTransaction = JSON.parse(JSON.stringify(this.transaction))

      newTransaction.to.amount = this.transaction.to.fakeAmount * 100000000
      newTransaction.fee = this.transaction.fakeFee * 100000000
      newTransaction.changeAddress = this.transaction.from

      delete newTransaction.fakeFee
      delete newTransaction.to.fakeAmount
      delete newTransaction.extra.fakePaymentId

      transactionController.createTransaction(newTransaction)
        .then(() => {
          messageBox.showInfo('New Transaction', 'The transaction has been sent successfully', () => {
            self.$router.push('/dashboard/addresses/' + this.$route.params.address)
          })
        })
        .catch(error => {
          switch (error.error) {
            case 'ERROR_TRANSACTION_BAD_ADDRESS':
              messageBox.showError('Bad Address :(', 'The address field has an invalid value, please check if the address is correct and try again!')
              break
            case 'ERROR_TRANSACTION_WRONG_AMOUNT':
              messageBox.showError('Wrong amount :(', 'The amount of transaction is invalid, please check if you have founds and try again!')
              break
            case 'ERROR_TRANSACTION_SMALL_FEE':
              messageBox.showError('Small fee :(', 'The fee of transaction is too small, please set a fee to at least ' + Config.minimumFee / Config.defaultUnit)
              break
            default:
              switch (error.status) {
                case 422:
                  messageBox.showError('Problems :(', 'There is something wrong with you transaction, check if is everything ok and try again or send a message to our support!')
                  break
                default:
                  messageBox.showError('Problems :(', 'An unexpected error has occurred, please try again later or send a message to our support!')
                  break
              }
              break
          }
        })
    },

    loadAddress () {
      const addressController = ControllerFactory.getController('address', this)
      const self = this

      addressController.getBalance(this.transaction.from)
        .then(balance => {
          self.address.balance = balance
        })
    },

    contactSelected (contact) {
      this.transaction.to.address = contact.address
      this.transaction.extra.anonymity = contact.extra.anonymity
      this.transaction.extra.paymentId = contact.extra.paymentId
      this.transaction.to.fakeAmount = contact.amount
      this.transaction.extra.fakePaymentId = Buffer.from(contact.extra.paymentId, 'hex').toString()
    }
  }
}
</script>
