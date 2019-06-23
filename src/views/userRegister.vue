<template>
  <div>
    <registerTop/>
    <div class="wrappy">
      <div class="w900">
        <div class="user-main">
          <div class="user-title">
            <div class="title">欢迎注册就能贷网</div>
            <div class="number">已有账号，</div>
            <div class="login" @click="loginPush">立即登陆</div>
          </div>
          <el-form
            ref="form"
            :model="form"
            :rules="rules"
            label-position="right"
            label-width="100px"
          >
            <div class="user-form">
              <div class="person-item clearfix">
                <el-form-item label="姓名:" prop="borrowerName" style="width: 300px;">
                  <el-input v-model="form.borrowerName" type="text" placeholder="请输入姓名"/>
                </el-form-item>
              </div>
              <div class="person-item clearfix">
                <el-form-item label="性别:" prop="borrowerSex">
                  <el-radio-group v-model="form.borrowerSex">
                    <el-radio :label="1" :value="1">男</el-radio>
                    <el-radio :label="0" :value="0">女</el-radio>
                  </el-radio-group>
                </el-form-item>
              </div>
              <div class="person-item clearfix">
                <el-form-item label="贷款金额:" prop="loanAmount" style="width: 300px;">
                  <el-input v-model="form.loanAmount" type="text" autocomplete="off" placeholder="请输入贷款金额（万元）"/>
                </el-form-item>
              </div>
              <div class="person-item clearfix">
                <el-form-item label="所在地:" prop="borrowerAddress">
                  <el-select v-model="form.borrowerAddress" style="width: 140px;" @change="getCity">
                    <el-option
                      v-for="item in provinceData"
                      :key="item.pid"
                      :label="item.provincial"
                      :value="item.pid"
                      style="width: 140px;"
                    />
                  </el-select>
                  <el-select v-model="form.borrower2" style="margin-left: 10px;width: 140px;">
                    <el-option
                      v-for="item in cityData"
                      :key="item.cid"
                      :label="item.city"
                      :value="item.cid"
                      style="width: 140px;"
                    />
                  </el-select>
                </el-form-item>
              </div>
              <div class="person-item clearfix">
                <el-form-item label="手机号:" prop="phone" style="width: 300px;">
                  <el-input
                    v-model="form.phone"
                    type="text"
                    autocomplete="off"
                    placeholder="请输入手机号"
                  />
                </el-form-item>
              </div>
              <div class="person-item clearfix">
                <el-form-item label="验证码:" prop="password" style="width: 20  0px; float: left">
                  <el-input v-model="form.password" type="text" autocomplete="off" placeholder="请输入验证码"/>
                </el-form-item>
                <div class="fll verify">
                  <div v-if="showing" class="send" @click="send">{{ verifyCode }}</div>
                  <div v-else class="time send">{{ time }}s</div>
                </div>
              </div>
              <div class="person-item clearfix">
                <el-form-item>
                  <div class="clearfix register">
                    <div class="agree" @click="register">同意协议并注册</div>
                    <div
                      class="immediate"
                      @click="$router.push({path:'/home', query:{login:1}})"
                    >已有账号？立即登陆</div>
                  </div>
                  <div class="agreement">
                    <el-checkbox v-model="isChecked"/>阅读并同意
                    <a href="#/agreement?userProtect" target="_blank">《9能贷用户隐私保护政策》</a>
                    <a href="#/agreement?userRegister" target="_blank">《9能贷用户注册协议》</a>
                  </div>
                </el-form-item>
              </div>
            </div>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import registerTop from '../component/registerTop'
import { mapState, mapMutations } from 'vuex'
import validater from '../util/validater'
import { validaterName } from '@/util/validate'
export default {
  name: 'UserRegister',
  components: {
    registerTop
  },
  computed: {
    ...mapState(['userInfo'])
  },
  data() {
    const validateName = (rule, value, callback) => {
      if (value) {
        if (validaterName(value)) {
          callback()
        } else {
          callback(new Error('姓名格式错误'))
        }
      } else {
        callback(new Error('姓名不能为空'))
      }
    }
    const validateAddress = (rule, value, callback) => {
      if (this.form.borrowerAddress && this.form.borrower2) {
        callback()
      } else {
        callback(new Error('请选择地址'))
      }
    }
    return {
      isChecked: true,
      showing: true,
      time: 60,
      verifyCode: '发送验证码',
      form: {
        phone: '',
        borrowerName: '',
        borrowerSex: 1,
        borrowerAddress: '',
        borrower2: '',
        password: '',
        loanAmount: '',
        flag: false
      },
      // 省
      provinceData: [],
      // 市 区
      cityData: [],

      rules: {
        phone: [
          { validator: validater.phoneNumber, trigger: 'change' },
          { required: true, trigger: 'change', message: '手机号不能为空' }
        ],
        loanAmount: [
          { required: true, trigger: 'change', message: '贷款金额不能为空' },
          { validator: validater.loanAmountValidator, trigger: 'change' }
        ],
        password: [
          { required: true, trigger: 'change', message: '验证码不能为空' }
        ],
        borrowerName: [
          { required: true, trigger: 'change', validator: validateName }
        ],
        borrowerSex: [{ required: true, trigger: 'change', message: '必填' }],
        borrowerAddress: [
          { required: true, trigger: 'change', validator: validateAddress }
        ],
        borrower2: [{ required: true, trigger: 'change', message: '必填' }]
      }
    }
  },
  methods: {
    ...mapMutations(['SET_USER']),
    loginPush() {
      this.$router.push({ path: '/home', query: { login: 1 }})
    },
    clearTimer(timer) {
      clearInterval(timer)
      this.showing = true
      this.verifyCode = '重新获取'
      this.time = 60
    },
    //  检测手机号是否被注册
    checkPhone(timer) {
      this.$axios.get(`user/selectPhone/${this.form.phone}`).then(res => {
        if (res.status === 200) {
          this.$message.warning('手机号已注册')
          this.clearTimer(timer)
        } else if (res.status === 500) {
          // 手机号未被注册
          this.getCode()
        }
      })
    },
    getCode() {
      this.$axios.get(`base/getRegisterCode/${this.form.phone}`).then(res => {
        if (res.status === 200) {
          this.$message.warning('验证码发送成功，请注意查收')
        } else {
          this.$message.warning(res.msg)
        }
      })
    },
    //  获取验证码
    send() {
      if (this.form.phone) {
        this.showing = false
        const timer = setInterval(() => {
          this.time--
          if (this.time < 0) {
            this.clearTimer(timer)
          }
        }, 1000)
        this.checkPhone(timer)
      } else {
        this.$message.warning('请输入手机号')
      }
    },
    // 注册
    register() {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.isChecked) {
            if (!this.flag) {
              const data = new FormData()
              for (const item in this.form) {
                data.append(item, this.form[item])
              }
              this.$axios.post('userBorrower/registerBorrower', data).then(res => {
                if (res.status === 200) {
                  setTimeout(() => {
                    this.$router.push({
                      path: '/registerJump',
                      query: { number: this.form.phone }
                    })
                  }, 1000)
                } else {
                  this.$message.warning(res.msg)
                }
              })
              this.flag = true
              if (this.flag) {
                setTimeout(() => {
                  this.flag = false
                }, 5000)
              }
            } else {
              this.$message.warning('请不要重复点击')
            }
          } else {
            this.$message.warning('注册前请阅读并同意相关协议')
          }
        } else {
          return false
        }
      })
    },
    // 获取省
    getProvince() {
      this.$axios.get('city/getAllProvincial').then(res => {
        this.provinceData = res
      })
    },
    // 获取 市 区
    getCity(val) {
      this.form.borrower2 = ''
      this.$axios.get(`city/getAllCity/${val}`).then(res => {
        this.cityData = res
      })
    }
  },
  created() {
    this.getProvince()
  }
}
</script>

<style scoped lang="scss">
.w900 {
  width: 900px;
  margin: 0 auto;
}
.ml20 {
  margin-left: 20px;
}
.user-main {
  height: 600px;
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
  .user-form {
    width: 400px;
    margin: 20px auto;
    .person-item {
      .verify {
        .send {
          text-align: center;
          width: 80px;
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
      .person-text {
        text-align: right;
        width: 70px;
        height: 40px;
        font-size: 14px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(81, 81, 81, 1);
        line-height: 40px;
      }
      input {
        width: 250px;
        height: 40px;
        border: 1px solid #ccc;
        border-radius: 5px;
        padding: 13px 10px;
        box-sizing: border-box;
        font-size: 14px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(81, 81, 81, 1);
        line-height: 40px;
      }
      .name,
      .card {
        width: 100px;
        height: 40px;
      }
      .radio {
        margin-top: 9px;
        margin-left: 19px;
      }
      /deep/ .el-radio__label {
        color: #aaa;
      }
      /deep/ .is-checked .el-radio__inner {
        border-color: #333;
        background: #fff;
        &:after {
          background-color: #333;
        }
      }
      /deep/ .is-checked + .el-radio__label {
        color: #333;
      }
      /deep/ .el-radio__inner:hover {
        border-color: #333;
      }
    }
  }
  .agreement {
    margin: 20px auto;
    font-size: 12px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    line-height: 12px;
    white-space: nowrap;
    a {
      color: rgba(74, 144, 226, 1);
    }
  }
  .immediate {
    display: inline-block;
    width: 120px;
    height: 40px;
    font-size: 12px;
    cursor: pointer;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(74, 144, 226, 1);
    line-height: 40px;
    margin-left: 20px;
  }
  .agree {
    display: inline-block;
    width: 280px;
    height: 40px;
    background: rgba(168, 14, 14, 1);
    cursor: pointer;
    font-size: 16px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 40px;
    text-align: center;
    border-radius: 5px;
  }
  .register {
    width: 280px;
    white-space: nowrap;
  }
}
/deep/ .el-input__inner {
  padding: 0 5px;
}
</style>
