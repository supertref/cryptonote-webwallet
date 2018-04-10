<template>
  <span :title="this.parseValue()">{{this.parseValue()}}</span>
</template>

<script>
export default {
  props: ['value', 'isFixed'],

  methods: {
    parseValue () {
      if (isNaN(this.value)) {
        return 'N/A'
      } else {
        if (this.isFixed) {
          return (this.value / 100000000).toFixed(8).toString()
        } else {
          return (this.value / 100000000).toString()
        }
      }
    }
  }
}
</script>
