<template>
  <div class="signin-wrapper">
    <simplert :useRadius="true" :useIcon="true" ref="simplert" />
    <div class="signin-box">
      <h2 class="slim-logo slim-logo text-center"><img src="/static/img/logo-nbr.png" style="width: 100px" /></h2>
      <h3 class="signin-title-secondary">{{ $t("passwordReset.title") }}</h3>
      <div class="form-group">
        <input type="email" class="form-control" @keyup.enter="requestNewPassword()" :placeholder="$t('passwordReset.emailPlaceholder')" v-model="email">
      </div>
      <button class="btn btn-primary btn-block btn-signin" @click="requestNewPassword">{{ $t("passwordReset.newPassword") }}</button>
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
      email: ''
    }
  },
  computed: {
    isEmailValid () {
      return this.email
    }
  },

  methods: {
    requestNewPassword () {
      const messageBox = new MessageBox(this)
      const controller = ControllerFactory.getController('notification', this)

      if (!this.isEmailValid) {
        messageBox.showRequiredFieldsMessage()
      } else {
        controller.sendPasswordResetNotification(this.email)
          .then(() => {
            messageBox.showSuccess(this.$t('messages.passwordResetRequest.message'))
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
