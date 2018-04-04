<template>
  <span>{{(this.value / 100000000).toFixed(8)}}</span>
</template>

<script>
export default {
  props: ['value']
}
</script>
