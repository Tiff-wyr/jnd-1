<template>
  <div class="app-container">
    <div class="consult-wrap">
      <div class="consult-main">
        <div class="left">
          <div class="title-wrap">
            <h2 class="title">{{ resultData.topic }}</h2>
            <acticle-footer :time="resultData.releaseTime" :source="resultData.source" :num="resultData.viewNumber"/>
          </div>
          <div class="consult-content" v-html="resultData.content"/>
          <div class="consult-footer">
            <div :title="upDownData.upTopic" class="prev common" @click="handleUpDown(upDownData.upId)">上一篇: {{ upDownData.upTopic | titleFitler }}</div>
            <div :title="upDownData.downTopic" class="next common" @click="handleUpDown(upDownData.downId)">下一篇: {{ upDownData.downTopic | titleFitler }}</div>
          </div>
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
import apply from './components/apply'
import question from './components/question'
import acticleFooter from './components/acticleFooter'
import { fetchDetail, addNum, upDownArticle } from '@/api/consult'
import { backTop } from '@/util/util'
export default {
  name: 'ConsultDetail',
  metaInfo: {
    title: '贷款资讯_质押贷款资讯_创业贷款资讯_新车贷款资讯_贷款产品资讯找9能贷款',
    meta: [{
      name: 'keyWords',
      content: '9nengdai,贷款新闻资讯,贷款最新资讯,银行贷款资讯,汽车贷款资讯,小额贷款资讯,贷款行业资讯,贷款资讯网,最新贷款资讯,农民贷款资讯,抵押贷款资讯,银行贷款最新资讯,工商银行贷款资讯,汽车贷款行业资讯,金融贷款发展资讯,按揭贷款 房产新闻资讯,贷款汽车资讯,汽车贷款最新资讯,资讯小额贷款,大额抵押贷款资讯,建设银行贷款资讯,投资资讯贷款怎么样'
    }, {
      name: 'description',
      content: '9能贷款联合各类大型的金融机构,深度挖掘安全的金融服务渠道机构,为用户提供安全、多元的贷款产品和定制化的专业资金服务,打造更契合用户自身需求的贷款管理方案.找贷款,找经纪人,找机构,办理贷款上9能贷款;放款快,利率低0.35%,额度高,门槛低,渠道广.商业银行个人住房贷款资讯,贷款资讯信息,库存质押贷款风险点的相关资讯,贷款资讯 应用,信用贷款新闻资讯,投资资讯贷款下载,金融资讯贷款'
    }]
  },
  filters: {
    titleFitler(val) {
      if (val) {
        return val
      } else {
        return '暂无'
      }
    }
  },
  components: {
    footerSame,
    bottomTap,
    apply,
    acticleFooter,
    question
  },
  data() {
    return {
      resultData: {},
      upDownData: {},
      interval: null
    }
  },
  created() {
    const id = location.href.split('?')[1].split('=')[1]
    this.getData(id)
    this.readArticle(id)
    this.getUpDown(id)
  },
  methods: {
    getData(id) {
      fetchDetail(id).then(res => {
        this.resultData = res.data.data
      })
    },
    getUpDown(id) {
      upDownArticle(id).then(res => {
        this.upDownData = res.data.data
      })
    },
    handleUpDown(id) {
      if (id) {
        this.getData(id)
        this.getUpDown(id)
        this.readArticle(id)
        backTop()
        location.hash = '/consultDetail?id=' + id
      }
    },
    readArticle(id) {
      addNum(id)
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
      position: relative;
      width: 870px;
      background: #fff;
      color: #515151;
      font-size: 14px;
      .title-wrap {
        padding: 24px 30px;
        border-bottom: 1px solid #D9D9D9;
        .title {
          margin-bottom: 8px;
        }
      }
      .consult-content {
        line-height: 1.5;
        font-size: 16px;
        padding: 30px 20px 140px;
        img {
          max-width: 200px;
        }
      }
      .consult-footer {
        position: absolute;
        bottom: 0;
        width: 100%;
        padding: 40px 30px;
        box-sizing: border-box;
        border-top: 1px solid #D9D9D9;
        overflow: hidden;
        .common {
          cursor: pointer;
        }
        .prev, .next {
          width: 45%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .prev {
          float: left;
        }
        .next {
          float: right;
        }
      }
    }
    .right {
      width: 300px;
    }
  }
}
</style>
