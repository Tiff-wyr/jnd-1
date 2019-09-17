<template>
  <div class="main-form">
    <el-form ref="form" :rules="formRules" :model="form" label-position="right" label-width="110px">
      <el-form-item label="贷款金额" prop="loanAmount">
        <el-select v-if="loanAmountStatus" v-model="form.loanAmount" style="width: 280px;" @change="handleLoanAmount">
          <el-option v-for="item in loanAmountOptions" :key="item.id" :label="item.label" :value="item.value"/>
        </el-select>
        <el-input v-else v-model="form.loanAmount" placeholder="请输入贷款金额（单位万元）" @input="handleLoanAmount"/>
      </el-form-item>
      <el-form-item label="贷款期限" prop="loanTimeKey">
        <el-select v-model="form.loanTimeKey" style="width: 280px;">
          <el-option v-for="item in loanTimeOptions" :key="item.id" :label="item.label" :value="item.id"/>
        </el-select>
      </el-form-item>
      <el-form-item label="姓名：" prop="borrowerName">
        <el-input v-model="form.borrowerName" placeholder="请输入姓名" style="width: 150px; margin-right: 10px;"/>
        <el-radio v-model="form.sex" :label="1">男</el-radio>
        <el-radio v-model="form.sex" :label="0">女</el-radio>
      </el-form-item>
      <el-form-item label="年龄：" prop="age">
        <el-input v-model="form.age" placeholder="请输入年龄" style="width: 280px;"/>
      </el-form-item>
      <el-form-item label="所在地区" prop="address">
        <el-cascader
          v-model="address"
          :options="cityList"
          :props="props"
          :change-on-select="true"
          clearable
          class="filter-item filter-item-select"
          style="width: 280px;"
          @active-item-change="handleItemChange"
          @change="handleCity"
        />
      </el-form-item>
      <el-form-item label="职业类型" prop="jobTypeKey">
        <el-select v-model="form.jobTypeKey" style="width: 280px;">
          <el-option v-for="item in jobTypeOptions" :key="item.id" :label="item.label" :value="item.id"/>
        </el-select>
      </el-form-item>
      <el-form-item label="工资收入方式" prop="incomeWayKey">
        <el-radio v-model="form.incomeWayKey" :label="1">打卡</el-radio>
        <el-radio v-model="form.incomeWayKey" :label="2">现金</el-radio>
        <el-radio v-model="form.incomeWayKey" :label="3">综合</el-radio>
      </el-form-item>
      <el-form-item label="月收入" prop="monthIncome">
        <el-select v-model="form.monthIncome" style="width: 280px;">
          <el-option v-for="item in monthInComeOptions" :key="item.id" :label="item.label" :value="item.id"/>
        </el-select>
      </el-form-item>

      <el-form-item label="">
        <el-button v-if="ifRegister" :loading="isLoading" class="apply" @click="handleRegister">注 册</el-button>
        <el-button v-else :loading="isLoading" class="apply" @click="handleNext">下一步</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { fetchProvince, fetchCity } from '@/api/register'
import { validaterFloat, validaterInter, validaterName } from '@/util/validate'
import { applyRegister, getUserInfo, updateUserInfo } from '@/api/apply'
import { loanAmountList, loanTimeList, jobTypeList, monthInComeList  } from '@/util/filterData'

const loanAmountOptions = loanAmountList()
const loanTimeOptions = loanTimeList()
const jobTypeOptions = jobTypeList()
const monthInComeOptions = monthInComeList()

export default {
  name: 'MainForm',
  props: {
    phone: {
      type: String,
      required: true
    },
    code: {
      type: String,
      required: true
    },
    ifRegister: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const validLoanAmount = (rule, value, callback) => {
      if (value) {
        if (validaterFloat(value)) {
          callback()
        } else {
          callback(new Error('贷款金额格式错误'))
        }
      } else {
        callback(new Error('贷款金额不能为空并且不能为0'))
      }
    }
    const validName = (rule, value, callback) => {
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
    const validSex = (rule, value, callback) => {
      if (value) {
        if (validaterInter(value)) {
          callback()
        } else {
          callback(new Error('年龄格式错误'))
        }
      } else {
        callback(new Error('年龄不能为空'))
      }
    }
    const validAddress = (rule, value, callback) => {
      if (this.form.address1 !== '' && this.form.address2 !== '') {
        callback()
      } else {
        callback(new Error('请选择省份城市'))
      }
    }
    return {
      loanAmountOptions,
      loanTimeOptions,
      jobTypeOptions,
      monthInComeOptions,
      loanAmountStatus: true,
      formRules: {
        loanAmount: [{ required: true, trigger: 'change', validator: validLoanAmount }],
        loanTimeKey: [{ required: true, trigger: 'change', message: '请选择贷款期限' }],
        borrowerName: [{ required: true, trigger: 'change', validator: validName }],
        age: [{ required: true, trigger: 'change', validator: validSex }],
        address: [{ required: true, trigger: 'change', validator: validAddress }],
        jobTypeKey: [{ required: true, trigger: 'change', message: '请选择职业类型' }],
        incomeWayKey: [{ required: true, trigger: 'change', message: '请选择工资收入方式' }],
        monthIncome: [{ required: true, trigger: 'change', message: '请填写月收入' }]
      },
      props: {
        value: 'id',
        label: 'label',
        children: 'citys'
      },
      address: [],
      form: {
        loanAmount: 0.3,
        loanTimeKey: 1,
        borrowerName: '',
        sex: 1,
        age: '',
        address1: '',
        address2: '',
        jobTypeKey: 1,
        incomeWayKey: 1,
        monthIncome: 1
      },
      isLoading: false,
      cityList: [],
      status: 'create'
    }
  },
  created() {
    this.getFilterData()
    this.form.phone = this.phone
    this.status = sessionStorage.getItem('applyStatus')
    if (this.status === 'update') {
      this.getInfo()
    }
  },
  methods: {
    handleLoanAmount(val) {
      alert(1)
      if (val === 0) {
        this.loanAmountStatus = false
      }
      if (val === '') {
        this.loanAmountStatus = true
      }
    },
    getInfo() {
      getUserInfo(this.form.phone).then(res => {
        if (res.status === 200) {
          for (const i in this.form) {
            for (const j in res.data) {
              if (i === j) {
                this.form[i] = res.data[j]
              }
            }
          }
          if (res.data.loanAmount === 0) {
            this.loanAmountStatus = false
          }
          this.getCity(res.data.address1, () => {
            this.address = [res.data.address1, res.data.address2]
          })
        }
      })
    },
    updateInfo() {
      updateUserInfo(this.form).then(res => {
        if (res.data.status === 200) {
          this.$emit('change', {
            form: this.form,
            step: 2
          })
        } else {
          this.$message.warning(res.data.msg)
        }
        this.isLoading = false
      })
    },
    getFilterData() {
      fetchProvince().then(response => {
        const data = response.data
        for (let i = 0; i < data.length; i++) {
          if (data[i].pid !== 0) {
            const obj = {}
            obj['id'] = data[i]['pid']
            obj['label'] = data[i]['provincial']
            obj['citys'] = []
            this.cityList.push(obj)
          }
        }
      })
    },
    handleItemChange(val) {
      fetchCity(val[0]).then(res => {
        const data = res.data
        const arr = []
        for (let i = 0; i < data.length; i++) {
          const obj = {}
          obj['id'] = data[i]['cid']
          obj['label'] = data[i]['city']
          arr.push(obj)
        }
        for (let i = 0; i < this.cityList.length; i++) {
          if (this.cityList[i].id === val[0]) {
            this.cityList[i].citys = arr
          }
        }
      })
    },
    handleCity(val) {
      if (val.length === 1) {
        this.form.address1 = val[0]
        this.getCity(val[0])
      } else if (val.length === 2) {
        this.form.address2 = val[1]
      } else {
        this.form.address1 = ''
        this.form.address2 = ''
      }
    },
    getCity(id, callback) {
      fetchCity(id).then(res => {
        const data = res.data
        const arr = []
        for (let i = 0; i < data.length; i++) {
          if (data[i].cid !== 0) {
            const obj = {}
            obj['id'] = data[i]['cid']
            obj['label'] = data[i]['city']
            arr.push(obj)
          }
        }
        for (let i = 0; i < this.cityList.length; i++) {
          if (this.cityList[i].id === id) {
            this.cityList[i].citys = arr
          }
        }
        if (callback) {
          callback()
        }
      })
    },
    handleNext() {
            this.$emit('change', {
              form: this.form,
              step: 2
            })
      this.$refs.form.validate(valid => {
        if (valid) {
          this.isLoading = true
          if (this.status === 'update') {
            this.updateInfo()
          } else {
            this.form.password = this.code
            console.log(this.form)
            this.registerAccount()
          }
        }
      })
    },
    handleRegister() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.isLoading = true
          this.form.password = this.code
          this.registerAccount()
        }
      })
    },
    registerAccount() { // 点击下一步注册账号
      applyRegister(this.form).then(res => {
        if (res.data.status === 200) {
          if (this.ifRegister) {
            this.$emit('register')
          } else {
            this.$emit('change', {
              form: this.form,
              step: 2
            })
          }
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

.apply {
  background:$jnd-bg-color-theme;
  color: #fff;
  border-color: $jnd-border-color-theme;
  width: 280px;
}
</style>
