<template>
  <div class="house-wrap">
    <section class="top">
      <h3>{{ title | titleFilter(loanType) }}</h3>
      <jnd-input :is-slot="true" label="计算方式" >
        <el-radio v-model="radio" :label="1">按贷款额度计算</el-radio>
        <el-radio v-model="radio" :label="2">按面积计算</el-radio>
      </jnd-input>
      <template v-if="radio === 1">
        <jnd-input v-model="form.loanAmount" label="贷款金额" unit="元"/>
        <jnd-input v-model="form.year" label="贷款期限" unit="年"/>
      </template>

      <template v-if="radio === 2">
        <jnd-input v-model="areaForm.area" label="房屋面积" unit="m²"/>
        <jnd-input v-model="areaForm.unitPrice" label="房屋单价" unit="元/m²"/>
        <jnd-input v-model="form.year" label="贷款期限" unit="年"/>
      </template>

      <jnd-input v-model="form.interset" :select="true" :loan-type="loanType" label="年利率" @select="handleSelect"/>
      <jnd-input :is-slot="true" style="margin-top: 40px">
        <btn type="danger" style="margin-right: 20px;" @click="computedMoney">计算</btn>
        <btn type="info" @click="resetForm">重置</btn>
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
import btn from './common/btn'
export default {
  name: 'HouseBusiness',
  components: {
    jndInput,
    jndTable,
    btn
  },
  filters: {
    titleFilter(val, type) {
      if (type === 'business') {
        return '购房计算器-商业贷款'
      } else {
        return '购房计算器-公积金'
      }
    }
  },
  props: {
    loanType: {
      type: String,
      default: 'business'
    }
  },
  data() {
    return {
      radio: 1,
      form: {
        loanAmount: 0,
        year: 1,
        interset: 4.35
      },
      areaForm: {
        area: 0,
        unitPrice: 0
      },
      ai: {},
      ap: {},
      title: ''
    }
  },
  watch: {
    loanType(val) {
      this.resetForm()
      if (val === 'business') {
        this.form.interset = 4.35
      } else {
        this.form.interset = 3.25
      }
    },
    radio(val) {
      this.resetForm()
    }
  },
  methods: {
    handleSelect(item) {
      this.form.interset = item
    },
    computedMoney() {
      if (this.radio === 2) {
        this.form.loanAmount = this.areaForm.area * this.areaForm.unitPrice
      }
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
