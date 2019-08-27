import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/event',
      name: 'event',
      component: () => import('./views/Event.vue')
    },
    {
      path: '/config/datalogger',
      name: 'datalogger',
      component: () => import('./views/Datalogger.vue')
    },
    {
      path: '/config/powermeter',
      name: 'powermeter',
      component: () => import('./views/PowerMeter.vue')
    },
    {
      path: '/config/analog',
      name: 'analog',
      component: () => import('./views/Analog.vue')
    },
    {
      path: '/config/modbus',
      name: 'modbus',
      component: () => import('./views/Modbus.vue')
    }
  ]
})
