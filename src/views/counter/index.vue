<template>
  <div class="app-container">
    <main class="main">
      <nav class="left-nav">
        <leftNav :list="list" :current-data="currentData" @change="handleNav"/>
      </nav>
      <section class="right-content">
        <component :is="components" :loan-type="loanType" />
      </section>
    </main>
  </div>
</template>
<script>
import { param2Obj } from '@/util/util'
import leftNav from './component/nav'
import houseBusiness from './component/houseBusiness'
import common from './component/common'
import houseAdvance from './component/houseAdvance'
import personalIncomeTax from './component/personalIncomeTax'
import samePrincipal from './component/samePrincipal'
import buyCarTax from './component/buyCarTax'
import buyHouseTax from './component/buyHouseTax'
import secondHandHouseTax from './component/secondHandHouseTax'
const listOptions1 = [
  {
    title: '月供计算',
    list: [
      { id: 0, label: '购房计算器-商业贷款', type: 'houseBusiness', arithmeticType: 'business' },
      { id: 1, label: '购房计算器-公积金', type: 'houseAccumulationFund', arithmeticType: 'accumulationFund' },
      { id: 2, label: '消费贷款计算器', type: 'common', arithmeticType: 'consume' },
      { id: 3, label: '购车贷款计算器', type: 'common', arithmeticType: 'buyCar' },
      { id: 4, label: '房贷提前还款计算器', type: 'houseAdvance', arithmeticType: '' },
      { id: 5, label: '等额本金还款计算器', type: 'samePrincipal', arithmeticType: 'samePrincipal' },
      { id: 6, label: '等额本息还款计算器', type: 'samePrincipal', arithmeticType: 'samePrincipalAndInterest' }
    ]
  },
  {
    title: '税费计算器',
    list: [
      { id: 7, label: '个人所得税计算器', type: 'personalIncomeTax', arithmeticType: 'personalIncomeTax' },
      { id: 8, label: '购车税费计算器', type: 'buyCarTax', arithmeticType: '' },
      { id: 9, label: '购房税费计算器', type: 'buyHouseTax', arithmeticType: '' },
      { id: 10, label: '二手房交易税费计算器', type: 'secondHandHouseTax', arithmeticType: '' }
    ]
  }
]
export default {
  name: 'Counter',
  components: {
    leftNav,
    houseBusiness,
    common,
    houseAdvance,
    personalIncomeTax,
    samePrincipal,
    buyCarTax,
    buyHouseTax,
    secondHandHouseTax
  },
  data() {
    return {
      components: 'houseBusiness',
      list: listOptions1,
      ai: null,
      ap: null,
      loanType: 'business',
      currentData: {}
    }
  },
  created() {
    const data = param2Obj(window.location.href)
    this.loanType = data.arithmeticType
    this.components = data.tips
    for (let i = 0; i < this.list.length; i++) {
      const item = this.list[i].list
      for (let j = 0; j < item.length; j++) {
        if (item[j].arithmeticType === data.arithmeticType) {
          this.currentData = item[j]
          this.currentData.index = j
        }
      }
    }
  },
  methods: {
    handleNav(val) {
      this.loanType = val.arithmeticType
      if (val.type === 'houseAccumulationFund') {
        this.components = 'houseBusiness'
      } else {
        this.components = val.type
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.app-container {
  padding-top: 48px;
  background: #F5F5F5;
}
.main {
  @include box-center;
  display: flex;
  .left-nav {
    width: 234px;
    padding: 30px 24px;
    box-sizing: border-box;
    background: $jnd-bg-color-white;
    margin-right: 30px;
  }
  .right-content {
    flex-grow: 1;

    }
}
</style>
