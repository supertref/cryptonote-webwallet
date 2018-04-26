<template>
  <span :title="this.parseValue()">{{this.parseValue()}}</span>
</template>

<script>
import Config from '@/Config'
import Util from '@/lib/Util'

export default {
  props: ['value', 'isFixed'],

  methods: {
    parseValue () {
      if (isNaN(this.value)) {
        return 'N/A'
      } else {
        const v = (this.value / Config.defaultUnit)
        if (this.isFixed) {
          return v.toFixed(Config.decimals).toString()
        } else {
          return v.toFixed(Util.precision(v)).toString()
        }
      }
    }
  }
}
</script>
