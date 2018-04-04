import Vue from 'vue'
import Router from 'vue-router'

import Base from './BaseRoutes'
import Dashboard from './DashboardRoutes'
import TransactionRoutes from './TransactionRoutes'

var config = {
  routes: []
}

config.routes = config.routes.concat(Base.routes)
config.routes = config.routes.concat(Dashboard.routes)
config.routes = config.routes.concat(TransactionRoutes.routes)

Vue.use(Router)

export default new Router(config)
