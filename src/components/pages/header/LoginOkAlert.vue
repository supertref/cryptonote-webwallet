<template>
  <div class="media">
    <i class="fa fa-send text-success"  style="font-size: 50px" />
    <div class="media-body">
      <p>{{$t('alerts.loginOk')}}</p>
      <span>{{alert.createdAt | moment-formatted}}</span>
    </div>
  </div>
</template>
<script>
export default {
  props: ['alert']
}
</script>
