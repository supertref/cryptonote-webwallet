import Home from '@/components/Home'

const routes = [
  {
    path: '/users/:id/confirmation/:confirmationKey',
    component: Home
  },
  {
    path: '/users/:id/password-reset/:internalKey',
    component: Home
  },
  {
    path: '/users/password-reset-request',
    component: Home
  }
]

export default { routes }
