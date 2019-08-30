<template>
  <div class="house-wrap">
    <section class="top">
      <h3>购房税费计算器</h3>
      <jnd-input v-model="form.houseNum" label="购房套数" unit="套"/>
      <jnd-input v-model="form.area" label="房屋面积" unit="m²"/>
      <jnd-input v-model="form.price" label="房屋单价" unit="元/m²"/>

      <jnd-input :is-slot="true" style="margin-top: 40px">
        <el-button style="margin-right: 20px;" type="danger" @click="houseTaxCal(form)">计算</el-button>
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
  { label: '印花税：', key: 'houseStampTax', unit: '元' },
  { label: '公证费：', key: 'houseNotaryFees', unit: '元' },
  { label: '维修基金：：', key: 'houseFund', unit: '元' },
  { label: '契税：', key: 'houseDeedTax', unit: '元' },
  { label: '委托办理产权手续费：', key: 'housePropertyFees', unit: '元' },
  { label: '房屋买卖手续费：', key: 'houseSaleFees', unit: '元' },
  { label: '税费总和：', key: 'houseSum', unit: '元' }
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
        area: 0
      },
      calData: {}
    }
  },
  methods: {
    handleYear(val) {
      this.month = val * 12
    },
    houseTaxCal(data) {
      var calData = {}
      var hosueHotal = data.area * data.price
      console.log(hosueHotal, this.getDeedRate(data.houseNum, data.area))
      calData.houseStampTax = hosueHotal * 0.0005// 印花税
      calData.houseNotaryFees = (hosueHotal * this.getNotaryRate(hosueHotal)) <= 200 ? 200 : hosueHotal * this.getNotaryRate(hosueHotal)// 公证费
      calData.houseFund = hosueHotal * 0.02// 维修基金
      calData.houseDeedTax = hosueHotal * this.getDeedRate(data.houseNum, data.area)// 契税
      calData.housePropertyFees = hosueHotal * 0.003// 委托办理产权手续费
      calData.houseSaleFees = this.getSaleFees(data.area)// 房屋买卖手续费
      calData.houseSum = calData.houseStampTax + calData.houseNotaryFees + calData.houseDeedTax + calData.housePropertyFees + calData.houseSaleFees
      this.calData = calData
      console.log(calData)
    },
    // 获取公证费利率
    getNotaryRate(n) {
      console.log(n)
      if (n <= 500000) {
        return 0.003
      }
      if (n > 500000 && n <= 5000000) {
        return 0.0025
      }
      if (n > 5000000 && n <= 10000000) {
        return 0.002
      }
      if (n > 10000000 && n <= 20000000) {
        return 0.0015
      }
      if (n > 20000000 && n <= 50000000) {
        return 0.001
      }
      if (n > 50000000 && n <= 100000000) {
        return 0.0005
      }
      if (n > 100000000) {
        return 0.0001
      }
    },
    // 获得契税率
    getDeedRate(m, n) {
      console.log(m, n)
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
    },
    // 获得买卖手续费
    getSaleFees(n) {
      if (n <= 120) {
        return 500
      }
      if (n > 120) {
        return 1500
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
