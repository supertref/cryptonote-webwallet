import NewTransactionPage from '@/components/pages/transactions/NewTransactionPage'
import TransactionPage from '@/components/pages/transactions/TransactionPage'
import TransactionsPage from '@/components/pages/transactions/TransactionsPage'

const routes = [
  {
    path: '/addresses/:address/transactions/new',
    component: NewTransactionPage
  },
  {
    path: '/transactions/:id',
    component: TransactionPage
  },
  {
    path: '/addresses/:address/transactions',
    component: TransactionsPage
  },
  {
    path: '/addresses/transactions',
    component: TransactionsPage
  }
]

export default { routes }
