<template>
  <div id="app" class="container" style="max-width: 740px;">
    <!-- <app-header></app-header> -->
    <app-content></app-content>
    <!-- <app-footer></app-footer> -->

    <!-- 路由外链 -->
    <router-view></router-view>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.min.css'

import AppHeader from './components/header.vue'
import AppContent from './components/content.vue'
import AppFooter from './components/footer.vue'

export default {
  components: {
    'app-header': AppHeader,
    'app-content': AppContent,
    'app-footer': AppFooter
  }
}
</script>

<style>
body {
  background-color: #f4f4f4 !important;
  font-family: "Microsoft Yahei" !important;
}
#app {}
</style>
