<template>
  <div class="card card-table">
    <div class="card-header">
      <h6 class="slim-card-title">Transaction History</h6>
    </div>
    <div class="table-responsive">
      <transactions-table :transactions="transactions" />
    </div>
    <slot></slot>
  </div>
</template>

<script>
import TransactionsTable from '@/components/pages/transactions/TransactionsTable'

export default {
  props: ['transactions'],

  components: {
    TransactionsTable
  }
}
</script>
