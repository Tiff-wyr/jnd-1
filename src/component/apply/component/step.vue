<template>
  <div class="step">
    <div :class="{ active: active >= 1 }" class="item"><span>1</span>填写基本信息</div>
    <div :class="{ active: active >= 2 }" class="item"><span>2</span>完善贷款信息</div>
    <div :class="{ active: active >= 3 }" class="item"><span>3</span>完成</div>
  </div>
</template>
<script>
export default {
  name: 'Step',
  props: {
    active: {
      type: Number,
      default: 1
    }
  },
  watch: {
    active(val) {
      console.log(val)
    }
  }
}
</script>

<style lang="scss" scoped>
.step{
  display: flex;
  align-items: center;
  justify-content: space-around;
  .item {
    color: #9B9B9B;
    &.active {
      color: #515151;
      span {
        background: #A80E0E;
        color: #fff;
      }
    }
    span {
      display: inline-block;
      width: 32px;
      height: 32px;
      border: 1px solid #d9d9d9;
      border-radius: 50%;
      text-align: center;
      line-height: 32px;
      margin-right: 10px;
    }
    &:after {
      display: inline-block;
      content: ' ';
      width: 100px;
      height: 1px;
      background:  #D9D9D9;
      vertical-align: middle;
      margin: 0 32px;
    }
    &:last-of-type:after {
      display: none;
    }
  }
}
</style>
