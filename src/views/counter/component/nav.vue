<template>
  <div class="nav-container">
    <div v-for="obj in list" :key="obj.id" class="">
      <h4 class="title">{{ obj.title }}</h4>
      <ul>
        <li v-for="(item, index) in obj.list" :key="item.id" :class="{active: index + '' + item.id === currentIndex}" class="item" @click="handleItem(index, item)">{{ item.label }}</li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Nav',
  props: {
    list: {
      type: Array,
      default: function() {
        return []
      }
    },
    currentData: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {
      currentIndex: '00'
    }
  },
  created() {
    this.currentIndex = this.currentData.index + '' + this.currentData.id
  },
  methods: {
    handleItem(index, item) {
      this.currentIndex = index + '' + item.id
      this.$emit('change', item)
    }
  }
}
</script>
<style lang="scss" scoped>
.nav-container {
  .title {
    color: $jnd-font-color-theme;
    font-size: 20px;
    font-weight: 500;
  }
  .item {
    list-style: none;
    margin: 20px 0 20px 10px;
    padding-left: 6px;
    color: $jnd-font-color-base;
    font-weight: 400;
    cursor: pointer;
    border-left: 2px solid transparent;
    &.active {
      color: $jnd-font-color-theme;
      border-left: 2px solid $jnd-border-color-theme;
      transform: scaleY(80%);
    }
  }
}
</style>
