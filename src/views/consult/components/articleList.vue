<template>
  <div class="article">
    <div class="article-wrap bg-white">
      <div v-if="!data.length" class="empty-list">
        <img :src="emptyList" alt="" class="empty-img">
        <p>暂无数据...</p>
      </div>
      <ul class="article-list">
        <li v-for="(item, index) in data" :key="item.id" class="article-item" @click="handleDetail(item.id)">
          <dl>
            <dt v-if="index === 0">
              <img :src="item.image" alt="title">
            </dt>
            <dd>
              <h3 :title="item.topic">{{ item.topic }}</h3>
              <div v-if="index === 0" :title="item.introduction" class="article-main">{{ item.introduction }}</div>
            </dd>
          </dl>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import emptyList from '@/assets/empty-list.png'
export default {
  name: 'ArticleList',
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      emptyList
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
.article-list{
  overflow: hidden;
 .article-item {
    width: 50%;
    padding: 10px 16px;
    cursor: pointer;
    box-sizing: border-box;
    float: left;
    dl {
      overflow: hidden;
      dt {
        width: 150px;
        height: 80px;
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
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
        .article-main {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          overflow: hidden;
          margin-top: 10px;
          line-height: 1.5;
        }
      }
    }
  }
}
.article-wrap {
  color: #515151;
}
.article {
  padding: 30px 0 10px;

}
.pagination-container {
  margin-top: 30px;
  overflow: hidden;
  .pagination {
    float: right;
  }
}
</style>
