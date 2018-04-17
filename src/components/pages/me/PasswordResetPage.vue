<template>
  <div class="signin-wrapper">
    <simplert :useRadius="true" :useIcon="true" ref="simplert" />
    <div class="signin-box">
      <h2 class="slim-logo slim-logo text-center"><img src="/static/img/logo-nbr.png" style="width: 100px" /></h2>
      <h3 class="signin-title-secondary">{{ $t("passwordReset.title") }}</h3>
      <div class="form-group">
        <input type="password" class="form-control" @keyup.enter="newPassword()" :placeholder="$t('passwordReset.passwordPlaceholder')" v-model="password">
      </div>
      <button class="btn btn-primary btn-block btn-signin" @click="newPassword">{{ $t("passwordReset.newPassword") }}</button>
      <p class="mg-b-0">{{ $t("login.createAccount") }} <router-link to="/signup">{{ $t("login.signUp") }}</router-link></p>
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
      password: ''
    }
  },
  computed: {
    isPasswordValid () {
      return this.password
    }
  },

  methods: {
    newPassword () {
      const messageBox = new MessageBox(this)
      const controller = ControllerFactory.getController('user', this)

      if (!this.isPasswordValid) {
        messageBox.showRequiredFieldsMessage()
      } else {
        controller.resetPassword(this.$route.params.id, this.$route.params.internalKey, this.password)
          .then(() => {
            messageBox.showSuccess(this.$t('message.passwordReset.message'), () => {
              this.$router.push('/login')
            })
          })
          .catch(error => {
            switch (error.status) {
              case 404:
                messageBox.showError(this.$t('messages.userNotFound.title'), this.$t('messages.userNotFound.message'))
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
