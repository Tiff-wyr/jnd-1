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
            <div class="prev common" @click="handleUpDown(upDownData.upId)">上一篇: {{ upDownData.upTopic | titleFitler }}</div>
            <div class="next common" @click="handleUpDown(upDownData.downId)">下一篇: {{ upDownData.downTopic | titleFitler }}</div>
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
        location.hash = '#/consultDetail?id=' + id
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
        .prev {
          float: left;
        }
        .next {
          float: right
        }
      }
    }
    .right {
      width: 300px;
    }
  }
}
</style>
