<template>
  <div class="apply-wrap bg-white">
    <h2 class="title slide-bar">贷款申请</h2>
    <div class="loan-main">
      <el-form ref="applyForm" :model="applyForm" :rules="applyRules">
        <el-form-item prop="borrowerName">
          <el-input class="w160" placeholder="请输入您的姓名" v-model="applyForm.borrowerName"></el-input>
        </el-form-item>
        <el-form-item prop="loanAmount">
          <el-input v-model="applyForm.loanAmount" placeholder="请输入贷款金额（万元）"></el-input>
        </el-form-item>
        <el-form-item prop="address">
          <el-select class="w130" v-model="applyForm.address1" placeholder="请选择地区" clearable @change="handleProvince">
            <el-option v-for="item in provinceData" :key="item.pid" :value="item.pid" :label="item.provincial"></el-option>
          </el-select>

          <el-select class="w130" v-model="applyForm.address2" placeholder="请选择地区" style="margin-left: 3px;">
            <el-option v-for="item in cityData" :key="item.cid" :value="item.cid" :label="item.city"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="phone">
          <el-input v-model="applyForm.phone" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input class="w160" v-model="applyForm.code" placeholder="请输入验证码"></el-input>
          <span class="btn" v-if="!isSend" @click="handleSendCode">{{ sendStatus | sendStatusFilter }}</span>
          <span class="btn" v-else>{{ time }}s</span>
        </el-form-item>
        <el-form-item class="apply-now">
          <span class="btn apply" @click="handleApply">立即申请</span>
          <p>
            <el-checkbox v-model="checked"></el-checkbox>
            <a href="#/agreement?loanOfficerRegister" target="_blank">阅读并同意9能贷相关注册协议</a>
          </p>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { validaterPhone, validaterLoanAmount, validaterName } from '@/util/validate'
import  { fetchProvince, fetchCity } from '@/api/register'
import { applyLoanByNoLogin, validPhoneIsRegister, sendPhoneCode } from '@/api/apply'
import { publics } from '@/api/validateApply'
export default {
  name: 'apply',
  filters: {
    sendStatusFilter(val) {
      const map = {
        init: '发送验证码',
        send: '重新发送'
      }
      return map[val]
    }
  },
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
    };
    const validateAddress = (rule, value, callback) => {
      if (this.applyForm.address1 && this.applyForm.address2) {
        callback()
      } else {
        callback(new Error('请选择地址'));
      }
    };
    const validatePhone = (rule, value, callback) => {
      if (value) {
        if (validaterPhone(value)) {
          callback();
        } else {
          callback(new Error('手机号格式错误'))
        }
      } else {
        callback(new Error('手机号不能为空'))
      }
    };
    return {
      checked: true,
      applyForm: {
        borrowerName: '',
        sex: 1,
        loanAmount: '',
        address1: "",
        address2: "",
        phone: "",
        code: ""
      },
      applyRules: {
        borrowerName: [{ required: true, trigger: "blur", validator: validateName }],
        loanAmount: [{ required: true, trigger: "change", validator: validateLoanAmount }],
        address: [{ required: true, trigger: "change", validator: validateAddress }],
        phone: [{ required: true, trigger: "change", validator: validatePhone }],
        code: [{ required: true, trigger: 'change', message: '验证码不能为空' }]
      },
      provinceData: [],
      cityData: [],
      btnLoading: false,
      time: 60,
      sendStatus: 'init',
      isSend: false
    }
  },
  created() {
    this.getProvince()
  },
  methods: {
    //获取省
    getProvince() {
      fetchProvince().then(res => {
        this.provinceData = res.data
      })
    },
    //获取 市 区
    getCity(val) {
      fetchCity(val).then(res => {
        console.log(res)
        this.cityData = res.data
      })
    },
    handleProvince(val) {
      this.getCity(val)
    },
    ifRegister() {
      validPhoneIsRegister(this.applyForm.phone).then(res => {
        if (res.data.status === 200) {
          this.$message.warning('您的手机号已注册，请登录后再进行操作')      
        } else if (res.data.status === 500) {

        }
      })
    },
    ifApplyInToday() {
      publics(this.applyForm.phone).then(res => { // 只针对登录状态
        if (res.data.status === 200) { // 可以申请贷款
          this.sendCode()
        } else {
          this.$message.warning(res.data.msg)
        }
      })
    },
    sendCode() {
      sendPhoneCode(this.applyForm.phone).then(res => {
        console.log(res)
      })
    },
    setTimer() {
      this.isSend = true
      let timer = setInterval(() => {
        this.time -= 1
        if (this.time < 0) {
          this.clearTimer(timer)
        }
      }, 1000)
    },
    clearTimer(timer) {
      clearInterval(timer)
      this.time = 60
      this.isSend = false
      this.sendStatus = 'send'
    },
    handleSendCode() {
      if (this.applyForm.phone) {
        if (validaterPhone(this.applyForm.phone)) {
          this.setTimer()
          if (this.$store.state.userInfo) { // 登录状态
            if (this.$store.state.userInfo.roleId === 1) {
              this.ifApplyInToday()
            } else {
              this.$message.warning('贷款人方可申请')
            }
          } else {
            this.ifRegister()
          }
        } else {
          this.$message.warning('手机号格式错误')
        }
      } else {
        this.$message.warning('手机号不能为空')      
      }
    },
    applyByNoLogin() {
      applyLoanByNoLogin(this.applyForm).then(res => {
        console.log(res)
        if (res.data.status === 200) {

        } else {
          this.$message.warning(res.data.msg)
        }
      })
    },
    handleApply() {
      this.$refs.applyForm.validate(valid => {
        if (valid) {
          if (this.checked) {
            this.applyByNoLogin()
          } else {
            this.$message.warning('请阅读并同意9能贷平台相关协议')
          }
        } else {
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import './common.scss';
.apply-wrap {
  margin-bottom: 30px;
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
