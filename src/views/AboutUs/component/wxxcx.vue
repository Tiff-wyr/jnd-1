<template>
  <div class="company-wrap">
    <titles title="应用及小程序"/>
    <div class="main">
      <div class="item">
        <div class="img-box">
          <img src="/static/resource/1.jpg" alt="">
        </div>
        <p>扫二维码即可使用小程序</p>
      </div>
    </div>
  </div>
</template>
<script>
import titles from './title'
export default {
  name: 'ContactUs',
  components: {
    titles
  },
  ptops: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>
<style lang="scss" scoped>
.main {
  color: #515151;
  line-height: 2;
  font-size: 18px;
  display: flex;
  justify-content: center;
  span {
    color: #A80E0E;
  }
  .item {
    margin: 0 40px;
    .img-box {
      width: 200px;
      height: 200px;
      background: #ccc;
      margin-bottom: 30px;
      border-radius: 50%;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
  }
}
</style>
