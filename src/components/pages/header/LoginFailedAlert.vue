<template>
  <div class="media">
    <i class="fa fa-send text-danger"  style="font-size: 50px" />
    <div class="media-body">
      <p>{{$t('alerts.loginFailed')}}</p>
      <span>{{alert.createdAt | moment-formatted}}</span>
    </div>
  </div>
</template>
<script>
export default {
  props: ['alert']
}
</script>
