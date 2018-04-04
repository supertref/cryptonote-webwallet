import Home from '@/components/Home'

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/dashboard/addresses/:address',
    component: Home
  }
]

export default { routes }
