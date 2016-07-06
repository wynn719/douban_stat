import Home from './view/home.vue'
import BookView from './view/book-stat.vue'
import UnknownView from './view/unknown.vue'

export default {
  '': { // 首页
    component: Home
  },

  'home': { // 首页
    component: Home
  },

  '/book': { // 阅读统计页
    component: BookView
  },

  '/unknown': {
    component: UnknownView
  }
}
