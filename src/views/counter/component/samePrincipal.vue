<template>
  <div class="house-wrap">
    <section class="top">
      <h3>{{ title }}</h3>
      <jnd-input v-model="form.loanAmount" label="贷款金额" unit="元"/>
      <jnd-input v-model="form.year" label="贷款期限" unit="年"/>
      <jnd-input v-model="form.rate" :select="true" :loan-type="loanType" label="年利率" @select="handleSelect"/>

      <jnd-input :is-slot="true" style="margin-top: 40px">
        <btn type="danger" style="margin-right: 20px;" @click="handleComputed">计算</btn>
        <btn type="info" @click="resetForm(1)">重置</btn>
      </jnd-input>
    </section>
    <section class="bottom">
      <div class="table-box">
        <jnd-table :obj="ap" :option-list="optionsList" :title="title"/>
      </div>

      <div class="tips-bar">
        此结果仅供参考，实际应缴费用应以当地为准
      </div>
    </section>
  </div>
</template>
<script>
import jndInput from './common/jndInput'
import jndTable from './common/jndTable'
import btn from './common/btn'
const optionsList1 = [
  { label: '贷款总额', key: 'loanAmount', unit: '元' },
  { label: '还款月数', key: 'month', unit: '月' },
  { label: '首月还款', key: 'moneyOnce', unit: '元', color: '#a80e0e' },
  { label: '每月递减', key: 'decrease', unit: '元', color: '#a80e0e' },
  { label: '总利息', key: 'interest', unit: '元', color: '#a80e0e' },
  { label: '本息合计', key: 'total', unit: '元', color: '#a80e0e' }
]
const optionsList2 = [
  { label: '贷款总额', key: 'loanAmount', unit: '元' },
  { label: '还款月数', key: 'month', unit: '月' },
  { label: '每月还款', key: 'moneyOnce', unit: '元', color: '#a80e0e' },
  { label: '总利息', key: 'interest', unit: '元', color: '#a80e0e' },
  { label: '本息合计', key: 'total', unit: '元', color: '#a80e0e' }
]
export default {
  name: 'PersonalIncomeTax',
  components: {
    jndInput,
    jndTable,
    btn
  },
  props: {
    loanType: {
      type: String,
      default: 'business'
    }
  },
  data() {
    return {
      optionsList: optionsList1,
      form: {
        loanAmount: 0,
        year: 0,
        rate: 0
      },
      ap: {},
      title: '逐月递减还款法'
    }
  },
  watch: {
    loanType(val) {
      this.resetOption(val)
      this.resetForm()
    }
  },
  created() {
    this.resetOption(this.loanType)
    this.resetForm()
  },
  methods: {
    resetOption(val) {
      if (val === 'samePrincipalAndInterest') {
        this.optionsList = optionsList2
        this.title = '等额本息还款法'
      } else {
        this.optionsList = optionsList1
        this.title = '等额本金还款法'
      }
    },
    loanCalc(capitals, years, aprs) {
      const capital = Number(capitals) // 本金
      const year = Number(years) // 还款年数
      const apr = Number(aprs) * 0.01 // 年利率
      const month = year * 12 // 还款月数
      const mir = apr / 12 // 月利率
      if (this.loanType === 'samePrincipalAndInterest') {
        this.ap = (function() {
          const data = {
            loanAmount: capital,
            month: month,
            moneyOnce: (capital * mir * Math.pow(1 + mir, month) / (Math.pow(1 + mir, month) - 1)).toFixed(2), // 每月还款数
            interest: (capital * month * mir * Math.pow(1 + mir, month) / (Math.pow(1 + mir, month) - 1) - capital).toFixed(2), // 还款利息总额
            total: (capital * month * mir * Math.pow(1 + mir, month) / (Math.pow(1 + mir, month) - 1)).toFixed(2) // 还款本息总和
          }
          return data
        }())
      } else {
        this.ap = (function() {
          var apy = []
          for (var i = 1; i <= month; i++) {
            apy[month - i] = (capital / month + (capital - (capital - i * capital / month)) * mir).toFixed(2)
          }

          const data = {
            loanAmount: capital,
            month: month,
            moneyOnce: apy[0],
            decrease: (apy[0] - apy[1]).toFixed(2),
            interest: ((month + 1) * capital * mir / 2).toFixed(2),
            total: ((month + 1) * capital * mir / 2 + capital).toFixed(2)
          }
          return data
        }())
      }
    },
    handleOptions(val) {
      this.resetForm()
      this.ai = {}
    },
    handleYear(val) {
      this.month = val * 12
    },
    handleSelect(item) {
      this.form.rate = item
    },
    change(val) {
      console.log(this.form.interset)
    },
    handleComputed() {
      this.loanCalc(this.form.loanAmount, this.form.year, this.form.rate)
    },
    resetForm() {
      this.form = {
        loanAmount: 0,
        year: 1,
        rate: 4.35
      }
      this.ap = {}
    }
  }
}
</script>
<style lang="scss" scoped>
.house-wrap {
  .top, .bottom {
    background: $jnd-bg-color-white;
  }
  .top {
    padding: 50px 23px;
    margin-bottom: 24px;
    h3 {
      font-size: 20px;
      color: $jnd-font-color-base;
      font-weight: 500;
      margin-bottom: 30px;
    }
  }
  .bottom {
      padding: 40px 20px;
    .table-box {
      display: flex;
      justify-content: space-around;
    }
    .tips-bar {
      background: #FEE6D4;
      padding: 15px 0;
      margin-top: 36px;
      border: 1px solid #F8A95E;
      text-align: center;
      color: #6B6B6B;
      font-size: $jnd-font-size-base;
    }
  }
}
</style>
