<template>
  <div class="signin-wrapper">
    <simplert :useRadius="true" :useIcon="true" ref="simplert" />
    <div class="signin-box">
      <h2 class="slim-logo"><a href="index.html">slim<span>.</span></a></h2>
      <h2 class="signin-title-primary">Welcome back!</h2>
      <h3 class="signin-title-secondary">Sign in to continue.</h3>

      <div class="form-group">
        <input type="text" class="form-control" placeholder="Enter your email" v-model="user.email">
      </div>
      <div class="form-group mg-b-50">
        <input type="password" class="form-control" placeholder="Enter your password" v-model="user.password">
      </div>
      <button class="btn btn-primary btn-block btn-signin" @click="login">Sign In</button>
      <p class="mg-b-0">Don't have an account? <router-link to="/signup">Sign Up</router-link></p>
    </div>
  </div>
</template>

<script>
import ControllerFactory from '@/lib/controllers/ControllerFactory'
import MessageBox from '@/lib/ui/MessageBox'

export default {
  data: function () {
    return {
      validateFields: false,
      user: {
        email: '',
        password: ''
      },
      view: {
        isLogging: false,
        isLogOut: this.$route.path === '/logout'
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

    login () {
      this.validateFields = true
      const self = this
      const messageBox = new MessageBox(this)
      const controller = ControllerFactory.getController('user', this)

      if (!this.isFormValid) {
        messageBox.showRequiredFieldsMessage()
      } else {
        self.view.isLogging = true
        controller.login(this.user.email, this.user.password)
          .then(() => {
            self.view.isLogging = false
            self.$router.push('/')
          })
          .catch(error => {
            self.view.isLogging = false
            console.log(error)
            switch (error.status) {
              case 404:
                messageBox.showError('Login inválido!', 'Não foi possível acessar a plataforma com as credenciais informadas.')
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
