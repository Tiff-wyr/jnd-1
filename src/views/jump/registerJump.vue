<template>
  <div>
    <layout/>
    <div class="wrappy">
      <div class="free">
        <div class="title">注册成功</div>
        <div class="clearfix w350">
          <img src="/static/resource/appVic.png" alt="">
          <div class="fll">
            <div class="same">恭喜您成为9能金科平台会员，您可以通过</div>
            <div class="same">账号：{{ number }}</div>
            <div class="same">密码：{{ code }}</div>
            <div class="same">
              <span class="reHome" @click="$router.push({path:'/',query:{login:1}})">登录</span>平台，即可享受平台专业的金融服务
            </div>
            <div class="reHome same" style="margin-top: 5px" @click="$router.push('/')">返回首页</div>
          </div>
        </div>
      </div>
    </div>
    <bottomTap/>
  </div>
</template>

<script>
import bottomTap from '../../component/bottomTap'
import layout from '../../layout/layout'
export default {
  name: 'ApplyVictory',
  components: {
    bottomTap,
    layout
  },
  data() {
    return {
      number: '',
      code: '',
      flag: true
    }
  },
  created() {
    console.log(this.$route.query)
    if (this.$route.query.number) {
      this.number = this.$route.query.number
      this.code = this.$route.query.code
    }
  },
  methods: {
    click() {
      if (this.flag) {
        this.flag = false
        let num = 5
        const timer = setInterval(() => {
          num--
          if (!num) {
            this.flag = true
            clearInterval(timer)
          }
        }, 1000)
      } else {
        alert('点击过快')
      }
    }
  }
}
</script>

<style scoped lang="scss">
.free {
  width: 1200px;
  margin: 0 auto;
  height: 236px;
  background: rgba(255, 255, 255, 1);
  padding: 24px 30px;
  box-sizing: border-box;
  .w350 {
    width: 400px;
    margin: 0 auto;
    img {
      float: left;
      width: 104px;
      height: 84px;
      margin-right: 5px;
    }
  }
  .title {
    height: 18px;
    font-size: 18px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(81, 81, 81, 1);
    line-height: 18px;
    margin-bottom: 60px;
  }
  .victory {
    font-size: 16px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(168, 14, 14, 1);
    line-height: 25px;
  }
  .vic-text {
    font-size: 16px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: #515151;
    line-height: 25px;
  }
}

.same {
  font-size: 12px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(0, 0, 0, 1);
  line-height: 17px;
}
.reHome {
  width: 48px;
  color: rgba(168, 14, 14, 1);
  cursor: pointer;
  border-bottom: 1px solid #a80e0e;
}
</style>
