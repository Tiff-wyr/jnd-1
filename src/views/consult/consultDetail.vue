<template>
  <div class="app-container">
    <div class="consult-wrap">
      <div class="consult-main">
        <div class="left">
          <div class="title-wrap">
            <h2 class="title">实得分进度款说反了是打开</h2>
            <acticle-footer></acticle-footer>
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
export default {
  components: {
    footerSame,
    bottomTap,
    apply,
    acticleFooter,
    question
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
      background: #fff; 
      color: #515151;
      .title-wrap {
        padding: 24px 30px;
        border-bottom: 1px solid #D9D9D9;
        .title {
          margin-bottom: 8px;
        }
      }
    }
    .right {
      width: 300px;
    }
  }
}
</style>
