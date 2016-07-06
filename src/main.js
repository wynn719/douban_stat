import Vue from 'vue'
import App from './App'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import routerMap from './router-map.js'

Vue.use(VueResource)
Vue.http.options.root = 'https://api.douban.com'
Vue.use(VueRouter)

let router = new VueRouter({
  hashbang: true,
  history: false,
  saveScrollPosition: true,
  transitionOnLoad: true
})
router.map(routerMap)
router.redirect({
  '*': '/'
})

/* eslint-disable no-new */
router.start(App, '#app')
