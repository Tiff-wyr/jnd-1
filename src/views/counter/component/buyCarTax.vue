<template>
  <div class="house-wrap">
    <section class="top">
      <h3>购车税费计算器</h3>
      <jnd-input v-model="form.CarPrices" label="购车价格" unit="元"/>
      <jnd-input :is-slot="true" style="margin-top: 40px" label="所在城市">
        <el-select v-model="form.carArea">
          <el-option v-for="item in cityList" :key="item.id" :label="item.label" :value="item.id"/>
        </el-select>
      </jnd-input>
      <jnd-input :is-slot="true" style="margin-top: 40px" label="发动机排量">
        <el-select v-model="form.displacement">
          <el-option v-for="item in displacementList" :key="item.id" :label="item.label" :value="item.id"/>
        </el-select>
      </jnd-input>
      <jnd-input :is-slot="true" style="margin-top: 40px" label="座位数">
        <el-select v-model="form.seating">
          <el-option v-for="item in seatingList" :key="item.id" :label="item.label" :value="item.id"/>
        </el-select>
      </jnd-input>
      <jnd-input :is-slot="true" style="margin-top: 40px">
        <btn type="danger" style="margin-right: 20px;" @click="CarPurchaseCal(form)">计算</btn>
        <btn type="info" @click="resetForm">计算</btn>
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
import btn from './common/btn'
const optionsList = [
  { label: '车辆购置税：', key: 'carTax', unit: '元' },
  { label: '车船使用税：', key: 'carUseTax', unit: '元' },
  { label: '机动车牌照费(含照相费)：', key: 'carLicence', unit: '元' },
  { label: '验车费：', key: 'carValidate', unit: '元' },
  { label: '强制保险费：', key: 'carInsurance', unit: '元' },
  { label: '费用总和：', key: 'carSum', unit: '元', color: '#a80e0e' }
]
const cityList = [
  { id: 0, label: '安徽省' },
  { id: 1, label: '北京市' },
  { id: 2, label: '福建省' },
  { id: 3, label: '甘肃省' },
  { id: 4, label: '广东省' },
  { id: 5, label: '广西省' },
  { id: 6, label: '贵州省' },
  { id: 7, label: '海南省' },
  { id: 8, label: '河北省' },
  { id: 9, label: '黑龙江省' },
  { id: 10, label: '河南省' },
  { id: 11, label: '湖北省' },
  { id: 12, label: '湖南省' },
  { id: 13, label: '江苏省' },
  { id: 14, label: '江西省' },
  { id: 15, label: '吉林省' },
  { id: 16, label: '辽宁省' },
  { id: 17, label: '内蒙古' },
  { id: 19, label: '青海省' },
  { id: 20, label: '山东省' },
  { id: 21, label: '上海市' },
  { id: 22, label: '山西省' },
  { id: 23, label: '陕西省' },
  { id: 24, label: '四川省' },
  { id: 25, label: '天津市' },
  { id: 26, label: '西藏' },
  { id: 27, label: '新疆' },
  { id: 28, label: '云南省' },
  { id: 29, label: '浙江省' },
  { id: 30, label: '重庆市' }
]
const displacementList = [
  { id: 1, label: '1.0升（含以下）' },
  { id: 2, label: '1.0升以上至1.6升（含）' },
  { id: 3, label: '1.6升以上至2.0升（含）' },
  { id: 4, label: '2.0升以上至2.5升(含)' },
  { id: 5, label: '2.5升以上至3.0升（含）' },
  { id: 6, label: '3.0升以上至4.0升（含）' },
  { id: 7, label: '4.0升以上' }
]
const seatingList = [
  { id: 1, label: '5座位（含）以下' },
  { id: 2, label: '5座以上至9座（含）' }
]
export default {
  name: 'HouseAccumulationFund',
  components: {
    jndInput,
    jndTable,
    btn
  },
  data() {
    return {
      optionsList,
      form: {
        CarPrices: 0,
        carArea: 0,
        displacement: 1,
        seating: 1
      },
      cityList,
      displacementList,
      seatingList,
      calData: {}
    }
  },
  created() {
    console.log(cityList)
  },
  methods: {
    resetForm() {
      this.form = {
        CarPrices: 0,
        carArea: 0,
        displacement: 1,
        seating: 1
      }
      this.calData = {}
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

    /* ------------------------购车---------------------------*/
    CarPurchaseCal(data) {
      var calData = {}
      calData.carTax = data.CarPrices * 1.17 * this.getCarPurchaseTax(data.displacement)// 购车税
      calData.carUseTax = this.CarUseTax(data.carArea, data.displacement)
      calData.carLicence = 174
      calData.carValidate = 63
      calData.carInsurance = this.getCarInsuranceTax(data.seating)
      calData.carSum = calData.carTax + calData.carUseTax + calData.carLicence + calData.carValidate + calData.carInsurance
      this.calData = calData
      console.log(this.calData)
    },
    // 根据排量得出税率
    getCarPurchaseTax(n) {
      if (n <= 2) {
        return 0.05
      }
      if (n >= 3) {
        return 0.1
      }
    },
    // 根据城市和排量得出车船费
    CarUseTax(s, v) {
      var cartax = [
        [180, 300, 360, 660, 1200, 2700, 3900], // 安徽省
        [250, 350, 400, 750, 1600, 2900, 4400], // 北京市
        [180, 300, 360, 720, 1500, 2640, 3900], // 福建省
        [240, 420, 480, 720, 1800, 3000, 4500], // 甘肃省
        [180, 360, 420, 720, 1800, 3000, 4500], // 广东省
        [60, 360, 420, 780, 1800, 3000, 4500], // 广西
        [120, 300, 360, 660, 1200, 2400, 3600], // 贵州省
        [60, 300, 360, 720, 1500, 2700, 4200], // 海南省
        [120, 300, 480, 840, 1800, 3000, 4500], // 河北省
        [240, 420, 480, 900, 1800, 3000, 4500], // 黑龙江省
        [180, 300, 420, 720, 1500, 3000, 4500], // 河南省
        [240, 360, 420, 720, 1800, 3000, 4500], // 湖北省
        [120, 300, 360, 720, 1920, 3120, 4800], // 湖南省
        [120, 300, 360, 660, 1200, 2400, 3600], // 江苏省
        [180, 300, 360, 660, 1200, 2400, 3600], // 江西省
        [240, 420, 480, 900, 1800, 3000, 4500], // 吉林省
        [300, 420, 480, 900, 1800, 3000, 4500], // 辽宁省
        [300, 360, 420, 900, 1800, 3000, 4500], // 内蒙古
        [120, 300, 360, 660, 1800, 3000, 45000], // 宁夏
        [60, 300, 360, 660, 1500, 2700, 4200], // 青海省
        [240, 360, 420, 900, 1800, 3000, 4500], // 山东省
        [180, 360, 450, 720, 1500, 3000, 4500], // 上海市
        [180, 300, 360, 720, 1800, 3000, 4500], // 山西省
        [300, 300, 480, 720, 1800, 3000, 4500], // 陕西省
        [180, 300, 360, 720, 1800, 3000, 4500], // 四川省
        [270, 390, 450, 900, 1800, 3000, 4500], // 天津市
        [60, 300, 360, 660, 1200, 2400, 3600], // 西藏
        [180, 360, 420, 720, 1800, 3000, 4500], // 新疆
        [60, 300, 390, 780, 1800, 3000, 4500], // 云南省
        [180, 300, 360, 660, 15003000, 4500], // 浙江省
        [120, 300, 360, 660, 1200, 2400, 3600]// 重庆市
      ]
      return cartax[s][v - 1]
    },
    // 根据座位数得到交强险费用
    getCarInsuranceTax(n) {
      if (n == 1) {
        return 1050
      }
      if (n == 2) {
        return 1100
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
