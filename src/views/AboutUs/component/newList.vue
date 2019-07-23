<template>
  <div class="company-wrap">
    <titles title="公司新闻"/>
    <div class="main">
      <ul>
        <li v-for="(item, index) in newList" :key="index" @click="handleDetail(item)">
          <span class="left">{{ item.name }}</span><span class="right">{{ item.createTime | timeFilter }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import titles from './title'
import { fetchSon } from '@/api/aboutUs'
import { parseTime } from '@/util/util'
export default {
  name: 'ContactUs',
  filters: {
    timeFilter(val) {
      return parseTime(val)
    }
  },
  components: {
    titles
  },
  data() {
    return {
      listQuery: {
        id: 2,
        page: 1,
        pageSize: 10
      },
      newList: []
    }
  },
  created() {
    this.getRight()
  },
  methods: {
    getRight() {
      fetchSon(this.listQuery).then(res => {
        console.log(res)
        this.newList = res.data
        console.log(this.newList)
      })
    },
    handleDetail(item) {
      console.log(item)
      this.$router.push(`/newDetail?id=${item.id}`)
    }
  }
}
</script>
<style lang="scss" scoped>
.main {
  color: #515151;
  min-height: 200px;
  ul {
    line-height:1.5;
    li {
      cursor: pointer;
      padding: 10px 0;
      .left {
        float: left;
      }
      .right {
        float: right;
      }
    }
  }
}
</style>
