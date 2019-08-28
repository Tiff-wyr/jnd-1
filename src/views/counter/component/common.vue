<template>
  <div class="house-wrap">
    <section class="top">
      <p style="margin-bottom: 30px; color: #a80e0e;">自2015年10月24日起最新商贷利率 1年以内为4.35%，1-5年为4.75%，5年以上为4.90%</p>
      <jnd-input v-model="form.loanAmount" label="贷款金额" unit="元"/>
      <jnd-input v-model="form.deadLine" label="还款期限" unit="年" />

      <jnd-input v-model="form.interset" :select="true" label="年利率" @select="handleSelect"/>
      <jnd-input :is-slot="true" style="margin-top: 40px">
        <el-button style="margin-right: 20px;" type="danger" @click="computedMoney">计算</el-button>
        <el-button type="primary" @click="resetForm">重置</el-button>
      </jnd-input>
    </section>
    <section class="bottom">
      <div class="table-box">
        <jnd-table :obj="ai" title="每月等额还款法"/>
        <jnd-table :obj="ap" :is-same="false" title="逐月递减还款法" repay-ment="首月还款"/>
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
export default {
  name: 'Common',
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
      year: 0,
      form: {
        loanAmount: 0,
        year: 1,
        interset: 4.35
      },
      ai: {},
      ap: {}
    }
  },
  watch: {
    loanType(val) {
      this.resetForm()
    }
  },
  methods: {
    handleSelect(item) {
      this.form.interset = item
    },
    computedMoney() {
      this.LoanCalc(this.form.loanAmount, this.form.year, this.form.interset)
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
    },
    resetForm() {
      this.form = {
        loanAmount: 0,
        year: 1,
        interset: 4.35
      }
      this.areaForm = {
        area: 0,
        unitPrice: 0
      }
      this.ai = {}
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
