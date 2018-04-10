<template>
  <table class="table mg-b-0 tx-13">
    <thead>
      <tr class="tx-10">
        <th>From</th>
        <th>To</th>
        <th width="20%">Amount</th>
        <th width="20%">Date</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="transaction in transactions" :key="transaction.id">
        <td>
          <router-link :to="'/transactions/' + transaction.id" class="tx-inverse tx-14 tx-medium d-block"><address-box :address="transaction.from" /></router-link>
        </td>
        <td>
          <router-link :to="'/transactions/' + transaction.id" class="tx-inverse tx-14 tx-medium d-block"><address-box :address="transaction.to.address" /></router-link>
        </td>
        <td>
          <span v-if="transaction.amount < 0" class="tx-danger"><i class="icon ion-android-arrow-down mg-r-5"></i><amount :value="transaction.amount" /></span>
          <span v-if="transaction.amount >= 0" class="tx-success"><i class="icon ion-android-arrow-up mg-r-5"></i><amount :value="transaction.amount" /></span>

          <span class="tx-11 d-block" v-if="transaction.status === 2"><span class="square-8 bg-info mg-r-5 rounded-circle"></span>Confirmed</span>
          <span class="tx-11 d-block" v-if="transaction.status !== 2"><span class="square-8 bg-warning mg-r-5 rounded-circle"></span>Waiting confirmation</span>
        </td>
        <td>{{transaction.createdAt | moment-from}}
        <span class="tx-11 d-block">{{transaction.createdAt | moment-formatted}}</span></td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import Amount from '@/components/common/ui/Amount'
import AddressBox from '@/components/common/ui/AddressBox'

export default {
  props: ['transactions'],

  components: {
    Amount,
    AddressBox
  }
}
</script>
