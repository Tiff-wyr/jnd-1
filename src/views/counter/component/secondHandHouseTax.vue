<template>
  <div class="house-wrap">
    <section class="top">
      <h3>二手房交易税费计算器</h3>
      <jnd-input v-model="form.area" label="卖方房屋面积" unit="m²" label-width="90"/>
      <jnd-input v-model="form.price" label="卖方房屋单价" unit="元/m²" label-width="90"/>
      <jnd-input v-model="form.housePeriod" label="卖方房屋购置年限" unit="年" label-width="90"/>
      <jnd-input v-model="form.houseNum" label="买方购房套数" unit="套" label-width="90"/>

      <jnd-input :is-slot="true" style="margin-top: 40px" label-width="90">
        <el-button style="margin-right: 20px;" type="danger" @click="secondHouseCal(form)">计算</el-button>
        <el-button type="primary">重置</el-button>
      </jnd-input>
    </section>
    <section class="bottom">
      <div class="table-box">
        <jnd-table :obj="calData" :option-list="optionsList" title=""/>
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
const optionsList = [
  { label: '契税：', key: 'houseDeedTax', unit: '元' },
  { label: '营业税：', key: 'houseBusinessTax', unit: '元' },
  { label: '个人所得税：', key: 'housePersonalTax', unit: '元' },
  { label: '交易手续费：', key: 'houseFund', unit: '元' },
  { label: '中介费：', key: 'houseAgencyFee', unit: '元' },
  { label: '贷款保险费：', key: 'housePremiumFees', unit: '元' },
  { label: '贷款担保费：', key: 'houseAssureFees', unit: '元' },
  { label: '评估费：', key: 'houseEvaluateFees', unit: '元' },
  { label: '合计：', key: 'houseSum', unit: '元' }
]
export default {
  name: 'HouseAccumulationFund',
  components: {
    jndInput,
    jndTable
  },
  data() {
    return {
      optionsList,
      form: {
        houseNum: 0,
        price: 0,
        area: 0,
        housePeriod: 0
      },
      calData: {}
    }
  },
  methods: {
    handleYear(val) {
      this.month = val * 12
    },

    secondHouseCal(data) {
      var calData = {}
      calData.hosueHotal = data.area * data.price// 现二手房总价
      calData.houseDeedTax = calData.hosueHotal * this.getDeedRate(data.houseNum, data.area)// 契税
      calData.houseBusinessTax = calData.hosueHotal * this.getBusinessRates(data.housePeriod)// 营业税
      calData.housePersonalTax = calData.hosueHotal * 0.01// 个人所得税
      calData.houseFund = data.area * 2.5// 交易手续费
      calData.houseAgencyFee = calData.hosueHotal * 0.025// 中介费
      calData.housePremiumFees = (calData.hosueHotal * 0.0006).toFixed(2)// 贷款保险费
      calData.houseAssureFees = calData.hosueHotal * 0.002// 贷款担保费
      calData.houseEvaluateFees = calData.hosueHotal * 0.005// 评估费
      calData.houseSum = calData.houseDeedTax + calData.houseBusinessTax + calData.housePersonalTax + calData.houseFund + calData.houseAgencyFee + calData.housePremiumFees + calData.houseAssureFees + calData.houseEvaluateFees
      this.calData = calData
      console.log(this.calData)
    },
    // 获得二手房营业税税率
    getBusinessRates(n) {
      if (n == 1) {
        return 0.056
      }
      if (n => 2) {
        return 0
      }
    },
    // 获得契税率
    getDeedRate(m, n) {
      if (m == 1) {
        if (n <= 90) {
          return 0.01
        } else {
          return 0.015
        }
      }
      if (m == 2) {
        if (n <= 90) {
          return 0.01
        } else {
          return 0.02
        }
      }
      if (m >= 3) {
        return 0.03
      }
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
