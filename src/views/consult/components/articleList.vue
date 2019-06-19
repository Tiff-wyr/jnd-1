<template>
  <div>
    <div class="article-wrap bg-white">
      <h2 class="title">热门文章</h2>
      <ul class="article-list">
        <li class="article-item" @click="handleDetail">
          <dl>
            <dt>
              <img src="../../../../static/consult/1.jpg" alt="title">
            </dt>
            <dd>
              <h3>北京贷款还有哪些靠谱的</h3>
              <p class="article-main">为什么每个月按时缴纳公积金，还不是因为我为什么每个月按时缴纳公积金，还不是因为我为什么每个月按时缴纳公积金，还不是因为我为什么每个月按时缴纳公积金，还不是因为我</p>
              <acticle-footer source="北京银行" num="33157"></acticle-footer>
            </dd>
          </dl>
        </li>
        <li class="article-item" @click="handleDetail">
          <dl>
            <dt>
              <img src="../../../../static/consult/1.jpg" alt="title">
            </dt>
            <dd>
              <h3>北京贷款还有哪些靠谱的</h3>
              <p class="article-main">为什么每个月按时缴纳公积金，还不是因为我为什么每个月按时缴纳公积金，还不是因为我为什么每个月按时缴纳公积金，还不是因为我为什么每个月按时缴纳公积金，还不是因为我</p>
              <acticle-footer source="北京银行" num="33157"></acticle-footer>
            </dd>
          </dl>
        </li>
        <li class="article-item" @click="handleDetail">
          <dl>
            <dt>
              <img src="../../../../static/consult/1.jpg" alt="title">
            </dt>
            <dd>
              <h3>北京贷款还有哪些靠谱的</h3>
              <p class="article-main">为什么每个月按时缴纳公积金，还不是因为我为什么每个月按时缴纳公积金，还不是因为我为什么每个月按时缴纳公积金，还不是因为我为什么每个月按时缴纳公积金，还不是因为我</p>
              <acticle-footer source="北京银行" num="33157"></acticle-footer>
            </dd>
          </dl>
        </li>
      </ul>
    </div>
    <div class="pagination-container">
      <el-pagination
        class="pagination"
        background
        layout="prev, pager, next"
        :total="1000">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import acticleFooter from './acticleFooter'
export default {
  name: 'articleList',
  components: {
    acticleFooter
  },
  data() {
    return {
      checked: false
    }
  },
  methods: {
    handleDetail() {
      this.$router.push('/consultDetail')
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
}
.pagination-container {
  margin-top: 30px;
  overflow: hidden;
  .pagination {
    float: right;
  }
}
</style>
