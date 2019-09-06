<template>
  <div class="table-container">
    <h4 class="title">{{ title }}</h4>
    <div class="table">
      <div v-for="(item, index) in optionList" :key="index" class="tr">
        <div class="td key">{{ item.label | textFitler(repayMent) }}</div>
        <div class="td value"><span :style="{color: item.color}">{{ obj[item.key] | showFilter(item.key, isSame) }}</span> {{ item.unit }}</div>
      </div>
    </div>
  </div>
</template>
<script>
const optionsList = [
  { label: '贷款金额：', key: 'loanAmount', unit: '元' },
  { label: '还款月数：', key: 'month', unit: '月' },
  { label: '每月还款：', key: 'moneyOnce', unit: '元', color: '#a80e0e' },
  { label: '总支付利息：', key: 'interest', unit: '元', color: '#a80e0e' },
  { label: '本息合计：', key: 'total', unit: '元', color: '#a80e0e' }
]
export default {
  name: 'JndTable',
  filters: {
    textFitler(val, tips) {
      if (val === '每月还款：') {
        return tips
      } else {
        return val
      }
    },
    showFilter(val, key, isSame) {
      if (typeof val === 'object') {
        return val[0]
      } else {
        return val
      }
    }
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    optionList: {
      type: Array,
      default: function() {
        return optionsList
      }
    },
    repayMent: {
      type: String,
      default: '每月还款'
    },
    isSame: {
      type: Boolean,
      default: true
    },
    obj: {
      type: Object,
      default: function() {
        return {}
      },
      required: true
    }
  },
  computed: {
    moneyOnce() {
      if (this.isSame) {
        return this.obj.moneyOnce
      } else {
        if (this.obj.moneyOnce) {
          return this.obj.moneyOnce[0]
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.table-container {
  font-size: $jnd-font-size-base;
  color: #6b6b6b;
  flex-grow: 1;
  width: 426px;
  padding: 0 30px;
  box-sizing: border-box;
  .title  {
    color: $jnd-font-color-base;
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 30px;
    text-align: center;
  }
  .table {
    width: 100%;
    border: 1px solid $jnd-border-color-base;
    .tr {
      display: flex;
      border-bottom: 1px solid $jnd-border-color-base;
      &:last-of-type {
        border: none;
      }
      .td {
        padding: 10px;
        &.key {
          width: 130px;
          background: $jnd-bg-color-base;
          border-right: 1px solid $jnd-border-color-base;
        }
        &.value {
          flex-grow: 1;
          text-align: right;
        }
      }
    }
  }
}
</style>
