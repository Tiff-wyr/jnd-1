<template>
  <div>
    <div class="user-top">
      <div class="w1200">
        <div class="clearfix">
          <div class="fll clearfix">
            <img src="/static/1.png" alt="" style="cursor: pointer;float: left;margin-top: 7px;" @click="$router.push('/')">
            <div class="fll user-text" style="cursor: pointer" @click="$router.push('/')">9能贷</div>
            <div class="fll user-text"> | </div>
            <div :class="this.$route.path === '/userRegister' ? 'active fll user-text cursor-re' : 'fll user-text cursor-re'" @click="user">个人注册</div>
          </div>
          <div class="flr clearfix">
            <div :class="this.$route.path === '/agentRegister' ? 'active fll user-text agent cursor-re' : 'fll user-text agent cursor-re'" @click="agent">信贷经理注册</div>
            <div class="fll user-text"> | </div>
            <div :class="this.$route.path === '/organRegister' ? 'active fll user-text cursor-re' : 'fll user-text cursor-re'" @click="organ">机构注册</div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import router from '../router/index'
export default {
  name: 'RegisterTop',
  methods: {
    user() {
      router.push('/userRegister')
    },
    agent() {
      router.push('/agentRegister')
    },
    organ() {
      router.push('/organRegister')
    }
  }
}
</script>

<style scoped lang="scss">

  .cursor-re{
    cursor: pointer;
  }
  .user-top{
    width: 100%;
    height:60px;
    background:rgba(255,255,255,1);
  .circle{
    width:50px;
    height:50px;
    border-radius: 50%;
    margin-top: 5px;
    margin-bottom: 5px;
  }
     .user-text{
    height:60px;
    font-size:14px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(81,81,81,1);
    line-height:60px;
    margin-left: 14px;

  }
    .active{
      color:rgba(168,14,14,1);
    }
  }
</style>
