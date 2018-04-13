<template>
  <page :title="$t('contacts.contact')">
    <contact-box v-if="item" :item="item" />
  </page>
</template>

<script>
import Page from '@/components/common/page/Page'
import ContactBox from '@/components/pages/contacts/ContactBox'
import ControllerFactory from '@/lib/controllers/ControllerFactory'

export default {
  components: {
    Page,
    ContactBox
  },

  data () {
    return {
      item: null
    }
  },

  mounted () {
    this.loadContact()
  },

  methods: {
    loadContact () {
      const contactController = ControllerFactory.getController('contact', this)
      const self = this
      contactController.getContact(this.$route.params.id)
        .then(contact => {
          self.item = contact
        })
    }
  }
}
</script>
