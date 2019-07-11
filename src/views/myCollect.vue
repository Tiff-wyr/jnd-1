<template>
  <div class="collect">
    <div class="title">我的收藏</div>
    <div class="clearfix">
      <router-link :to="{path:`/myMessage/${userIdn}/myCollect/agentCollect`}" class="agentColl fll">经纪人收藏</router-link>
      <router-link :to="{path:`/myMessage/${userIdn}/myCollect/organCollect`}" class="organColl fll">机构收藏</router-link>
      <router-link :to="{path:`/myMessage/${userIdn}/myCollect/productCollect`}" class="productColl fll">产品收藏</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'MyCollect',
  data() {
    return {
      userIdn: ''
    }
  },
  created() {
    const id = this.$route.params.id
    this.userIdn = id
  }

}
</script>

<style scoped lang="scss">
  .collect{
    width:944px;
    height:610px;
    background-color: #fff;
    .title{
      width: 100%;
      height:66px;
      padding-left: 56px;
      box-sizing: border-box;
      font-size:16px;
      font-family:PingFangSC-Medium;
      font-weight:500;
      color:rgba(81,81,81,1);
      line-height:66px;
    }
    a{
      display: block;
      text-align: center;
      width:314px;
      height:40px;
      background:rgba(250,250,250,1);
      font-size:16px;
      font-family:PingFangSC-Regular;
      font-weight:400;
      color:rgba(81,81,81,1);
      line-height:40px;
      cursor: pointer;
    }
    .router-link-active{
      color: rgba(168, 14, 14, 1);
      background-color: #fff;
      border-top: 2px solid #A80E0E;
    }

  }
</style>
