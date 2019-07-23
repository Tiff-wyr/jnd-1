<template>
  <div class="app-container">
    <div class="consult-wrap">
      <div class="consult-main">
        <div class="left">
          <div class="banner-wrap">
            <div class="left">
              <div class="banner-main">
                <!-- <div class="tips">几万块小额贷款怎么申请？教你6招快速…</div> -->
              </div>
            </div>
            <div class="right">
              <div class="banner-main top">
                <!-- <div class="tips">几万块小额贷款怎么申请？教你6招快速…</div> -->
              </div>
              <div class="banner-main bottom">
                <!-- <div class="tips">几万块小额贷款怎么申请？教你6招快速…</div> -->
              </div>
            </div>
          </div>
          <!-- <article-list :data="resultList"/> -->
          <tabbar :tabbar="tabbarArr" @change="handleTabbar">
            <articleList :data="resultList"/>
          </tabbar>
          <tabbar :tabbar="tabbarArr2" @change="handleTabbar2">
            <articleList :data="resultList2"/>
          </tabbar>
          <loanEncyclopedia :data="bkList"/>

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
import tabbar from './components/tabbar'
import articleList from './components/articleList'
import loanEncyclopedia from './components/loanEncyclopedia'
import apply from './components/apply'
import question from './components/question'
import { fetchUp, fetchDown } from '@/api/consult'
const tabbarArr = [
  { label: '中信银行', id: 1 },
  { label: '工商银行', id: 2 },
  { label: '建设银行', id: 3 },
  { label: '交通银行', id: 4 },
  { label: '农业银行', id: 5 },
  { label: '中国银行', id: 6 }
]
const tabbarArr2 = [
  { label: '个人贷款', id: 7 },
  { label: '小额贷款', id: 8 },
  { label: '抵押贷款', id: 9 },
  { label: '信用贷款', id: 10 },
  { label: '新手贷款', id: 11 },
  { label: '贷款攻略', id: 12 }
]
export default {
  metaInfo: {
    title: '金融资讯_互联网金融资讯_金融资讯平台_北京金融资讯_最新金融资讯_9能贷款',
    meta: [{
      name: 'keyWords',
      content: '金融资讯,金融资讯类,金融资讯协会,最新金融资讯,金融资讯行业,金融资讯网,金融资讯新闻,今日金融资讯,财经金融资讯,金融资讯北京,金融资讯类,金融资讯公司,金融资讯app,银行金融资讯,汽车金融资讯,金融资讯服务,金融资讯行业分析,2019年金融资讯,互联网金融资讯门户'
    }, {
      name: 'description',
      content: '9能贷联合各类大型的金融机构,深度挖掘安全的金融服务渠道机构,为用户提供安全、多元的贷款产品和定制化的专业资金服务,打造更契合用户自身需求的贷款管理方案.金融资讯平台哪家最好.专业金融资讯平台,9能贷款.'
    }]
  },
  components: {
    footerSame,
    tabbar,
    articleList,
    loanEncyclopedia,
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
      resultList: [],
      resultList2: [],
      tabbarArr,
      tabbarArr2,
      bkList: []
    }
  },
  created() {
    this.getUp(1)
    this.getUp2(7)
    this.getDown()
  },
  methods: {
    getUp(id) {
      fetchUp(id).then(res => {
        this.resultList = res.data.data
      })
    },
    getUp2(id) {
      fetchUp(id).then(res => {
        this.resultList2 = res.data.data
      })
    },
    getDown() {
      fetchDown().then(res => {
        console.log(res)
        this.bkList = res.data.data
      })
    },
    handleTabbar(id) {
      this.getUp(id)
    },
    handleTabbar2(id) {
      this.getUp2(id)
    }
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
