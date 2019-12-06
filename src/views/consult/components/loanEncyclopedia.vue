<template>
  <div class="loan-bk-wrap">
    <h3 class="h3">贷款百科<span class="more" @click="handleMore">更多》</span></h3>
    <div class="loan-bk-main">
      <div v-if="!data.length" class="empty-list">
        <img :src="emptyList" alt="" class="empty-img">
        <p>暂无数据...</p>
      </div>
      <div class="main">
        <div v-for="(obj, index) in data" :key="index" class="item">
          <h3>{{ obj.title }}</h3>
          <ul class="article-list">
            <li v-for="(item, index) in obj.list" :key="index" class="article-item" @click="handleDetail(item.id)">
              <dl>
                <dt v-if="index === 0">
                  <img :src="item.image" alt="title">
                </dt>
                <dd>
                  <h3 v-if="index === 0" :title="item.topic" class="title">{{ item.topic }}</h3>
                  <p v-else :title="item.topic" class="title">{{ item.topic }}</p>
                  <div v-if="index === 0" :title="item.introduction" class="article-main">{{ item.introduction }}</div>
                </dd>
              </dl>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import emptyList from '@/assets/empty-list.png'
export default {
  name: 'LoanEncyclopedia',
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
    },
    handleMore() {
      this.$router.push({ path: '/consultList', query: { id: 2 }})
    }
  }
}
</script>
<style lang="scss" scoped>
.loan-bk-wrap {
  padding: 20px 18px 50px;
  background: #fff;
  .h3 {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .more {
      font-size:14px;
      font-weight:400;
      color:#9B9B9B;
      cursor: pointer;
    }
  }
  & > h3 {
    padding-bottom: 20px;
    border-bottom: 1px solid #D8D8D8;
  }
  .loan-bk-main {
    overflow: hidden;
    .main {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
    }
    .item {
      width: 50%;
      padding: 20px;
      box-sizing: border-box;
      & > h3 {
        margin-bottom: 20px;
      }
      .article-list {
        list-style: none;
        overflow: hidden;
        .article-item {
          width: 100%;
          cursor: pointer;
          margin-top: 10px;
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
              .title {
                color: #515151;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
              }
              .article-main {
                display: -webkit-box;
                /*! autoprefixer: off */
                -webkit-box-orient: vertical;
                /* autoprefixer: on */
                -webkit-line-clamp: 2;
                overflow: hidden;
                margin-top: 10px;
                line-height: 1.5;
              }
            }
          }
        }
      }
    }
  }
}
</style>
