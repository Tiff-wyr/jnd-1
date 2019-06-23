<template>
  <div class="app-container">
    <div class="consult-wrap">
      <div class="consult-main">
        <div class="left">
          <div class="banner-wrap">
            <div class="left">
              <div class="banner-main">
                <div class="tips">几万块小额贷款怎么申请？教你6招快速…</div>
              </div>
            </div>
            <div class="right">
              <div class="banner-main top">
                <div class="tips">几万块小额贷款怎么申请？教你6招快速…</div>
              </div>
              <div class="banner-main bottom">
                <div class="tips">几万块小额贷款怎么申请？教你6招快速…</div>
              </div>
            </div>
          </div>
          <article-list :data="resultList"/>
        </div>
        <div class="right">
          <apply/>
          <question/>
        </div>
      </div>
      <footerSame/>
    </div>
    <bottomTap/>
  </div>
</template>
<script>
import footerSame from '@/component/footerSame'
import bottomTap from '@/component/bottomTap'
import articleList from './components/articleList'
import apply from './components/apply'
import question from './components/question'
import { fetchList } from '@/api/consult'
export default {
  components: {
    footerSame,
    articleList,
    bottomTap,
    apply,
    question
  },
  data() {
    return {
      checked: true,
      listQuery: {
        currentPage: 1,
        pageSize: 10
      },
      resultList: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      fetchList(this.listQuery).then(res => {
        this.resultList = res.data.data.list
      })
    },
    handleDetail() {}
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  background: #F5F5F5;
  .consult-wrap {
    width: 1200px;
    margin: 0 auto;
    padding: 30px 0;
  }
  .consult-main {
    display: flex;
    justify-content: space-between;
    .left {
      width: 870px;
      .banner-wrap {
        height: 380px;
        overflow: hidden;
        text-align: center;
        color: #fff;
        .left, .right{
          width: 50%;
          height: 100%;
          float: left;
        }
        .left {
          .banner-main {
            height: 100%;
            background: url('../../../static/consult/top1.png') center center no-repeat;
          }
        }
        .right {
          .banner-main {
            height: 50%;
            &.top {
              background: url('../../../static/consult/top2.png') center center no-repeat;
            }
            &.bottom {
              background: url('../../../static/consult/top3.png') center center no-repeat;
            }
          }
        }
        .banner-main {
          position: relative;
          .tips {
            position: absolute;
            opacity: 0;
            bottom: 0;
            left: 0;
            height: 50px;
            width: 100%;
            line-height: 50px;
            transition: all 2s;
            background: rgba($color: #000000, $alpha: .8);
          }
          &:hover .tips {
            opacity: 1;
          }
        }
      }

    }
    .right {
      width: 300px;
    }
  }
}
</style>
