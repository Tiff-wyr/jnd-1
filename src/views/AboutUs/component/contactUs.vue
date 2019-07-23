<template>
  <div class="company-wrap">
    <titles title="联系我们"/>
    <div class="main">
      <div class="item">
        <div class="img-box">
          <img src="" alt="">
        </div>
        <p>友联合作：顾女士</p>
        <p>电话：<span>18310526603</span>(微信同步)</p>
      </div>
      <div class="item">
        <div class="img-box">
          <img src="" alt="">
        </div>
        <p>市场合作：<span>15210097461</span></p>
        <p>市场合作：<span>15144715931</span></p>
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
