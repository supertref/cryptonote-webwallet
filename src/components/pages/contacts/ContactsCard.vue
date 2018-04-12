<template>
  <div>
    <div class="card card-table">
      <div class="card-header d-flex align-items-center justify-content-between">
        <h6 class="slim-card-title">Contacts</h6>
        <div class="card-option tx-24">
          <a href="javascript:void()" @click="refresh();" class="tx-gray-600 mg-l-10"><i class="icon ion-ios-refresh-empty lh-0"></i></a>
          <router-link to="/contacts/new" class="tx-gray-600 mg-l-10"><i class="icon ion-plus lh-0"></i></router-link>
        </div>
      </div>
        <div class="table-responsive">
          <contacts-table :contacts="contacts" />
        </div>
        <slot></slot>
    </div>
  </div>
</template>

<script>
import ContactsTable from '@/components/pages/contacts/ContactsTable'

export default {
  props: ['contacts'],

  components: {
    ContactsTable
  },

  methods: {
    refresh () {
      this.$emit('reload')
    }
  }
}
</script>
