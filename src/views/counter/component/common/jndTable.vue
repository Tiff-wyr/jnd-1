<template>
  <div class="table-container">
    <h4 class="title">{{ title }}</h4>
    <div class="table">
      <div class="tr">
        <div class="td key">贷款金额：</div>
        <div class="td value">{{ obj.loanAmount }} 元</div>
      </div>
      <div class="tr">
        <div class="td key">还款月数：</div>
        <div class="td value">{{ obj.month }} 月</div>
      </div>
      <div class="tr">
        <div class="td key">每月还款：</div>
        <div class="td value"><span>{{ obj.moneyOnce }}</span> 元</div>
      </div>
      <div class="tr">
        <div class="td key">总支付利息：</div>
        <div class="td value"><span>{{ obj.interest }}</span> 元</div>
      </div>
      <div class="tr">
        <div class="td key">本息合计：</div>
        <div class="td value"><span>{{ obj.total }}</span> 元</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'JndTable',
  props: {
    title: {
      type: String,
      default: ''
    },
    obj: {
      type: Object,
      default: function() {
        return {}
      },
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
.table-container {
  font-size: $jnd-font-size-base;
  color: #6b6b6b;
  .title  {
    color: $jnd-font-color-base;
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 30px;
    text-align: center;
  }
  .table {
    width: 426px;
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
          span {
            color: $jnd-font-color-theme;
          }
        }
      }
    }
  }
}
</style>
