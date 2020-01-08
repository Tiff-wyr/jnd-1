<template>
  <div class="apply-wrap bg-white">
    <h2 class="title slide-bar">贷款申请</h2>
    <div class="loan-main">
      <el-form ref="applyForm" :model="applyForm" :rules="applyRules">
        <el-form-item prop="borrowerName">
          <el-input v-model="applyForm.borrowerName" :disabled="isUpdate" class="w130" placeholder="请输入您的姓名"/>
          <el-radio-group v-model="applyForm.sex" :disabled="isUpdate" style="margin-left: 10px;">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="loanAmount">
          <el-input v-model="applyForm.loanAmount" placeholder="请输入贷款金额（万元）"/>
        </el-form-item>
        <el-form-item prop="address">
          <el-select v-model="applyForm.address1" class="w130" placeholder="请选择地区" clearable @change="handleProvince">
            <el-option v-for="item in provinceData" :key="item.pid" :value="item.pid" :label="item.provincial"/>
          </el-select>

          <el-select v-model="applyForm.address2" class="w130" placeholder="请选择地区" style="margin-left: 3px;">
            <el-option v-for="item in cityData" :key="item.cid" :value="item.cid" :label="item.city"/>
          </el-select>
        </el-form-item>
        <el-form-item prop="phone">
          <el-input v-model="applyForm.phone" :disabled="isUpdate" placeholder="请输入手机号"/>
        </el-form-item>

        <el-form-item prop="imgCode">
          <div class="img-code-wrap">
            <el-input v-model="imgCode" class="w160" placeholder="请输入图片验证码"/>
            <img :src="codeUrl" alt="点击切换验证码" title="点击切换验证码" class="img-code" @click="handleUpdateImgCode">
          </div>
        </el-form-item>

        <el-form-item prop="code">
          <el-input v-model="applyForm.code" class="w160" placeholder="请输入验证码"/>
          <span v-if="!isDownCount" class="btn" @click="handleSendCode">{{ codeText }}</span>
          <span v-else class="btn">{{ times }}s</span>
        </el-form-item>
        <el-form-item class="apply-now">
          <span class="btn apply" @click="handleApply">立即申请</span>
          <p>
            <el-checkbox v-model="checked"/>
            <el-dropdown trigger="click">
              <span class="el-dropdown-link">
                阅读并同意9能金科用户相关协议<i class="el-icon-arrow-down el-icon--right"/>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item icon="el-icon-plus"><a class="link" href="/agreement?userProtect" target="_blank">《9能金科用户隐私保护政策》</a></el-dropdown-item>
                <el-dropdown-item icon="el-icon-circle-plus"><a class="link" href="/agreement?userRegister" target="_blank">《9能金科用户注册协议》</a></el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <!-- <a href="/agreement?loanOfficerRegister" target="_blank">阅读并同意9能金科相关注册协议</a> -->
          </p>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { validaterPhone, validaterLoanAmount, validaterName } from '@/util/validate'
import { fetchProvince, fetchCity } from '@/api/register'
import { validateRegister, sendPhoneCode, applyLoanByNoLogin } from '@/api/apply'
export default {
  name: 'Apply',
  data() {
    const validateName = (rule, value, callback) => {
      if (value) {
        if (validaterName(value)) {
          callback()
        } else {
          callback(new Error('姓名格式不正确'))
        }
      } else {
        callback(new Error('姓名不能为空'))
      }
    }
    const validateLoanAmount = (rule, value, callback) => {
      if (value) {
        if (validaterLoanAmount(value)) {
          callback()
        } else {
          callback(new Error('贷款金额格式错误'))
        }
      } else {
        callback(new Error('贷款金额不能为空'))
      }
    }
    const validateAddress = (rule, value, callback) => {
      if (this.applyForm.address1 && this.applyForm.address2) {
        callback()
      } else {
        callback(new Error('请选择地址'))
      }
    }
    const validatePhone = (rule, value, callback) => {
      if (value) {
        if (validaterPhone(value)) {
          callback()
        } else {
          callback(new Error('手机号格式错误'))
        }
      } else {
        callback(new Error('手机号不能为空'))
      }
    }
    const validatorImgCode = (rule, value, callback) => {
      if (this.imgCode) {
        callback()
      } else {
        callback(new Error('图片验证码不能为空'))
      }
    }
    return {
      checked: true,
      applyForm: {
        borrowerName: '',
        sex: 1,
        loanAmount: '',
        address1: '',
        address2: '',
        phone: '',
        code: ''
      },
      imgCode: '',
      applyRules: {
        borrowerName: [{ required: true, trigger: 'blur', validator: validateName }],
        loanAmount: [{ required: true, trigger: 'change', validator: validateLoanAmount }],
        address: [{ required: true, trigger: 'change', validator: validateAddress }],
        phone: [{ required: true, trigger: 'change', validator: validatePhone }],
        code: [{ required: true, trigger: 'change', message: '验证码不能为空' }],
        imgCode: [{ required: true, trigger: 'change', validator: validatorImgCode }]
      },
      provinceData: [],
      cityData: [],
      imgUrl: 'http://www.9nengdai.com/api/verify/createImg?',
      btnLoading: false,
      times: 60,
      codeText: '获取验证码',
      isDownCount: false,
      timer: null,
      isUpdate: false
    }
  },
  computed: {
    userInfo() {
      if (this.$store.state.userInfo) {
        return this.$store.state.userInfo
      }
    },

    codeUrl() {
      return this.imgUrl
    }
  },
  watch: {
    userInfo(val) {
      if (val) {
        console.log(val)
        this.isUpdate = true
        this.applyForm.phone = val.phone
        this.applyForm.borrowerName = val.name
        this.applyForm.sex = val.sex
      }
    }
  },
  created() {
    this.getProvince()
    if (this.$store.state.userInfo) {
      this.isUpdate = true
      const data = this.$store.state.userInfo
      this.applyForm.phone = data.phone
      this.applyForm.borrowerName = data.name
      this.applyForm.sex = data.sex
    }
    this.handleUpdateImgCode()
  },
  methods: {
    handleUpdateImgCode() {
      this.imgUrl = 'https://www.9nengdai.com/api/verify/createImg?' + new Date().getTime()
    },
    // 获取省
    getProvince() {
      fetchProvince().then(res => {
        for (let i = 0, len = res.data.length; i < len; i++) {
          if (res.data[i].pid !== 0) {
            this.provinceData.push(res.data[i])
          }
        }
      })
    },
    // 获取 市 区
    getCity(val) {
      fetchCity(val).then(res => {
        for (let i = 0, len = res.data.length; i < len; i++) {
          if (res.data[i].cid !== 0) {
            this.cityData.push(res.data[i])
          }
        }
      })
    },
    handleProvince(val) {
      this.cityData.splice(0)
      this.applyForm.address2 = ''
      this.getCity(val)
    },
    clearTimer() {
      clearInterval(this.timer)
      this.times = 60
      this.isDownCount = false
      this.codeText = '重新获取'
    },
    handleSendCode() {
      this.$refs.applyForm.clearValidate()
      this.$refs.applyForm.validateField('phone', valid => {
        if (!valid) {
          this.$refs.applyForm.validateField('imgCode', valid => {
            if (!valid) {
              if (this.userInfo) { // 登陆状态
                if (this.userInfo.roleId !== 1) {
                  this.$message.warning('贷款人方可申请')
                } else {
                  this.isDownCount = true
                  this.timer = setInterval(() => {
                    this.times--
                    if (this.times <= 0) {
                      this.clearTimer()
                    }
                  }, 1000)
                  this.sendCode(this.applyForm.phone, this.imgCode)
                }
              } else { // 未登录状态
                this.isDownCount = true
                this.timer = setInterval(() => {
                  this.times--
                  if (this.times <= 0) {
                    this.clearTimer()
                  }
                }, 100)
                this.checkIsRegister(this.applyForm.phone)
              }
            }
          })
        }
      })
    },
    checkIsRegister(phone) {
      validateRegister(phone).then(res => {
        if (res.data.status === 500) { // 手机号已注册
          this.$message.warning('该手机号已被注册,请登录后在进行申请')
          this.clearTimer()
        } else {
          this.sendCode(phone, this.imgCode)
        }
      })
    },
    sendCode(phone, code) {
      sendPhoneCode(phone, code).then(res => {
        if (res.data.status === 200) {
          this.$message.success('验证码发送成功，请注意查收')
        } else {
          this.$message.warning(res.data.msg)
          this.clearTimer()
        }
      })
    },
    applyByNoLogin(callback) {
      applyLoanByNoLogin(this.applyForm).then(res => {
        if (res.data.status === 200) {
          this.$message.success('申请成功')
          if (callback) {
            callback()
          }
        } else {
          this.$message.warning(res.data.msg)
        }
      })
    },
    handleApply() {
      this.$refs.applyForm.validate(valid => {
        if (valid) {
          if (this.checked) {
            if (this.$store.state.userInfo) { // 登录状态
              if (this.$store.state.userInfo.roleId === 1) {
                this.applyByNoLogin()
              } else {
                this.$message.warning('贷款人方可申请')
              }
            } else {
              this.applyByNoLogin(() => {
                this.$router.push({
                  path: '/applyVictory',
                  query: {
                    number: this.applyForm.phone
                  }
                })
              })
            }
          } else {
            this.$message.warning('请阅读并同意9能金科平台相关协议')
          }
        } else {
          return false
        }
      })
    }
  }
}
</script>
<style>
.el-dropdown-menu__item {
  color: #4a90e2;
}
.link {
  color: #4a90e2;
}
</style>

<style lang="scss" scoped>
@import './common.scss';
.img-code-wrap {
  display: flex;
  .img-code {
    width: 100px;
    margin-left: 5px;
    cursor: pointer;
  }
}
.apply-wrap {
  margin-bottom: 30px;
  .el-radio+.el-radio {
    margin-left: 20px;
  }
}
.loan-main {
  padding: 16px 16px 1px;
  .w160 {
    width: 160px;
  }
  .w130 {
    width: 130px;
  }
  .apply-now {
    text-align: center;
  }
  .btn {
    display: inline-block;
    width: 100px;
    border-radius: 4px;
    border: 1px solid #D9D9D9;
    text-align: center;
    height: 40px;
    box-sizing: border-box;
    cursor: pointer;
    &.apply {
      width: 240px;
      height: 56px;
      line-height: 56px;
      background: #A80E0E;
      border: none;
      color: #fff;
    }
  }
  p {
    text-align: left;
    margin-left: 14px;
    a {
      color: #9B9B9B;
      font-size: 12px;
    }
  }
}
</style>
