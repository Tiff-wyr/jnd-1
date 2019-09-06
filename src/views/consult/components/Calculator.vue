<template>
  <div class="calculator-wrap bg-white">
    <h2 v-if="location === ''" class="title slide-bar">贷款计算器</h2>
    <h2 v-else class="home">贷款计算器</h2>
    <div class="calculator-main">
      <div v-for="item in listOptions" :key="item.id" :class="'item' + item.id" class="item" @click="handleComputed(item)">
        <div :class="'img' + item.id" class="img-box">
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
  props: {
    location: {
      type: String,
      default: ''
    }
  },
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
.calculator-wrap {
  .home {
    color: #515151;
    font-weight: 500;
    font-size: 20px;
    text-align: center;
    padding: 14px;
    border-bottom: 1px solid #D9D9D9;
  }
}
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
      -webkit-background-clip:text;
      -webkit-text-fill-color:transparent;
      &.item0 {
        background-image:linear-gradient(135deg,rgba(255,144,130,1) 0%,rgba(245,77,53,1) 100%);
      }
      &.item1 {
        background-image:linear-gradient(313deg,rgba(255,144,53,1) 0%,rgba(255,166,50,1) 41%,rgba(255,198,80,1) 100%);
      }
      &.item2 {
        background-image:linear-gradient(131deg,rgba(117,230,255,1) 0%,rgba(39,179,210,1) 100%);
      }
      &.item3 {
        background-image:linear-gradient(311deg,rgba(205,69,69,1) 0%,rgba(250,140,140,1) 100%);
      }
    }
    .img-box {
      display: flex;
      align-items: center;
      justify-content: space-around;
      width: 54px;
      height: 54px;
      margin: 0 auto;
      border-radius: 50%;
      margin-bottom: 10px;
      &.img0 {
        background:linear-gradient(135deg,rgba(255,144,130,1) 0%,rgba(245,77,53,1) 100%);
      }
      &.img1 {
        background:linear-gradient(313deg,rgba(255,144,53,1) 0%,rgba(255,166,50,1) 41%,rgba(255,198,80,1) 100%);
      }
      &.img2 {
        background:linear-gradient(131deg,rgba(117,230,255,1) 0%,rgba(39,179,210,1) 100%);
      }
      &.img3 {
        background:linear-gradient(311deg,rgba(205,69,69,1) 0%,rgba(250,140,140,1) 100%);
      }
    }
  }
}
</style>
