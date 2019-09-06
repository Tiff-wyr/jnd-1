<template>
  <button
    :class="{
      danger: type === 'danger',
      info: type === 'info'
    }"
    class="btn"
    @click="handleClick">
    <span><slot/></span>
  </button>
</template>
<script>
export default {
  name: 'Button',
  props: {
    type: {
      type: String,
      default: 'default'
    }
  },
  methods: {
    handleClick(evt) {
      this.$emit('click', evt)
    }
  }
}
</script>
<style lang="scss" scoped>
.btn {
  width: 110px;
  height: 50px;
  text-align: center;
  line-height: 50px;
  border-radius: 6px;
  border: 1px solid #dcdfe6;
  &.danger {
    background: $jnd-bg-color-theme;
    color: #fff;
    cursor: pointer;
    border: none;
  }
  &.info {
    background: #EBEBEB;
    color: $jnd-font-color-base;
    cursor: pointer;
    border: none;
  }
}
</style>

