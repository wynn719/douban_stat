import Vue from 'vue'
import App from './App'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import routerMap from './router-map.js'

Vue.use(VueResource)
Vue.http.options.root = 'https://api.douban.com'
Vue.use(VueRouter)

const router = new VueRouter({
  history: false,
  saveScrollPosition: true,
  transitionOnLoad: true
  // waitForData: true
})
router.map(routerMap)
router.beforeEach(({to, next}) => {
  if (to.path === '/book' && to.query) {
    router.go('/')
  } else {
    next()
  }
})
router.redirect({
  '*': '/'
})

/* eslint-disable no-new */
router.start(App, '#app')
