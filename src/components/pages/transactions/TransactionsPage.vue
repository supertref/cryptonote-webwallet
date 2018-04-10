<template>
  <page title="Transactions" :subTitle="this.view.address">
    <div class="row row-sm mg-t-20">
      <div class="col-lg-12 mg-t-20 mg-lg-t-0">
        <transactions-card :transactions="this.transactions">
          <div class="pagination-wrapper">
            <nav aria-label="Page navigation">
              <ul class="pagination mg-b-0">
                <li :class="['page-item', {active: page === view.currentPage}]" v-for="page in this.view.pages" :key="page"><a class="page-link" href="javascript:void" @click="changePage(page)">{{page}}</a></li>
              </ul>
            </nav>
          </div>
        </transactions-card>
      </div>
    </div>
  </page>
</template>

<script>
import TransactionsCard from '@/components/pages/transactions/TransactionsCard'
import Page from '@/components/common/page/Page'
import ControllerFactory from '@/lib/controllers/ControllerFactory'

export default {
  data () {
    return {
      view: {
        address: this.$route.params.address ? this.$route.params.address.substring(0, 15) + '...' + this.$route.params.address.substring(this.$route.params.address.length - 15, this.$route.params.address.length) : '',
        pages: [],
        currentPage: this.$route.query.page ? this.$route.query.page : 1
      },
      address: this.$route.params.address,
      transactions: []
    }
  },

  components: {
    TransactionsCard,
    Page
  },

  mounted () {
    this.loadTransactions()
  },

  methods: {
    changePage (page) {
      this.view.currentPage = page
      this.$router.push({query: {page: page}})
      this.loadTransactions()
    },

    loadTransactions () {
      const transactionController = ControllerFactory.getController('transaction')
      const self = this

      const pagination = {
        offset: this.view.currentPage - 1,
        limit: 10
      }

      transactionController.getTransactions(this.address, pagination)
        .then(transactions => {
          self.transactions = transactions
          const p = Math.ceil(transactions.totalCount / 10)

          self.view.pages = []
          for (let i = 1; i <= p; i++) {
            self.view.pages.push(i)
          }
        })
    }
  }
}
</script>
