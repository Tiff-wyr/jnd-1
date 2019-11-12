<template>
  <div :style="styleOptions">
    <header class="header-wrap">
      <!-- 操作条 -->
      <main class="header-main">
        <div class="action-bar">
          <div class="action-content">
            <template v-if="!userInfo">
              <span class="agent tag">
                <span class="tag-text">信贷经理</span>
                <div class="toggle">
                  <p @click="login">信贷经理登录</p>
                  <p @click="handleRegister('agent')">信贷经理入驻</p>
                </div>
              </span>
              <span class="cut-off">|</span>
              <span class="agent tag">
                <span class="tag-text" @click="login">用户登录</span>
                <div class="toggle">
                  <p @click="login">贷款用户登录</p>
                  <p @click="handleRegister('user')">贷款用户注册</p>
                </div>
              </span>
            </template>
            <template v-else>
              <span class="text" @click="personDetail(userInfo.roleId,userInfo.id)">欢迎{{ userInfo === null? '' : userInfo.name }}&nbsp;&nbsp;个人中心</span>
              <span class="text">|</span>
              <span class="text" @click="logout">退出</span>
            </template>
            <a class="text gray download tips" href="/guide">帮助中心</a>
            <a class="text gray tips" href="/download">
              下载APP
              <div class="code-box">
                <img src="../../assets/download/code.png" alt="">
                <span>9能贷APP</span>
              </div>
            </a>
          </div>
        </div>
        <!-- 导航条 -->
        <nav class="nav-bar">
          <div class="nav-content">
            <div>
              <img src="/static/1.png" alt="">
            </div>
            <div>
              <router-link v-for="(item, index) in linkList" :key="index" :style="$route.meta.classify === item.link ? 'color:#a80e0e' : 'color:#333333'" :to="item.to">{{ item.name }}</router-link>
            </div>
          </div>
        </nav>
      </main>
    </header>

    <div v-show="isMask" class="mask" @click="closeMask"/>
    <div v-show="isContain" class="contain">
      <div class="subNum" @click="subNum">X</div>
      <el-tabs>
        <el-tab-pane>
          <span slot="label">短信登录</span>
          <el-form :model="loginNum" :rules="rules" label-position="right" label-width="80px">
            <div class="form-con">
              <el-form-item prop="phone" style="width: 360px;margin-left: -80px;">
                <el-input v-model="loginNum.phone" type="text" placeholder="输入手机号"/>
              </el-form-item>
              <div class="clearfix">
                <el-form-item style="width: 250px;margin-left: -80px;float: left;">
                  <el-input v-model="loginNum.code" type="password" placeholder="输入短信验证码"/>
                </el-form-item>
                <div class="fll verify">
                  <div v-if="showing" class="send" @click="send">{{ verifyCode }}</div>
                  <div v-else class="time send">{{ time }}s</div>
                </div>
              </div>
              <div class="btn" @click="handleLogin">登&nbsp;&nbsp;录</div>
              <div class="form-desc">
                还没有就能贷账号?
                <span class="register" @click="goRegister">&nbsp;立即注册</span>
              </div>
            </div>
          </el-form>
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label">账号登录</span>
          <el-form :model="passwordLogin" :rules="rule" label-position="right" label-width="80px">
            <div class="form-con">
              <el-form-item prop="phone" style="width: 360px;margin-left: -80px;">
                <el-input v-model="passwordLogin.phone" type="text" placeholder="输入手机号"/>
              </el-form-item>
              <el-form-item style="width: 360px;margin-left: -80px;">
                <el-input v-model="passwordLogin.password" type="password" placeholder="输入密码" @keyup.enter.native="loginTrue"/>
              </el-form-item>
              <div class="clearfix mt12">
                <el-checkbox v-model="checked">自动登录</el-checkbox>
                <div class="flr password" @click="findPassword">找回密码?</div>
              </div>
              <div class="btn" @click="loginTrue">登&nbsp;&nbsp;录</div>
              <div class="form-desc">
                还没有就能贷账号?
                <span class="register" @click="liJi">&nbsp;立即注册</span>
              </div>
            </div>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import validater from '@/util/validater'
import { setToken, removeToken } from '@/util/auth'
import { validaterPhone } from '@/util/validate'
const linkOptions = [
  { link: 'home', name: '首页', to: '/' },
  { link: 'loans', name: '贷款产品', to: '/loans' },
  { link: 'agent', name: '信贷经理', to: '/agent' },
  { link: 'organ', name: '贷款机构', to: '/organization' },
  { link: 'consult', name: '贷款资讯', to: '/consult' },
  { link: 'aboutUs', name: '关于平台', to: '/aboutUs' }
]
export default {
  name: 'Header',
  props: {
    styleOptions: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {
      time: 60,
      linkList: linkOptions,
      showing: true,
      isMask: false,
      isContain: false,
      formLabelAlign: {
        number: '',
        verifyCode: ''
      },
      verifyCode: '发送验证码',
      // 验证码登录
      loginNum: {
        code: '',
        phone: ''
      },
      // 密码登录
      passwordLogin: {
        phone: '',
        password: ''
      },
      rules: {
        phone: [{ validator: validater.phoneNumber, trigger: 'change' }]
      },
      rule: {
        phone: [{ validator: validater.phoneNumber, trigger: 'change' }]
      },
      checked: false // 是否使用自动登录
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  watch: {
    '$route': function(val) {
      if (val.path === '/' && val.query.login === 1) {
        this.isMask = true
        this.isContain = true
      }
    }
  },
  created() {
    console.log(!this.userInfo)
    this.loginFrame = this.$route.query.login
    if (this.loginFrame) {
      this.isMask = true
      this.isContain = true
    }
    this.autoLogin()
    console.log(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent))
    if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
      window.location.href = 'http://m.9nengdai.com/'
    }
  },
  methods: {
    ...mapMutations(['SET_USER']),
    // 检测是否 自动登录
    autoLogin() {
      const phone = localStorage.getItem('phone')
      const password = localStorage.getItem('password')
      if (phone && password) {
        this.checked = true
        this.passwordLogin.phone = phone
        this.passwordLogin.password = password
        this.handlePasswordLogin()
      }
    },
    // 用户登录后可进入自己的个人页面
    personDetail(role, id) {
      if (role === 2 || role === 8) {
        this.$router.push(`/agentMessage/${id}`)
      }
      if (role === 1) {
        this.$router.push(`/myMessage/${id}`)
      }
      if (role === 3) {
        this.$router.push(`/organMessage/${id}`)
      }
    },
    handlePasswordLogin() {
      if (this.passwordLogin.phone) {
        if (this.passwordLogin.password) {
          const phone = this.passwordLogin.phone.trim()
          this.$axios.get(`user/selectPhone/${phone}`).then(res => {
            if (res.status === 500) {
              this.$message.warning(res.msg)
              this.passwordLogin.phone = ''
              this.passwordLogin.password = ''
            } else {
              this.$axios
                .get(
                  `user/loginByPhoneAndPassword/${this.passwordLogin.phone}/${
                    this.passwordLogin.password
                  }/0`
                )
                .then(res => {
                  if (res.status === 200) {
                    setToken(new Date())
                    this.SET_USER(res.data)
                    this.$message.success(res.msg)
                    this.isMask = false
                    this.isContain = false
                    this.$router.push('/')
                  } else if (res.status === 500) {
                    this.$message.warning(res.msg)
                  }
                })
            }
          })
        } else {
          this.$message.warning('密码不能为空')
        }
      } else {
        this.$message.warning('手机号不能为空')
      }
    },
    subNum() {
      this.isMask = false
      this.isContain = false
      this.showing = true
      this.verifyCode = '发送验证码'
      this.loginNum.phone = ''
      this.loginNum.code = ''
      this.passwordLogin.password = ''
      this.passwordLogin.phone = ''
    },
    closeMask() {
      this.isMask = false
      this.isContain = false
      this.showing = true
      this.verifyCode = '发送验证码'
      this.loginNum.phone = ''
      this.loginNum.code = ''
      this.passwordLogin.password = ''
      this.passwordLogin.phone = ''
      this.time = 60
    },
    // 获取验证码
    send() {
      if (this.loginNum.phone) {
        if (validaterPhone(this.loginNum.phone)) {
          this.time = 60
          this.showing = false
          this.timer = setInterval(() => {
            this.time--
            console.log(this.time)
            if (this.time < 0) {
              clearInterval(this.timer)
              this.showing = true
              this.verifyCode = '重新获取'
              this.time = 60
            }
          }, 1000)
          const phone = this.loginNum.phone.trim()
          this.$axios.get(`user/selectPhone/${phone}`).then(res => {
            if (res.status === 500) {
              this.$message.warning(res.msg)
              this.loginNum.phone = ''
              clearInterval(this.timer)
              this.showing = true
              this.verifyCode = '重新获取'
              this.time = 60
            } else {
              this.$axios
                .get(`base/getLoginCode/${this.loginNum.phone}`)
                .then(res => {
                  if (res.status !== 200) {
                    clearInterval(this.timer)
                    this.showing = true
                    this.verifyCode = '重新获取'
                    this.time = 60
                    this.$message.warning(res.msg)
                  }
                })
            }
          })
        } else {
          this.$message.warning('手机号格式错误')
        }
      } else {
        this.$message.warning('手机号不能为空')
      }
    },
    findPassword() {
      this.$router.push('/findPassword')
    },
    liJi() {
      this.$router.push('/userRegister')
    },
    goRegister() {
      this.$router.push('/userRegister')
    },
    logout() {
      this.SET_USER(null)
      this.loginNum = {
        code: '',
        phone: ''
      }
      this.passwordLogin = {
        phone: '',
        password: ''
      }
      this.showing = true
      this.time = 60
      this.$router.push('/')
      const phone = localStorage.getItem('phone')
      const password = localStorage.getItem('password')
      removeToken()
      if (phone && password) {
        localStorage.removeItem('phone')
        localStorage.removeItem('password')
      } else {
        return
      }
    },
    // 短信登录
    handleLogin() {
      if (this.loginNum.phone) {
        if (this.loginNum.code) {
          this.$axios
            .get(
              `user/loginByPhoneAndCode/${this.loginNum.phone}/${
                this.loginNum.code
              }`
            )
            .then(res => {
              if (res.status === 200) {
                setTimeout(() => {
                  this.$message.success(res.msg)
                  this.SET_USER(res.data)
                  this.isMask = false
                  this.isContain = false
                  this.$router.push('/')
                  setToken(new Date())
                }, 500)
              } else if (res.status === 500) {
                this.$message.warning(res.msg)
              }
            })
        } else {
          this.$message.warning('验证码不能为空')
        }
      } else {
        this.$message.warning('手机号不能为空')
      }
    },
    // 密码登录
    loginTrue() {
      if (this.checked) {
        localStorage.setItem('phone', this.passwordLogin.phone)
        localStorage.setItem('password', this.passwordLogin.password)
      }
      this.handlePasswordLogin()
    },
    handleRegister(val) {
      if (val === 'user') {
        this.$router.push('/userRegister')
      } else {
        this.$router.push('/agentRegister')
      }
    },
    // 点击登录，弹框
    login() {
      this.isMask = true
      this.isContain = true
      this.resetForm()
    },
    resetForm() {
      this.passwordLogin = {
        phone: '',
        password: ''
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@mixin hover {
  position: relative;
  & > .code-box {
    position: absolute;
    top: 100%;
    left: 50%;
    width: 100px;
    padding: 8px 8px 5px;
    display: none;
    box-sizing: border-box;
    transform: translateX(-50%);
    background: $jnd-bg-color-white;
    border: 1px solid #D9D9D9;
    z-index: 99999;
    text-align: center;
    color: $jnd-font-color-base;
    font-size: $jnd-font-size-small;
    line-height: 1.5;
    img {
      width: 100%;
    }
  }
  &:hover {
    background: $jnd-bg-color-white;
    color: $jnd-font-color-base!important;
    .code-box {
      display: block;
    }
  }
}
.gray {
  color: $jnd-font-color-gray!important;
}
.header-wrap {
  color: $jnd-font-size-base;
  .header-main {
    background: $jnd-bg-color-base;
    .action-bar {
      height: 32px;
      line-height: 32px;
      .action-content {
        @include box-center;
        text-align: right;
        .text {
          font-weight: 400;
          font-size: $jnd-font-size-base;
          color: $jnd-font-color-theme;
          line-height: 32px;
          cursor: pointer;
        }
        .tips {
          @include hover;
          margin-left: 10px;
          display: inline-block;
          height: 100%;
        }
        .tag {
          position: relative;
          display: inline-block;
          height: 32px;
          padding: 0 16px;
          color: #4A4A4A;
          border: 1px solid transparent;
          font-size: 14px;
          box-sizing: border-box;
          cursor: pointer;
          &:after {
            display: inline-block;
            content: ' ';
            width: 0;
            height: 0;
            border-width: 6px;
            border-style: solid;
            border-color: #4A4A4A transparent transparent transparent;
            vertical-align: text-bottom;
            margin-left: 4px;
          }
          &:hover {
            background: #fff;
            border: 1px solid #CBCBD0;
            border-bottom: none;
            p {
              color: #4A4A4A;
            }
            &:after {
              transform: rotate(-180deg);
              vertical-align: text-top;
            }
            .toggle {
              display: block;
            }
          }
          .tag-text:hover {
            color: #A80E0E;
          }
          .toggle {
            position: absolute;
            display: none;
            top: 100%;
            width: 100%;
            background: #fff;
            left: -1px;
            text-align: center;
            border: 1px solid #CBCBD0;
            border-top: none;
            z-index: 999;
            p:hover {
              color: #A80E0E;
            }
          }
        }
        .cut-off {
          margin: 0 10px;
        }
      }
    }
    .nav-bar {
      background: $jnd-bg-color-white;
      .nav-content {
        @include box-center;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 60px;
        a {
          margin-right: 50px;
          .active {
            color: $jnd-font-color-theme;
          }
          &:hover {
            color: $jnd-font-color-theme;
          }
        }
      }
    }
  }
}

  .mask {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: #000;
    opacity: 0.7;
    z-index: 1000;
  }
.contain {
  position: fixed;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%);
  width: 388px;
  height: 368px;
  background: rgba(255, 255, 255, 1);
  border-radius: 4px;
  z-index: 1001;
  .subNum {
    position: absolute;
    top: 10px;
    right: 20px;
    font-size: 16px;
    color: #ccc;
    cursor: pointer;
    z-index: 999;
  }
  /deep/ .el-tabs__nav-scroll {
    position: relative;
    height: 76px;
    .el-tabs__nav {
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      text-align: center;
      line-height: 76px;
      .el-tabs__item {
        font-size: 16px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(81, 81, 81, 1);
      }
    }
  }
  /deep/ .is-active {
    color: rgba(168, 14, 14, 1) !important;
  }
  /deep/ .el-tabs__active-bar {
    display: none;
  }
}
  .form-con {
    padding: 8px 50px 40px 44px;
    box-sizing: border-box;
    .verify {
      .send {
        text-align: center;
        width: 95px;
        height: 38px;
        border-radius: 4px;
        border: 1px solid #ccc;
        font-size: 12px;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: rgba(155, 155, 155, 1);
        line-height: 38px;
        margin-left: 20px;
        cursor: pointer;
      }
      .time {
        font-size: 16px;
        color: #888;
      }
    }
    .number {
      width: 300px;
      height: 40px;
      border: 1px solid #ccc;
      border-radius: 5px;
      padding: 10px 10px;
      box-sizing: border-box;
      font-size: 14px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(81, 81, 81, 1);
      line-height: 40px;
      background: rgba(244, 244, 244, 1);
      margin-bottom: 16px;
    }
    .card {
      width: 180px;
      height: 40px;
      background: rgba(244, 244, 244, 1);
      border: 1px solid #ccc;
      border-radius: 5px;
      padding: 10px 10px;
      box-sizing: border-box;
      font-size: 14px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(81, 81, 81, 1);
      line-height: 40px;
    }
    .password {
      height: 14px;
      font-size: 12px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(168, 14, 14, 1);
      line-height: 21px;
      cursor: pointer;
    }
    .btn {
      width: 300px;
      height: 40px;
      background: rgba(168, 14, 14, 1);
      border-radius: 4px;
      text-align: center;
      font-size: 16px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: 40px;
      letter-spacing: 3px;
      margin-top: 20px;
      cursor: pointer;
    }
    .form-desc {
      text-align: center;
      height: 12px;
      font-size: 12px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(155, 155, 155, 1);
      line-height: 12px;
      margin-top: 15px;
      .register {
        color: #a80e0e;
        cursor: pointer;
      }
    }
  }
  /deep/ .el-checkbox__input.is-checked {
    .el-checkbox__inner {
      background-color: rgba(168, 14, 14, 1);
      border-color: rgba(168, 14, 14, 1);
    }
  }
  /deep/ .el-checkbox__input.is-checked + .el-checkbox__label {
    color: rgba(155, 155, 155, 1);
  }
  /deep/ .el-checkbox__inner:hover {
    border-color: rgba(155, 155, 155, 1);
  }
  /deep/ .el-checkbox__input.is-focus .el-checkbox__inner {
    border-color: rgba(155, 155, 155, 1) !important;
  }
  /deep/ .el-checkbox__label {
    height: 14px;
    font-size: 12px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(155, 155, 155, 1);
    line-height: 12px;
  }
</style>
