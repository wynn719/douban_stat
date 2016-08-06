import Vue from 'vue'
import DCache from './lib/d_cache.js'

const API_ROOT = 'https://api.douban.com/v2'
const CACHE_TIME = 1000 * 60 * 60 * 24 * 3 // 5天
const DEFAULT_PARAMS = {
  count: 100
}

export default {
  /**
   * 获取某个用户的图书收藏信息
   * 注：只拉取一次，返回参数中含有当前拉取的索引下标
   * @param  object  options 豆瓣图书收藏信息可选参数
   * @return promise
   */
  getBooks: function (options) {
    options = Object.assign({}, DEFAULT_PARAMS, options)

    let promise = new Promise((resolve, reject) => {
      Vue.http.jsonp(API_ROOT + '/book/user/' + options.userID + '/collections', options).then((response) => {
        if (response.status === 200) {
          resolve(response.data)
        }
      }).catch((err) => {
        reject(err)
      })
    })

    return promise
  },

  /**
   * 取得所有的图书收藏信息
   * 注：豆瓣限制了每次请求可获取的图书数量，
   * 故通过多次请求来获取所有的数据
   * @param  object   options 豆瓣图书收藏信息可选参数
   * @param  function fnSuccess
   * @param  function fnError
   */
  fetchBooks: function (options, fnSuccess, fnError) {
    let nowTimeStamp = new Date().getTime()
    let data = {}
    let basicOptions = {} // 第一次拉取数据请求参数
    let selfOptions = {} // 当前函数参数
    let self = this

    // 从缓存中读取
    data = DCache.get(options.userID)
    if (!data) {
      data = JSON.parse(data)
      if (data.timeStamp + CACHE_TIME > nowTimeStamp) {
        fnSuccess(data)
        return
      }
    }

    selfOptions = Object.assign({}, DEFAULT_PARAMS, options)
    basicOptions = Object.assign({}, selfOptions, {count: 1})
    // 第一次拉取，主要是拉取基础数据，获得总数，方便后续的全部拉取
    self.getBooks(basicOptions).then((basicData) => {
      // 第二次拉取所有的数据
      let arr = []
      for (let start = 0, len = basicData.total; start < len; start += selfOptions.count) {
        arr.push(start)
      }

      let promises = arr.map((start) => {
        let options = Object.assign({}, selfOptions, {start: start})
        return Vue.http.jsonp(API_ROOT + '/book/user/' + options.userID + '/collections', options).then((response) => {
          if (response.status === 200) {
            return response.data
          }
        })
      })
      Promise.all(promises).then((response) => { // 整合所有promise获取完整的书籍数据
        // 整合数据
        let data = {
          collections: [],
          total: basicData.total
        }
        for (let i = 0, len = response.length; i < len; i++) {
          let res = response[i].collections
          for (let j = 0, len1 = res.length; j < len1; j++) {
            data.collections.push(res[j])
          }
        }

        data = self.formatDataForChart(data, options.userID)
        fnSuccess(data)
      }).catch((err) => {
        fnError(err)
      })
    })
  },

  /**
   * 格式化所有数据，供图表等使用
   * @param  object books 豆瓣获取的图书数据集
   * @return object
   */
  formatDataForChart: function (books, userID) {
    let now = new Date().getTime()
    let collections = books.collections
    let data = {}

    // 数据格式处理
    collections.forEach((item) => {
      let updated = item.updated.substring(0, 7).split('-')
      let mouth = Number(updated[1])

      // 数据容器初始化
      data['collections'] = data['collections'] || []
      data['collections'].push(item)
      data['books'] = data['books'] || {}
      data['books'][item.status] = data['books'][item.status] || []
      data['books'][item.status].push(item)
      // 月份读书量统计数据
      data['status'] = data['status'] || {}
      data['status'][item.status] = data['status'][item.status] || []
      for (let i = 0; i < 12; i++) { // 补空值
        data['status'][item.status][i] = data['status'][item.status][i] || null
      }
      data['status'][item.status][mouth - 1]++
      // 月份星级评价统计数据，只取已读的星级评价
      if (item.status === 'read') {
        data['rating'] = data['rating'] || {}
        if (item.rating === undefined) { // 用户无评价
          item.rating = {}
          item.rating.value = 'no-rating'
        }
        data['rating'][item.rating.value] = data['rating'][item.rating.value] || []
        for (let i = 0; i < 12; i++) { // 补空值
          data['rating'][item.rating.value][i] = data['rating'][item.rating.value][i] || null
        }
        data['rating'][item.rating.value][mouth - 1]++
      }
    })

    if (!data) {
      return null
    }

    // 存入localstorage中
    data.timeStamp = now
    DCache.add(userID, JSON.stringify(data))
    return data
  }
}
