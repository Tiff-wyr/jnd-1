<template>
  <div class="clearfix">
    <label class="radio_wrap fll" v-for="item in radios" :key="item.value">
      <input @change="handlerChange" class="none" v-model="valueData" :value="item.value" type="checkbox" :name="name">
      <div class="radio_label">{{item.label}}</div>
    </label>
  </div>
</template>

<script>
  export default {
    name: "w-checkBox",
    props: {
      name: String,
      radios: Array
    },
    data() {
      return {
        valueData: []
      }
    },
    methods: {
      handlerChange(e){
        let nowVal = e.target.value
        let index = this.valueData.indexOf(0)
        if (index > -1 && nowVal != "0") {
          this.valueData.splice(index, 1)
        } else if (nowVal == "0") {
          this.valueData = [0]
        }
        console.log(this.valueData)
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
  }
  input:checked+.radio_label {
    border-radius: 3px;
    color: #F10B28;
  }
</style>
