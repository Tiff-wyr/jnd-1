<template>
  <div>
    <div class="article-wrap bg-white">
      <h2 class="title">热门文章</h2>
      <div v-if="!data.length" class="empty-list">
        <img :src="emptyList" alt="" class="empty-img">
        <p>暂无数据...</p>
      </div>
      <ul class="article-list">
        <li v-for="item in data" :key="item.id" class="article-item" @click="handleDetail(item.id)">
          <dl>
            <dt>
              <img src="../../../../static/consult/1.jpg" alt="title">
            </dt>
            <dd>
              <h3>{{ item.topic }}</h3>
              <div class="article-main">{{ item.introduction }}</div>
              <acticle-footer :source="item.source" :num="item.viewNumber" :time="item.releaseTime"/>
            </dd>
          </dl>
        </li>
      </ul>
    </div>
    <div class="pagination-container">
      <el-pagination
        :total="data.length"
        class="pagination"
        background
        layout="prev, pager, next, total"/>
    </div>
  </div>
</template>
<script>
import acticleFooter from './acticleFooter'
import emptyList from '@/assets/empty-list.png'
export default {
  name: 'ArticleList',
  components: {
    acticleFooter
  },
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      emptyList,
      checked: false
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
  margin: 0 16px;
}
.article-list .article-item {
  padding: 30px 16px;
  border-top: 1px solid #D9D9D9;
  dl {
    overflow: hidden;
    dt {
      width: 140px;
      height: 140px;
      float: left;
      margin-right: 20px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    dd {
      color: #9B9B9B;
      h3 {
        color: #515151;
      }
      .article-main {
        margin:10px 0 40px;
        line-height: 1.5;
      }
    }
  }
}
.article-wrap {
  color: #515151;
  margin-top: 30px;
  min-height: 300px;
}
.pagination-container {
  margin-top: 30px;
  overflow: hidden;
  .pagination {
    float: right;
  }
}
</style>
