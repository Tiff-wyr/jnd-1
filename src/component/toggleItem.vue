<template>
  <div class="toggle-wrap">
    <div :class="{'border-dashed': isShow}" class="toggle-title">{{ title }}<span @click="update">{{ isShow ? '收起' : '修改' }}</span></div>
    <p v-if="!isShow" class="container"><slot/></p>
    <transition name="toggle">
      <div v-if="$slots.hidden && isShow" class="toggle-hidden-container">
        <slot name="hidden"/>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  name: 'ToggleItem',
  props: {
    title: {
      type: String,
      required: true
    },
    isShow: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  methods: {
    update() {
      this.$emit('click')
    }
  }
}
</script>
<style lang="scss" scoped>
.toggle-enter-active, .toggle-leave-active {
  transition: all .5s;
}
.toggle-enter {
  opacity: 1;
  transform: translateX(-200px);
}
.toggle-leave-to {
  opacity: 0;
  transform: translateX(300px);
}
.toggle-wrap {
  padding: 20px;
  font-size: 14px;
  color: #515151;
  border-bottom: 1px solid #F0F0F0;
  .toggle-title {
    overflow: hidden;
    &.border-dashed {
      border-bottom: 1px dashed #F0F0F0;
      padding-bottom: 26px;
    }
    span {
      float: right;
      color: #D0AC56;
      font-weight:400;
      cursor: pointer;
    }
  }
  .container {
    color: #9B9B9B;
    font-size: 12px;
    margin-top: 16px;
  }
  .toggle-hidden-container {
    margin-top: 30px;
  }
}
</style>
