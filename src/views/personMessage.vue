<template>
  <div class="person">
    <div class="clearfix title">
      <div class="title-text fll">个人信息</div>
      <div>
        <div v-if="!isEdit" class="flr edit" @click="edit">编辑</div>
        <div v-else class="clearfix">
          <div class="flr edit" style="margin-left: 10px" @click="abandonPerson">放弃</div>
          <div class="flr edit" @click="savePerson">保存</div>
        </div>
      </div>
    </div>
    <div class="form-wrap">
      <el-form ref="form" :model="form" :rules="formRules" :class="{'border-show': !isEdit}" label-position="right" label-width="140px" >
        <el-form-item label="姓名:" prop="borrowerName">
          <el-input v-if="isEdit" v-model="form.borrowerName" class="input-item" placeholder="请输入姓名" />
          <span v-else>{{ form.borrowerName | nameFilter }}</span>
        </el-form-item>

        <el-form-item label="性别:" prop="sex">
          <el-radio-group v-if="isEdit" v-model="form.sex">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="0">女</el-radio>
          </el-radio-group>
          <span v-else>{{ form.sex | sexFilter }}</span>
        </el-form-item>

        <el-form-item label="年龄:" prop="age">
          <el-input v-if="isEdit" v-model="form.age" class="input-item" type="number" placeholder="请输入年龄" />
          <span v-else>{{ form.age }} 岁</span>
        </el-form-item>

        <el-form-item label="职业:" prop="jobTypeKey">
          <el-select v-if="isEdit" v-model="form.jobTypeKey" placeholder="请选择">
            <el-option v-for="item in jobTypeOptions" :key="item.id" :label="item.label" :value="item.id" />
          </el-select>
          <span v-else>{{ job }}</span>
        </el-form-item>

        <el-form-item label="月收入:" prop="monthIncome">
          <el-select v-if="isEdit" v-model="form.monthIncome" placeholder="请选择">
            <el-option v-for="item in monthIncomeOptions" :key="item.id" :label="item.label" :value="item.id"/>
          </el-select>
          <span v-else>{{ income }}</span>
        </el-form-item>

        <el-form-item label="所在地区:" prop="address">
          <el-select v-if="isEdit" v-model="form.address1" clearable placeholder="请选择省" style="width: 120px;" @change="handleCity">
            <el-option v-for="item in provinceData" :key="item.pid" :label="item.provincial" :value="item.pid"/>
          </el-select>

          <el-select v-if="isEdit" v-model="form.address2" clearable placeholder="请选择城市" style="width: 120px;">
            <el-option v-for="item in cityData" :key="item.cid" :label="item.city" :value="item.cid"/>
          </el-select>
          <span v-else>{{ address }}</span>
        </el-form-item>

        <el-form-item label="信用情况:" prop="creditStatusKey">
          <el-select v-if="isEdit" v-model="form.creditStatusKey" clearable placeholder="请选择信用情况">
            <el-option v-for="item in creditOptions" :key="item.id" :label="item.label" :value="item.id"/>
          </el-select>
          <span v-else>{{ creditStatus }}</span>
        </el-form-item>

        <el-form-item label="贷款金额:" prop="loanAmount">
          <el-select v-if="isEdit" v-model="form.loanAmount" clearable placeholder="请选择贷款金额">
            <el-option v-for="item in loanAmountOptions" :key="item.id" :label="item.label" :value="item.value"/>
          </el-select>
          <span v-else>{{ loanAmount }}</span>
        </el-form-item>

        <el-form-item label="贷款期限:" prop="loanTimeKey">
          <el-select v-if="isEdit" v-model="form.loanTimeKey" clearable placeholder="请选择贷款期限">
            <el-option v-for="item in loanTimeOptions" :key="item.id" :label="item.label" :value="item.id"/>
          </el-select>
          <span v-else>{{ loanTime }}</span>
        </el-form-item>

        <el-form-item label="是否有本地社保:" prop="sheBaoKey">
          <el-radio-group v-if="isEdit" v-model="form.sheBaoKey">
            <el-radio v-for="item in socialProtectOptions" :label="item.id" :key="item.id">{{ item.label }}</el-radio>
          </el-radio-group>
          <span v-else>{{ socialProtect }}</span>
        </el-form-item>

        <el-form-item label="是否有本地公积金:" prop="gongJiJinKey">
          <el-radio-group v-if="isEdit" v-model="form.gongJiJinKey">
            <el-radio v-for="item in gongjijinOptions" :label="item.id" :key="item.id">{{ item.label }}</el-radio>
          </el-radio-group>
          <span v-else>{{ gongjijin }}</span>
        </el-form-item>

        <el-form-item label="名下车辆情况:" prop="carStatusKey">
          <el-radio-group v-if="isEdit" v-model="form.carStatusKey">
            <el-radio v-for="item in carStatusListOptions" :label="item.id" :key="item.id">{{ item.label }}</el-radio>
          </el-radio-group>
          <span v-else>{{ carStatus }}</span>
        </el-form-item>

        <el-form-item label="名下房产信息:" prop="houseInfoKey">
          <el-radio-group v-if="isEdit" v-model="form.houseInfoKey">
            <el-radio v-for="item in houseStatusOptions" :label="item.id" :key="item.id">{{ item.label }}</el-radio>
          </el-radio-group>
          <span v-else>{{ houseStatus }}</span>
        </el-form-item>

        <el-form-item label="是否有芝麻信用:" prop="zhiMaCreditKey">
          <el-radio-group v-if="isEdit" v-model="form.zhiMaCreditKey">
            <el-radio v-for="item in zhimaOptions" :label="item.id" :key="item.id">{{ item.label }}</el-radio>
          </el-radio-group>
          <span v-else>{{ zhima }}</span>
        </el-form-item>

        <el-form-item label="手机号码">
          <el-input v-if="isEdit" v-model="form.phone" :disabled="true" class="input-item" placeholder="请输入姓名"/>
          <span v-else>{{ form.phone }}</span>
        </el-form-item>

        <el-form-item label="邮箱">
          <el-input v-if="isEdit" v-model="form.email" :disabled="true" class="input-item" placeholder="请输入邮箱"/>
          <span v-else>{{ form.email }}</span>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { validaterName } from '@/util/validate'
import { updateUserInfo, getUserInfo } from '@/api/apply'
import { jobTypeList, monthInComeList, socialProtectList, gongjijinList, carStatusListList, houseStatusList, creditList, zhimaList, loanTimeList, loanAmountList } from '@/util/filterData'
const jobTypeOptions = jobTypeList()
const monthIncomeOptions = monthInComeList()
const socialProtectOptions = socialProtectList()
const gongjijinOptions = gongjijinList()
const carStatusListOptions = carStatusListList()
const houseStatusOptions = houseStatusList()
const creditOptions = creditList()
const zhimaOptions = zhimaList()
const loanTimeOptions = loanTimeList()
const loanAmountOptions = loanAmountList().filter(item => {
  return item.id !== 8
})
export default {
  name: 'PersonMessage',
  filters: {
    sexFilter(val) {
      const statusMap = {
        0: '女',
        1: '男'
      }
      return statusMap[val]
    },
    nameFilter(val) {
      return decodeURI(val)
    }

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
    const validateAdress = (rule, value, callback) => {
      if (this.form.address1 !== '' && this.form.address2) {
        callback()
      } else {
        callback(new Error('请选择地区'))
      }
    }
    return {
      name: '小明',
      jobTypeOptions,
      monthIncomeOptions,
      socialProtectOptions,
      gongjijinOptions,
      carStatusListOptions,
      houseStatusOptions,
      creditOptions,
      zhimaOptions,
      loanTimeOptions,
      loanAmountOptions,
      isEdit: false,
      // 省
      provinceData: [],
      // 市 区
      cityData: [],
      form: {
        borrowerName: '',
        sex: 1,
        age: 0,
        jobTypeKey: 1,
        monthIncome: 1,
        address1: '',
        address2: '',
        creditStatusKey: 1,
        sheBaoKey: 1,
        gongJiJinKey: 1,
        carStatusKey: 1,
        houseInfoKey: 1,
        zhiMaCreditKey: 1,
        phone: '',
        email: '',
        borrowerId: '',
        loanTimeKey: 1,
        loanAmount: ''
      },
      formRules: {
        borrowerName: [{ required: true, trigger: 'change', validator: validateName }],
        sex: [{ required: true, message: '请选择性别', trigger: 'change' }],
        age: [{ required: true, message: '年龄不能为空', trigger: 'change' }],
        jobTypeKey: [{ required: true, message: '请选择职业', trigger: 'change' }],
        monthIncome: [{ required: true, message: '请选择月收入', trigger: 'change' }],
        loanAmount: [{ required: true, message: '请选择贷款金额', trigger: 'change' }],
        address: [{ required: true, trigger: 'change', validator: validateAdress }]
      }
    }
  },
  computed: {
    job() {
      return this.getValue(this.jobTypeOptions, this.form.jobTypeKey)
    },
    income() {
      return this.getValue(this.monthIncomeOptions, this.form.monthIncome)
    },
    address() {
      let str = ''
      for (let i = 0; i < this.provinceData.length; i++) {
        if (this.provinceData[i].pid === this.form.address1) {
          str = this.provinceData[i].provincial
        }
      }
      for (let i = 0; i < this.cityData.length; i++) {
        if (this.cityData[i].cid === this.form.address2) {
          str += this.cityData[i].city
        }
      }
      return str
    },
    socialProtect() {
      return this.getValue(this.socialProtectOptions, this.form.sheBaoKey)
    },
    gongjijin() {
      return this.getValue(this.gongjijinOptions, this.form.gongJiJinKey)
    },
    carStatus() {
      return this.getValue(this.carStatusListOptions, this.form.carStatusKey)
    },
    houseStatus() {
      return this.getValue(this.houseStatusOptions, this.form.houseInfoKey)
    },
    creditStatus() {
      return this.getValue(this.creditOptions, this.form.creditStatusKey)
    },
    zhima() {
      return this.getValue(this.zhimaOptions, this.form.zhiMaCreditKey)
    },
    loanTime() {
      return this.getValue(this.loanTimeOptions, this.form.loanTimeKey)
    },
    loanAmount() {
      const loanAmount = this.form.loanAmount ? this.form.loanAmount + '万元' : ''
      return loanAmount
    }
  },
  created() {
    this.getData()
    this.getProvince()
  },
  methods: {
    ...mapMutations(['SET_USERNAME', 'SET_SEX']),
    getValue(list, value) {
      let str = ''
      for (let i = 0; i < list.length; i++) {
        if (list[i].id === value) {
          str = list[i].label
        }
      }
      return str
    },
    getData() { // 获取贷款人信息
      getUserInfo(this.$store.state.userInfo.phone).then(res => {
        delete res.data.registrationDate
        delete res.data.orderDate
        delete res.data.emailVerity
        delete res.data.realData
        this.form = res.data
        this.getCity(this.form.address1)
      })
    },
    // 获取省
    getProvince() {
      this.$axios.get('city/getAllProvincial').then(res => {
        this.provinceData = res
      })
    },
    handleCity(val) {
      this.form.address2 = ''
      this.getCity(val)
    },
    // 获取 市 区
    getCity(val) {
      this.$axios.get(`city/getAllCity/${val}`).then(res => {
        this.cityData = res
      })
    },
    // 编辑
    edit() {
      this.isEdit = !this.isEdit
    },
    // 保存
    savePerson() {
      this.$refs.form.validate(valid => {
        if (valid) {
          console.log(this.form)
          updateUserInfo(this.form).then(res => {
            this.getData()
            this.isEdit = !this.isEdit
            if (res.data.status === 200) {
              this.$message.success(res.data.msg)
              this.SET_USERNAME(this.form.borrowerName)
              this.SET_SEX(this.form.sex)
            } else {
              this.$message.warning(res.data.msg)
            }
          })
        } else {
          return false
        }
      })
    },
    // 放弃修改
    abandonPerson() {
      this.getData()
      this.isEdit = false
      this.$refs.form.clearValidate()
    }
  }
}
</script>

<style scoped lang="scss">
.form-wrap {
  .input-item {
    width: 200px;
  }
  .el-radio+.el-radio {
    margin-left: 0;
  }
  .el-radio {
    margin-right: 30px;
  }
}
.ml20 {
  margin-left: 20px;
}
.person {
  width: 882px;
  background: rgba(255, 255, 255, 1);
  .el-form-item {
    margin-bottom: 0;
    padding: 20px 10px;
  }
  .border-show {
    .el-form-item {
      border-bottom: 1px solid #f0f0f0;
    }
  }
  .title {
    width: 100%;
    height: 70px;
    padding-left: 54px;
    padding-right: 90px;
    box-sizing: border-box;
    .title-text {
      font-size: 16px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(81, 81, 81, 1);
      line-height: 70px;
    }
    .edit {
      height: 70px;
      font-size: 14px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(208, 172, 86, 1);
      line-height: 70px;
      cursor: pointer;
    }
  }
}
</style>
