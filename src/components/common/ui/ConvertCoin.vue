<template>
  <span v-if="this.view.converted" :title="this.value">{{this.value}}</span>
</template>

<script>
import ControllerFactory from '@/lib/controllers/ControllerFactory'
import Config from '@/Config'
import Util from '@/lib/Util'

export default {
  props: ['amount', 'to', 'decimals'],

  data () {
    return {
      value: 0,
      view: {
        converted: false
      }
    }
  },

  mounted () {
    this.convert()
  },

  methods: {
    convert () {
      const tickerController = ControllerFactory.getController('ticker', this)
      const self = this

      tickerController.convert(Config.symbol, this.to, this.amount / Config.defaultUnit)
        .then(conversion => {
          self.value = conversion.price.toFixed(Util.precision(conversion.price))
          self.view.converted = true
        })
    }
  }
}
</script>
