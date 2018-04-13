<template>
  <page :title="$t('contacts.title')">
    <div class="row row-sm mg-t-20">
      <div class="col-lg-12 mg-t-20 mg-lg-t-0">
        <contacts-card :contacts="this.contacts" @reload="loadContacts()">
          <div class="pagination-wrapper">
            <nav aria-label="Page navigation">
              <ul class="pagination mg-b-0">
                <li :class="['page-item', {active: page === view.currentPage}]" v-for="page in this.view.pages" :key="page"><a class="page-link" href="javascript:void" @click="changePage(page)">{{page}}</a></li>
              </ul>
            </nav>
          </div>
        </contacts-card>
      </div>
    </div>
  </page>
</template>

<script>
import ContactsCard from '@/components/pages/contacts/ContactsCard'
import Page from '@/components/common/page/Page'
import ControllerFactory from '@/lib/controllers/ControllerFactory'

export default {
  data () {
    return {
      view: {
        pages: [],
        currentPage: this.$route.query.page ? this.$route.query.page : 1
      },
      contacts: []
    }
  },

  components: {
    ContactsCard,
    Page
  },

  mounted () {
    this.loadContacts()
  },

  methods: {
    changePage (page) {
      this.view.currentPage = page
      this.$router.push({query: {page: page}})
      this.loadContacts()
    },

    loadContacts () {
      const contactController = ControllerFactory.getController('contact')
      const self = this

      const pagination = {
        offset: this.view.currentPage - 1,
        limit: 10
      }

      contactController.getContacts(pagination)
        .then(contacts => {
          self.contacts = contacts
          const p = Math.ceil(contacts.totalCount / 10)
          self.view.pages = []
          for (let i = 1; i <= p; i++) {
            self.view.pages.push(i)
          }
        })
    }
  }
}
</script>
