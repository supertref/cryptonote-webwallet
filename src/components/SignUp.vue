<template>
  <div class="signin-wrapper">
    <simplert :useRadius="true" :useIcon="true" ref="simplert" />
    <div class="signin-box signup">
      <h2 class="slim-logo slim-logo text-center"><img src="/static/img/logo-nbr.png" style="width: 100px" /></h2>
      <h3 class="signin-title-primary">{{$t('signUp.title')}}</h3>
      <h5 class="signin-title-secondary lh-4">{{$t('signUp.message')}}</h5>
      <div class="row row-xs mg-b-10">
        <div class="col-sm"><input type="text" name="name" class="form-control" v-model="user.name" :placeholder="$t('signUp.namePlaceholder')"></div>
      </div>
      <div class="row row-xs mg-b-10">
        <div class="col-sm"><input type="email" name="email" class="form-control" v-model="user.email" :placeholder="$t('signUp.emailPlaceholder')"></div>
      </div>
      <div class="row row-xs mg-b-10">
        <div class="col-sm"><vue-password v-model="user.password" :strengthMessages="$t('signUp.strengthMessages').split(',')" :placeholder="$t('signUp.passwordPlaceholder')" classes="form-control" /></div>
        <div class="col-sm"><input type="password" v-model="user.passwordConfirm" name="password-confirm" :placeholder="$t('signUp.passwordConfirmPlaceholder')" class="form-control"></div>
      </div>
      <div class="mg-b-50">
        <vue-recaptcha
          ref="recaptcha"
          @verify="onVerify"
          :sitekey="this.sitekey">
        </vue-recaptcha>
      </div>
      <button class="btn btn-primary btn-block btn-signin" @click="createUser">{{$t('signUp.signUp')}}</button>
      <p class="mg-t-40 mg-b-0">{{$t('signUp.alreayHaveAccount')}} <router-link to="/login">{{$t('signUp.signIn')}}</router-link></p>
    </div>
  </div>
</template>

<script>
import ControllerFactory from '@/lib/controllers/ControllerFactory'
import VueRecaptcha from 'vue-recaptcha'
import MessageBox from '@/lib/ui/MessageBox'
import Config from '@/Config'
import Util from '@/lib/Util'
import VuePassword from 'vue-password'

export default {
  components: {
    VueRecaptcha,
    VuePassword
  },

  data: function () {
    return {
      sitekey: Config.reCAPTCHA.sitekey,
      user: {
        email: '',
        password: ''
      },
      view: {
        isRECaptchaValid: false
      }
    }
  },
  computed: {
    isFormValid () {
      return this.isEmailValid &&
        this.isPasswordValid &&
        this.isPasswordConfirmValid
    },
    isEmailValid () {
      return this.user.email && Util.validateEmail(this.user.email)
    },
    isPasswordValid () {
      return this.user.password
    },
    isPasswordConfirmValid () {
      return this.user.passwordConfirm
    },
    isPasswordOk () {
      return this.user.password === this.user.passwordConfirm
    }
  },

  mounted () {
    if (this.view.isLogOut) {
      const controller = ControllerFactory.getController('user', this)
      controller.logout()
    }
  },

  methods: {
    onVerify: function (response) {
      this.isRECaptchaValid = response.length > 0
    },

    createUser () {
      this.validateFields = true
      const self = this
      const messageBox = new MessageBox(this)
      const controller = ControllerFactory.getController('user', this)

      if (!this.isFormValid) {
        messageBox.showRequiredFieldsMessage()
      } else if (!this.isPasswordOk) {
        messageBox.showWarning(this.$t('messages.passwordsAreDifferent.title'), this.$t('messages.passwordsAreDifferent.message'))
      } else if (!this.isRECaptchaValid) {
        messageBox.showWarning(this.$t('messages.reCAPTCHA.title'), this.$t('messages.reCAPTCHA.message'))
      } else {
        controller.createUser(this.user)
          .then(() => {
            self.$router.push('/')
          })
          .catch(error => {
            switch (error.status) {
              case 409:
                if (error.body.error === 'MAXIMUM_USERS_EXCEEDED') {
                  messageBox.showError(this.$t('messages.maximumUsersExceeded.title'), this.$t('messages.maximumUsersExceeded.message'))
                } else {
                  messageBox.showError(this.$t('messages.invalidEmail.title'), this.$t('messages.invalidEmail.message'))
                }
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

<style>
.VuePassword__Message {
  text-transform: lowercase !important;
}
</style>
