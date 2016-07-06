import Vue from 'vue'

const URL_ROOT = 'https://api.douban.com/v2'
const CACHE_TIME = 1000 * 60 * 60 * 24 * 3

export default {
  /**
   * 取得所有的图书收藏信息
   * 注：豆瓣限制了每次请求的图书数量，故通过多次请求来获取所有的数据
   * @param  object   options 豆瓣图书收藏信息可选参数
   * @param  function fnSuccess
   * @param  function fnError
   */
  fetchBooks: function (options, fnSuccess, fnError) {
    let now = new Date().getTime()
    let data = {}
    let self = this

    data = window.localStorage.getItem(options.userID)
    if (data) {
      data = JSON.parse(data)
      // 缓存时间超过5天
      if (data.timeStamp + CACHE_TIME > now) {
        fnSuccess(data)
        return
      }
    }

    let param1 = {
      count: 1
    }
    Object.assign(param1, options)
    // 第一次拉取，主要是拉取基础数据
    this.getBook(param1).then((basicData) => {
      // 第二次拉取所有的数据
      let arr = []
      for (let start = 0, len = basicData.total; start < len; start += 100) {
        arr.push(start)
      }

      let promises = arr.map(function (start) {
        let params2 = {
          start: start,
          count: 100
        }
        Object.assign(params2, options)
        return Vue.http.jsonp(URL_ROOT + '/book/user/' + params2.userID + '/collections', params2).then((response) => {
          if (response.status === 200) {
            return response.data
          }
        })
      })
      Promise.all(promises).then((response) => { // 整合所有promise获取完整的书籍数据
        // 整合数据
        let data = {
          collections: [],
          total: 0
        }
        for (let i = 0, len = response.length; i < len; i++) {
          let res = response[i].collections
          for (let j = 0, len1 = res.length; j < len1; j++) {
            data.collections.push(res[j])
          }
        }
        data.total = basicData.total

        data = self.formatDataForChart(data, options.userID)
        fnSuccess(data)
      }).catch((err) => {
        fnError(err)
      })
    })
  },

  /**
   * 获取某个用户的图书收藏信息
   * 注：只拉取一次
   * @param  object  options 豆瓣图书收藏信息可选参数
   * @return promise
   */
  getBook: function (options) {
    let params = {
      count: 100 // 豆瓣api限定，count最大为100
    }
    Object.assign(params, options)
    let promise = new Promise((resolve, reject) => {
      Vue.http.jsonp(URL_ROOT + '/book/user/' + params.userID + '/collections', params).then((response) => {
        if (response.status === 200) {
          let data = response.data

          data.current = data.start + data.count
          resolve(data)
        }
      }).catch((err) => {
        reject(err)
      })
    })

    return promise
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

    collections.forEach((item) => {
      let updated = item.updated.substring(0, 7).split('-')
      let year = updated[0]
      let mouth = Number(updated[1])

      if (!data[year]) {
        data[year] = {}
      }
      // 年份
      if (!data[year]['collections']) {
        data[year]['collections'] = []
      }
      data[year]['collections'].push(item)
      if (!data[year]['books']) {
        data[year]['books'] = {}
      }
      if (!data[year]['books'][item.status]) {
        data[year]['books'][item.status] = []
      }
      data[year]['books'][item.status].push(item)
      // 月份读书量统计数据
      if (!data[year]['status']) {
        data[year]['status'] = {}
      }
      if (!data[year]['status'][item.status]) {
        data[year]['status'][item.status] = []
      }
      for (let i = 0; i < 12; i++) { // 补空值
        if (!data[year]['status'][item.status][i]) {
          data[year]['status'][item.status][i] = null
        }
      }
      data[year]['status'][item.status][mouth - 1]++
      // 月份星级评价统计数据
      if (item.status === 'read') {
        if (!data[year]['rating']) {
          data[year]['rating'] = {}
        }
        if (item.rating === undefined) { // 用户无评价
          item.rating = {}
          item.rating.value = 'no-rating'
        }
        if (!data[year]['rating'][item.rating.value]) {
          data[year]['rating'][item.rating.value] = []
        }
        for (let i = 0; i < 12; i++) { // 补空值
          if (!data[year]['rating'][item.rating.value][i]) {
            data[year]['rating'][item.rating.value][i] = null
          }
        }
        data[year]['rating'][item.rating.value][mouth - 1]++
      }
    })
    // 存入localstorage中
    data.timeStamp = now
    window.localStorage.setItem(userID, JSON.stringify(data))
    return data
  }
}
