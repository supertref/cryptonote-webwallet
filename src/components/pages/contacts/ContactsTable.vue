<template>
  <table class="table mg-b-0 tx-13">
    <thead>
      <tr class="tx-10">
        <th>Name</th>
        <th>Address</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="contact in contacts" :key="contact.id">
        <td>
          <router-link :to="'/contacts/' + contact.id" class="tx-inverse tx-14 tx-medium d-block">{{contact.name}}</router-link>
        </td>
        <td>
          <router-link :to="'/contacts/' + contact.id" class="tx-inverse tx-14 tx-medium d-block"><address-box :address="contact.address" /></router-link>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import AddressBox from '@/components/common/ui/AddressBox'

export default {
  props: ['contacts'],

  components: {
    AddressBox
  }
}
</script>
