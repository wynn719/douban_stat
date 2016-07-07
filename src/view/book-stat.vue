<template>
  <div class="content">
    <spinner id="spinner-box" :size="lg" text="读取中..." v-ref:spinner ></spinner>
    
    <h2>{{ user.name }}的{{ readYear }}年豆瓣读书记录</h2>

    <!-- 基础统计 -->
    <div class="read-info">
      <p>总阅读量：<strong>{{ booksTotal }}</strong>本</p>
      <p>总阅读时间：<strong>{{ readTime.allReadDay }}</strong>天</p>
      <p v-show="readTime.firstReadDay">第一本书：于<strong>{{ readTime.firstReadDay }}</strong>读完《{{ firstRead.book && firstRead.book.title }}》</p>
      <p v-show="readTime.lastReadDay">最近阅读：于<strong>{{ readTime.lastReadDay }}</strong>读完《{{ lastRead.book && lastRead.book.title }}》</p>
      <p v-show="readTime.averageDay">平均阅读时间：<strong>{{ readTime.averageDay }}</strong>天/本</p>
    </div>

    <!-- 统计表 -->
    <h3># 图表统计</h3>
    <chart :chart-data="chartData.statu"></chart>
    <chart :chart-data="chartData.rating"></chart>
    
    <!-- 阅读标签 -->
    <h3 class="tags-title"># 读书标签</h3>
    <div class="read-tags">
      <span class="tag label label-info" v-for="tag in tags" style="display: inline-block">{{ tag }}</span>
      <p class="no-tag" v-if="!tags.length">Ta今年还没有打任何标签</p>
    </div>
  </div>
</template>

<script>
import { spinner } from 'vue-strap'
import bookChart from '../components/chart.vue'
import douban from '../douban.js'

let userID = ''
const URL_ROOT = 'https://api.douban.com/v2'
const readYear = '2016'

export default {
  components: {
    'spinner': spinner,
    'chart': bookChart
  },

  created: function () {},

  ready: function () {
    let self = this
    this.$refs.spinner.show()
    userID = this.$route.query.userid
    self.setUser()
    douban.fetchBooks({
      userID: userID
    }, (data) => { // 数据处理与绑定
      data = data[readYear]
      if (!data) {
        this.$refs.spinner.hide()
        return
      }
      // 设置统计数据
      self.setStatistics(data)
      // 设置标签信息
      self.setTagsInfo(data)
      // 设置图表
      self.setBooksChart(data)
      self.setBooksRatingsChart(data)
      // 隐藏loading块
      this.$refs.spinner.hide()
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
      readTime: {
        allReadDay: 0
      },
      years: [],
      tags: [],
      chartData: {
        statu: {},
        rating: {}
      },
      readYear: ''
    }
  },

  methods: {
    // 设置统计数据
    setStatistics: function (data) {
      let books = data['books']['read']
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
            stack: '读书状态',
            data: data.status.reading
          },

          {
            name: '想读',
            type: 'bar',
            stack: '读书状态',
            data: data.status.wish
          },

          {
            name: '已读',
            type: 'bar',
            stack: '读书状态',
            data: data.status.read
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
            data: data.rating['no-rating']
          },

          {
            name: '一星',
            type: 'bar',
            stack: '星级评价',
            data: data.rating['1']
          },

          {
            name: '二星',
            type: 'bar',
            stack: '星级评价',
            data: data.rating['2']
          },

          {
            name: '三星',
            type: 'bar',
            stack: '星级评价',
            data: data.rating['3']
          },

          {
            name: '四星',
            type: 'bar',
            stack: '星级评价',
            data: data.rating['4']
          },

          {
            name: '五星',
            type: 'bar',
            stack: '星级评价',
            data: data.rating['5']
          }
        ]
      }
      this.chartData.rating = options
    },

    /**
     * 设置用户基础信息
     */
    setUser: function () {
      let self = this
      self.$http.jsonp(URL_ROOT + '/user/' + userID).then((response) => {
        if (response.status === 200) {
          let data = response.data

          if (!data) return false

          self.user = data
        }
      }, (response) => {
        self.loadFaild()
      })
    },

    /**
     * 设置用户阅读标签
     * @param  object books 豆瓣获取的图书数据集
     */
    setTagsInfo: function (books) {
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
    },

    loadFaild: function () {
      // 隐藏loading块
      this.$refs.spinner.hide()
      this.$router.go('unknown')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.content {
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

  .read-tags {
    .no-tag {
      color: #eee;
    }

    .tag {
      margin: 3px 3px;
    }
  }

  .tags-title {
    margin-bottom: 20px;
  }
}
</style>
