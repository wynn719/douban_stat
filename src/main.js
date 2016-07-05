import Vue from 'vue'
import App from './App'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'

Vue.use(VueResource)
Vue.http.options.root = 'https://api.douban.com'
Vue.use(VueRouter)

/* eslint-disable no-new */
new Vue({
  el: 'body',
  ready: function () {
    console.log(this)
  },
  components: { App }
})
