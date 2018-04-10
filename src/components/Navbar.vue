<template>
  <div class="slim-navbar">
    <div class="container">
      <ul class="nav">
        <li :class="['nav-item', {active: isHome}]">
          <router-link to="/" class="nav-link">
            <i class="icon ion-ios-home-outline"></i>
            <span>Dashboard</span>
          </router-link>
        </li>
        <li :class="['nav-item', {active: isTransactions}]">
          <router-link to="/addresses/transactions" class="nav-link">
            <i class="icon ion-ios-filing-outline"></i>
            <span>Transactions</span>
          </router-link>
        </li>
        <li :class="['nav-item', {active: isContacts}]">
          <a class="nav-link" href="#">
            <i class="icon ion-ios-book-outline"></i>
            <span>Contacts</span>
          </a>
        </li>
        <li :class="['nav-item', {active: isSettings}]">
          <a class="nav-link" href="#" data-toggle="dropdown">
            <i class="icon ion-ios-gear-outline"></i>
            <span>Settings</span>
          </a>
        </li>
      </ul>
    </div><!-- container -->
  </div><!-- slim-navbar -->
</template>

<script>
export default {
  props: ['user'],

  computed: {
    isHome () {
      return this.$route.path === '/' ||
             this.$route.path.startsWith('/dashboard')
    },

    isTransactions () {
      return this.$route.path.startsWith('/addresses/transactions') ||
             this.$route.path.startsWith('/transactions') ||
             this.$route.path.endsWith('/transactions/new')
    }
  }
}
</script>
