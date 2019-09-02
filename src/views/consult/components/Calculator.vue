<template>
  <div class="calculator-wrap bg-white">
    <h2 class="title slide-bar">贷款计算器</h2>
    <div class="calculator-main">
      <div v-for="item in listOptions" :key="item.id" class="item" @click="handleComputed(item)">
        <div class="img-box">
          <img :src="item.url" alt="">
        </div>
        <span>{{ item.label }}</span>
      </div>
    </div>
  </div>
</template>
<script>
import house from '@/assets/consult/house.png'
import car from '@/assets/consult/car.png'
import rate from '@/assets/consult/rate.png'
import repay from '@/assets/consult/repay.png'
const listOptions = [
  { id: 0, label: '房贷计算器', url: house, tips: 'houseBusiness', arithmeticType: 'business' },
  { id: 1, label: '车贷计算器', url: car, tips: 'common', arithmeticType: 'buyCar' },
  { id: 2, label: '税费计算器', url: rate, tips: 'personalIncomeTax', arithmeticType: 'personalIncomeTax' },
  { id: 3, label: '还款计算器', url: repay, tips: 'samePrincipal', arithmeticType: 'samePrincipal' }
]
export default {
  name: 'Calculator',
  data() {
    return {
      listOptions
    }
  },
  methods: {
    handleComputed(item) {
      this.$router.push({
        path: '/counter',
        query: {
          tips: item.tips,
          arithmeticType: item.arithmeticType
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import './common.scss';
.calculator-main {
  padding: 24px 16px;
  display: flex;
  flex-wrap: wrap;
  .item {
    width: 50%;
    text-align: center;
    margin-bottom: 20px;
    color: #9B9393;
    cursor: pointer;
    &:hover {
      color: $jnd-font-color-theme;
      .img-box {
        background: $jnd-bg-color-theme;
      }
    }
    .img-box {
      display: flex;
      align-items: center;
      justify-content: space-around;
      width: 54px;
      height: 54px;
      margin: 0 auto;
      background: #9B9393;
      border-radius: 50%;
      margin-bottom: 10px;
    }
  }
}
</style>
