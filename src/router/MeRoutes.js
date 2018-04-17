import MePage from '@/components/pages/me/MePage'
import SettingsPage from '@/components/pages/me/SettingsPage'

const routes = [
  {
    path: '/me',
    component: MePage
  },
  {
    path: '/settings',
    component: SettingsPage
  }
]

export default { routes }
