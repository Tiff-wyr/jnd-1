<template>
  <div class="loan-bk-wrap">
    <h3>贷款百科</h3>
    <div class="loan-bk-main">
      <div v-if="!data.length" class="empty-list">
        <img :src="emptyList" alt="" class="empty-img">
        <p>暂无数据...</p>
      </div>
      <div v-for="(obj, index) in data" v-if="obj.list.length > 0" :key="index" class="item">
        <h3>{{ obj.title }}</h3>
        <ul class="article-list">
          <li v-for="(item, index) in obj.list" :key="index" class="article-item" @click="handleDetail(item.id)">
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
    }
  }
}
</script>
<style lang="scss" scoped>
.loan-bk-wrap {
  padding: 20px 18px 50px;
  background: #fff;
  & > h3 {
    padding-bottom: 20px;
    border-bottom: 1px solid #D8D8D8;
  }
  .loan-bk-main {
    overflow: hidden;
    .item {
      width: 50%;
      float: left;
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
  // .article-list{
  //   overflow: hidden;
  //   list-style: none;
  // .article-item {
  //     width: 50%;
  //     cursor: pointer;
  //     box-sizing: border-box;
  //     float: left;
  //     dl {
  //       overflow: hidden;
  //       dt {
  //         width: 150px;
  //         height: 80px;
  //         float: left;
  //         margin-right: 20px;
  //         img {
  //           width: 100%;
  //           height: 100%;
  //         }
  //       }
  //       dd {
  //         color: #9B9B9B;
  //         h3 {
  //           color: #515151;
  //           text-overflow: ellipsis;
  //           overflow: hidden;
  //           white-space: nowrap;
  //         }
  //         .article-main {
  //           display: -webkit-box;
  //           -webkit-box-orient: vertical;
  //           -webkit-line-clamp: 3;
  //           overflow: hidden;
  //           margin-top: 10px;
  //           line-height: 1.5;
  //         }
  //       }
  //     }
  //   }
  // }
}
</style>
