<template>
  <chart :options="chartData"></chart>
</template>

<script>
// 引入 ECharts 主模块
import Echarts from 'vue-echarts/src/components/Echarts.vue'

export default {
  components: {
    'chart': Echarts
  },

  props: {
    chartData: {
      type: Object,
      required: true,
      default: {}
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.echarts {
  height: 300px;
  margin-bottom: 25px;
}
</style>
