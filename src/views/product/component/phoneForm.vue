<template>
  <div class="phone-form">
    <el-form ref="phoneForm" :rules="phoneFormRule" :model="phoneForm" label-position="right" label-width="110px">
      <el-form-item label="手机号：" prop="phone">
        <el-input v-model="phoneForm.phone" :disabled="phone !== ''" placeholder="请输入手机号" style="width: 280px"/>
      </el-form-item>
      <el-form-item label="手机验证码：" prop="password">
        <el-input v-model="phoneForm.password" placeholder="请输入验证码" style="width: 170px"/>
        <div v-if="!isDownCount" class="btn" @click="getCode">{{ codeText }}</div>
        <div v-else class="btn">{{ times }}s</div>
      </el-form-item>
      <el-form-item label="">
        <el-checkbox v-model="agree" style="display: inline-block;margin-right: 6px;"/>阅读并同意<a href="/agreement?userProtect" target="_blank" style="color: #4a90e2;">《9能贷用户相关协议》</a>
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
import { sendPhoneCode, sendPhoneCodeForRegister, validateRegister, validIfApply, valideCode, saveOrder } from '@/api/apply'
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
      default: ''
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
    return {
      agree: true,
      phoneForm: {
        phone: '',
        password: ''
      },
      phoneFormRule: {
        phone: [{ required: true, trigger: 'change', validator: validatePhone }],
        password: [{ required: true, message: '验证码不能为空', trigger: 'change' }]
      },
      isDownCount: false,
      times: 60,
      timer: null,
      codeText: '获取验证码',
      isLoading: false,
      isRegister: false,
      saveOrderForm: {},
      zhuce: false
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  created() {
    this.phoneForm.phone = this.phone
  },
  methods: {
    checkIsRegister(phone) {
      validateRegister(phone).then(res => {
        if (res.data.status === 500) { // 手机号已注册
          if (this.ifRegister) {
            this.$message.warning('该手机号已被注册')
            this.clearTimer()
            return false
          } else {
            this.isRegister = true
            this.sendCode(phone)
          }
          console.log('设置了false')
          sessionStorage.setItem('show', false) // 控制最后一步相关信息是否显示
          this.zhuce = true
        } else {
          console.log('设置了true')
          this.zhuce = false
          sessionStorage.setItem('show', true)
          this.isRegister = false
          this.sendCodeForRegister(phone)
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
      if (this.phoneForm.phone && validaterPhone(this.phoneForm.phone)) {
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
      } else {
        this.$message.warning('手机号为空或格式不正确')
      }
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
    sendCode(phone) {
      sendPhoneCode(phone).then(res => {
        if (res.data.status === 200) {
          this.$message.success('验证码发送成功，请注意查收')
        } else {
          this.$message.warning(res.data.msg)
          this.clearTimer()
        }
      })
    },
    sendCodeForRegister(phone) {
      sendPhoneCodeForRegister(phone).then(res => {
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
</style>
