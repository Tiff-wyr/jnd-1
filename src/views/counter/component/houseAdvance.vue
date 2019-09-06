/* eslint-disable no-redeclare */
/* eslint-disable no-redeclare */
<template>
  <div class="house-wrap">
    <section class="top">
      <h3>房贷提前还款计算器</h3>

      <jnd-input :is-slot="true" label="还款方式" label-width="98" >
        <el-radio v-model="form.repayMethod" :label="1">每月等额还款法</el-radio>
        <el-radio v-model="form.repayMethod" :label="2">逐月递减还款法</el-radio>
      </jnd-input>

      <jnd-input :is-slot="true" label-width="98" label="贷款类型" >
        <el-radio v-model="loansType" :label="1">商业贷款</el-radio>
        <el-radio v-model="loansType" :label="2">公积金贷款</el-radio>
      </jnd-input>
      <jnd-input v-model="form.capital" label-width="98" label="贷款总额" unit="元"/>
      <jnd-input v-model="form.year" label-width="98" label="原还款期限" unit="年" @change="handleYear"/>

      <jnd-input v-model="form.rate" :select="true" :loan-type="propLoanType" label="年利率" label-width="98" @select="handleSelect"/>

      <jnd-input :is-slot="true" label="第一次还款时间" label-width="98">
        <el-date-picker v-model="firstRepay" type="date" placeholder="选择日期" @change="firstRepayment"/>
      </jnd-input>
      <jnd-input :is-slot="true" label="预计提前还款时间" label-width="98">
        <el-date-picker v-model="advanceRepay" type="date" placeholder="选择日期" @change="repayTime"/>
      </jnd-input>
      <jnd-input :is-slot="true" style="margin-top: 40px">
        <btn type="danger" style="margin-right: 20px;" @click="computedLoan">计算</btn>
        <btn type="info" @click="resetForm">重置</btn>
      </jnd-input>
    </section>
    <section class="bottom">
      <div class="table-box">
        <jnd-table :obj="ai" :option-list="optionsList"/>
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
const optionsList = [
  { label: '原月还款额：', key: 'beforeMonthRepay', unit: '元', color: '#a80e0e' },
  { label: '原最后还款期：', key: 'beforeTime', unit: '' },
  { label: '已还款总额：', key: 'beforeRepayAll', unit: '元', color: '#a80e0e' },
  { label: '该月一次还款额：', key: 'thisRepayMoney', unit: '元', color: '#a80e0e' },
  { label: '下月起还款额：', key: 'afterMonthRepay', unit: '元', color: '#a80e0e' },
  { label: '节省利息支出：', key: 'saveMoney', unit: '元', color: '#a80e0e' },
  { label: '新的最后还款期：', key: 'newTime', unit: '' }
]
export default {
  name: 'HouseBusiness',
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
      optionsList,
      repayType: 1,
      loansType: 1,
      propLoanType: 'business',
      year: 0,
      firstRepay: '', // 第一次还款时间
      advanceRepay: '', // 预计提前还款时间
      form: {
        repayMethod: 1,
        loanAmount: 0,
        year: 0,
        firstRepayYear: 0,
        firstRepayMonth: 0,
        repayTimeYear: 0,
        repayTimeMonth: 0,
        repayType: 1, // 默认一次性还清
        time: 0,
        rate: 4.35
      },
      ai: {}
    }
  },
  watch: {
    loansType(val) {
      if (val === 1) {
        this.form.rate = 4.35
        this.propLoanType = 'business'
      } else {
        this.form.rate = 3.25
        this.propLoanType = 'accumulationFund'
      }
    }
  },
  created() {
    this.propLoanType = this.loanType
  },
  methods: {
    handleYear(val) {
      this.month = val * 12
    },
    handleSelect(item) {
      this.form.rate = item
    },
    firstRepayment(val) {
      this.form.firstRepayYear = val.getFullYear()
      this.form.firstRepayMonth = val.getMonth() + 1
    },
    repayTime(val) {
      this.form.repayTimeYear = val.getFullYear()
      this.form.repayTimeMonth = val.getMonth() + 1
    },
    computedLoan() {
      this.Advanced(this.form)
    },
    /* 提前还款计算器*/
    Advanced(data) {
      const repayMethod = data.repayMethod // 还款方式
      const capital = Number(data.capital) // 本金
      const year = Number(data.year) // 原还款期限
      const apr = Number(data.rate) * 0.01 // 年利率
      const firstRepayY = data.firstRepayYear // 第一次还款年份
      const firstRepayM = data.firstRepayMonth // 第一次还款月份
      const repayTimeY = data.repayTimeYear // 预计提前还款年份
      const repayTimeM = data.repayTimeMonth // 预计提前还款月份
      const repayType = Number(data.repayType) // 提前还款类型
      const afterRepay = Number(data.afterRepay) // 提前还款后剩余的金额的还款方式
      const month = year * 12 // 还款月数
      const mir = apr / 12 // 月利率
      const repayMonth = (repayTimeY * 12 + repayTimeM) - (firstRepayY * 12 + firstRepayM)// 已还款月数
      if (repayType === 2) {
        var repayNum = Number(data.repayNum)
      }
      var repayObj = this.calRepay(repayMethod, capital, month, year, mir, repayMonth, repayType, repayNum, firstRepayY, firstRepayM, repayTimeY, repayTimeM, afterRepay)
      this.ai = repayObj
    },
    /*
    repayMethod:还款方式(1等额本金 2等额本息)
    capital:贷款金额
    month:贷款总月数
    mir:月利率
    repayMonth:已还款月数
    repayType:提前还款的方式(一次性还款或一次性还一部分)
    repayNum:一次性还款为一部分时的金额
    repayTimeY:预计提前还款的年份
    repayTimeM:提前还款的月份
    firstRepayY:第一次还款的年份
    firstRepayM:第一次还款的月份
    afterRepay:提前还款以后还款的处理方式
    * */
    calRepay(repayMethod, capital, month, year, mir, repayMonth, repayType, repayNum, firstRepayY, firstRepayM, repayTimeY, repayTimeM, afterRepay) {
      var repayObj = {}
      // 提前还款以前贷款的最后还款期算法
      if (month < repayMonth + 1) {
        repayMonth = month
        repayObj.prompt = '您的贷款已还清，不需要提前还款'
      }
      var beforeTimeY = firstRepayY + year
      var beforeTimeM = firstRepayM - 1
      if (beforeTimeM <= 0) {
        beforeTimeM = 12
        beforeTimeY--
      }
      // 原最后还款期
      repayObj.beforeTime = beforeTimeY + '年' + beforeTimeM + '月'

      if (repayMethod === 1) { // 还款方式为等额本息还款
        // 月还款金额算法
        var beforeMonthRepay = capital * mir * Math.pow((1 + mir), month) / (Math.pow((1 + mir), month) - 1)
        // 原总还款总金额算法
        var beforeAllMoney = beforeMonthRepay * month
        // 已还款总额算法
        var beforeRepayMoney = beforeMonthRepay * repayMonth
        // 提前还款以前剩余需要还款金额(带所有利息)算法
        var beforeSur = beforeAllMoney - beforeRepayMoney
        // 提前还款以前剩余贷款本金（含当月利息）算法
        var capital1 = capital
        for (var i = 0; i < repayMonth; i++) {
          capital1 = capital1 + capital1 * mir - beforeMonthRepay
        }
        capital1 = capital1 + capital1 * mir

        // 原月还款额
        repayObj.beforeMonthRepay = beforeMonthRepay
        // 已还款总额
        repayObj.beforeRepayAll = beforeRepayMoney

        if (repayType === 1) { // 还款方式为一次性还清
          // 该月一次性还款额
          repayObj.thisRepayMoney = capital1
          // 下月应还款金额
          repayObj.afterMonthRepay = 0
          // 节省利息支出
          repayObj.saveMoney = beforeAllMoney - (beforeRepayMoney + capital1)
          // 新的最后还款期
          repayObj.newTime = repayTimeY + '年' + repayTimeM + '月'
        } else { // 还款方式为一次性还一部分钱
          // 该月一次性还款额
          if (repayObj.beforeMonthRepay + repayNum < capital1) { // 如果用户输入金额小于剩余本金
            repayObj.thisRepayMoney = repayObj.beforeMonthRepay + repayNum
          } else { // 如果用户输入金额大于等于剩余贷款本金
            repayObj.thisRepayMoney = capital1
            // 计算结果提示
            repayObj.prompt = '您的金额已经可以一次性还清'
          }
          // 提前还款以后剩余贷款本金算法
          var capital2 = capital1 - repayObj.thisRepayMoney

          if (afterRepay === 1) { // 提前还款以后剩余金额的还款方式(缩短年限)
            // 剩余月数算法
            var monthNum = this.calMonth(capital, month, capital2, mir, beforeMonthRepay)
            // 新的最后还款期
            var newRepayY = repayTimeY + Math.floor(monthNum / 12)
            var newRepayM = repayTimeM + monthNum % 12
            if (newRepayM > 12) {
              newRepayM -= 12
              newRepayY++
            }
            repayObj.newTime = newRepayY + '年' + newRepayM + '月'
          } else { // 减少月还款额
            // 剩余月数算法
            var monthNum = month - (repayMonth + 1)
            // 新的最后还款期
            repayObj.newTime = repayObj.beforeTime
          }
          // 下月应还款金额算法
          var afterMonthRepay = capital2 * mir * Math.pow((1 + mir), monthNum) / (Math.pow((1 + mir), monthNum) - 1)
          // 剩余应还总金额算法
          var afterAllMoney = afterMonthRepay * monthNum
          // 下月应还金额
          repayObj.afterMonthRepay = afterMonthRepay
          // 节省利息支出
          repayObj.saveMoney = beforeSur - repayObj.thisRepayMoney - afterAllMoney
        }
      } else { // 还款方式为等额本金还款
        // 原首月还款额
        repayObj.beforeMonthRepay = capital / month + capital * mir
        // 每月减少的金额
        repayObj.beforeReduceM = capital / month * mir
        // 已还款总额
        repayObj.beforeRepayAll = (this.calRep(capital, month, mir, repayMonth)).beforeRepayAll

        if (repayType === 1) { // 还款方式为一次性还清
          // 该月一次还款额
          repayObj.thisRepayMoney = (capital - capital / month * repayMonth) * (1 + mir)
          // 下月起还款额
          repayObj.afterMonthRepay = 0
          // 节省利息支出
          repayObj.saveMoney = this.calRep(capital, month, mir).beforeRepayAll - (this.calRep(capital, month, mir, repayMonth).beforeRepayAll + repayObj.thisRepayMoney)
          // 新的最后还款期
          repayObj.newTime = repayTimeY + '年' + repayTimeM + '月'
        } else { // 还款方式为一次性还一部分钱
          // 该月一次性还款额
          if (((capital - capital / month * repayMonth) * mir + capital / month + repayNum) < (capital - capital / month * repayMonth) * (1 + mir)) { // 如果用户输入金额小于剩余本金
            repayObj.thisRepayMoney = (capital - capital / month * repayMonth) * mir + capital / month + repayNum
            // 提前还款以后剩余贷款本金算法
            var capital2 = (capital - capital / month * repayMonth) * (1 + mir) - repayObj.thisRepayMoney
            if (afterRepay === 1) { // 提前还款以后剩余金额的还款方式(缩短年限)
              // 剩余月数算法
              var monthNum = this.calMonth(capital, month, capital2, mir)
              // 新的最后还款期
              var newRepayY = repayTimeY + Math.floor(monthNum / 12)
              var newRepayM = repayTimeM + monthNum % 12
              if (newRepayM > 12) {
                newRepayM -= 12
                newRepayY++
              }
              repayObj.newTime = newRepayY + '年' + newRepayM + '月'
            } else { // 减少月还款额
              // 剩余月数算法
              var monthNum = month - (repayMonth + 1)
              // 新的最后还款期
              repayObj.newTime = repayObj.beforeTime
            }
            // 下月应还款金额算法
            var afterMonthRepay = capital2 * mir + capital2 / monthNum
            // 剩余应还总金额算法
            var afterAllMoney = (this.calRep(capital2, monthNum, mir)).beforeRepayAll
            // 下月应还金额
            repayObj.afterMonthRepay = afterMonthRepay
            // 每月减少的金额
            repayObj.afterReduceM = capital2 / monthNum * mir
            // 节省利息支出
            repayObj.saveMoney = this.calRep(capital, month, mir).beforeRepayAll - repayObj.beforeRepayAll - afterAllMoney - repayObj.thisRepayMoney
          } else { // 如果用户输入金额大于等于剩余贷款本金
            repayObj.thisRepayMoney = (capital - capital / month * repayMonth) * (1 + mir)
            // 计算结果提示
            repayObj.prompt = '您的金额已经可以一次性还清'
            // 节省利息支出
            repayObj.saveMoney = this.calRep(capital, month, mir).beforeRepayAll - (this.calRep(capital, month, mir, repayMonth).beforeRepayAll + repayObj.thisRepayMoney)
            // 下月起还款额
            repayObj.afterMonthRepay = 0
            repayObj.newTime = repayTimeY + '年' + repayTimeM + '月'
          }
        }
      }

      for (var key in repayObj) {
        if (typeof (repayObj[key]) === 'number') {
          repayObj[key] = repayObj[key].toFixed(2)
        }
      }
      return repayObj
    },
    // 计算剩余多少月的方法
    calMonth(capital, month, capital2, mir, beforeMonthRepay) {
      if (!beforeMonthRepay) {
        beforeMonthRepay = capital / month + capital2 * mir
      }
      var monthNum = 0
      while (true) {
        monthNum++
        if (capital2 <= beforeMonthRepay) {
          break
        }
        capital2 = capital2 + capital2 * mir - beforeMonthRepay
      }
      return monthNum
    },

    // 等额本金还款方式的方法
    /*
* capital:本金
* month：原还款月数
* mir：利率
* repayMonth：已还款月数
* */
    calRep(capital, month, mir, repayMonth) {
      if (repayMonth === undefined) {
        repayMonth = month
      }
      var rep = {}
      rep.monthRepay = capital * mir + capital / month
      var capital1 = capital
      var beforeRepayMoney = 0
      for (var i = 0; i < repayMonth; i++) {
        beforeRepayMoney += (capital1 * mir + capital / month)
        capital1 -= capital1 / month
      }
      rep.capital = capital1
      rep.beforeRepayAll = beforeRepayMoney
      return rep
    },
    resetForm() {
      this.form = {
        repayMethod: 1,
        loanAmount: 0,
        year: 0,
        firstRepayYear: 0,
        firstRepayMonth: 0,
        repayTimeYear: 0,
        repayTimeMonth: 0,
        repayType: 1, // 默认一次性还清
        time: 0,
        rate: 4.35
      }
      this.ai = {}
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
