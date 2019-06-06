<template>
  <div>
    <div class="footer">
      <div class="partner">合作机构</div>
      <div style="margin-top: 28px">
        <a v-for="item in bankList" :key="item.src" target="_blank" :href="item.src">
          <img :src="item.imgUrl" alt="" class="ml42">
        </a>
      </div>
    </div>
  </div>
</template>
<script>
const bankList = [
  { label: '中国银行', id: 1, src: 'http://www.boc.cn', imgUrl: '../../static/resource/bank1.png' },
  { label: '中国工商银行', id: 2, src: 'http://www.icbc.com.cn', imgUrl: '../../static/resource/bank2.png' },
  { label: '中国建设银行', id: 3, src: 'http://www.ccb.com', imgUrl: '../../static/resource/bank3.png' },
  { label: '中信银行', id: 4, src: 'http://www.citicbank.com', imgUrl: '../../static/resource/bank4.png' },
  { label: '中国农业银行', id: 5, src: 'http://www.abchina.com', imgUrl: '../../static/resource/bank5.png' },
  { label: '中国光大银行', id: 6, src: 'http://www.cebbank.com', imgUrl: '../../static/resource/bank6.png' },
]
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
