<template>
  <div>
    <loading :isLoading="view.isLoading" />
    <master v-if="this.view.show && this.isMaster" :user="this.user" />
    <login v-if="this.view.show && this.isLogin" />
    <sign-up v-if="this.view.show && this.isSignUp" />
    <confirmation v-if="this.view.show && this.isConfirmation" />
  </div>
</template>

<script>
import ControllerFactory from '@/lib/controllers/ControllerFactory'
import Loading from '@/components/common/ui/Loading'
import Master from '@/components/Master'
import Login from '@/components/Login'
import Confirmation from '@/components/pages/me/Confirmation'
import SignUp from '@/components/SignUp'
import EventBus from '@/lib/EventBus'
import Thread from '@/lib/Thread'
import Config from '@/Config'

export default {
  name: 'App',
  components: {
    Master,
    Login,
    SignUp,
    Loading,
    Confirmation
  },

  data () {
    const userController = ControllerFactory.getController('user', this)

    return {
      user: userController.getCurrentUser(),
      isLoggedOn: userController.getCurrentUser() != null,
      view: {
        show: false,
        isLoading: true
      }
    }
  },

  computed: {
    isLogin () {
      return this.$route.path === '/login' ||
             (this.$route.path !== '/signup' && !this.isConfirmation && !this.isLoggedOn)
    },

    isSignUp () {
      return this.$route.path === '/signup'
    },

    isMaster () {
      return !this.isLogin && !this.isSignUp && !this.isConfirmation
    },

    isConfirmation () {
      return this.$route.path.includes('/users') &&
             this.$route.path.includes('/confirmation')
    }
  },

  created () {
    let recaptchaScript = document.createElement('script')
    const locale = this.$cookie.get('locale') || Config.defaultLocale
    recaptchaScript.setAttribute('src', `https://www.google.com/recaptcha/api.js?hl=${locale}&onload=vueRecaptchaApiLoaded&render=explicit`)
    document.head.appendChild(recaptchaScript)
  },

  mounted () {
    var self = this

    self.$i18n.locale = self.$cookie.get('locale') || Config.defaultLocale

    this.thread = new Thread('checkUser', 5 * 60 * 1000, () => {
      self.checkUser()
    })

    self.checkUser()
      .then(() => {
        self.thread.start()
        self.view.show = true
        self.view.isLoading = false
      })

    EventBus.$on('new-user', user => {
      self.user = user
      self.isLoggedOn = user != null
    })

    EventBus.$on('loading', isLoading => {
      self.view.isLoading = isLoading
    })
  },

  methods: {
    checkUser () {
      if (this.isLoggedOn) {
        const self = this
        const userController = ControllerFactory.getController('user', this)

        return userController.getCurrentUserFromServer()
          .then(user => {
            self.isLoggedOn = user != null
            self.user = user

            if (!user) {
              userController.logout()
            }
          })
          .catch(() => {
            userController.logout()
          })
      } else {
        return Promise.resolve()
      }
    }
  },

  destroyed () {
    this.thread.stop()
  }
}
</script>
