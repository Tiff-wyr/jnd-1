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
中国银行：www.boc.cn

工商银行：www.icbc.com.cn

建设银行：www.ccb.com

中信银行：www.citicbank.com

农业银行：www.abchina.com

光大银行：www.cebbank.com
<script>
const bankList = [
  { label: '中国银行', id: 1, src: 'www.boc.cn', imgUrl: '../../static/resource/bank1.png' },
  { label: '中国工商银行', id: 2, src: 'www.icbc.com.cn', imgUrl: '../../static/resource/bank2.png' },
  { label: '中国建设银行', id: 3, src: 'www.ccb.com', imgUrl: '../../static/resource/bank3.png' },
  { label: '中信银行', id: 4, src: 'www.citicbank.com', imgUrl: '../../static/resource/bank4.png' },
  { label: '中国农业银行', id: 5, src: 'www.abchina.com', imgUrl: '../../static/resource/bank5.png' },
  { label: '中国光大银行', id: 6, src: 'www.cebbank.com', imgUrl: '../../static/resource/bank6.png' },
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
