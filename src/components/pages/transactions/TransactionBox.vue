<template>
  <div class="section-wrapper">
    <simplert :useIcon="true" ref="simplert" />
    <contacts-list-modal id="modal" @selected="contactSelected" />
    <div class="row">
      <div class="col-lg-8">
        <label class="section-title">{{$t('transactions.title')}}</label>
        <p class="mg-b-20 mg-sm-b-40">{{$t('transactions.newTransactionInfo')}}</p>
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
            <label class="form-control-label">{{$t('common.from')}}: <span class="tx-danger">*</span></label>
            <addresses-list :hideAllAddressOption="true" :useShortAddress="true" :addresses="this.addresses" @changed="changeAddress" :selectedAddress="this.transaction.from" />
          </div>
        </div>
        <div class="col-lg-4">
          <div class="form-group">
            <label class="form-control-label" for="amount">{{$t('common.amount')}}: <span class="tx-danger">*</span></label>
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
            <label class="form-control-label">{{$t('common.to')}}: <span class="tx-danger">*</span></label>
            <div class="input-group">
              <input class="form-control" type="text" name="address" v-model="transaction.to.address" :placeholder="$t('transactions.toPlaceholder')">
              <div class="input-group-append">
                  <div class="input-group-text"><a href="#modal" class="modal-effect btn btn-link btn-sm" data-toggle="modal" data-effect="effect-flip-vertical" style="padding: 0px"><i class="fa fa-search" /></a></div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="form-group">
            <label class="form-control-label" for="fee">{{$t('common.fee')}}: <span class="tx-danger">*</span></label>
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
            <label class="form-control-label">{{$t('common.paymentId')}}:</label>
            <div class="input-group">
              <input :maxlength="this.view.paymentIdType === 1 ? 32:64" class="form-control" type="text" name="paymentId" v-model="transaction.extra.paymentId" :placeholder="$t('transactions.paymentIdPlaceholder')">
              <div class="input-group-append">
                <div class="input-group-text">
                  <div class="dropdown">
                    <button type="button" style="padding: 0px" class="btn btn-link dropdown-toggle" data-toggle="dropdown">
                    </button>
                    <div class="dropdown-menu">
                      <a class="dropdown-item" href="javascript:void(0)" @click="setPaymentIdType(1)">{{$t('transactions.plainText')}} <i v-if="this.view.paymentIdType === 1" class="fa fa-check-circle"/></a>
                      <a class="dropdown-item" href="javascript:void(0)" @click="setPaymentIdType(2)">{{$t('transactions.hex')}} <i v-if="this.view.paymentIdType === 2" class="fa fa-check-circle"/></a>
                      <div class="dropdown-divider"></div>
                      <a class="dropdown-item" href="javascript:void(0)" @click="newPaymentID()">{{$t('transactions.generatePaymentId')}}</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <small class="form-text text-muted" v-if="this.view.paymentIdType === 2">{{this.paymentIdPlainText}}</small>
            <small class="form-text text-muted" v-if="this.view.paymentIdType === 1">{{this.paymentIdHex}}</small>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="form-group mg-b-10-force">
            <label class="form-control-label">{{$t('common.anonymity')}}: <span class="tx-danger">*</span></label>
            <div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" v-model="transaction.extra.anonymity" name="anonymityLevel" id="anonymityLevel0" value="0">
                <label class="form-check-label" for="anonymityLevel0">0</label>
              </div>
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
        <button @click="sendTransaction" class="btn btn-primary bd-0">{{$t('transactions.send')}}</button>
        <router-link :to="'/dashboard/addresses/' + this.$route.params.address" class="btn btn-secondary bd-0">{{$t('common.cancel')}}</router-link>
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
import AddressesList from '@/components/pages/home/AddressesList'

export default {
  components: {
    Amount,
    ContactsListModal,
    AddressesList
  },

  data () {
    return {
      view: {
        config: Config,
        paymentIdType: 1
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
          anonymity: 1,
          fakePaymentId: '',
          paymentId: ''
        }
      },
      addresses: [],
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
      if (this.transaction.extra.paymentId) {
        return Buffer.from(this.transaction.extra.paymentId.substring(0, 32).padEnd(32, ' '), 'utf8').toString('hex')
      } else {
        return ''
      }
    },

    paymentIdPlainText () {
      if (this.transaction.extra.paymentId) {
        return Buffer.from(this.transaction.extra.paymentId, 'hex').toString()
      } else {
        return ''
      }
    }
  },

  mounted () {
    this.loadAddressInfo()
    this.loadAddresses()
  },

  methods: {
    setPaymentIdType (type) {
      this.transaction.extra.paymentId = ''
      this.view.paymentIdType = type
    },

    newPaymentID () {
      const paymentId = uuidv1().toString().replace(/-/g, '')

      if (this.view.paymentIdType === 1) {
        this.transaction.extra.paymentId = paymentId
      } else {
        this.transaction.extra.paymentId = Buffer.from(paymentId, 'utf8').toString('hex')
      }
    },

    changeAddress (item) {
      if (item) {
        this.transaction.from = item.address
      } else {
        this.transaction.from = null
      }

      this.loadAddressInfo()
    },

    sendTransaction () {
      const transactionController = ControllerFactory.getController('transaction', this)
      const messageBox = new MessageBox(this)
      const self = this

      const newTransaction = JSON.parse(JSON.stringify(this.transaction))

      newTransaction.to.amount = parseInt(this.transaction.to.fakeAmount * Config.defaultUnit)
      newTransaction.fee = parseInt(this.transaction.fakeFee * Config.defaultUnit)
      newTransaction.changeAddress = this.transaction.from
      newTransaction.extra.anonymity = parseInt(this.transaction.extra.anonymity)

      if (this.view.paymentIdType === 1) {
        newTransaction.extra.paymentId = Buffer.from(this.transaction.extra.fakePaymentId.padEnd(32, ' '), 'utf8').toString('hex')
      }

      delete newTransaction.fakeFee
      delete newTransaction.to.fakeAmount
      delete newTransaction.extra.fakePaymentId

      if (!newTransaction.from || !newTransaction.to.address) {
        messageBox.showRequiredFieldsMessage()
      } else {
        transactionController.createTransaction(newTransaction)
          .then(() => {
            messageBox.showInfo(self.$t('messages.newTransaction.title'), 'The transaction has been sent successfully', () => {
              self.$router.push('/dashboard/addresses/' + this.$route.params.address)
            })
          })
          .catch(error => {
            switch (error.error) {
              case 'ERROR_TRANSACTION_BAD_ADDRESS':
                messageBox.showError(self.$t('messages.badAddress.title'), self.$t('messages.badAddress.message'))
                break
              case 'ERROR_TRANSACTION_WRONG_AMOUNT':
                messageBox.showError(self.$t('messages.wrongAmount.title'), self.$t('messages.wrongAmount.message'))
                break
              case 'ERROR_TRANSACTION_SMALL_FEE':
                messageBox.showError(self.$t('messages.smallFee.title'), self.$t('messages.smallFee.message', {minimumFee: Config.minimumFee / Config.defaultUnit}))
                break
              default:
                switch (error.status) {
                  case 409:
                  case 422:
                    messageBox.showError(self.$t('messages.invalidTransaction.title'), self.$t('messages.invalidTransaction.message'))
                    break
                  default:
                    messageBox.showCriticalError()
                    break
                }
                break
            }
          })
      }
    },

    loadAddresses () {
      const addressController = ControllerFactory.getController('address', this)

      addressController.getAddresses(true)
        .then(addresses => {
          this.addresses = addresses
        })
    },

    loadAddressInfo () {
      const addressController = ControllerFactory.getController('address', this)

      addressController.getBalance(this.transaction.from)
        .then(balance => {
          this.address.balance = balance
        })
    },

    contactSelected (contact) {
      this.transaction.to.address = contact.address
      this.transaction.extra.anonymity = contact.extra.anonymity
      this.transaction.to.fakeAmount = contact.amount

      if (contact.extra.paymentId && !this.transaction.extra.paymentId) {
        this.view.paymentIdType = 1
        this.transaction.extra.paymentId = Buffer.from(contact.extra.paymentId, 'hex').toString()
      }
    }
  }
}
</script>
