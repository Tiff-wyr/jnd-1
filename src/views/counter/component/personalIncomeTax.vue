<template>
  <div class="house-wrap">
    <section class="top">
      <jnd-input :is-slot="true" label="收入类型" >
        <el-select v-model="form.interset" @change="handleOptions">
          <el-option v-for="item in incomeTypeOptions" :key="item.id" :label="item.label" :value="item.id"/>
        </el-select>
      </jnd-input>
      <template v-if="type === 1">
        <jnd-input v-model="form.income" label="工资月收入" unit="元"/>
        <jnd-input v-model="form.socialSecurity" label="社会保险费" unit="元"/>
        <jnd-input v-model="form.threshold" label="个税起征点" unit="年"/>
      </template>
      <template v-if="type === 2">
        <jnd-input v-model="form.income" label="收入金额" unit="元"/>
      </template>
      <template v-if="type === 3">
        <jnd-input v-model="form.income" label="年度总收入" unit="元"/>
        <jnd-input v-model="form.income" label="年度总成本" unit="元"/>
      </template>

      <jnd-input :is-slot="true" style="margin-top: 40px">
        <el-button style="margin-right: 20px;" type="danger">计算</el-button>
        <el-button type="primary">重置</el-button>
      </jnd-input>
    </section>
    <section class="bottom">
      <div class="table-box">
        <jnd-table :obj="ai" title="每月等额还款法"/>
        <jnd-table :obj="ap" :is-same="false" title="逐月递减还款法"/>
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
const incomeTypeOptions = [
  { id: 0, label: '工资，薪金所得（月薪税前）', interset: 0.1, type: 1 },
  { id: 1, label: '年终奖所得', interset: 0.25, type: 2 },
  { id: 2, label: '劳务报酬所得', interset: 0.2, type: 2 },
  { id: 3, label: '个体户，经营所得', interset: 0.05, type: 3 },
  { id: 4, label: '对企事业单位的承包、承担经营所得', interset: 0.1, type: 3 },
  { id: 5, label: '稿酬所得', interset: 0.14, type: 2 },
  { id: 6, label: '特许权使用费所得', interset: 0.2, type: 2 },
  { id: 7, label: '财产租赁所得', interset: 0.2, type: 2 },
  { id: 8, label: '财产转让所得', interset: 0.2, type: 2 },
  { id: 9, label: '利息、股息、红利所得', interset: 0.2, type: 2 },
  { id: 10, label: '偶然所得', interset: 0.2, type: 2 }
]
export default {
  name: 'PersonalIncomeTax',
  components: {
    jndInput,
    jndTable
  },
  props: {
    loanType: {
      type: String,
      default: 'business'
    }
  },
  data() {
    return {
      incomeTypeOptions,
      year: 0,
      form: {
        threshold: 0, // 起征点
        socialSecurity: 0,
        loanAmount: 0,
        month: 0,
        time: 0,
        interset: 0
      },
      areaForm: {

      },
      sameMoney: {},
      decreasingMoney: {},
      type: 1,
      ai: {},
      ap: {}
    }
  },
  watch: {
    loanType(val) {
      console.log(val)
    }
  },
  created() {
    console.log(this.loanType)
    this.LoanCalc(10000, 1, 4.35)
  },
  methods: {
    handleOptions(val) {
      this.type = incomeTypeOptions[val].type
    },
    handleYear(val) {
      this.month = val * 12
    },
    handleSelect(item) {
      this.form.interset = item
    },
    change(val) {
      console.log(this.form.interset)
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
        const data = {
          loanAmount: capital,
          month: month,
          moneyOnce: (capital * mir * Math.pow(1 + mir, month) / (Math.pow(1 + mir, month) - 1)).toFixed(2), // 每月还款数
          interest: (capital * month * mir * Math.pow(1 + mir, month) / (Math.pow(1 + mir, month) - 1) - capital).toFixed(2), // 还款利息总额
          total: (capital * month * mir * Math.pow(1 + mir, month) / (Math.pow(1 + mir, month) - 1)).toFixed(2) // 还款本息总和

        }
        return data
      }())
      this.ap = (function() {
        var apy = []
        for (var i = 1; i <= month; i++) {
          apy[month - i] = (capital / month + (capital - (capital - i * capital / month)) * mir).toFixed(2)
        }

        const data = {
          loanAmount: capital,
          month: month,
          moneyOnce: apy,
          interest: ((month + 1) * capital * mir / 2).toFixed(2),
          total: ((month + 1) * capital * mir / 2 + capital).toFixed(2)
        }
        return data
      }())
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
