<template>
  <div class="clearfix">
    <label class="radio_wrap fll" v-for="item in radios" :key="item.value">
      <input @change="handlerChange" class="none" :value="item.value" type="radio" :name="name">
      <div class="radio_label">{{item.label}}</div>
    </label>
  </div>
</template>

<script>
    export default {
      name: "w-radios",
      props: {
        name: String,
        radios: Array
      },
      methods: {
        handlerChange(e){
          let val = e.target.value
          this.$emit('input', val)
        }
      }
    }
</script>

<style scoped lang="scss">
  .radio_wrap {
    .radio_label {
      cursor: pointer;
      font-size:14px;
      font-family:PingFangSC-Regular;
      font-weight:400;
      color:rgba(155,155,155,1);
      line-height:40px;
      margin-left: 30px;
      margin-bottom: -5px;
      user-select: none;
    }
  }
input:checked+.radio_label {
  border-radius: 3px;
  color: #F10B28;
}
</style>
