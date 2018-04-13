<template>
  <page :title="$t('contacts.newContact')">
    <contact-box />
  </page>
</template>

<script>
import Page from '@/components/common/page/Page'
import ContactBox from '@/components/pages/contacts/ContactBox'

export default {
  components: {
    Page,
    ContactBox
  }
}
</script>
