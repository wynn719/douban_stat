<template>
  <div class="content">
    <p class="title"><strong>输入你的豆瓣个人主页地址：</strong></p>
    <input type="text" class="userurl" placeholder="https://www.douban.com/people/81245114/" v-model="userurl" debounce="500" value="">
  </div>
</template>
<script>
export default {
  data () {
    return {
      userurl: ''
    }
  },

  ready: function () {
    const personReg = /^https:\/\/www.douban.com\/people\/\d+|\w+\d+|\w+\/$/
    this.$watch('userurl', (userurl) => {
      if (personReg.test(userurl)) { // 匹配豆瓣网址
        let userid = ''
        userurl = userurl.replace(/https:\/\/www.douban.com\/people\//, '')
        userid = userurl.substr(0, userurl.length - 1)

        this.$router.go({
          path: 'book',
          query: {
            userid: userid
          }
        })
      }
    })
  }
}
</script>
<style lang="less" scoped>
  .content {
    .title {
      margin-top: 50px;
      text-align: center;
    }

    .userurl {
      display: block;
      margin: 0 auto 50px;
      width: 80%;
    }
  }
</style>
