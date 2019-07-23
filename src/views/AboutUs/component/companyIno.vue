<template>
  <div class="company-wrap">
    <titles title="公司简介"/>
    <div class="main">
      <p>9能贷联合各类大型的金融机构，深度挖掘安全的金融服务渠道机构，为用户提供安全、多元的贷款 产品和定制化的专业资金服务，打造更契合用户自身需求的贷款管理方案。</p>
      <p>我们将人文情怀融入金融服务之中，为用户创造更多价值，为社会营造诚信健康的金融环境，有效推 动普惠金融发展。</p>
      <img src="" alt="">
    </div>
  </div>
</template>
<script>
import titles from './title'
export default {
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
  min-height: 200px;
}
</style>
