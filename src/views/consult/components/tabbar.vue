<template>
  <div class="tabbar-wrap">
    <div class="tabbar-header">
      <ul>
        <li v-for="(item, index) in tabbar" :key="index" :class="{ active: currentIndex === index }" class="item" @click="handleTabbar(index, item.id)">{{ item.label }}</li>
      </ul>
    </div>
    <div class="tabbar-main">
      <slot/>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Tabbar',
  props: {
    tabbar: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      currentIndex: 0
    }
  },
  methods: {
    handleTabbar(val, id) {
      this.currentIndex = val
      this.$emit('change', id)
    }
  }
}
</script>
<style lang="scss" scoped>
.tabbar-wrap {
  width: 100%;
  margin: 20px auto;
  background: #fff;
  .tabbar-header {
    height: 60px;
    background: #F0F0F0;
    ul {
      height: 100%;
      list-style: none;
      display: flex;
      .item {
        width: 145px;
        text-align: center;
        line-height: 56px;
        color: #515151;
        font-size: 20px;
        border-top: 4px solid transparent;
        box-sizing: border-box;
        transition: all .5s;
        &.active {
          background: #fff;
          border-top: 4px solid #A80E0E;
        }
      }
    }
  }
}
</style>
