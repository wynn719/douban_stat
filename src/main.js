import Vue from 'vue'
import App from './App'
import VueResource from 'vue-resource'

Vue.use(VueResource)
Vue.http.options.root = 'https://api.douban.com'

/* eslint-disable no-new */
new Vue({
  el: 'body',
  ready: function () {},
  components: { App }
})
