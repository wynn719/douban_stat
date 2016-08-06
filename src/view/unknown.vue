<template>
  <style>
    /* 覆盖父级元素的样式 */
    .container {
      background-color: #000 !important;
    }
    footer * {
      color: #000 !important;
    }
  </style>
  <div class="content">
    <div class="face404">
      <div class="eye-socket left">
          <div class="eye"></div>
      </div>
      <div class="eye-socket right">
          <div class="eye"></div>
      </div>
    </div>
    <div class="text404">
      <p class="text">Oh!</p>
      <p class="text">Something wrong!</p>
      <a class="redirect" href="javascript:void(0)" @click="goBack">Go Back?</a>
      <a class="redirect" v-link="'home'">or Go Home?</a>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    goBack: function (event) {
      this.$router.go(window.history.back())
    }
  }
}
</script>
<style lang="less" scoped>
  @keyframes shakeEyes {
    20% {
        transform: scale3d(0.95, 0.95, 0.95);
    }
    50% {
        opacity: .8;
        transform: scale3d(1.05, 1.05, 1.05);
    }
    to {
        opacity: .7;
        transform: scale3d(0.98, 0.98, 0.98);
    }
  }
  @keyframes shakeEyebrow {
    20% {
        top: -18px;
        border-radius: 40%;
    }
    50% {
        top: -25px;
        border-radius: 35%;
    }
    to {
        top: -15px;
        border-radius: 50%;
    }
  }
  @keyframes eyes {
    0%, 30%, 55%, 90%, 100% {
        transform: translate(0, 0)
    }
    10%, 25% {
        transform: translate(0, 20px)
    }
    65% {
        transform: translate(-20px, 0)
    }
    80% {
        transform: translate(20px, 0)
    }
  }
  .face404 {
    box-sizing: content-box;
    width: 200px;
    margin: 20% auto 0;
    text-align: center;

    .eye-socket {
      display: inline-block;
      position: relative;
      width: 60px;
      height: 80px;
      border-radius: 50%;
      background-color: #fff;
      box-shadow: 0 0 0 #000;
      margin: 10px;
      animation: shakeEyes 1s infinite;

      &::after {
        content: '';
        position: absolute;
        border-top: 5px solid #fff;
        width: 70px;
        height: 50px;
        left: -5px;
        top: -15px;
        border-radius: 50%;
        animation: shakeEyebrow 1s infinite;
      }
      .eye {
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background-color: #000;
        position: absolute;
        left: 50%;
        margin: -7.5px 0 0 -7.5px;
        top: 50%;
        animation: eyes 4s infinite;
      }
    }
    .left {
      &::after {
        transform: rotate(-16deg);
      }
    }
    .right {
      &::after {
        transform: rotate(16deg);
      }
    }
  }
  .text404 {
    margin: 20px auto 0;
    text-align: center;

    .text {
      color: #fff;
      font-size: 60px;
      margin: 10px 0;
    }
    .redirect {
      color: #80ffff;
      font-style: 14px;
      text-decoration: none;
    }
  }
</style>
