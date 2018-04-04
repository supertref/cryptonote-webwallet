<template>
  <span>
    <span v-if="address">{{ address.substring(0, 15) }}...{{ address.substring(address.length - 15, address.length) }}</span>
    <span v-if="!address">Anonymous</span>
  </span>
</template>

<script>
export default {
  props: ['address']
}
</script>
