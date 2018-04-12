<template>
  <div :id="id" class="modal fade">
    <div class="modal-dialog modal-dialog-vertical-center" role="document">
      <div class="modal-content bd-0 tx-14">
        <div class="modal-header pd-y-20 pd-x-25">
          <h6 class="tx-14 mg-b-0 tx-uppercase tx-inverse tx-bold">Contacts List</h6>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body pd-25">
          <table class="table">
            <tbody>
              <tr v-for="contact in contacts" :key="contact.id">
                <td>
                  {{contact.name}}
                </td>
                <td>
                  <address-box :address="contact.address" />
                </td>
                <td>
                  <button @click="selectContact(contact)" class="btn btn-primary" data-dismiss="modal" aria-label="Close"><i class="fa fa-reply" /></button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div><!-- modal-dialog -->
  </div>
</template>

<script>
import ControllerFactory from '@/lib/controllers/ControllerFactory'
import AddressBox from '@/components/common/ui/AddressBox'

export default {
  props: ['id'],

  data () {
    return {
      contacts: []
    }
  },

  components: {
    AddressBox
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

      contactController.getContacts()
        .then(contacts => {
          self.contacts = contacts
        })
    },

    selectContact (contact) {
      this.$emit('selected', contact)
    }
  }
}
</script>
