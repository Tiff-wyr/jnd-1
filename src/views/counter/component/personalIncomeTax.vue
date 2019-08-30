<template>
  <div class="house-wrap">
    <section class="top">
      <h3>个人所得税计算器</h3>
      <jnd-input :is-slot="true" label="收入类型" >
        <el-select v-model="value" @change="handleOptions">
          <el-option v-for="item in incomeTypeOptions" :key="item.id" :label="item.label" :value="item.id"/>
        </el-select>
      </jnd-input>
      <template v-if="tips === 1">
        <jnd-input v-model="form.salary" label="工资月收入" unit="元"/>
        <jnd-input v-model="form.extra" label="社会保险费" unit="元"/>
        <jnd-input v-model="form.threshold" label="个税起征点" unit="年"/>
      </template>
      <template v-if="tips === 2">
        <jnd-input v-model="form.salary" label="收入金额" unit="元"/>
      </template>
      <template v-if="tips === 3">
        <jnd-input v-model="form.salary" label="年度总收入" unit="元"/>
        <jnd-input v-model="form.extra" label="年度总成本" unit="元"/>
      </template>

      <jnd-input :is-slot="true" style="margin-top: 40px">
        <el-button style="margin-right: 20px;" type="danger" @click="handleComputed">计算</el-button>
        <el-button type="primary" @click="resetForm(1)">重置</el-button>
      </jnd-input>
    </section>
    <section class="bottom">
      <div class="table-box">
        <jnd-table :obj="ai" :option-list="optionsList" title="每月等额还款法"/>
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
  { id: 0, label: '工资，薪金所得（月薪税前）', interset: 0.1, type: 1, tips: 1 },
  { id: 1, label: '年终奖所得', interset: 0.25, type: 2, tips: 2 },
  { id: 2, label: '劳务报酬所得', interset: 0.2, type: 3, tips: 2 },
  { id: 3, label: '个体户，经营所得', interset: 0.05, type: 4, tips: 3 },
  { id: 4, label: '对企事业单位的承包、承担经营所得', interset: 0.1, type: 5, tips: 3 },
  { id: 5, label: '稿酬所得', interset: 0.14, type: 6, tips: 2 },
  { id: 6, label: '特许权使用费所得', interset: 0.2, type: 7, tips: 2 },
  { id: 7, label: '财产租赁所得', interset: 0.2, type: 8, tips: 2 },
  { id: 8, label: '财产转让所得', interset: 0.2, type: 9, tips: 2 },
  { id: 9, label: '利息、股息、红利所得', interset: 0.2, type: 10, tips: 2 },
  { id: 10, label: '偶然所得', interset: 0.2, type: 11, tips: 2 }
]
const optionsList = [
  { label: '应纳税所得额：', key: 'taxSalary', unit: '元' },
  { label: '适用税率：', key: 'taxRate', unit: '%' },
  { label: '速算扣除数：', key: 'qcd', unit: '元' },
  { label: '应缴税款：', key: 'taxDue', unit: '元' },
  { label: '实得金额：', key: 'endSalary', unit: '元' }
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
      optionsList,
      incomeTypeOptions,
      value: 0,
      form: {
        type: 1,
        salary: 0,
        extra: 0,
        threshold: 0
      },
      tips: 1,
      ai: {}
    }
  },
  watch: {
    loanType(val) {
      console.log(val)
    }
  },
  created() {
    console.log(this.loanType)
  },
  methods: {
    handleOptions(val) {
      this.tips = incomeTypeOptions[val].tips
      this.form.type = incomeTypeOptions[val].type
      this.resetForm()
      this.ai = {}
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
    handleComputed() {
      this.personalCal(this.form)
    },
    personalCal(data) {
      var calData = {}
      // 工薪所得
      if (data.type === 1) {
        if (data.salary <= 3500) {
          this.$message.success('您无需纳税！')
          return false
        }
        calData.taxSalary = data.salary - data.extra - data.threshold // 应纳税所得额
        if (calData.taxSalary <= 0) {
          calData.taxSalary = 0
        }
        const newData = this.getPersonalRate(calData.taxSalary)// 得到税额和速算扣除数
        calData = { ...calData, ...newData }
        calData.taxDue = calData.taxSalary * calData.taxRate - calData.qcd // 应纳税额
        calData.endSalary = data.salary - data.extra - calData.taxDue // 实发工资
      }
      // 年终奖所得
      if (data.type === 2) {
        calData.taxSalary = Number(data.salary) // 应纳税所得额
        const newData = this.getPersonalRate(calData.taxSalary)// 得到税额和速算扣除数
        calData = { ...calData, ...newData }
        calData.taxDue = calData.taxSalary * calData.taxRate - calData.qcd // 应纳税额
        console.log(calData.taxDue)
        calData.endSalary = data.salary - data.extra - calData.taxDue // 实发工资
        console.log('年终奖所得', calData)
      }
      // 劳务所得
      if (data.type === 3) {
        if (data.salary <= 800) {
          this.$message.success('您无需纳税！')
          return false
        }
        if (data.salary > 800 && data.salary <= 4000) {
          calData.taxSalary = data.salary - 800 // 应纳税所得额
        }
        if (data.salary > 4000) {
          calData.taxSalary = data.salary * 0.8 // 应纳税所得额
        }
        const newData = this.getLaborRate(calData.taxSalary)// 得到税额和速算扣除数
        calData = { ...calData, ...newData }
        calData.taxDue = calData.taxSalary * calData.taxRate - calData.qcd // 应纳税额
        calData.endSalary = data.salary - data.extra - calData.taxDue // 实发工资
        console.log('劳务所得', calData)
      }
      // 个体工商户
      if (data.type === 4) {
        calData.taxSalary = data.salary - data.extra // 应纳税所得额
        if (calData.taxSalary <= 0) {
          calData.taxSalary = 0
        }
        const newData = this.getPerbusRate(calData.taxSalary)// 得到税额和速算扣除数
        calData = { ...calData, ...newData }
        calData.taxDue = calData.taxSalary * calData.taxRate - calData.qcd // 应纳税额
        calData.endSalary = data.salary - data.extra - calData.taxDue // 实发工资
        console.log('个体工商户', calData)
      }
      // 对企事业单位承包，承租所得
      if (data.type === 5) {
        calData.taxSalary = data.salary - data.extra // 应纳税所得额
        if (calData.taxSalary <= 0) {
          calData.taxSalary = 0
        }
        const newData = this.getContractRate(calData.taxSalary)// 得到税额和速算扣除数
        calData = { ...calData, ...newData }
        calData.taxDue = calData.taxSalary * calData.taxRate - calData.qcd // 应纳税额
        calData.endSalary = data.salary - data.extra - calData.taxDue // 实发工资
        console.log('对企事业单位承包，承租所得', calData)
      }
      if (data.type === 6) {
        if (data.salary <= 800) {
          this.$message.success('您无需纳税！')
          return false
        }
        if (data.salary > 800 && data.salary <= 4000) {
          calData.taxSalary = data.salary - 800 // 应纳税所得额
        }
        if (data.salary > 4000) {
          calData.taxSalary = data.salary * 0.8 // 应纳税所得额
        }
        calData.taxRate = 0.14
        calData.qcd = 0
        calData.taxDue = calData.taxSalary * calData.taxRate - calData.qcd // 应纳税额
        calData.endSalary = data.salary - data.extra - calData.taxDue // 实发工资
        console.log('6', calData)
      }
      if (data.type === 7 || data.type === 8 || data.type === 9 || data.type === 10 || data.type === 11) {
        if (data.salary <= 800) {
          this.$message.success('您无需纳税！')
          return false
        }
        if (data.salary > 800 && data.salary <= 4000) {
          calData.taxSalary = data.salary - 800 // 应纳税所得额
        }
        if (data.salary > 4000) {
          calData.taxSalary = data.salary * 0.8 // 应纳税所得额
        }
        calData.taxRate = 0.2
        calData.qcd = 0
        calData.taxDue = calData.taxSalary * calData.taxRate - calData.qcd // 应纳税额
        calData.endSalary = data.salary - data.extra - calData.taxDue // 实发工资
        console.log('78910', calData)
      }
      calData.taxRate = (calData.taxRate * 100).toFixed(2)
      this.ai = calData
    },

    // 根据应纳税额得到个税税率和速算扣除数
    getPersonalRate(n) {
      if (n <= 0) {
        return {
          taxRate: 0,
          qcd: 0
        }
      }
      if (n > 0 && n <= 1500) {
        return {
          taxRate: 0.03,
          qcd: 0
        }
      }
      if (n > 1500 && n <= 4500) {
        return {
          taxRate: 0.1,
          qcd: 105
        }
      }
      if (n > 4500 && n <= 9000) {
        return {
          taxRate: 0.2,
          qcd: 555
        }
      }
      if (n > 9000 && n <= 35000) {
        return {
          taxRate: 0.25,
          qcd: 1005
        }
      }
      if (n > 35000 && n <= 55000) {
        return {
          taxRate: 0.3,
          qcd: 2775
        }
      }
      if (n > 55000 && n <= 80000) {
        return {
          taxRate: 0.35,
          qcd: 5505
        }
      }
      if (n > 80000) {
        return {
          taxRate: 0.45,
          qcd: 13505
        }
      }
    },
    // 根据应纳税额得到劳务个税税率和速算扣除数
    getLaborRate(n) {
      if (n <= 20000) {
        return {
          taxRate: 0.2,
          qcd: 0
        }
      }
      if (n > 20000 && n <= 50000) {
        return {
          taxRate: 0.3,
          qcd: 2000
        }
      }
      if (n > 50000) {
        return {
          taxRate: 0.4,
          qcd: 7000
        }
      }
    },
    // 根据应纳税额得到个体工商户个税税率和速算扣除数
    getPerbusRate(n) {
      if (n <= 15000) {
        return {
          taxRate: 0.05,
          qcd: 0
        }
      }
      if (n > 15000 && n <= 30000) {
        return {
          taxRate: 0.1,
          qcd: 750
        }
      }
      if (n > 30000 && n <= 60000) {
        return {
          taxRate: 0.2,
          qcd: 3750
        }
      }
      if (n > 60000 && n <= 100000) {
        return {
          taxRate: 0.3,
          qcd: 9750
        }
      }
      if (n > 100000) {
        return {
          taxRate: 0.35,
          qcd: 14750
        }
      }
    },
    // 根据应纳税额得到承包承租个税税率和速算扣除数
    getContractRate(n) {
      if (n <= 5000) {
        return {
          taxRate: 0.05,
          qcd: 0
        }
      }
      if (n > 5000 && n <= 10000) {
        return {
          taxRate: 0.1,
          qcd: 250
        }
      }
      if (n > 10000 && n <= 30000) {
        return {
          taxRate: 0.2,
          qcd: 1250
        }
      }
      if (n > 30000 && n <= 50000) {
        return {
          taxRate: 0.3,
          qcd: 4250
        }
      }
      if (n > 50000) {
        return {
          taxRate: 0.35,
          qcd: 6750
        }
      }
    },
    resetForm() {
      this.form.salary = 0
      this.form.extra = 0
      this.form.threshold = 0
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
