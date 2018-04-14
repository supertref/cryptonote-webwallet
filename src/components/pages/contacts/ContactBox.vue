<template>
  <div class="section-wrapper">
    <simplert :useIcon="true" ref="simplert" />
    <div class="row">
      <div class="col-lg-12" v-if="!this.contact.id">
        <label class="section-title">{{$t('contacts.newContact')}}</label>
        <p class="mg-b-20 mg-sm-b-40">{{$t('contacts.newContactInfo')}}</p>
      </div>
      <div class="col-lg-12" v-if="this.contact.id">
        <label class="section-title">{{$t('contacts.editContact')}}</label>
        <p class="mg-b-20 mg-sm-b-40">{{$t('contacts.editContactInfo')}}</p>
      </div>
    </div>

    <div class="form-layout">
      <div class="row mg-b-25">
        <div class="col-lg-6">
          <div class="form-group">
            <label class="form-control-label">{{$t('contacts.address')}}: <span class="tx-danger">*</span></label>
            <input class="form-control" type="text" name="from" v-model="contact.address" :placeholder="$t('contacts.address')">
          </div>
        </div>
        <div class="col-lg-6">
          <div class="form-group mg-b-10-force">
            <label class="form-control-label">{{$t('contacts.name')}}: <span class="tx-danger">*</span></label>
            <input class="form-control" type="text" name="address" v-model="contact.name" :placeholder="$t('contacts.name')">
          </div>
        </div>
        <div class="col-lg-6">
          <div class="form-group mg-b-10-force">
            <label class="form-control-label">{{$t('contacts.defaultPaymentId')}}: <span class="tx-danger">*</span></label>
            <div class="input-group">
              <input maxlength="32" class="form-control" type="text" name="paymentId" v-model="contact.extra.fakePaymentId" :placeholder="$t('contacts.defaultPaymentId')">
              <div class="input-group-append">
                <div class="input-group-text">
                  <button @click="newPaymentId()" class="btn btn-link" style="padding: 0px" title="Click here to generate a new Payment Id">
                    <i class="fa fa-plus-circle" />
                  </button>
                </div>
              </div>
            </div>
            <small class="form-text text-muted">{{this.contact.extra.paymentId}}</small>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="form-group mg-b-10-force">
            <label class="form-control-label">{{$t('contacts.defaultAnonymity')}}: <span class="tx-danger">*</span></label>
            <div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" v-model="contact.extra.anonymity" name="anonymityLevel" id="anonymityLevel0" value="0">
                <label class="form-check-label" for="anonymityLevel0">0</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" v-model="contact.extra.anonymity" name="anonymityLevel" id="anonymityLevel1" value="1">
                <label class="form-check-label" for="anonymityLevel1">1</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" v-model="contact.extra.anonymity" name="anonymityLevel" id="anonymityLevel2" value="2">
                <label class="form-check-label" for="anonymityLevel2">2</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" v-model="contact.extra.anonymity" name="anonymityLevel" id="anonymityLevel3" value="3">
                <label class="form-check-label" for="anonymityLevel3">3</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" v-model="contact.extra.anonymity" name="anonymityLevel" id="anonymityLevel4" value="4">
                <label class="form-check-label" for="anonymityLevel4">4</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" v-model="contact.extra.anonymity" name="anonymityLevel" id="anonymityLevel5" value="5">
                <label class="form-check-label" for="anonymityLevel5">5</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" v-model="contact.extra.anonymity" name="anonymityLevel" id="anonymityLevel6" value="6">
                <label class="form-check-label" for="anonymityLevel6">6</label>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="form-group">
            <label class="form-control-label" for="amount">{{$t('contacts.defaultAmount')}}: <span class="tx-danger">*</span></label>
            <div class="input-group">
              <money class="form-control" name="amount" id="amount" v-model="contact.amount" placeholder=""></money>
              <div class="input-group-append">
                  <div class="input-group-text">{{view.config.symbol}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="form-layout-footer">
        <button @click="saveContact" class="btn btn-primary bd-0">{{$t('contacts.save')}}</button>
        <router-link :to="'/contacts'" class="btn btn-secondary bd-0">{{$t('contacts.cancel')}}</router-link>
        <button v-if="this.contact.id" @click="removeContact" class="btn btn-danger bd-0 pull-right">{{$t('contacts.remove')}}</button>
      </div>
    </div>
  </div>
</template>

<script>
import uuidv1 from 'uuid/v1'
import ControllerFactory from '@/lib/controllers/ControllerFactory'
import MessageBox from '@/lib/ui/MessageBox'
import Config from '@/Config'
import Amount from '@/components/common/ui/Amount'

export default {
  components: {
    Amount
  },

  props: ['item'],

  data () {
    return {
      view: {
        config: Config
      },
      contact: {
        name: '',
        extra: {
          fakePaymentId: '',
          paymentId: '',
          anonymity: 3
        }
      }
    }
  },

  computed: {
    paymentIdHex () {
      if (this.contact.extra.fakePaymentId) {
        let bufStr = Buffer.from(this.contact.extra.fakePaymentId.padEnd(32, ' '), 'utf8')
        return bufStr.toString('hex')
      } else {
        return ''
      }
    }
  },

  watch: {
    paymentIdHex (val) {
      this.contact.extra.paymentId = val
    }
  },

  mounted () {
    this.contact.id = this.item.id
    this.contact.name = this.item.name
    this.contact.address = this.item.address
    this.contact.amount = this.item.amount
    this.contact.extra.paymentId = this.item.extra.paymentId
    this.contact.extra.anonymity = this.item.extra.anonymity
    this.contact.extra.fakePaymentId = Buffer.from(this.contact.extra.paymentId, 'hex').toString()
  },

  methods: {
    newPaymentId () {
      this.contact.extra.fakePaymentId = uuidv1().toString().replace(/-/g, '')
    },

    saveContact () {
      const contactController = ControllerFactory.getController('contact', this)
      const messageBox = new MessageBox(this)
      const self = this

      contactController.saveContact(this.contact)
        .then(() => {
          const title = !this.contact.id ? 'New Contact' : 'Contact'
          messageBox.showInfo(title, 'The contact has been saved successfully', () => {
            self.$router.push('/contacts')
          })
        })
        .catch(error => {
          alert(error)
        })
    },

    removeContact () {
      const contactController = ControllerFactory.getController('contact', this)
      const messageBox = new MessageBox(this)
      const self = this

      messageBox.confirm(this.$t('messages.removeContact.title'), this.$t('messages.removeContact.message'), () => {
        contactController.deleteContact(this.contact.id)
          .then(() => {
            messageBox.showInfo(this.$t('messages.contactRemoved.title'), this.$t('messages.contactRemoved.message'), () => {
              self.$router.push('/contacts')
            })
          })
          .catch(error => {
            alert(error)
          })
      })
    }
  }
}
</script>
