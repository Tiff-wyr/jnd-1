<template>
  <div class="pro-center-wrap">
    <div class="pro-center">
      <div class="title">产品中心</div>
      <div class="clearfix">
        <div class="product clearfix fll" @click="addItem">
          <div class="clearfix my-up">
            <div class="add-num fll">+</div>
            <div class="add-pro fll">添加产品</div>
          </div>
        </div>
        <div
          v-for="(item,index) in tableData"
          :key="index"
          class="product-item fll"
          style="margin-right: 25px;margin-bottom: 20px"
        >
          <div class="clearfix mt15">
            <div class="name fll">产品名称：</div>
            <span>{{ item.productName }}</span>
          </div>
          <div class="clearfix mt15">
            <div class="name fll">产品额度：</div>
            <span>{{ item.moneyLimit }}</span>
          </div>
          <div class="clearfix mt15">
            <div class="name fll">产品利息：</div>
            <span>{{ item.rate }}</span>
          </div>
          <div class="clearfix mt15">
            <div class="name fll">归还方式：</div>
            <span>{{ item.productRepaymentMethod }}</span>
          </div>
          <div class="clearfix mt15">
            <div class="name fll">使用年限：</div>
            <span>{{ item.productLife }}</span>
          </div>
          <div class="clearfix mt15">
            <div class="name fll">贷款类型：</div>
            <span>{{ item.productLoanType }}</span>
          </div>
          <div class="clearfix">
            <div class="edit fll" @click="editProduct(item.productId)">编辑</div>
            <div class="save fll" @click="delectProduct(item.productId)">删除</div>
          </div>
        </div>
      </div>
    </div>
    <div class="page" style="float: right;margin-top: 30px">
      <el-pagination
        :page-size="size"
        :pager-count="5"
        :total="count"
        background=""
        layout="prev, pager, next"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <!--蒙版-->
    <el-dialog :visible.sync="dialogVisible" :center="true" :show-close="false" title="产品详情" width="600px" top="5vh">
      <el-form ref="productDetailData" :model="productDetailData" :rules="productDetailDataRules" label-position="right" label-width="70px">
        <el-form-item label="产品头像" prop="productLogo" class="cover-full">
          <productImg v-model="productDetailData.productLogo" :phone="phone" :value="productDetailData.productLogo" @success="uploadSuccess"/>
          <div class="wenzi"> 支持JPG/JPEG/PNG格式图片，照片不大于2M</div>
        </el-form-item>
        <el-form-item label="产品名称" prop="productName">
          <el-input v-model="productDetailData.productName"/>
        </el-form-item>
        <el-form-item label="额度" prop="amount">
          <el-input v-model="productDetailData.productStartAmount" class="w60"/> ~
          <el-input v-model="productDetailData.productEndAmount" class="w60"/> 万
        </el-form-item>
        <el-form-item label="归还方式" prop="productRepaymentMethod">
          <el-select v-model="productDetailData.productRepaymentMethod" clearable placeholder="请选择归还方式">
            <el-option
              v-for="item in returnData"
              :key="item.prId"
              :label="item.prName"
              :value="item.prId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="利息" prop="productInterest">
          <el-input v-model="productDetailData.productInterest" class="w60"/> %
        </el-form-item>
        <el-form-item label="贷款类型" prop="productLoanType">
          <el-select v-model="productDetailData.productLoanType" clearable placeholder="请选择贷款类型" class="checkbox-same">
            <el-option
              v-for="item in loanTypeData"
              :key="item.id"
              :label="item.typeName"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="发行机构" prop="productPublisher">
          <el-input v-model="productDetailData.productPublisher"/>
        </el-form-item>
        <el-form-item label="业务类型" prop="productType">
          <el-select v-model="productDetailData.productType" clearable placeholder="请选择业务类型">
            <el-option
              v-for="item in businessData"
              :key="item.id"
              :label="item.busName"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="放款时间" prop="producLoanLength">
          <el-input v-model="productDetailData.producLoanLength" class="w60"/> 天
        </el-form-item>
        <el-form-item label="身份要求" prop="productIdentity">
          <el-select v-model="productDetailData.productIdentity" placeholder="请选择身份要求" clearable>
            <el-option
              v-for="item in identifyData"
              :key="item.id"
              :label="item.identityName"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="年龄要求" prop="age">
          <el-input v-model="productDetailData.productMinAge" class="w60"/> ~
          <el-input v-model="productDetailData.productMaxAge" class="w60"/> 岁
        </el-form-item>
        <el-form-item label="使用期限" prop="productLife">
          <el-select v-model="productDetailData.productLife" placeholder="请选择贷款期限" clearable class="w300">
            <el-option
              v-for="item in loanTimeOption"
              :key="item.id"
              :label="item.label"
              :value="item.id"
            />
          </el-select>

        </el-form-item>
        <el-form-item label="职业要求" prop="productOccupation" class="cover-full">
          <el-select v-model="productDetailData.productOccupation" placeholder="请选择职业要求" multiple clearable class="w300" @change="handleWork">
            <el-option
              v-for="item in jobTypeOption"
              :key="item.id"
              :label="item.label"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="贷款条件" prop="productProperty" class="cover-full">
          <el-select v-model="productDetailData.productProperty" placeholder="请选择贷款条件" multiple clearable class="w300" @change="handlerChange">
            <el-option
              v-for="item in loanData"
              :key="item.lrId"
              :label="item.lrName"
              :value="item.lrId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="条件" prop="productCondition" class="cover-full">
          <el-input v-model="productDetailData.productCondition" type="textarea" rows="3"/>
        </el-form-item>
        <el-form-item label="特点" prop="productCharacteristic" class="cover-full">
          <el-input v-model="productDetailData.productCharacteristic" type="textarea" rows="3"/>
        </el-form-item>
        <el-form-item class="cover-full"/>
      </el-form>
      <div class="btn" @click="proSave(productDetailData.productId)">保存</div>
    </el-dialog>
  </div>
</template>

<script>
import productImg from '../../../component/productImg'
import { randomWord } from '@/util/util'
import { validaterInter, validaterFloat } from '@/util/validate'
import { getCountByAgencyId } from '@/api/organ'
import { loanTimeList, jobTypeList } from '@/util/filterData'
const loanTimeOption = loanTimeList()
const jobTypeOption = jobTypeList()
export default {
  name: 'ProductCen',
  components: {
    productImg
  },
  data() {
    const validAmout = (rule, value, callback) => {
      if (this.productDetailData.productStartAmount && this.productDetailData.productEndAmount) {
        if (validaterInter(this.productDetailData.productStartAmount) && validaterInter(this.productDetailData.productEndAmount)) {
          if (parseInt(this.productDetailData.productStartAmount) > parseInt(this.productDetailData.productEndAmount)) {
            callback(new Error('起始额度不能大于最大额度'))
          } else {
            callback()
          }
        } else {
          callback(new Error('额度正确格式为大于0的整数'))
        }
      } else {
        callback(new Error('额度不能为空'))
      }
    }
    const validRate = (rule, value, callback) => {
      if (value) {
        if (validaterFloat(value)) {
          callback()
        } else {
          callback(new Error('利率格式为大于0的整数或2位小数'))
        }
      } else {
        callback(new Error('利率不能为空'))
      }
    }
    const validLoanTime = (rule, value, callback) => {
      if (value) {
        if (validaterInter(value)) {
          callback()
        } else {
          callback(new Error('放款时间为大于0的整数'))
        }
      } else {
        callback(new Error('返款时间不能为空'))
      }
    }
    const validAge = (rule, value, callback) => {
      if (this.productDetailData.productMinAge && this.productDetailData.productMaxAge) {
        if (validaterInter(this.productDetailData.productMinAge) && validaterInter(this.productDetailData.productMaxAge)) {
          console.log(this.productDetailData.productMinAge > this.productDetailData.productMaxAge)
          if (parseInt(this.productDetailData.productMinAge) > parseInt(this.productDetailData.productMaxAge)) {
            callback(new Error('起始年龄不能大于最大年龄'))
          } else {
            callback()
          }
        } else {
          callback(new Error('年龄格式为大于0的整数'))
        }
      } else {
        callback(new Error('年龄范围不能为空'))
      }
    }
    const validUseDeadLine = (rule, value, callback) => {
      if (value) {
        if (validaterInter(value)) {
          if (value > 30) {
            callback(new Error('使用年限不可超过30年'))
          } else {
            callback()
          }
        } else {
          callback(new Error('使用年限格式为大于0的整数'))
        }
      } else {
        callback(new Error('使用年限不能为空'))
      }
    }

    return {
      loanTimeOption,
      jobTypeOption,
      dialogVisible: false,
      phone: '',
      tableData: [],
      isShowing: true,
      productList: [],
      page: 1,
      size: 5,
      count: 1,
      jobData: [], // 获取职业
      loanData: [], // 获取贷款要求
      returnData: [], // 获取归还条件
      loanTypeData: [], // 贷款类型
      yearData: [], // 使用年限
      businessData: [], // 业务类型
      identifyData: [], // 身份要求
      productDetailData: {
        productId: '',
        productName: '',
        producLoanLength: '',
        productRepaymentMethod: '',
        productCharacteristic: '', // 特点
        productPublisher: '', // 发型机构
        productInterest: '', // 利率
        productLoanType: '', // 贷款类型
        productOccupation: '', // 职业
        productIdentity: '', // 身份
        productTimeType: '',
        productType: '',
        productMinAge: '',
        productMaxAge: '',
        productProperty: '', // 资产
        productStartAmount: '', // 额度
        productEndAmount: '',
        productLife: '', // 年限
        productCondition: '', // 条件
        agencyId: '',
        productLogo: ''
      },
      productDetailDataRules: {
        productLogo: [{ required: true, message: '产品头像不能为空', trigger: 'change' }],
        productName: [{ required: true, message: '产品名称不能为空', trigger: 'change' }],
        amount: [{ required: true, trigger: 'change', validator: validAmout }],
        productRepaymentMethod: [{ required: true, message: '请选择归还方式', trigger: 'change' }],
        productInterest: [{ required: true, trigger: 'change', validator: validRate }],
        productLoanType: [{ required: true, message: '请选择贷款类型', trigger: 'change' }],
        productPublisher: [{ required: true, message: '请填写发行机构', trigger: 'change' }],
        productType: [{ required: true, message: '请选择业务类型', trigger: 'change' }],
        producLoanLength: [{ required: true, trigger: 'change', validator: validLoanTime }],
        productIdentity: [{ required: true, message: '请选择身份要求', trigger: 'change' }],
        age: [{ required: true, trigger: 'change', validator: validAge }],
        productLife: [{ required: true, trigger: 'change', validator: validUseDeadLine }],
        productOccupation: [{ required: true, message: '请选择职业要求', trigger: 'change' }],
        productProperty: [{ required: true, message: '请选择贷款条件', trigger: 'change' }],
        productCondition: [{ required: true, message: '条件不能为空', trigger: 'change' }],
        productCharacteristic: [{ required: true, message: '产品特点不能为空', trigger: 'change' }]
      }
    }
  },
  created() {
    this.productDetailData.agencyId = this.$store.state.userInfo.id
    this.phone = new Date().getTime() + randomWord(false, 10)
    this.getJob()
    this.getLoan()
    this.getReturn()
    this.getLoanType()
    this.getYear()
    this.getBusinessType()
    this.getIdentify()
    this.getProData()
  },
  methods: {

    handleWork(val) {
      const arr = []
      for (let i = 0; i < val.length; i++) {
        arr.push(val[i])
      }
      const index = arr.indexOf(0)
      if (index > -1 && index === val.length - 1) {
        this.productDetailData.productOccupation = [0]
      } else if (index > -1) {
        this.productDetailData.productOccupation.splice(index, 1)
      } else {
        this.productDetailData.productOccupation = val
      }
    },
    handlerChange(val) {
      const arr = []
      for (let i = 0; i < val.length; i++) {
        arr.push(val[i])
      }
      const index = arr.indexOf(0)
      if (index > -1 && index === val.length - 1) {
        this.productDetailData.productProperty = [0]
      } else if (index > -1) {
        this.productDetailData.productProperty.splice(index, 1)
      } else {
        this.productDetailData.productProperty = val
      }
    },
    handleCurrentChange(val) {
      this.page = val
      this.getProData()
    },
    handleSizeChange(val) {
      this.size = val
      this.getProData()
    },
    // 添加产品
    addItem() {
      getCountByAgencyId(this.$store.state.userInfo.id).then(res => {
        if (res.data.status === 200) {
          this.dialogVisible = true
          this.resetForm()
          this.$nextTick(() => {
            this.$refs.productDetailData.clearValidate()
          })
        } else {
          this.$message.warning(res.data.msg)
        }
      })
    },
    uploadSuccess(file) {
      this.productDetailData.productLogo = file.data
    },
    editProduct(id) {
      this.dialogVisible = true
      this.$axios.get(`product/updateProductById/${id}`).then(res => {
        const {
          productId,
          productName,
          producLoanLength,
          productRepaymentMethod,
          productCharacteristic, // 特点
          productPublisher, // 发型机构
          productInterest, // 利率
          productLoanType, // 贷款类型
          productOccupation, // 职业
          productIdentity, // 身份
          productTimeType,
          productType,
          productMinAge,
          productMaxAge,
          productProperty, // 资产
          productStartAmount, // 额度
          productEndAmount,
          productLife, // 年限
          productCondition, // 条件
          productLogo
        } = res
        this.productDetailData = {
          productId,
          productName,
          producLoanLength,
          productRepaymentMethod,
          productCharacteristic, // 特点
          productPublisher, // 发型机构
          productInterest, // 利率
          productLoanType, // 贷款类型
          productOccupation, // 职业
          productIdentity, // 身份
          productTimeType,
          productType,
          productMinAge,
          productMaxAge,
          productProperty, // 资产
          productStartAmount, // 额度
          productEndAmount,
          productLife, // 年限
          productCondition, // 条件
          productLogo
        }
        this.productDetailData.productProperty = res.productProperty
          .split(',')
          .map(item => {
            return parseInt(item)
          })
        this.productDetailData.productOccupation = res.productOccupation.toString()
          .split(',')
          .map(item => {
            return parseInt(item)
          })
      })
    },
    proSave(id) {
      this.$refs.productDetailData.validate(valid => {
        if (valid) {
          if (id) {
            this.productDetailData.productId = id
            const data = new FormData()
            for (const item in this.productDetailData) {
              data.append(item, this.productDetailData[item])
            }
            this.$axios.post(`product/updateProduct`, data).then(res => {
              if (res.status === 200) {
                this.$message.success(res.msg)
                this.dialogVisible = false
                this.getProData()
              }
            })
          } else {
            const data = new FormData()
            for (const item in this.productDetailData) {
              data.append(item, this.productDetailData[item])
            }
            data.delete('productId')
            this.$axios.post(`product/addProduct`, data).then(res => {
              if (res.status === 200) {
                this.$message.success(res.msg)
                this.dialogVisible = false
                this.getProData()
              } else {
                this.$message.warning(res.msg)
              }
            })
          }
        }
      })
    },
    delectProduct(id) {
      this.$confirm('是否确认删除此产品？', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$axios.get(`product/deleteProduct/${id}`).then(res => {
            if (res.status === 200) {
              this.$message.success(res.msg)
              this.getProData()
            } else {
              this.$message.warning(res.msg)
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },

    // 获取职业
    getJob() {
      this.$axios.get('get/getJob').then(res => {
        this.jobData = res
      })
    },
    // 获取贷款要求
    getLoan() {
      this.$axios.get('get/getLoanRequirements').then(res => {
        this.loanData = res
      })
    },
    // 获取归还条件
    getReturn() {
      this.$axios.get('get/getProductRepaymentMethod').then(res => {
        this.returnData = res
      })
    },
    // 贷款类型
    getLoanType() {
      this.$axios.get('get/getLoanType').then(res => {
        this.loanTypeData = res
      })
    },
    // 使用年限
    getYear() {
      this.$axios.get('get/getServiceLife').then(res => {
        this.yearData = res
      })
    },
    // 业务类型
    getBusinessType() {
      this.$axios.get('get/getType').then(res => {
        this.businessData = res
      })
    },
    // 身份要求
    getIdentify() {
      this.$axios.get('get/getIdentity').then(res => {
        this.identifyData = res
      })
    },
    getProData() {
      this.$axios
        .get(
          `product/selectProductByAgency/${this.$store.state.userInfo.id}/${
            this.page
          }/${this.size}`
        )
        .then(res => {
          if (res) {
            this.tableData = res.list.map(item => {
              const moneyLimit =
                item.productStartAmount + '~' + item.productEndAmount + '万'
              const rate = item.productInterest + '%'
              return { ...item, moneyLimit, save: false, rate }
            })
            this.count = res.totalCount
          } else {
            this.tableData = []
          }
        })
    },
    resetForm() {
      this.productDetailData = {
        productName: '',
        producLoanLength: '',
        productRepaymentMethod: '',
        productCharacteristic: '', // 特点
        productPublisher: '', // 发型机构
        productInterest: '', // 利率
        productLoanType: '', // 贷款类型
        productOccupation: [], // 职业
        productIdentity: '', // 身份
        productTimeType: '天',
        productType: '',
        productMinAge: '',
        productMaxAge: '',
        productProperty: [], // 资产
        productStartAmount: '', // 额度
        productEndAmount: '',
        productLife: '', // 年限
        productCondition: '', // 条件
        agencyId: '',
        productLogo: ''
      }
      this.productDetailData.agencyId = this.$store.state.userInfo.id
    }
  }
}
</script>
<style lang="scss">
.pro-center-wrap {
  .el-dialog__header {
    height: 40px;
    background: #d0ac56;
    line-height: 40px;
    padding: 0;
    .el-dialog__title {
      color: #fff;
      font-size: 16px;
    }
  }
  .el-form {
    overflow: hidden;
  }
  .el-form-item {
    margin-bottom: 16px;
    width: 50%;
    float: left;
    &.cover-full {
      width: 100%;
    }
    .el-form-item__label {
      line-height: 30px;
      font-size: 12px;
      color: #9b9b9b;
      text-align: justify;
      text-align-last: justify;
    }
    .el-form-item__content {
      line-height: 30px;
      .el-select {
        &.w300 {
          width: 300px;
          .el-input {
            width: 100%;
          }
        }
      }
      .el-input {
        width: 145px;
        &.w60 {
          width: 65px
        }
        &.w300 {
          width: 300px
        }
        .el-input__inner {
          height: 30px;
          line-height: 30px;
        }
      }
    }
    .el-input__icon {
      line-height: 30px;
    }
  }

  .btn {
    width: 60px;
    height: 30px;
    background: rgba(208, 172, 86, 1);
    font-size: 14px;
    color: #fff;
    text-align: center;
    line-height: 30px;
    margin: 8px auto;
    cursor: pointer;
  }
}
</style>

<style scoped lang="scss">
.mt15 {
  margin-top: 15px;
  span {
    font-size: 14px;
    color: #666;
  }
}

.wenzi {
  width: 400px;
  font-size: 12px;
  color: rgba(155, 155, 155, 1);
}

.pro-center {
  width: 944px;
  height: 667px;
  background: rgba(255, 255, 255, 1);
  padding: 0 0 0 56px;
  font-family: PingFangSC-Medium;
  box-sizing: border-box;
  .title {
    height: 66px;
    font-size: 16px;
    font-weight: 500;
    color: rgba(81, 81, 81, 1);
    line-height: 66px;
  }
  .product-item {
    width: 252px;
    height: 255px;
    border: 1px solid rgba(217, 217, 217, 1);
    margin-right: 36px;
    position: relative;
    box-sizing: border-box;
    &:hover {
      box-shadow: 0px 0px 14px 0px rgba(217, 217, 217, 1);
    }
    input {
      width: 100px;
      height: 20px;
      box-sizing: border-box;
      padding-left: 3px;
      color: rgba(81, 81, 81, 1);
    }
    .name {
      width: 84px;
      height: 12px;
      font-size: 12px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(155, 155, 155, 1);
      line-height: 20px;
      margin-left: 22px;
    }
    .edit,
    .save {
      text-align: center;
      height: 26px;
      width: 50%;
      font-size: 12px;
      font-family: PingFangSC-Regular;
      line-height: 26px;
      background: rgba(217, 217, 217, 1);
      color: rgba(255, 255, 255, 1);
    }
    .edit:hover,
    .save:hover {
      background: #e6a23c;
      transition: all 0.5s;
    }
    .edit {
      position: absolute;
      right: 0;
      bottom: 0;
      cursor: pointer;
    }
    .save {
      position: absolute;
      left: 0;
      bottom: 0;
      cursor: pointer;
    }
  }
  .product {
    width: 252px;
    height: 255px;
    background: rgba(255, 255, 255, 1);
    border: 1px dashed rgba(217, 217, 217, 1);
    margin-right: 25px;
    position: relative;
    cursor: pointer;
    .my-up {
      position: absolute;
      left: 33%;
      top: 35%;
      .add-num {
        height: 53px;
        font-weight: 200;
        color: rgba(155, 155, 155, 1);
        line-height: 53px;
        font-size: 35px;
      }
      .add-pro {
        width: 64px;
        height: 53px;
        font-size: 16px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(155, 155, 155, 1);
        line-height: 53px;
        margin-left: 5px;
      }
    }
  }
  .save-btn {
    position: absolute;
    bottom: 0;
    display: block;
    cursor: pointer;
    height: 26px;
    width: 100%;
    color: #fff;
    border: none;
    background: rgba(208, 172, 86, 1);
    outline: none;
  }
}
</style>
