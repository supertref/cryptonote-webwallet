import NewContactPage from '@/components/pages/contacts/NewContactPage'
import ContactPage from '@/components/pages/contacts/ContactPage'
import ContactsPage from '@/components/pages/contacts/ContactsPage'

const routes = [
  {
    path: '/contacts/new',
    component: NewContactPage
  },
  {
    path: '/contacts/:id',
    component: ContactPage
  },
  {
    path: '/contacts',
    component: ContactsPage
  }
]

export default { routes }
