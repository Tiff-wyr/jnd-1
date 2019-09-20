<template>
  <div>
    <registerTop/>
    <div class="wrappy">
      <div class="w900">
        <div class="user-main">
          <div class="user-title">
            <div class="title">欢迎注册9能贷网</div>
            <div class="number">已有账号，</div>
            <div class="login" @click="loginPush">立即登陆</div>
          </div>
          <div class="apply-box">
            <apply :if-register="true" :steps="step" @register="handleRegister"/>
          </div>
        </div>
      </div>
    </div>
    <el-dialog :visible.sync="dialogVisible" :show-close="false" width="700px">
      <div class="dialog-title">
        <img src="../assets/title.png" alt="">
      </div>
      <div class="dialog-container">
        <p>恭喜您成功注册为9能贷平台会员，可享受更多平台服务。您可完善您的贷款资料，有助于提高贷款成功率，更加便捷的使用平台</p>
        <div class="btn-box">
          <div class="btn"><a href="/home">登录首页</a></div>
          <div class="btn update" @click="handleUpdate">完善资料</div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import registerTop from '../component/registerTop'
import apply from '@/component/apply'
export default {
  name: 'UserRegister',
  components: {
    registerTop,
    apply
  },
  data() {
    return {
      dialogVisible: false,
      step: 1
    }
  },
  methods: {
    handleRegister() {
      this.dialogVisible = true
    },
    handleUpdate() {
      console.log(this.step)
      this.step = 2
      this.dialogVisible = false
      console.log(this.step)
    },
    loginPush() {
      this.$router.push({ path: '/', query: { login: 1 }})
    }
  }
}
</script>

<style scoped lang="scss">
.apply-box {
  margin-top: 30px;
}
.dialog-title {
  text-align: center;
  transform: translateY(-30px);
}
.dialog-container {
  margin: 0 150px;
  font-size: 16px;
  color: #515151;
  line-height: 1.5;
  .btn-box {
    display: flex;
    align-items:center;
    justify-content: space-around;
    margin-top: 30px;
    .btn {
      width: 90px;
      height: 36px;
      line-height: 36px;
      border-radius: 4px;
      border:1px solid #D9D8D9;
      text-align: center;
      a {
        color: #515151;
      }
      &.update {
        background: $jnd-bg-color-theme;
        color: #fff;
        border-color: transparent;
        cursor: pointer;
      }
    }
  }
}
.w900 {
  width: 900px;
  margin: 0 auto;
}
.user-main {
  position: relative;
  background: rgba(255, 255, 255, 1);
  .user-title {
    width: 100%;
    height: 90px;
    border-bottom: 1px solid #eee;
    position: relative;
    .title {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      font-size: 24px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(81, 81, 81, 1);
    }
    .number {
      opacity: 0.5;
      position: absolute;
      left: 655px;
      top: 40px;
      font-size: 14px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(81, 81, 81, 1);
    }
    .login {
      position: absolute;
      left: 720px;
      top: 40px;
      font-size: 14px;
      cursor: pointer;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(168, 14, 14, 1);
    }
  }
}
</style>
