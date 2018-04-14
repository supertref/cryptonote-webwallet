<template>
  <a class="dropdown-link">
    <login-ok-alert v-if="alert.type==='LOGIN_OK'" :alert="alert" />
    <login-failed-alert v-if="alert.type==='LOGIN_FAILED'" :alert="alert" />
    <transaction-alert v-if="alert.type==='TRANSACTION_NEW' || alert.type==='TRANSACTION_CONFIRMED'" :alert="alert" />
  </a>
</template>

<script>
import LoginOkAlert from '@/components/pages/header/LoginOkAlert'
import LoginFailedAlert from '@/components/pages/header/LoginFailedAlert'
import TransactionAlert from '@/components/pages/header/TransactionAlert'

export default {
  props: ['alert'],

  components: {
    LoginOkAlert,
    LoginFailedAlert,
    TransactionAlert
  }
}
</script>
