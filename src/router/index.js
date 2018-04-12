import Vue from 'vue'
import Router from 'vue-router'

import Base from './BaseRoutes'
import Dashboard from './DashboardRoutes'
import TransactionRoutes from './TransactionRoutes'
import ContactRoutes from './ContactRoutes'
import MeRoutes from './MeRoutes'
import UserRoutes from './UserRoutes'

var config = {
  routes: []
}

config.routes = config.routes.concat(Base.routes)
config.routes = config.routes.concat(Dashboard.routes)
config.routes = config.routes.concat(TransactionRoutes.routes)
config.routes = config.routes.concat(ContactRoutes.routes)
config.routes = config.routes.concat(MeRoutes.routes)
config.routes = config.routes.concat(UserRoutes.routes)

Vue.use(Router)

export default new Router(config)
