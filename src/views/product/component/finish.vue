<template>
  <div class="finish">
    <div class="img-box">
      <img src="../../../assets/yes.png" alt="">
    </div>
    <p>您的申请已经提交，请保持电话联系通畅</p>
    <p v-if="show === 'true'">账号：{{ phone }}  密码：{{ code }}（您手机收到的验证码）</p>
    <p v-if="show === 'true'">这是您的平台账号，<a style="color: #a80e0e;" href="javascript:;" @click="$router.push({path:'/',query:{login:1}})">登录</a>平台，即可享受平台专业的金融服务</p>
    <div class="btn-box">
      <el-button class="btn" @click="handleConfirm">完成</el-button>
    </div>

  </div>
</template>
<script>
export default {
  name: 'Finish',
  props: {
    phone: {
      type: String,
      default: ''
    },
    code: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      show: true,
      userInfo: null
    }
  },
  beforeDestroy() {
    sessionStorage.removeItem('show')
    sessionStorage.removeItem('form')
    sessionStorage.removeItem('isPrve')
  },
  created() {
    this.userInfo = sessionStorage.getItem('userInfo')
    this.show = sessionStorage.getItem('show')
    console.log('我控制最后信息的显示', this.show)
    console.log(this.userInfo)
    if (this.userInfo) {
      this.show = false
    }
    console.log('我控制最后信息的显示', this.show)
  },
  methods: {
    handleConfirm() {
      this.$emit('confirm')
    }
  }
}
</script>
 <style lang="scss" scoped>
.finish {
  .img-box {
    width: 48px;
    height: 48px;
    background: $jnd-bg-color-theme;
    border-radius: 50%;
    line-height: 56px;
    margin: 0 auto;
    text-align: center;
    margin-bottom: 26px;
  }
  p {
    padding-left: 50px;
    margin-bottom: 10px;
  }
  .btn-box {
    text-align: center;
    margin-top: 30px;
    .btn {
      background:$jnd-bg-color-theme;
      color: #fff;
      border-color: $jnd-border-color-theme;
      width: 280px;
    }
  }
}
 </style>

