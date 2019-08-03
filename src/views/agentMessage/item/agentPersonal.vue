<template>
  <div>
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
        <el-form
          ref="formData"
          :model="formData"
          :rules="formDataRules"
          :class="{'border-show': !isEdit}"
          label-position="right"
          label-width="120px"
        >
          <el-form-item label="姓名:" prop="brokerName">
            <el-input
              v-if="isEdit"
              v-model="formData.brokerName"
              class="input-item"
              placeholder="请输入姓名"
            />
            <span v-else>{{ formData.brokerName }}</span>
          </el-form-item>
          <el-form-item label="性别:" prop="sex">
            <el-radio-group v-if="isEdit" v-model="formData.sex">
              <el-radio :label="1">男</el-radio>
              <el-radio :label="0">女</el-radio>
            </el-radio-group>
            <span v-else>{{ formData.sex | sexFilter }}</span>
          </el-form-item>
          <el-form-item label="年龄:" prop="age">
            <el-input v-if="isEdit" v-model="formData.age" class="input-item" placeholder="请输入年龄"/>
            <span v-else>{{ formData.age }}岁</span>
          </el-form-item>
          <el-form-item label="身份证号:" prop="identity">
            <el-input
              v-if="isEdit"
              v-model="formData.identity"
              class="input-item"
              placeholder="请输入身份证号"
            />
            <span v-else>{{ formData.identity }}</span>
          </el-form-item>
          <el-form-item label="擅长业务:" prop="businessList">
            <el-tag v-for="(item,index) in formData.businessList" :key="index">{{ item.business }}</el-tag>
            <span v-if="isEdit" class="business" @click="goodMask">+</span>
          </el-form-item>
          <el-form-item label="业务介绍:" prop="introduction">
            <el-input
              v-if="isEdit"
              v-model="formData.introduction"
              class="input-item"
              type="textarea"
              placeholder="请输入业务介绍"
            />
            <span v-else>{{ formData.introduction }}</span>
          </el-form-item>
          <el-form-item label="从业年限:" prop="workingYears">
            <el-input
              v-if="isEdit"
              v-model="formData.workingYears"
              class="input-item"
              placeholder="请输入从业年限（年）"
            />
            <span v-else>{{ formData.workingYears }}年</span>
          </el-form-item>
          <el-form-item label="所属机构:" prop="company">
            <el-input
              v-if="isEdit"
              v-model="formData.company"
              class="input-item"
              placeholder="请填写所属机构"
            />
            <span v-else>{{ formData.company }}</span>
          </el-form-item>
          <el-form-item label="所在地:" prop="address">
            <el-select
              v-if="isEdit"
              v-model="formData.address1"
              style="width: 100px;"
              clearable
              @change="handleCity"
            >
              <el-option
                v-for="item in provinceData"
                :key="item.pid"
                :label="item.provincial"
                :value="item.pid"
              />
            </el-select>
            <el-select v-if="isEdit" v-model="formData.address2" style="width: 100px;" clearable>
              <el-option
                v-for="item in cityData"
                :key="item.cid"
                :label="item.city"
                :value="item.cid"
              />
            </el-select>
            <span v-else>{{ address }}</span>
          </el-form-item>
          <el-form-item label="手机号:" prop="phone">
            <el-input v-if="isEdit" :disabled="true" v-model="formData.phone" class="input-item"/>
            <span v-else>{{ formData.phone }}</span>
          </el-form-item>
          <el-form-item label="邮箱:" prop="email">
            <el-input v-if="isEdit" :disabled="true" v-model="formData.email" class="input-item"/>
            <span v-else>{{ formData.email }}</span>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div v-if="isMask" class="mask" @click="closeMask"/>
    <div v-if="isBusiness" class="goodBuss">
      <div class="buss-title">编辑擅长业务标签</div>
      <div class="buss-tag">
        <div class="tag-title">常用业务标签</div>
        <div class="tag-contain clearfix">
          <div
            v-for="(item,index) in tags"
            :class="businessNameList.indexOf(item.business) !== -1? 'tag tag-active fll clearfix' : 'tag fll clearfix'"
            :key="index"
            @click="HandleSelsectTags(item)"
          >+{{ item.business }}</div>
        </div>
        <div class="always">已添加标签</div>
        <div class="select-tag-contain clearfix">
          <div v-for="(item, index) in businessList" :key="index" class="select-tag fll">
            <span class="jian" @click="removeSelectTag(index)">-</span>
            <span class="tag-item">{{ item.business }}</span>
          </div>
        </div>
        <div class="clearfix save-main">
          <button class="save" @click="saveTag">保存</button>
          <button class="cancel" @click="cancelTag">取消</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { validaterName, validaterInt } from '@/util/validate'
import { fetchProvince, fetchCity } from '@/api/register'
export default {
  filters: {
    sexFilter(val) {
      const statusMap = {
        1: '男',
        0: '女'
      }
      return statusMap[val]
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
    const validateAge = (rule, value, callback) => {
      if (value) {
        if (validaterInt(value)) {
          callback()
        } else {
          callback('年龄格式不正确，应为整数')
        }
      } else {
        callback(new Error('年龄不能为空'))
      }
    }
    const validateWorkYear = (rule, value, callback) => {
      if (value) {
        if (validaterInt(value)) {
          callback()
        } else {
          callback('从业年限格式不正确，应为整数')
        }
      } else {
        callback()
      }
    }
    const validateAdress = (rule, value, callback) => {
      if (this.formData.address1 !== '' && this.formData.address2) {
        callback()
      } else {
        callback(new Error('请选择地区'))
      }
    }
    return {
      isEdit: false,
      // 省
      provinceData: [],
      // 市 区
      cityData: [],
      formData: {
        brokerName: '',
        identity: '',
        phone: '',
        sex: 1,
        age: '',
        introduction: '',
        email: '',
        address1: '',
        address2: '',
        workingYears: '',
        company: '',
        businessList: []
      },
      formDataRules: {
        brokerName: [
          { required: true, trigger: 'change', validator: validateName }
        ],
        sex: [{ required: true, message: '请选择性别', trigger: 'change' }],
        businessList: [
          { required: true, message: '请选择擅长业务', trigger: 'change' }
        ],
        introduction: [{ required: true, message: '业务介绍不能为空', trigger: 'change' }],
        address: [{ required: true, trigger: 'change', validator: validateAdress }],
        age: [{ required: true, trigger: 'change', validator: validateAge }],
        workingYears: [{ required: false, trigger: 'change', validator: validateWorkYear }]
      },
      businessNameList: [], // 已选的tag的name
      businessList: [], // 暂存 选中的tag
      isMask: false,
      isBusiness: false
    }
  },
  computed: {
    ...mapState(['userInfo']),
    address() {
      let str = ''
      for (let i = 0; i < this.provinceData.length; i++) {
        if (this.provinceData[i].pid === this.formData.address1) {
          str = this.provinceData[i].provincial
        }
      }
      for (let i = 0; i < this.cityData.length; i++) {
        if (this.cityData[i].cid === this.formData.address2) {
          str += this.cityData[i].city
        }
      }
      return str
    }
  },
  created() {
    this.getProvince()
    this.getGoodBusiness()
    this.getPersonal()
  },
  methods: {
    ...mapMutations(['SET_USERNAME']),
    closeMask() {
      this.isMask = false
      this.isBusiness = false
    },
    // 编辑
    edit() {
      this.isEdit = !this.isEdit
    },
    // 保存
    savePerson() {
      this.$refs.formData.validate(valid => {
        if (valid) {
          const data = new FormData()
          for (const item in this.formData) {
            if (item === 'businessList') {
              const businessScope = this.formData.businessList
                .map(item => item.businessId)
                .join(',')
              data.append('businessScope', businessScope)
            } else {
              data.append(item, this.formData[item])
            }
          }
          this.$axios.post('userBroker/modifyUserBroker', data).then(res => {
            if (res.status === 200) {
              this.$message.success(res.msg)
              this.SET_USERNAME(this.formData.brokerName)
              this.isEdit = !this.isEdit
            }
          })
        } else {
          return false
        }
      })
    },
    // 放弃修改
    abandonPerson() {
      this.getPersonal()
      this.isEdit = false
    },
    // 保存标签
    saveTag() {
      this.formData.businessList = [...this.businessList]
      this.isMask = false
      this.isBusiness = false
    },
    // 取消标签
    cancelTag() {
      this.isMask = false
      this.isBusiness = false
    },
    // 获取省
    getProvince() {
      fetchProvince().then(res => {
        this.provinceData = res.data
      })
    },
    handleCity(val) {
      this.formData.address2 = ''
      this.getCity(val)
    },
    // 获取 市 区
    getCity(val) {
      fetchCity(val).then(res => {
        this.cityData = res.data
      })
    },
    goodMask() {
      this.businessList = [...this.formData.businessList]
      this.businessNameList = this.formData.businessList.map(
        item => item.business
      )
      this.isMask = true
      this.isBusiness = true
    },
    // 添加选择的业务标签
    HandleSelsectTags(item) {
      if (item.business === '不限') {
        const index = this.businessNameList.indexOf(item.business)
        if (index === -1) {
          this.businessList = [item]
          this.businessNameList = ['不限']
        } else {
          this.businessList = []
          this.businessNameList = []
        }
      } else {
        const buxian = this.businessNameList.indexOf('不限')
        if (buxian !== -1) {
          this.businessList.splice(buxian, 1)
          this.businessNameList.splice(buxian, 1)
        }
        const index = this.businessNameList.indexOf(item.business)
        if (index !== -1) {
          this.businessList.splice(index, 1)
          this.businessNameList.splice(index, 1)
        } else {
          this.businessList.push(item)
          this.businessNameList.push(item.business)
        }
      }
    },
    // 获取擅长业务标签
    getGoodBusiness() {
      this.$axios.get('business/getAllBusiness').then(res => {
        this.tags = res
      })
    },
    // 移除选中的业务标签
    removeSelectTag(index) {
      this.businessList.splice(index, 1)
      this.businessNameList.splice(index, 1)
    },
    // 初始化经纪人个人信息
    getPersonal() {
      this.$axios
        .get(`userBroker/getUserBrokerById/${this.userInfo.id}`)
        .then(res => {
          this.formData.brokerName = res.brokerName
          this.formData.identity = res.identity
          this.formData.phone = res.phone
          this.formData.sex = res.sex
          this.formData.age = res.age
          this.formData.introduction = res.introduction
          this.formData.email = res.email
          this.formData.address1 = res.address1
          this.formData.address2 = res.address2
          this.formData.workingYears = res.workingYears
          this.formData.company = res.company
          this.formData.businessList = res.businessList
          this.getCity(this.formData.address1)
        })
    }
  }
}
</script>

<style scoped lang="scss">
.form-wrap {
  .input-item {
    width: 200px;
  }
  .el-tag {
    background: #d0ac56;
    color: #fff;
    border-color: #d0ac56;
    margin-left: 10px;
  }
  .business {
    cursor: pointer;
    display: inline-block;
    width: 30px;
    height: 30px;
    border-radius: 3px;
    border: 1px solid #ccc;
    color: #888;
    font-size: 30px;
    font-weight: lighter;
    line-height: 30px;
    text-align: center;
    margin-left: 10px;
    transform: translateY(8px);
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
.mask {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: #000;
  opacity: 0.5;
  z-index: 100;
}
.goodBuss {
  position: fixed;
  left: 50%;
  top: 15%;
  transform: translateX(-50%);
  width: 598px;
  min-height: 409px;
  z-index: 999;
  background: rgba(255, 255, 255, 1);
  .buss-title {
    width: 598px;
    height: 40px;
    background: rgba(208, 172, 86, 1);
    text-align: center;
    font-size: 16px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    line-height: 40px;
  }
  .buss-tag {
    position: relative;
    padding: 20px 30px;
    box-sizing: border-box;
    background: rgba(255, 255, 255, 1);
    .tag-title {
      height: 14px;
      font-size: 14px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(81, 81, 81, 1);
      line-height: 14px;
      margin-bottom: 14px;
    }
    .tag-contain {
      width: 538px;
      min-height: 144px;
      border: 1px solid rgba(217, 217, 217, 1);
      .tag {
        box-sizing: border-box;
        cursor: pointer;
        height: 28px;
        text-align: center;
        padding: 5px;
        margin: 10px 15px;
        font-size: 12px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(81, 81, 81, 1);
        line-height: 15px;
        border-radius: 14px;
        border: 1px solid rgba(217, 217, 217, 1);
      }
      .tag-active {
        color: #fff;
        background: rgba(208, 172, 86, 1);
      }
    }
    .select-tag-contain {
      box-sizing: border-box;
      width: 538px;
      min-height: 30px;
      padding: 5px;

      .select-tag {
        margin: 5px 10px;

        .jian {
          display: inline-block;
          width: 19px;
          height: 19px;
          border-radius: 50%;
          text-align: center;
          font-size: 22px;
          font-weight: 500;
          line-height: 16px;
          color: #fff;
          background: rgba(208, 172, 86, 1);
          user-select: none;
          cursor: pointer;
        }
        .tag-item {
          display: inline-block;
          box-sizing: border-box;
          cursor: pointer;
          height: 28px;
          text-align: center;
          padding: 5px;
          margin: 0 5px;
          font-size: 12px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: #fff;
          background: rgba(208, 172, 86, 1);
          line-height: 15px;
          border-radius: 14px;
          border: 1px solid rgba(217, 217, 217, 1);
        }
      }
    }
    .always {
      margin-top: 20px;
      height: 14px;
      font-size: 14px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(81, 81, 81, 1);
      line-height: 14px;
    }
    .save-main {
      height: 40px;
      width: 100%;
      text-align: center;
      .save {
        cursor: pointer;
        width: 86px;
        height: 40px;
        background: rgba(208, 172, 86, 1);
        border-radius: 4px;
        font-size: 14px;
        outline: none;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 40px;
        text-align: center;
        border: none;
      }
      .cancel {
        cursor: pointer;
        margin-left: 40px;
        width: 86px;
        height: 40px;
        background: rgba(217, 217, 217, 1);
        border-radius: 4px;
        font-size: 14px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(155, 155, 155, 1);
        line-height: 40px;
        text-align: center;
        border: none;
        outline: none;
      }
    }
  }
}
</style>
