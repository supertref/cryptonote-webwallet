<template>
  <page :title="$t('profile.title')">
    <div class="section-wrapper">
      <simplert :useIcon="true" ref="simplert" />

      <div class="form-layout">
        <div class="row mg-b-25">
          <div class="col-lg-6">
            <div class="form-group">
              <label class="form-control-label" for="name">{{$t('profile.name')}}: <span class="tx-danger">*</span></label>
              <input class="form-control" type="text" id="name" name="name" v-model="user.name" :placeholder="$t('profile.name')">
            </div>
          </div>
          <div class="col-lg-6">
            <div class="form-group">
              <label class="form-control-label" for="email">{{$t('profile.email')}}: <span class="tx-danger">*</span></label>
              <input class="form-control" type="text" id="email" name="email" v-model="user.email" :placeholder="$t('profile.email')">
            </div>
          </div>
          <div class="col-lg-6">
            <div class="form-group">
              <label class="form-control-label" for="password">{{$t('profile.password')}}: <span class="tx-danger">*</span></label>
              <input class="form-control" type="password" v-model="user.password" id="password" name="name">
            </div>
          </div>
          <div class="col-lg-6">
            <div class="form-group">
              <label class="form-control-label" for="confirmPassword">{{$t('profile.confirmPassword')}}: <span class="tx-danger">*</span></label>
              <input class="form-control" type="password" v-model="user.confirmPassword" id="confirmPassword" name="confirmPassword">
            </div>
          </div>
          <div class="col-lg-6">
            <div class="form-group mg-b-10-force">
              <label class="form-control-label" for="currencyBRL">{{$t('profile.defaultCurrency')}}: <span class="tx-danger">*</span></label>
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
          <div class="col-lg-6">
            <div class="form-group mg-b-10-force">
              <label class="form-control-label" for="languagePTBR">{{$t('profile.defaultLanguage')}}: <span class="tx-danger">*</span></label>
              <div>
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="radio" name="language" v-model="user.language" id="languagePTBR" value="pt-br">
                  <label class="form-check-label" for="languagePTBR">Português</label>
                </div>
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="radio" name="language" v-model="user.language" id="languageENUS" value="en-us">
                  <label class="form-check-label" for="languageENUS">English</label>
                </div>
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="radio" name="language" v-model="user.language" id="languageSP" value="sp">
                  <label class="form-check-label" for="languageSP">Español</label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="form-layout-footer">
          <button class="btn btn-primary bd-0" @click="save">{{$t('profile.save')}}</button>
          <router-link to="/dashboard" class="btn btn-secondary bd-0">{{$t('profile.cancel')}}</router-link>
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
import moment from 'moment'

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
      const self = this

      if (!this.isConfirmPasswordValid) {
        messageBox.showError(this.$t('messages.passwordsAreDifferent.title'), this.$t('messages.passwordsAreDifferent.message'))
      } else if (!this.isFormValid) {
        messageBox.showRequiredFieldsMessage()
      } else {
        userController.updateCurrentUser(self.user)
          .then(user => {
            self.$cookie.set('locale', self.user.language, { expires: '1Y' })
            self.$i18n.locale = self.user.language
            if (self.user.language === 'sp') {
              moment.locale('es')
            } else {
              moment.locale(self.user.language)
            }
            messageBox.showInfo(self.$t('messages.profileUpdated.title'), self.$t('messages.profileUpdated.title'))
          })
          .catch(e => {
            messageBox.showCriticalError()
          })
      }
    }
  }
}
</script>

<style scoped>
</style>
