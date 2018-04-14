<template>
  <div class="signin-wrapper">
    <simplert :useRadius="true" :useIcon="true" ref="simplert" />
    <div class="signin-box signup">
      <h2 class="slim-logo slim-logo text-center"><img src="/static/img/logo-nbr.png" style="width: 100px" /></h2>
      <h3 class="signin-title-primary">Get Started!</h3>
      <h5 class="signin-title-secondary lh-4">It's free to signup and only takes a minute.</h5>
      <div class="row row-xs mg-b-10">
        <div class="col-sm"><input type="text" class="form-control" v-model="user.name" placeholder="Name"></div>
      </div>
      <div class="row row-xs mg-b-10">
        <div class="col-sm"><input type="email" class="form-control" v-model="user.email" placeholder="Email"></div>
        <div class="col-sm mg-t-10 mg-sm-t-0"><input type="password" v-model="user.password" class="form-control" placeholder="Password"></div>
      </div>
      <div class="mg-b-50">
        <vue-recaptcha
          ref="recaptcha"
          @verify="onVerify"
          @expired="onExpired"
          :sitekey="this.sitekey">
        </vue-recaptcha>
      </div>
      <button class="btn btn-primary btn-block btn-signin" @click="createUser">Sign Up</button>
      <p class="mg-t-40 mg-b-0">Already have an account? <router-link to="/login">Sign In</router-link></p>
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
        password: ''
      },
      view: {
        isRECaptchaValid: false
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
      } else if (!this.isRECaptchaValid) {
        messageBox.showWarning(this.$t('messages.reCAPTCHA.title'), this.$t('messages.reCAPTCHA.message'))
      } else {
        controller.createUser(this.user)
          .then(() => {
            self.$router.push('/')
          })
          .catch(error => {
            console.log(error)
            switch (error.status) {
              case 409:
                messageBox.showError(this.$('messages.invalidEmail.title'), this.$('messages.invalidEmail.message'))
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
