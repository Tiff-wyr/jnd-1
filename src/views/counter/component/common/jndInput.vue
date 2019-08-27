<template>
  <div class="input-wrap">
    <span :style="{width: labelWidth + 'px'}" class="label">{{ label }}</span>
    <slot/>
    <div v-if="!isSlot" class="input-box" @mouseover="mouseover" @mouseout="mouseout">
      <input v-if="!select" :disabled="disabled" type="number" @input="input">
      <div v-else class="toggle">
        {{ nowItem.label }}
        <ul v-if="itemShow" class="list">
          <li v-for="item in interestList" :key="item.id" @click="handleItem(item)">{{ item.label }}</li>
        </ul>
      </div>
      <span :class="{ choose: select }" class="unit">{{ unit }}</span>
    </div>
    <div v-if="select" class="input-box input-small">
      <input v-if="nowItem.id !== 8" :disabled="true" v-model="endInterset" type="number">
      <input v-else type="number" @input="input">
      <span class="unit">%</span>
    </div>
  </div>
</template>
<script>
const interestOptions = [
  { id: 0, interest: 1, label: '最新基准利率' },
  { id: 1, interest: 0.7, label: '最新基准利率7折' },
  { id: 2, interest: 0.8, label: '最新基准利率8折' },
  { id: 3, interest: 0.85, label: '最新基准利率85折' },
  { id: 4, interest: 0.9, label: '最新基准利率9折' },
  { id: 5, interest: 1.1, label: '最新基准利率1.1倍' },
  { id: 6, interest: 1.2, label: '最新基准利率1.2倍' },
  { id: 7, interest: 1.3, label: '最新基准利率1.3倍' },
  { id: 8, interest: 0, label: '自定义输入' }
]
const accumulationFundOptions = [
  { id: 0, interest: 1, label: '公积金基准利率' },
  { id: 1, interest: 1.1, label: '公积金基准利率1.1倍' },
  { id: 2, interest: 1.2, label: '公积金基准利率1.2' },
  { id: 8, interest: 0, label: '自定义输入' }
]
export default {
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    labelWidth: {
      type: [Number, String],
      default: 70
    },
    loanType: {
      type: String,
      default: 'business'
    },
    isSlot: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ''
    },
    value: {
      type: [Number, String],
      default: 0
    },
    unit: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    select: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      baseInterest: 4.9,
      nowItem: '',
      interestList: interestOptions,
      itemShow: false
    }
  },
  computed: {
    endInterset() {
      const val = (this.baseInterest * this.nowItem.interest).toFixed(3)
      return val
    }
  },
  watch: {
    loanType(val) {
      console.log(val)
      this.setSelect(val)
    }
  },
  created() {
    if (this.select) {
      this.setSelect(this.loanType)
    }
  },
  methods: {
    setSelect(val) {
      if (val === 'business') {
        this.baseInterest = 4.9
        this.interestList = interestOptions
        this.nowItem = this.interestList[0]
      } else {
        this.baseInterest = 3.25
        this.interestList = accumulationFundOptions
        this.nowItem = this.interestList[0]
      }
    },
    input(e) {
      this.$emit('change', e.target.value)
    },
    handleItem(item) {
      this.nowItem = item
      this.itemShow = false
      this.$emit('select', this.endInterset)
    },
    mouseover() {
      if (this.select) {
        this.itemShow = true
      }
    },
    mouseout() {
      this.itemShow = false
    }
  }
}
</script>
<style lang="scss" scoped>
.input-wrap {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  font-size: $jnd-font-size-base;
  color: $jnd-font-color-base;
  .label {
    margin-right: 50px;
  }
  .input-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 220px;
    border: 1px solid #D9D9D9;
    border-radius: 6px;
    height: 40px;
    padding-left: 16px;
    margin-right: 20px;
    &.input-small {
      width: 100px;
      input {
        width: 50px;
      }
    }
    .unit {
      width: 48px;
      height: 100%;
      line-height: 40px;
      text-align: center;
      background: #D9D9D9;
      color: #515151;
      &.choose {
        position: relative;
        cursor: pointer;
        &::after {
          position: absolute;
          top: 60%;
          left: 50%;
          transform: translate(-50%, -50%);
          display: block;
          content: ' ';
          width: 0;
          height: 0;
          border-width: 8px 6px 6px 6px;
          border-style: solid;
          border-color: #9B9B9B transparent transparent transparent;
        }
      }
    }
    .toggle {
      position: relative;
      flex-grow: 1;
      height: 100%;
      line-height: 40px;
      .list {
        position: absolute;
        top: calc(100% + 1px);
        left: -16px;
        // height: 0;
        overflow: hidden;
        // opacity: 0;
        height: auto;
        max-height: 300px;
        overflow-y: auto;
        width: calc(100% + 64px);
        z-index: 9;
        background: $jnd-bg-color-white;
        list-style: none;
        border: 1px solid #D9D9D9;
        border-top: none;
        li {
          padding: 10px;
          cursor: pointer;
          transition: all .5s;
          &:hover {
            background: #D9D9D9;
          }
        }
      }
    }
  }
  input {
    border: none;
  }
  input:disabled {
    background: #fff;
  }
}
</style>
