<template>
  <div>
    <div class="wrappy">
      <div class="w1200">
        <div class="help clearfix">
          <div class="fll">
            <div :class="{active: this.$route.path === '/guide'}" class="help-left" @click="handleHelp(1)">
              <span>贷款指南</span>
              <i class="el-icon-arrow-right flr"/>
            </div>

            <div :class="{active: this.$route.path === '/question'}" class="help-left" @click="handleHelp(2)">
              <span>资质相关问题</span>
              <i class="el-icon-arrow-right flr"/>
            </div>
            <div :class="{active: this.$route.path === '/matter'}" class="help-left" @click="handleHelp(3)">
              <span>相关注意事项</span>
              <i class="el-icon-arrow-right flr"/>
            </div>

            <div class="add1"/>
          </div>
          <div class="fll ml30">
            <router-view/>
          </div>
        </div>
        <footerSame/>
      </div>
    </div>
    <bottomTap/>
  </div>
</template>

<script>
import bottomTap from '../component/bottomTap'
import footerSame from '../component/footerSame'
export default {
  name: 'Help',
  components: {
    footerSame,
    bottomTap
  },
  data() {
    return {

    }
  },
  methods: {
    handleHelp(val) {
      if (val === 1) {
        this.$router.push('/guide')
      } else if (val === 2) {
        this.$router.push('/question')
      } else {
        this.$router.push('/matter')
      }
    }
  }
}
</script>

<style scoped lang="scss">
.ml30{
  margin-left: 30px;
}
  .help-left{
    width: 226px;
    height: 65px;
    background:rgba(255,255,255,1);
    padding: 45px 36px 0 36px;
    box-sizing: border-box;
    cursor: pointer;
    a{
      width:120px;
      height:20px;
      font-size:16px;
      font-family:PingFangSC-Regular;
      font-weight:400;
      color:rgba(81,81,81,1);
      line-height:20px;
    }
    i{
      line-height: 20px;
    }
    &.active{
      color:rgba(168,14,14,1);
    }
  }
  .add1{
    width: 226px;
    height: 55px;
    background:rgba(255,255,255,1);
  }
</style>
