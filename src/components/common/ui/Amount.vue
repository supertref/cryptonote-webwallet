<template>
  <span :title="this.parseValue()">{{this.parseValue()}}</span>
</template>

<script>
import Config from '@/Config'

export default {
  props: ['value', 'isFixed'],

  methods: {
    parseValue () {
      if (isNaN(this.value)) {
        return 'N/A'
      } else {
        if (this.isFixed) {
          return (this.value / Config.defaultUnit).toFixed(8).toString()
        } else {
          return (this.value / Config.defaultUnit).toString()
        }
      }
    }
  }
}
</script>
