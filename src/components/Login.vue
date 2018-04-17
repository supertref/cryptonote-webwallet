<template>
  <div class="signin-wrapper">
    <simplert :useRadius="true" :useIcon="true" ref="simplert" />
    <div class="signin-box">
      <h2 class="slim-logo slim-logo text-center"><img src="/static/img/logo-nbr.png" style="width: 100px" /></h2>
      <h3 class="signin-title-secondary" v-if="!view.isVerification">{{ $t("login.hello") }}</h3>
      <h3 class="signin-title-secondary" v-if="view.isVerification">{{$t('login.verified')}}</h3>
      <div class="form-group">
        <input type="email" class="form-control" @keyup.enter="login()" :placeholder="$t('login.emailPlaceholder')" v-model="user.email">
      </div>
      <div class="form-group">
        <input type="password" class="form-control" @keyup.enter="login()" :placeholder="$t('login.passwordPlaceholder')" v-model="user.password">
      </div>
      <div class="form-group">
        <input type="text" class="form-control" @keyup.enter="login()" :placeholder="$t('login.twoFactorAuthTokenPlaceholder')" v-model="user.twoFactorAuthToken">
      </div>
      <div class="mg-b-50">
        <vue-recaptcha
          ref="recaptcha"
          @verify="onVerify"
          @expired="onExpired"
          :sitekey="this.sitekey">
        </vue-recaptcha>
      </div>
      <button class="btn btn-primary btn-block btn-signin" @click="login">{{ $t("login.signIn") }}</button>
      <p class="mg-b-0">{{ $t("login.createAccount") }} <router-link to="/signup">{{ $t("login.signUp") }}</router-link></p>
      <p class="mg-b-0">{{ $t("login.lostPassword") }} <router-link to="/users/password-reset-request">{{ $t("login.resetPasswordRequest") }}</router-link></p>
    </div>
  </div>
</template>

<script>
import ControllerFactory from '@/lib/controllers/ControllerFactory'
import VueRecaptcha from 'vue-recaptcha'
import MessageBox from '@/lib/ui/MessageBox'
import Config from '@/Config'

export default {
  components: {
    VueRecaptcha
  },

  data: function () {
    return {
      sitekey: Config.reCAPTCHA.sitekey,
      validateFields: false,
      user: {
        email: '',
        password: '',
        twoFactorAuthToken: ''
      },
      view: {
        isLogging: false,
        isLogOut: this.$route.path === '/logout',
        isRECaptchaValid: false,
        isVerification: this.$route.path.includes('/users') &&
                        this.$route.path.includes('/confirmation')
      }
    }
  },
  computed: {
    isFormValid () {
      return this.user.email &&
        this.user.password
    },
    isEmailValid () {
      return !(this.validateFields && !this.user.email)
    },
    isPasswordValid () {
      return !(this.validateFields && !this.user.password)
    }
  },

  mounted () {
    if (this.view.isLogOut) {
      const controller = ControllerFactory.getController('user', this)
      controller.logout()
    }

    if (this.view.isVerification) {
      this.confirmUser()
    }
  },

  methods: {
    onVerify: function (response) {
      this.isRECaptchaValid = response.length > 0
    },

    confirmUser () {
      const controller = ControllerFactory.getController('user', this)
      controller.confirmUser(this.$route.params.id, this.$route.params.confirmationKey)
    },

    login () {
      this.validateFields = true
      const self = this
      const messageBox = new MessageBox(this)
      const controller = ControllerFactory.getController('user', this)

      if (!this.isFormValid) {
        messageBox.showRequiredFieldsMessage()
      } else if (!this.isRECaptchaValid) {
        messageBox.showWarning(this.$t('messages.reCAPTCHA.title'), this.$t('messages.reCAPTCHA.message'))
      } else {
        self.view.isLogging = true
        controller.login(this.user.email, this.user.password, this.user.twoFactorAuthToken)
          .then(() => {
            self.view.isLogging = false
            self.$router.push('/')
          })
          .catch(error => {
            self.view.isLogging = false
            console.log(error)
            switch (error.status) {
              case 404:
                messageBox.showError(this.$t('messages.invalidCredentials.title'), this.$t('messages.invalidCredentials.message'))
                break
              default:
                messageBox.showCriticalError()
            }
          })
      }
    }
  }
}
</script>
