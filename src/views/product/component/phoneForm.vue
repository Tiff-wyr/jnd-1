<template>
  <div class="phone-form">
    <el-form ref="phoneForm" :rules="phoneFormRule" :model="phoneForm" label-position="right" label-width="110px">
      <el-form-item label="手机号：" prop="phone">
        <el-input v-model="phoneForm.phone" placeholder="请输入手机号" style="width: 280px"/>
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
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { validaterPhone } from '@/util/validate'
import { sendPhoneCode, validateRegister, validIfApply, valideCode, saveOrder } from '@/api/apply'
export default {
  name: 'PhoneForm',
  props: {
    options: {
      type: Object,
      required: true
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
      saveOrderForm: {}
    }
  },
  methods: {
    checkIsRegister(phone) {
      validateRegister(phone).then(res => {
        if (res.data.status === '500') { // 手机号已注册
          sessionStorage.setItem('show', false)
          this.isRegister = true
        } else {
          sessionStorage.setItem('show', true)
          this.isRegister = false
        }
      })
    },
    validateCode() { // 检测验证码是否有效
      this.$confirm('是否需要修改贷款信息?', '提示', {
        confirmButtonText: '直接贷款',
        cancelButtonText: '先去修改',
        type: 'warning'
      }).then(() => { // 直接贷款
        sessionStorage.setItem('applyStatus', 'create')
        const obj = {
          phone: this.phoneForm.phone
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
      valideCode(this.phoneForm.phone, this.phoneForm.password).then(res => {
        if (res.data.code === 200) {
          this.$confirm('是否需要修改贷款信息?', '提示', {
            confirmButtonText: '直接贷款',
            cancelButtonText: '先去修改',
            type: 'warning'
          }).then(() => { // 直接贷款
            const obj = {
              phone: this.phoneForm.phone
            }
            obj[this.options.key] = this.options.value
            this.saveOrders(obj)
          }).catch(() => {
            this.$emit('change', {
              form: this.phoneForm,
              step: 1.5
            })
          })
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
        this.isDownCount = true
        this.timer = setInterval(() => {
          this.times--
          if (this.times <= 0) {
            this.clearTimer()
          }
        }, 1000)
        this.checkPhone(this.phoneForm.phone)
      } else {
        this.$message.warning('手机号为空或格式不正确')
      }
    },
    checkPhone(phone) {
      validIfApply(phone).then(res => {
        if (res.data.status === 200) { // 可以进行申请操作
          this.sendCode(phone)
        } else {
          this.$message.warning(res.data.msg)
          this.clearTimer()
        }
      })
    },
    sendCode(phone) {
      sendPhoneCode(phone).then(res => {
        this.checkIsRegister(this.phoneForm.phone)
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
          this.$message.warning('申请成功')
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