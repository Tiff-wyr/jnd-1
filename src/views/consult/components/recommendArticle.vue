<template>
  <div class="question-wrap bg-white">
    <h2 class="title slide-bar">{{ title }}</h2>
    <div class="question-main">
      <ol>
        <li v-for="(item, index) in list" :key="item.vlaue" :title="item.topic" :class="{'textColor': index < 3}" @click="handleDetail(item.id)"><span>{{ item.topic | titleFitler }}</span></li>
      </ol>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Question',
  filters: {
    titleFitler(val) {
      return val.substring(0, 8) + '...'
    }
  },
  props: {
    title: {
      type: String,
      required: true
    },
    list: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    handleDetail(id) {
      this.$router.push({ path: '/consultDetail', query: { id }})
    }
  }
}
</script>
<style lang="scss" scoped>
@import './common.scss';
.title {
  color: #515151;
}
.question-main {
  padding: 24px 16px;
  ol {
    padding: 0 16px;
    li {
      list-style-type: decimal;
      padding-top: 6px;
      padding-bottom: 6px;
      cursor: pointer;
      span {
        color: #515151;
      }
      &.textColor {
        color: #A80E0E;
      }
    }
  }
}
</style>
