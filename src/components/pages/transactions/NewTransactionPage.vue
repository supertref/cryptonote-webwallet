<template>
  <page :title="$t('transactions.title')">
    <transaction-box />
  </page>
</template>

<script>
import Page from '@/components/common/page/Page'
import TransactionBox from '@/components/pages/transactions/TransactionBox'

export default {
  components: {
    Page,
    TransactionBox
  }
}
</script>
