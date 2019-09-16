<template>
  <div class="main-form">
    <el-form ref="form" :rules="formRules" :model="form" label-position="right" label-width="110px">
      <el-form-item label="贷款金额" prop="loanAmount">
        <el-select v-model="form.loanAmount" style="width: 280px;">
          <el-option v-for="item in loanAmountOptions" :key="item.id" :label="item.label" :value="item.value"/>
        </el-select>
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
        <el-button :loading="isLoading" class="apply" @click="handleNext">下一步</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { fetchProvince, fetchCity } from '@/api/register'
import { validaterFloat, validaterInter, validaterName } from '@/util/validate'
import { applyRegister, getUserInfo, updateUserInfo } from '@/api/apply'
const loanAmountOptions = [
  { id: 0, label: '0.3万元', value: 0.3 },
  { id: 1, label: '1万元', value: 1 },
  { id: 2, label: '5万元', value: 5 },
  { id: 3, label: '10万元', value: 10 },
  { id: 4, label: '20万元', value: 20 },
  { id: 5, label: '50万元', value: 50 },
  { id: 6, label: '100万元', value: 100 },
  { id: 7, label: '500万元', value: 500 },
  { id: 8, label: '其他', value: 0 }
]
const loanTimeOptions = [
  { id: 1, label: '3个月' },
  { id: 2, label: '6个月' },
  { id: 3, label: '12个月' },
  { id: 4, label: '2年' },
  { id: 5, label: '3年' },
  { id: 6, label: '5年' },
  { id: 7, label: '10年' }
]

const jobTypeOptions = [
  { id: 1, label: '私企职员' },
  { id: 2, label: '国企职员' },
  { id: 3, label: '公务员/事业单位职员' },
  { id: 4, label: '个体工商户' },
  { id: 5, label: '小微企业主' },
  { id: 6, label: '自由职业/求职中' }
]
const monthInComeOptions = [
  { id: 1, label: '1000~3000元' },
  { id: 2, label: '3000~5000元' },
  { id: 3, label: '5000~10000元' },
  { id: 4, label: '10000~20000元' },
  { id: 5, label: '20000~50000元' },
  { id: 6, label: '50000元以上' }
]
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
        callback(new Error('贷款金额不能为空'))
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
    getInfo() {
      getUserInfo(this.form.phone).then(res => {
        console.log(res)
      })
    },
    updateInfo() {
      updateUserInfo(this.form).then(res => {
        console.log(res)
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
        fetchCity(val[0]).then(res => {
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
            if (this.cityList[i].id === val[0]) {
              this.cityList[i].citys = arr
            }
          }
        })
      } else if (val.length === 2) {
        this.form.address2 = val[1]
      } else {
        this.form.address1 = ''
        this.form.address2 = ''
      }
    },
    handleNext() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.isLoading = true
          if (this.status === 'create') {
            this.form.password = this.code
            this.registerAccount()
          } else {
            this.updateInfo()
          }
        }
      })
    },
    registerAccount() { // 点击下一步注册账号
      applyRegister(this.form).then(res => {
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
