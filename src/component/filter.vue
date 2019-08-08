<template>
  <div class="filter-com">
    <template v-if="mutiple">
      <span v-for="(item, index) in resultList" :key="index" :class="{ active: item.flag }" @click="handleTag(index, item)">{{ item[options.key] }}</span>
    </template>
    <template v-else>
      <span v-for="(item, index) in resultList" :key="index" :class="{ active: index === currentIndex }" @click="handleTag(index, item)">{{ item[options.key] }}</span>
    </template>
  </div>
</template>
<script>
export default {
  name: 'FilterList',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    dataList: {
      type: Array,
      required: true
    },
    mutiple: {
      type: Boolean,
      default: false
    },
    options: {
      type: Object,
      default() {
        return {
          key: 'label',
          value: 'value'
        }
      }
    }
  },
  data() {
    return {
      currentIndex: '',
      resultList: [],
      selectList: []
    }
  },
  created() {
    this.$nextTick(() => {
      this.resultList = this.dataList
    })
  },
  methods: {
    handleTag(val, item) {
      if (this.mutiple) {
        item.flag = !item.flag
        if (item.flag) { // 选中
          if (item[this.options.value] === 0) {
            this.resultList = this.resultList.map(item => {
              if (item[this.options.value] === 0) {
                item.flag = true
              } else {
                item.flag = false
              }
              return item
            })
            this.selectList.splice(0, this.selectList.length, item[this.options.value])
            console.log(this.selectList)
          } else {
            this.resultList = this.resultList.map(item => {
              if (item[this.options.value] === 0) {
                item.flag = false
              }
              return item
            })
            const index = this.selectList.indexOf(this.resultList[0][this.options.value])
            if (index >= 0) {
              this.selectList.splice(index, 1)
            }
            this.selectList.push(item[this.options.value])
            console.log(this.selectList)
          }
        } else { // 取消选中
          const index = this.selectList.indexOf(item[this.options.value])
          this.selectList.splice(index, 1)
        }
        this.$emit('change', this.selectList.toString(','))
      } else {
        this.currentIndex = val
        this.$emit('change', item[this.options.value])
      }
    }
  }
}
</script>
<style lang="scss">
.filter-com {
  margin-left: 30px;
  span {
    display: inline-block;
    margin-right: 40px;
    height: 40px;
    line-height: 40px;
    white-space: nowrap;
    color: #9b9b9b;
    cursor: pointer;
    &.active {
      color: #A80E0E;
    }
  }
}
</style>
