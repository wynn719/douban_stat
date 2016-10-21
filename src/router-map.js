export default {
  '': { // 首页
    component (resolve) {
      require(['./view/home.vue'], resolve)
    }
  },

  'home': { // 首页
    component (resolve) {
      require(['./view/home.vue'], resolve)
    }
  },

  '/book': {
    component (resolve) {
      require(['./view/book-stat.vue'], resolve)
    }
  },

  '/unknown': {
    component (resolve) {
      require(['./view/unknown.vue'], resolve)
    }
  },

  '/wechat/home': {
    component: require('./view/wechat/index.vue')
  },

  '/wechat/list': {
    component: require('./view/wechat/list.vue')
  },

  '/wechat/:id': {
    name: 'wechat_show',
    component: require('./view/wechat/show.vue')
  }
}
