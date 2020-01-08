<template>
  <div class="phone-form">
    <el-form ref="phoneForm" :rules="phoneFormRule" :model="phoneForm" label-position="right" label-width="110px">
      <el-form-item label="手机号：" prop="phone">
        <el-input v-model="phoneForm.phone" :disabled="phone !== ''" placeholder="请输入手机号" style="width: 280px"/>
      </el-form-item>

      <el-form-item label="图片验证码" prop="code">
        <div class="img-code">
          <el-input v-model="phoneForm.code" type="text" placeholder="验证码" style="margin-right: 10px"/>
          <img :src="codeUrl" alt="点击切换验证码" title="点击切换验证码" class="img-code" style="cursor: pointer;" @click="handleUpdateImgCode">
        </div>
      </el-form-item>

      <el-form-item label="手机验证码：" prop="password">
        <el-input v-model="phoneForm.password" placeholder="请输入验证码" style="width: 170px"/>
        <div v-if="!isDownCount" class="btn" @click="getCode">{{ codeText }}</div>
        <div v-else class="btn">{{ times }}s</div>
      </el-form-item>
      <el-form-item label="">
        <el-checkbox v-model="agree" style="display: inline-block;margin-right: 6px;"/>阅读并同意<a href="/agreement?userProtect" target="_blank" style="color: #4a90e2;">《9能金科用户相关协议》</a>
      </el-form-item>
      <el-form-item label="">
        <el-button :loading="isLoading" class="apply" @click="handleNext">下一步</el-button>
        <p v-if="ifRegister" style="color: #9b9b9b; font-size: 12px;">提示：平台不会查询您的征信，所有信息仅供申请参考。</p>
      </el-form-item>
    </el-form>

  </div>
</template>
<script>
import { validaterPhone } from '@/util/validate'
import { sendPhoneCode, sendPhoneCodeForRegister, validateRegister, validIfApply, valideCode, saveOrder, sendNewPhoneCodeForApply } from '@/api/apply'
import { mapState } from 'vuex'
export default {
  name: 'PhoneForm',
  props: {
    options: {
      type: Object,
      required: true
    },
    ifRegister: { // 判定是注册场景还是申请贷款场景
      type: Boolean,
      default: false
    },
    phone: {
      type: String,
      default: '12sd'
    }
  },
  data() {
    const validatePhone = (rule, value, callback) => {
      if (!value) {
        callback(new Error('手机号不能为空'))
      } else {
        if (validaterPhone(value)) {
          callback()
        } else {
          callback(new Error('手机号格式不正确'))
        }
      }
    }
    const validateImgCode = (rule, value, callback) => {
      if (!value) {
        callback(new Error('图片验证码不能为空'))
      } else {
        callback()
      }
    }
    return {
      agree: true,
      phoneForm: {
        phone: '',
        password: '',
        code: ''
      },
      phoneFormRule: {
        phone: [{ required: true, trigger: 'change', validator: validatePhone }],
        password: [{ required: true, message: '验证码不能为空', trigger: 'change' }],
        code: [{ required: true, trigger: 'change', validator: validateImgCode }]
      },
      isDownCount: false,
      times: 60,
      timer: null,
      codeText: '获取验证码',
      isLoading: false,
      isRegister: false,
      saveOrderForm: {},
      zhuce: false,
      imgUrl: 'https://www.9nengdai.com/api/verify/createImg?'
    }
  },
  computed: {
    ...mapState(['userInfo']),
    codeUrl() {
      return this.imgUrl
    }
  },
  watch: {
    '$route': function(val) {
      console.log(val)
    }
  },
  created() {
    console.log(this.ifRegister)
    this.phoneForm.phone = this.phone
    this.handleUpdateImgCode()
  },
  methods: {
    handleUpdateImgCode() {
      this.imgUrl = 'https://www.9nengdai.com/api/verify/createImg?' + new Date().getTime()
    },
    checkIsRegister(phone) {
      validateRegister(phone).then(res => {
        if (res.data.status === 500) { // 手机号已注册
          if (this.ifRegister) {
            this.$message.warning('该手机号已被注册')
            this.clearTimer()
            return false
          } else {
            this.isRegister = true
            this.sendCode(phone, this.phoneForm.code)
          }
          sessionStorage.setItem('show', false) // 控制最后一步相关信息是否显示
          this.zhuce = true
        } else {
          this.zhuce = false
          sessionStorage.setItem('show', true)
          this.isRegister = false
          if (this.ifRegister) {
            this.sendCodeForRegister(phone, this.phoneForm.code)
          } else {
            this.sendNewPhoneForApply(phone, this.phoneForm.code)
          }
        }
      })
    },
    validateCode() { // 检测验证码是否有效
      valideCode(this.phoneForm.phone, this.phoneForm.password).then(res => {
        if (res.data.status === 200) {
          if (!this.ifRegister) { // 贷款流程
            if (this.zhuce) {
              this.$confirm('是否需要修改贷款信息?', '提示', {
                confirmButtonText: '直接申请',
                cancelButtonText: '先去修改',
                type: 'warning'
              }).then(() => { // 直接贷款
                sessionStorage.setItem('applyStatus', 'create')
                const obj = {
                  phone: this.phoneForm.phone,
                  terminalType: 'pc'
                }
                obj[this.options.key] = this.options.value
                this.saveOrders(obj)
              }).catch(() => {
                this.$emit('change', {
                  form: this.phoneForm,
                  step: 1.5
                })
                sessionStorage.setItem('applyStatus', 'update')
              })
            } else {
              this.$emit('change', {
                form: this.phoneForm,
                step: 1.5
              })
            }
          } else { // 注册流程
            validateRegister(this.phoneForm.phone).then(res => {
              if (res.data.status === 200) {
                this.$emit('change', {
                  form: this.phoneForm,
                  step: 1.5
                })
              } else {
                this.$message.warning(res.data.msg)
              }
            })
          }
        } else {
          this.$message.warning(res.data.msg)
        }
        this.isLoading = false
      })
    },
    handleNext() {
      if (this.agree) {
        this.$refs.phoneForm.validate(valid => {
          if (valid) {
            this.isLoading = true
            this.validateCode()
          } else {
            return
          }
        })
      } else {
        this.$message.error('请阅读并同意《9能贷用户相关协议》')
      }
    },
    clearTimer() {
      clearInterval(this.timer)
      this.times = 60
      this.isDownCount = false
      this.codeText = '重新获取'
    },
    getCode() {
      this.$refs.phoneForm.clearValidate()
      this.$refs.phoneForm.validateField('phone', valid => {
        console.log(valid)
        if (!valid) {
          this.$refs.phoneForm.validateField('code', valid => {
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
                  this.checkPhone(this.phoneForm.phone)
                }
              } else { // 未登录状态
                this.isDownCount = true
                this.timer = setInterval(() => {
                  this.times--
                  if (this.times <= 0) {
                    this.clearTimer()
                  }
                }, 1000)
                this.checkPhone(this.phoneForm.phone)
              }
            }
          })
        }
      })
    },
    checkPhone(phone) {
      validIfApply(phone).then(res => {
        if (res.data.status === 200) { // 可以进行申请操作
          this.checkIsRegister(phone)
        } else {
          this.$message.warning(res.data.msg)
          this.clearTimer()
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
    sendNewPhoneForApply(phone, code) {
      sendNewPhoneCodeForApply(phone, code).then(res => {
        if (res.data.status === 200) {
          this.$message.success('验证码发送成功，请注意查收')
        } else {
          this.$message.warning(res.data.msg)
          this.clearTimer()
        }
      })
    },
    sendCodeForRegister(phone, code) {
      sendPhoneCodeForRegister(phone, code).then(res => {
        if (res.data.status === 200) {
          this.$message.success('验证码发送成功，请注意查收')
        } else {
          this.$message.warning(res.data.msg)
          this.clearTimer()
        }
      })
    },
    saveOrders(data) { // 注册过的账号直接进行申请贷款操作
      saveOrder(data).then(res => {
        if (res.data.status === 200) {
          this.$message.success('申请成功')
          this.$emit('change', {
            form: this.phoneForm,
            step: 3
          })
        } else {
          this.$message.warning(res.data.msg)
        }
        this.isLoading = false
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.phone-form {
  .btn {
    display: inline-block;
    width:96px;
    height:40px;
    background:$jnd-bg-color-theme;
    border-radius:4px;
    margin-left: 10px;
    color: #fff;
    text-align: center;
    line-height: 40px;
    cursor: pointer;
  }
  .apply {
    background:$jnd-bg-color-theme;
    color: #fff;
    border-color: $jnd-border-color-theme;
    width: 280px;
  }
}
.img-code {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 280px;
}
</style>
