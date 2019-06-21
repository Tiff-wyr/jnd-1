<template>
  <div class="app-container">
    <div class="consult-wrap">
      <div class="consult-main">
        <div class="left">
          <div class="title-wrap">
            <h2 class="title">{{ resultData.topic }}</h2>
            <acticle-footer :time="resultData.releaseTime" :source="resultData.source" :num="resultData.viewNumber"></acticle-footer>
          </div>
          <div class="consult-content" v-html="resultData.content"></div>
          <div class="consult-footer">
            <div class="prev common">上一篇</div>
            <div class="next common">下一篇</div>
          </div>
        </div>
        <div class="right">
          <apply></apply>
          <question></question>
        </div>
      </div>
      <footerSame></footerSame>
    </div>
    <bottomTap></bottomTap>
  </div>
</template>
<script>
import footerSame from "@/component/footerSame";
import bottomTap from "@/component/bottomTap";
import apply from "./components/apply";
import question from "./components/question";
import acticleFooter from './components/acticleFooter'
import { fetchDetail, addNum } from '@/api/consult'
export default {
  name: 'consultDetail',
  components: {
    footerSame,
    bottomTap,
    apply,
    acticleFooter,
    question
  },
  data() {
    return {
      resultData: {}
    }
  },
  created() {
    const id = location.href.split('?')[1].split('=')[1]
    this.getData(id)
    this.readArticle(id)
  },
  methods: {
    getData(id) {
      fetchDetail(id).then(res => {
        console.log(res)
        this.resultData = res.data.data
      })
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
