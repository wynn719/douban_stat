<template>
  <div class="content">
    <!-- 简单 -->
    <h2>{{ user.name }}的{{ readYear }}年豆瓣读书记录</h2>
    <div class="read-info">
      <p>总阅读量：<strong>{{ booksTotal }}</strong>本</p>
      <p>总阅读时间：<strong>{{ readTime.allReadDay }}</strong>天</p>
      <p>第一本书：于<strong>{{ readTime.firstReadDay }}</strong>读完《{{ firstRead.book && firstRead.book.title }}》</p>
      <p>最近阅读：于<strong>{{ readTime.lastReadDay }}</strong>读完《{{ lastRead.book && lastRead.book.title }}》</p>
      <p>平均阅读时间：<strong>{{ readTime.averageDay }}</strong>天/本</p>
    </div>

    <h2>#图表统计</h2>
    <chart :chart-data="chartData.statu"></chart>
    <!-- 评分分级统计表 -->
    <chart :chart-data="chartData.rating"></chart>
    
    <!-- 阅读标签 -->
    <h2>#读书标签</h2>
    <div class="read-tags">
      <span class="tag label label-info" v-for="tag in tags" style="display: inline-block">{{ tag }}</span>
    </div>
  </div>
</template>

<script>
import { tabset, tab } from 'vue-strap'
import bookChart from './chart.vue'

const urlRoot = 'https://api.douban.com/v2'
const userID = '81245114'
const readYear = '2016'

export default {
  components: {
    'tab': tab,
    'tabs': tabset,
    'chart': bookChart
  },

  created: function () {
    let self = this

    self.setUser()

    self.fetchBooks({}, (data) => { // 数据处理与绑定
      let formatData = self.formatDataForChart(data)
      console.log(formatData)
      // 设置统计数据
      self.setStatistics(formatData)
      // 设置标签信息
      self.setTagsInfo(formatData)
      // 设置图表
      self.setBooksChart(formatData)
      self.setBooksRatingsChart(formatData)
      // 设置在读，想读，已读模块
      // self.setReadStatus()
    }, (error) => {
      console.log(error)
    })
  },

  data () {
    return {
      booksTotal: 0,
      user: {},
      firstRead: {},
      lastRead: {},
      readTime: {},
      years: [],
      tags: [],
      chartData: {
        statu: {},
        rating: {}
      },
      readYear: ''
    }
  },

  ready: function () {},

  methods: {
    /**
     * 取得所有的图书收藏信息
     * 注：豆瓣限制了每次请求的图书数量，故通过多次请求来获取所有的数据
     * @param  object   options 豆瓣图书收藏信息可选参数
     * @param  function fnSuccess
     * @param  function fnError
     */
    fetchBooks: function (options, fnSuccess, fnError) {
      let self = this
      let param1 = {
        count: 1
      }
      Object.assign(param1, options)
      // 第一次拉取，主要是拉取基础数据
      self.getBook(param1).then((basicData) => {
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
          return self.$http.jsonp(urlRoot + '/book/user/' + userID + '/collections', params2).then((response) => {
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
      let self = this
      let params = {
        count: 100 // 豆瓣api限定，count最大为100
      }
      Object.assign(params, options)
      let promise = new Promise((resolve, reject) => {
        self.$http.jsonp(urlRoot + '/book/user/' + userID + '/collections', params).then((response) => {
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

    // 设置统计数据
    setStatistics: function (data) {
      let books = data[readYear]['books']['read']
      let self = this
      let readTime = {}
      let allReadTime = 0
      let total = books.length
      let firstRead = books[total - 1]
      let lastRead = books[0]

      readTime.firstReadDay = firstRead.updated.substring(0, 10)
      readTime.lastReadDay = lastRead.updated.substring(0, 10)
      allReadTime = (new Date(readTime.lastReadDay).getTime()) - (new Date(readTime.firstReadDay).getTime())
      readTime.allReadDay = allReadTime / (60 * 60 * 24 * 1000)
      readTime.averageDay = (readTime.allReadDay / total).toFixed(2)

      self.booksTotal = total
      self.firstRead = firstRead
      self.lastRead = lastRead
      self.readTime = readTime
      self.readYear = readYear
    },

    // 设置每月图书统计，在读、想读、已读
    setBooksChart: function (data) {
      let options = {
        title: {
          text: readYear + '年度图书阅读统计',
          left: 'center',
          bottom: 25
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['在读', '想读', '已读']
        },
        grid: {
          left: '0',
          width: '100%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '在读',
            type: 'bar',
            data: data[readYear].status.reading
          },

          {
            name: '想读',
            type: 'bar',
            data: data[readYear].status.wish
          },

          {
            name: '已读',
            type: 'bar',
            data: data[readYear].status.read
          }
        ]
      }
      this.chartData.statu = options
    },

    // 设置图书星级统计，未评~五星
    setBooksRatingsChart: function (data) {
      let options = {
        title: {
          text: readYear + '年度图书评价统计',
          left: 'center',
          bottom: 25
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['未评', '一星', '二星', '三星', '四星', '五星']
        },
        grid: {
          left: '0',
          width: '100%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '未评',
            type: 'bar',
            stack: '星级评价',
            data: data[readYear].rating['no-rating']
          },

          {
            name: '一星',
            type: 'bar',
            stack: '星级评价',
            data: data[readYear].rating['1']
          },

          {
            name: '二星',
            type: 'bar',
            stack: '星级评价',
            data: data[readYear].rating['2']
          },

          {
            name: '三星',
            type: 'bar',
            stack: '星级评价',
            data: data[readYear].rating['3']
          },

          {
            name: '四星',
            type: 'bar',
            stack: '星级评价',
            data: data[readYear].rating['4']
          },

          {
            name: '五星',
            type: 'bar',
            stack: '星级评价',
            data: data[readYear].rating['5']
          }
        ]
      }
      this.chartData.rating = options
    },

    /**
     * 格式化所有数据，供图表等使用
     * @param  object books 豆瓣获取的图书数据集
     * @return object
     */
    formatDataForChart: function (books) {
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
        if (!data[year]['rating']) {
          data[year]['rating'] = {}
        }
        if (!item.rating) { // 用户无评价
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
      })
      return data
    },

    /**
     * 设置用户基础信息
     */
    setUser: function () {
      let self = this
      self.$http.jsonp(urlRoot + '/user/81245114').then((response) => {
        if (response.status === 200) {
          let data = response.data

          if (!data) return false

          self.user = data
        }
      })
    },

    /**
     * 设置用户阅读标签
     * @param  object books 豆瓣获取的图书数据集
     */
    setTagsInfo: function (books) {
      books = books['2016']
      let ret = []
      let self = this
      books.collections.forEach((current) => {
        let bookTags = current.tags
        if (bookTags) {
          bookTags.forEach((tagName) => {
            if (ret.indexOf(tagName) === -1) {
              ret.push(tagName)
            }
          })
        }
      })
      self.tags = ret
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.content {
  margin: 100px 0;
  background-color: #fff;
  box-sizing: border-box;
  padding: 55px;
  border-radius: 6px;

  h2{
    margin-bottom: 25px;
  }

  .read-info {
    margin: 0 5px;
    padding-bottom: 10px;

    p strong {
      margin: 0 8px;
      font-size: 24px;
      font-weight: normal;
    }
  }

  .echarts {
    margin-bottom: 25px;
  }

  .read-tags {
    .tag {
      margin: 3px 4px;
    }
  }
}
</style>
