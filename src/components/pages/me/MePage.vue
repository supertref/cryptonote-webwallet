<template>
  <page title="Profile">
    <div class="section-wrapper">
      <simplert :useIcon="true" ref="simplert" />

      <div class="form-layout">
        <div class="row mg-b-25">
          <div class="col-lg-6">
            <div class="form-group">
              <label class="form-control-label" for="name">Name: <span class="tx-danger">*</span></label>
              <input class="form-control" type="text" id="name" name="name" v-model="user.name" placeholder="Name">
            </div>
          </div>
          <div class="col-lg-6">
            <div class="form-group">
              <label class="form-control-label" for="email">Email: <span class="tx-danger">*</span></label>
              <input class="form-control" type="text" id="email" name="email" v-model="user.email" placeholder="Email">
            </div>
          </div>
          <div class="col-lg-6">
            <div class="form-group">
              <label class="form-control-label" for="password">Password: <span class="tx-danger">*</span></label>
              <input class="form-control" type="password" v-model="user.password" id="password" name="name">
            </div>
          </div>
          <div class="col-lg-6">
            <div class="form-group">
              <label class="form-control-label" for="confirmPassword">Confirm Password: <span class="tx-danger">*</span></label>
              <input class="form-control" type="password" v-model="user.confirmPassword" id="confirmPassword" name="confirmPassword">
            </div>
          </div>
          <div class="col-lg-4">
            <div class="form-group mg-b-10-force">
              <label class="form-control-label" for="currencyBRL">Default currency at home page: <span class="tx-danger">*</span></label>
              <div>
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="radio" name="currency" v-model="user.defaultCurrency" id="currencyBRL" value="BRL">
                  <label class="form-check-label" for="anonymityLevel1">BRL</label>
                </div>
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="radio" name="currency" v-model="user.defaultCurrency" id="currencyUSD" value="USD">
                  <label class="form-check-label" for="anonymityLevel2">USD</label>
                </div>
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="radio" name="currency" v-model="user.defaultCurrency" id="currencyEUR" value="EUR">
                  <label class="form-check-label" for="anonymityLevel3">EUR</label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="form-layout-footer">
          <button class="btn btn-primary bd-0" @click="save">Save</button>
          <router-link to="/dashboard" class="btn btn-secondary bd-0">Cancel</router-link>
        </div>
      </div>
    </div>
  </page>
</template>

<script>
import Page from '@/components/common/page/Page'
import Amount from '@/components/common/ui/Amount'
import ConvertCoin from '@/components/common/ui/ConvertCoin'
import ControllerFactory from '@/lib/controllers/ControllerFactory'
import MessageBox from '@/lib/ui/MessageBox'
import Util from '@/lib/Util'

export default {
  components: {
    Page,
    Amount,
    ConvertCoin
  },

  data () {
    const userController = ControllerFactory.getController('user', this)
    return {
      user: userController.getCurrentUser()
    }
  },

  computed: {
    isNameValid () {
      return Boolean(this.user.name)
    },
    isEmailValid () {
      return Boolean(this.user.email) && Util.validateEmail(this.user.email)
    },
    isConfirmPasswordValid () {
      return !this.user.password || (this.user.password === this.user.confirmPassword)
    },
    isDefaultCurrencyValid () {
      return Boolean(this.user.defaultCurrency)
    },
    isFormValid () {
      return this.isNameValid &&
             this.isEmailValid &&
             this.isConfirmPasswordValid &&
             this.isDefaultCurrencyValid
    }
  },

  methods: {
    save () {
      const userController = ControllerFactory.getController('user', this)
      const messageBox = new MessageBox(this)

      if (!this.isConfirmPasswordValid) {
        messageBox.showError('Password are different', 'The passwords must be the same!')
      } else if (!this.isFormValid) {
        messageBox.showRequiredFieldsMessage()
      } else {
        userController.updateCurrentUser(this.user)
          .then(user => {
            messageBox.showInfo('Profile updated', 'Your profile has been updated successfully')
          })
          .catch(e => {
            messageBox.showError('Problems :(', 'An unexpected error has occurred, please try again later or send a menssage to our support team!')
          })
      }
    }
  }
}
</script>

<style scoped>
</style>
