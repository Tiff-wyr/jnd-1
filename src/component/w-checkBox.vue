<template>
  <div class="clearfix">
    <label v-for="item in radios" :key="item.value" class="radio_wrap fll">
      <input v-model="valueData" :checked="item.value == val ? 'checked' : ''" :value="item.value" :name="name" class="none" type="checkbox" @change="handlerChange">
      <div :class="{ active: item.value == val }" class="radio_label">{{ item.label }}</div>
    </label>
    <!-- item.value === val -->
  </div>
</template>

<script>
export default {
  name: 'WCheckBox',
  props: {
    // eslint-disable-next-line vue/require-default-prop
    name: String,
    // eslint-disable-next-line vue/require-default-prop
    radios: Array,
    // eslint-disable-next-line vue/require-default-prop
    val: String | Number
  },
  data() {
    return {
      valueData: []
    }
  },
  methods: {
    handlerChange(e) {
      const nowVal = e.target.value
      const index = this.valueData.indexOf(0)
      // eslint-disable-next-line eqeqeq
      if (index > -1 && nowVal != '0') {
        this.valueData.splice(index, 1)
      } else if (parseInt(nowVal) === 0) {
        this.valueData = [0]
      }
      this.$emit('input', this.valueData.toString())
    }
  }
}
</script>

<style scoped lang="scss">
  .radio_wrap {
    .radio_label {
      cursor: pointer;
      height:14px;
      font-size:14px;
      font-family:PingFangSC-Regular;
      font-weight:400;
      color:rgba(155,155,155,1);
      line-height:40px;
      margin-left: 30px;
      margin-bottom: 10px;
      user-select: none;
    }
    .active {
      color: #F10B28;
    }
  }
  input:checked+.radio_label {
    border-radius: 3px;
    color: #F10B28;
  }
</style>
