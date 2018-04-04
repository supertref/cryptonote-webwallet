import NewTransactionPage from '@/components/pages/transactions/NewTransactionPage'

const routes = [
  {
    path: '/addresses/:address/transactions',
    component: NewTransactionPage
  }
]

export default { routes }
