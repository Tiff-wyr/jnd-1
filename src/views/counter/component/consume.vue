<template>
  <div class="house-wrap">
    <section class="top">
      <jnd-input v-model="form.loanAmount" label="贷款金额" unit="元"/>
      <jnd-input v-model="form.deadLine" label="还款期限" unit="年" @change="handleYear"/>

      <jnd-input v-model="form.interset" :select="true" label="年利率" @select="handleSelect" @change="change"/>
      <jnd-input :is-slot="true" style="margin-top: 40px">
        <el-button style="margin-right: 20px;" type="danger">计算</el-button>
        <el-button type="primary">重置</el-button>
      </jnd-input>
    </section>
    <section class="bottom">
      <div class="table-box">
        <jnd-table :obj="sameMoney" title="每月等额还款法"/>
        <jnd-table :obj="decreasingMoney" title="逐月递减还款法"/>
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
  name: 'HouseAccumulationFund',
  components: {
    jndInput,
    jndTable
  },
  data() {
    return {
      year: 0,
      form: {
        loanAmount: 0,
        month: 0,
        time: 0,
        interset: 0
      },
      areaForm: {

      },
      sameMoney: {},
      decreasingMoney: {}
    }
  },
  methods: {
    handleYear(val) {
      this.month = val * 12
    },
    handleSelect(item) {
      this.form.interset = item
    },
    change(val) {
      console.log(this.form.interset)
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
