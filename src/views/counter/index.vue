<template>
  <div class="app-container">
    <main class="main">
      <nav class="left-nav">
        <leftNav :list="list" @change="handleNav"/>
      </nav>
      <section class="right-content">
        <component :is="components"/>
      </section>
    </main>
  </div>
</template>
<script>
import leftNav from './component/nav'
import houseBusiness from './component/houseBusiness'
import houseAccumulationFund from './component/houseAccumulationFund'
const listOptions1 = [
  {
    title: '月供计算',
    list: [
      { id: 0, label: '购房计算器-商业贷款', type: 'houseBusiness' },
      { id: 1, label: '购房计算器-公积金', type: 'houseAccumulationFund' },
      { id: 2, label: '消费贷款计算器', type: 'consume' },
      { id: 3, label: '购车贷款计算器', type: 'buyCar' },
      { id: 4, label: '房贷提前还款计算器', type: 'houseAdvance' },
      { id: 5, label: '等额本金还款计算器', type: 'samePrincipal' },
      { id: 6, label: '等额本息还款计算器', type: 'samePrincipalAndInterest ' }
    ]
  },
  {
    title: '税费计算器',
    list: [
      { id: 7, label: '个人所得税计算器', type: 'personalIncomeTax' },
      { id: 8, label: '购车税费计算器', type: 'buyCarTax' },
      { id: 9, label: '购房税费计算器', type: 'buyHouseTax' },
      { id: 10, label: '二手房交易税费计算器', type: 'secondHandHouseTax' }
    ]
  }
]
export default {
  name: 'Counter',
  components: {
    leftNav,
    houseBusiness,
    houseAccumulationFund
  },
  data() {
    return {
      components: 'houseBusiness',
      list: listOptions1,
      ai: null,
      ap: null
    }
  },
  created() {
    this.LoanCalc(10000, 1, 3.45)
  },
  methods: {
    handleNav(val) {
      console.log(val)
      this.components = val.type
    },
    /**
     * @params
     * capital 本金
     * year 还款年数
     * apr 年利率
     * mir 月利率
     */
    LoanCalc(capitals, years, aprs) {
      const capital = Number(capitals) // 本金
      const year = Number(years) // 还款年数
      const apr = Number(aprs) * 0.01 // 年利率
      const month = year * 12 // 还款月数
      const mir = apr / 12 // 月利率

      this.ai = (function() {
        return {
          capital: capital,
          month: month,
          ppm: (capital * mir * Math.pow(1 + mir, month) / (Math.pow(1 + mir, month) - 1)).toFixed(2), // 每月还款数
          ti: (capital * month * mir * Math.pow(1 + mir, month) / (Math.pow(1 + mir, month) - 1) - capital).toFixed(2), // 还款利息总额
          tpi: (capital * month * mir * Math.pow(1 + mir, month) / (Math.pow(1 + mir, month) - 1)).toFixed(2) // 还款本息总和

        }
      }())
      this.ap = (function() {
        var apy = []
        for (var i = 1; i <= month; i++) {
          apy[month - i] = (capital / month + (capital - (capital - i * capital / month)) * mir).toFixed(2)
        }

        return {
          capital: capital,
          month: month,
          ppm: apy,
          ti: ((month + 1) * capital * mir / 2).toFixed(2),
          tpi: ((month + 1) * capital * mir / 2 + capital).toFixed(2)
        }
      }())
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
