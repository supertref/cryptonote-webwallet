<template>
  <div class="slim-navbar">
    <div class="container">
      <ul class="nav">
        <li :class="['nav-item', {active: isHome}]">
          <router-link to="/" class="nav-link">
            <i class="icon ion-ios-home-outline"></i>
            <span>{{$t('menu.dashboard')}}</span>
          </router-link>
        </li>
        <li :class="['nav-item', {active: isSend}]">
          <router-link to="/transactions/new" class="nav-link">
            <i class="icon ion ion-paper-airplane"></i>
            <span>{{$t('menu.send')}}</span>
          </router-link>
        </li>
        <li :class="['nav-item', {active: isTransactions}]">
          <router-link to="/addresses/transactions" class="nav-link">
            <i class="icon ion-ios-filing-outline"></i>
            <span>{{$t('menu.transactions')}}</span>
          </router-link>
        </li>
        <li :class="['nav-item', {active: isContacts}]">
          <router-link to="/contacts" class="nav-link">
            <i class="icon ion-ios-book-outline"></i>
            <span>{{$t('menu.contacts')}}</span>
          </router-link>
        </li>
        <li :class="['nav-item', {active: isSettings}]">
          <router-link to="/settings" class="nav-link">
            <i class="icon ion-ios-gear-outline"></i>
            <span>{{$t('menu.settings')}}</span>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: ['user'],

  computed: {
    isHome () {
      return this.$route.path === '/' ||
             this.$route.path.startsWith('/dashboard')
    },

    isSend () {
      return this.$route.path.endsWith('/transactions/new')
    },

    isTransactions () {
      return this.$route.path.startsWith('/addresses/transactions') ||
             this.$route.path === '/transactions'
    },

    isContacts () {
      return this.$route.path.startsWith('/contacts')
    },

    isSettings () {
      return this.$route.path.startsWith('/settings') ||
             this.$route.path.startsWith('/me')
    }
  }
}
</script>
