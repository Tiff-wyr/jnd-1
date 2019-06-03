<template>
  <div>
    <div class="footer">
      <div class="partner">合作机构</div>
      <div style="margin-top: 28px">
        <a href="http://www.boc.cn/" v-for="item in bankList" :key="item" target="_blank">
          <img :src="item" alt="" class="ml42">
        </a>
      </div>
    </div>
  </div>
</template>

<script>
const bankList = ['../../static/resource/bank1.png', '../../static/resource/bank2.png', '../../static/resource/bank3.png', '../../static/resource/bank4.png', '../../static/resource/bank5.png', '../../static/resource/bank6.png']
export default {
  name: "footerSame",
  data() {
    return {
      bankList
    };
  }
};
</script>

<style scoped lang="scss">
.footer {
  width: 1200px;
  height: 228px;
  background: rgba(255, 255, 255, 1);
  margin-top: 30px;
  .partner {
    font-size: 20px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(168, 14, 14, 1);
    line-height: 65px;
    padding-left: 40px;
    border-bottom: 2px solid #f0f0f0;
  }
}
</style>
