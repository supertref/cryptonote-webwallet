<template>
  <div class="dropdown dropdown-b">
    <a href="#" class="header-notification" data-toggle="dropdown">
      <i class="icon ion-ios-bell-outline"></i>
      <span v-if="isNewAlerts" class="indicator"></span>
    </a>
    <div class="dropdown-menu">
      <div class="dropdown-menu-header">
        <h6 class="dropdown-menu-title">{{$t('menu.notifications')}}</h6>
      </div>
      <div class="dropdown-list">
        <alert v-for="alert in alerts" :key="alert.id" :alert="alert" />
      </div>
    </div>
  </div>
</template>

<script>
import Alert from '@/components/pages/header/Alert'

export default {
  props: ['alerts', 'isNewAlerts'],
  components: {
    Alert
  }
}
</script>
