<template>
  <div>
    <registerTop/>

    <div class="wrappy">
      <div class="w900">
        <div class="user-main">
          <div class="user-title">
            <div class="title">欢迎注册就能贷网</div>
            <div class="number">已有账号，</div>
            <div class="login" @click="$router.push({path:'/home',query:{login:1}})">立即登陆</div>
          </div>
          <el-form
            ref="formData"
            :model="formData"
            :rules="rules"
            label-position="right"
            label-width="110px"
          >
            <div class="user-form">
              <div class="person-item clearfix">
                <el-form-item label="姓名:" prop="brokerName" style="width: 350px;">
                  <el-input v-model="formData.brokerName" type="text"/>
                </el-form-item>
              </div>
              <div class="person-item clearfix">
                <el-form-item label="性别:" prop="sex">
                  <div>
                    <el-radio-group v-model="formData.sex">
                      <el-radio :label="1">男</el-radio>
                      <el-radio :label="0">女</el-radio>
                    </el-radio-group>
                  </div>
                </el-form-item>
              </div>
              <div class="person-item clearfix">
                <el-form-item label="上传头像:" prop="image">
                  <upload-img class="fll" @uploadSuccess="uploadSuccess" @uploadFail="uploadFail"/>
                  <div class="fll text-desc">请上传正面照，支持JPG/JPEG/PNG格式图片，照片不大于2M</div>
                </el-form-item>
              </div>
              <div class="person-item clearfix">
                <el-form-item label="身份证号:" prop="identify" style="width: 350px;">
                  <el-input v-model="formData.identity" type="text"/>
                </el-form-item>
              </div>
              <div class="person-item clearfix">
                <el-form-item label="所在地:" prop="address">
                  <el-select v-model="formData.address1" style="width: 100px;" clearable @change="getCity">
                    <el-option
                      v-for="item in provinceData"
                      :key="item.pid"
                      :label="item.provincial"
                      :value="item.pid"
                      style="width: 100px;"
                    />
                  </el-select>
                  <el-select v-model="formData.address2" style="margin-left: 10px;width: 100px;" clearable>
                    <el-option
                      v-for="item in cityData"
                      :key="item.cid"
                      :label="item.city"
                      :value="item.cid"
                      style="width: 100px;"
                    />
                  </el-select>
                </el-form-item>
              </div>
              <div class="person-item clearfix">
                <el-form-item label="业务分类:" prop="businessType">
                  <el-select
                    v-model="formData.businessType"
                    multiple
                    placeholder="请选择"
                    style="width: 250px;"
                  >
                    <el-option
                      v-for="item in optionBuss"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </div>
              <div class="person-item clearfix">
                <el-form-item label="贷款类型:" prop="loanType">
                  <el-select
                    v-model="formData.loanType"
                    multiple
                    placeholder="请选择"
                    style="width: 250px;"
                  >
                    <el-option
                      v-for="item in optionType"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </div>
              <div class="person-item clearfix">
                <el-form-item label="擅长业务:" prop="businessScope">
                  <div class="business-wrap clearfix">
                    <div v-if="isShowTag"><div
                      v-for="(item,index) in formData.businessScope"
                      :key="index"
                      class="fll tags-item"
                    >{{ item.business }}</div></div>
                    <div class="business fll" @click="goodMask">
                      <div class="my-upload-img">+</div>
                    </div>
                  </div>
                </el-form-item>
              </div>
              <div class="person-item clearfix">
                <el-form-item label="业务介绍:" prop="introduction" style="width: 350px;">
                  <el-input v-model="formData.introduction" type="text" placeholder="各种银行贷款，提供优质金融服务"/>
                </el-form-item>
              </div>
              <div class="person-item clearfix">
                <el-form-item label="贷款信息:" prop="loanInfos">
                  <span
                    :class="{'select': flag1}"
                    class="tags"
                    @click="handleLoanInfo1()"
                  >信用贷</span>
                  <span
                    :class="{'select': flag2}"
                    class="tags"
                    @click="handleLoanInfo2()"
                  >房贷</span>
                  <span
                    :class="{'select': flag3}"
                    class="tags"
                    @click="handleLoanInfo3()"
                  >车贷</span>
                  <span
                    :class="{'select': flag4}"
                    class="tags"
                    @click="handleLoanInfo4()"
                  >企业贷</span>
                  <div class="wrap-box">
                    <ul>
                      <li
                        v-if="formData.loanInfos.length"
                        class="header">
                        <span/>
                        <span>月利率最低到最高</span>
                        <span>最快放贷时间</span>
                        <span>最高贷款额度</span>
                        <span>最长贷款期限</span>
                      </li>
                      <li
                        v-for="item in formData.loanInfos"
                        :key="item.id"
                      >
                        <span>{{ item.loanName }}</span>
                        <span>
                          <span>
                            <el-input
                              v-model="item.minRate"
                              class="el-input-custom"
                              @change="checkMinRate(item)"
                            />~
                            <el-input
                              v-model="item.maxRate"
                              class="el-input-custom"
                              @change="checkMaxRate(item)"
                            />
                          </span>%
                        </span>
                        <span>
                          <el-input
                            v-model="item.loanTime"
                            class="el-input-custom"
                            @change="checkLoanTime(item)"
                          />&nbsp;天
                        </span>
                        <span>
                          <el-input
                            v-model="item.loanAmount"
                            class="el-input-custom"
                            @change="checkLoanAmount(item)"
                          />&nbsp;万
                        </span>
                        <span>
                          <el-input
                            v-model="item.loanTerm"
                            class="el-input-custom"
                            @change="checkLoanTerm(item)"
                          />&nbsp;年
                        </span>
                      </li>
                    </ul>
                  </div>
                </el-form-item>
              </div>
              <div class="person-item clearfix">
                <el-form-item label="手机号:" prop="phone" style="width: 350px;">
                  <el-input v-model="formData.phone" type="text"/>
                </el-form-item>
              </div>
              <div class="person-item clearfix">
                <el-form-item label="验证码:" prop="password" style="width: 250px; float: left">
                  <el-input v-model="formData.password" type="text" autocomplete="off"/>
                </el-form-item>
                <div class="fll verify">
                  <div v-if="showing" class="send" @click="send">{{ verifyCode }}</div>
                  <div v-else class="time send">{{ time }}s</div>
                </div>
              </div>
              <div class="person-item clearfix">
                <el-form-item>
                  <div class="clearfix register">
                    <div class="fll agree" @click="register">同意协议并注册</div>
                    <div
                      class="fll immediate"
                      @click="$router.push({path:'/home',query:{login:1}})"
                    >已有账号？立即登陆</div>
                  </div>
                  <div class="agreement"><el-checkbox v-model="isChecked"/> 阅读并同意 <a href="#/agreement?userRegister" target="_blank">《9能贷用户注册协议》</a></div>
                </el-form-item>
              </div>
            </div>
          </el-form>
        </div>
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
            :class="formData.businessScope.indexOf(item) !== -1? 'tag tag-active fll clearfix' : 'tag fll clearfix'"
            :key="index"
            @click="HandleSelsectTags(item)"
          >+{{ item.business }}</div>
        </div>
        <div class="always">已添加标签</div>
        <div class="select-tag-contain clearfix">
          <div v-for="(item, index) in formData.businessScope" :key="index" class="select-tag fll">
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
import registerTop from '../component/registerTop'
import wcheckbox from '../component/w-checkBox'
import validater from '../util/validater'
import { randomWord } from '@/util/util'
import { mapState, mapMutations } from 'vuex'
import { validaterName } from '@/util/validate'
import { registerAccount, fetchProvince, fetchCity } from '@/api/register'
import uploadImg from '@/component/uploadImg'
const reg = /^\d+(\.(?!.*0$)\d{1,2})?$/
const regZ = /^\d+$/
export default {
  components: {
    registerTop,
    wcheckbox,
    uploadImg
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
    const validateLoanInfos = (rule, value, callback) => {
      const length = this.formData.loanInfos.length
      if (length) { //  选中贷款信息
        const arr = []
        for (let i = 0; i < length; i++) {
          let count = 0
          for (const key in this.formData.loanInfos[i]) {
            if (this.formData.loanInfos[i][key] !== '') {
              count++
            }
          }
          if (count === 7) {
            arr.push(true)
          }
        }
        if (arr.length === length) {
          callback()
        } else {
          callback(new Error('请将贷款信息填写完整'))
        }
      } else {
        callback(new Error('请至少填写一条贷款信息'))
      }
    }
    const validateAddress = (rule, value, callback) => {
      if (this.formData.address1 && this.formData.address2) {
        callback()
      } else {
        callback(new Error('请选择地址'))
      }
    }
    return {
      flag1: false,
      flag2: false,
      flag3: false,
      flag4: false,
      isChecked: true,
      phone: '',
      optionType: [
        {
          value: '1',
          label: '信用贷'
        },
        {
          value: '2',
          label: '抵押贷'
        }
      ],
      optionBuss: [
        {
          value: '1',
          label: '个人贷'
        },
        {
          value: '2',
          label: '企业贷'
        }
      ],
      isShowTag: false,
      showing: true,
      time: 60,
      verifyCode: '发送验证码',
      formData: {
        businessType: [],
        loanType: [],
        // brokerId:'',//经纪人编号
        brokerName: '', // 经纪人姓名
        phone: '', // 手机号
        image: '', // 图片
        sex: 1, // 性别
        job: '', // 部门职位
        age: '', // 部门职位
        recommended: '', // 推荐指数
        identity: '', // 身份证号
        email: '', // 邮箱
        address: '', // 住址
        company: '', // 所属公司
        address1: '', // 业务地区
        address2: '', // 业务地区
        businessScope: [],
        introduction: '',
        password: '',
        loanInfos: [] // 贷款信息
      },
      isMask: false,
      isBusiness: false,
      tags: [],

      query: {
        tag: ''
      },
      // 省
      provinceData: [],
      // 市 区
      cityData: [],
      rules: {
        phone: [
          { validator: validater.phoneNumber, trigger: 'change' },
          { required: true, trigger: 'change', message: '手机号不能为空' }
        ],
        password: [
          { required: true, trigger: 'change', message: '验证码不能为空' }
        ],
        brokerName: [
          { required: true, trigger: 'change', validator: validateName }
        ],
        businessScope: [
          { required: true, trigger: 'change', message: '擅长业务不能为空' }
        ],
        loanType: [
          { required: true, trigger: 'change', message: '贷款类型不能为空' }
        ],
        loanInfos: [
          { required: true, trigger: 'change', validator: validateLoanInfos }
        ],
        businessType: [
          { required: true, trigger: 'change', message: '业务分类不能为空' }
        ],
        address: [
          { required: true, trigger: 'change', validator: validateAddress }
        ],
        identify: [
          { validator: validater.idCard, trigger: 'change' }
        ],
        introduction: [{ required: true, trigger: 'change', message: '业务分类不能为空' }],
        image: [{ required: true, trigger: 'change', message: '头像不能为空' }],
        sex: [{ required: true, trigger: 'change', message: '性别不能为空' }]
      },
      flag: false
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  methods: {
    ...mapMutations(['SET_USER']),
    closeMask() {
      this.formData.businessScope = []
      this.isMask = false
      this.isBusiness = false
    },
    checkMinRate(item) {
      if (!reg.test(item.minRate)) {
        this.$message.error('最低月利率格式不正确')
        item.minRate = ''
      }
    },
    checkMaxRate(item) {
      if (!reg.test(item.maxRate)) {
        this.$message.error('最高月利率格式不正确')
        item.maxRate = ''
      } else if (item.minRate > item.maxRate) {
        this.$message.error('最低月利率不能高于最高月利率格式')
        item.maxRate = ''
      }
    },
    checkLoanTime(item) {
      if (!regZ.test(item.loanTime)) {
        this.$message.error('最快放贷时间格式不正确')
        item.loanTime = ''
      }
    },
    checkLoanAmount(item) {
      if (!regZ.test(item.loanAmount)) {
        this.$message.error('最高贷款额度格式不正确')
        item.loanAmount = ''
      }
    },
    checkLoanTerm(item) {
      if (!regZ.test(item.loanTerm)) {
        this.$message.error('最长贷款期限格式不正确')
        item.loanTerm = ''
      }
    },
    // 保存标签
    saveTag() {
      this.isMask = false
      this.isBusiness = false
      this.isShowTag = true
    },
    // 取消标签
    cancelTag() {
      this.formData.businessScope = []
      this.isMask = false
      this.isBusiness = false
      this.isShowTag = false
    },
    //  检测手机号是否被注册
    checkPhone(timer) {
      this.$axios.get(`user/selectPhone/${this.formData.phone}`).then(res => {
        if (res.status === 200) {
          this.$message.warning('手机号已注册')
          this.clearTimer(timer)
        } else if (res.status === 500) {
          // 手机号未被注册
          this.getCode()
        }
      })
    },
    getCode() {
      this.$axios.get(`base/getRegisterCode/${this.formData.phone}`).then(res => {
        if (res.status === 200) {
          this.$message.success('验证码发送成功，请注意查收')
        } else {
          this.$message.warning(res.msg)
        }
      })
    },
    clearTimer(timer) {
      clearInterval(timer)
      this.showing = true
      this.verifyCode = '重新获取'
      this.time = 60
    },
    // 发送验证码
    send() {
      const reg = /^1\d{10}$/
      if (this.formData.phone) {
        if (reg.test(this.formData.phone)) {
          this.showing = false
          const timer = setInterval(() => {
            this.time--
            if (this.time < 0) {
              this.clearTimer(timer)
            }
          }, 1000)
          this.checkPhone(timer)
        }
      } else {
        this.$message.warning('请输入手机号')
      }
    },
    spliceLoanInfos(id) {
      for (let i = 0; i < this.formData.loanInfos.length; i++) {
        if (this.formData.loanInfos[i].id === id) {
          this.formData.loanInfos.splice(i, 1)
        }
      }
    },
    handleLoanInfo1(val) {
      this.flag1 = !this.flag1
      const obj = {
        id: '1',
        loanName: '信用贷',
        minRate: '',
        maxRate: '',
        loanTerm: '',
        loanAmount: '',
        loanTime: ''
      }
      if (this.flag1) {
        this.formData.loanInfos.push(obj)
      } else {
        this.spliceLoanInfos(obj.id)
      }
    },
    handleLoanInfo2(val) {
      this.flag2 = !this.flag2
      const obj = {
        id: '2',
        loanName: '房贷',
        minRate: '',
        maxRate: '',
        loanTerm: '',
        loanAmount: '',
        loanTime: ''
      }
      if (this.flag2) {
        this.formData.loanInfos.push(obj)
      } else {
        this.spliceLoanInfos(obj.id)
      }
    },
    handleLoanInfo3(val) {
      this.flag3 = !this.flag3
      const obj = {
        id: '3',
        loanName: '车贷',
        minRate: '',
        maxRate: '',
        loanTerm: '',
        loanAmount: '',
        loanTime: ''
      }
      if (this.flag3) {
        this.formData.loanInfos.push(obj)
      } else {
        this.spliceLoanInfos(obj.id)
      }
    },
    handleLoanInfo4(val) {
      this.flag4 = !this.flag4
      const obj = {
        id: '4',
        loanName: '企业贷',
        minRate: '',
        maxRate: '',
        loanTerm: '',
        loanAmount: '',
        loanTime: ''
      }
      if (this.flag4) {
        this.formData.loanInfos.push(obj)
      } else {
        this.spliceLoanInfos(obj.id)
      }
    },
    // 注册
    register() {
      this.$refs.formData.validate(valid => {
        if (valid) {
          if (this.isChecked) {
            if (!this.flag) {
              const params = Object.assign({}, this.formData)
              params.businessScope = params.businessScope.map(item => item.businessId).join(',')
              params.loanInfos = JSON.stringify(params.loanInfos)
              params.businessType = params.businessType.join(',')
              params.loanType = params.loanType.join(',')
              registerAccount(params).then(res => {
                if (res.data.status === 200) {
                  this.formData.businessScope = []
                  this.formData.loanInfos = []
                  this.$router.push({
                    path: '/registerJump',
                    query: { number: this.formData.phone }
                  })
                } else {
                  this.$message.warning(res.data.msg)
                }
              })
              this.flag = true
              if (this.flag) {
                setTimeout(() => {
                  this.flag = false
                }, 5000)
              }
            } else {
              this.$message.warning('请不要重复点击')
            }
          } else {
            this.$message.warning('注册前请阅读并同意相关协议')
          }
        } else {
          return false
        }
      })
    },
    goodMask() {
      this.isMask = true
      this.isBusiness = true
    },
    // 添加选择的业务标签
    HandleSelsectTags(item) {
      const index = this.formData.businessScope.indexOf(item)
      if (index !== -1) {
        this.formData.businessScope.splice(index, 1)
      } else {
        this.formData.businessScope.push(item)
      }
    },
    // 移除选中的业务标签
    removeSelectTag(index) {
      this.formData.businessScope.splice(index, 1)
    },
    // 获取省
    getProvince() {
      fetchProvince().then(res => {
        this.provinceData = res.data
      })
    },
    // 获取 市 区
    getCity(val) {
      this.formData.address2 = ''
      if (val) {
        fetchCity(val).then(res => {
          this.cityData = res.data
        })
      }
    },
    // 获取擅长业务标签
    getGoodBusiness() {
      this.$axios.get('business/getAllBusiness').then(res => {
        res.splice(0, 1)
        this.tags = res
      })
    },
    uploadSuccess(val, field) {
      console.log('上传成功', val, field)
      this.formData.image = val.jsonData.data
    },
    uploadFail(val, field) {
      console.log('上传失败', val, field)
    }
  },
  created() {
    this.phone = new Date().getTime() + randomWord(false, 10)
    this.getProvince()
    this.getGoodBusiness()
  }
}
</script>

<style lang="scss">
.wrap-box {
  ul li > span:nth-of-type(2) {
    .el-input__inner {
      padding: 0 15px;
      border: none;
    }
  }
}
</style>
<style scoped lang="scss">
input::-webkit-input-placeholder {
  color: #888;
  font-size: 12px;
  text-align: center;
}
.mb5 {
  margin-bottom: 5px;
}
.ml6 {
  margin-left: 3px;
}
.ml20 {
  margin-left: 20px;
}
.user-main {
  padding-bottom: 50px;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 1);
  .user-title {
    width: 100%;
    height: 90px;
    border-bottom: 1px solid #eee;
    position: relative;
    .title {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      font-size: 24px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(81, 81, 81, 1);
    }
    .number {
      opacity: 0.5;
      position: absolute;
      left: 655px;
      top: 40px;
      font-size: 14px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(81, 81, 81, 1);
    }
    .login {
      position: absolute;
      left: 720px;
      top: 40px;
      font-size: 14px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(168, 14, 14, 1);
      cursor: pointer;
    }
  }
  .user-form {
    height: auto;
    margin: 20px 100px;
    .person-item {
      .wrap-box {
        ul {
          padding: 0;
          list-style: none;
        }
        li {
          & > span:first-of-type {
            width: 10%;
            font-size: 16px;
            margin: 10px 0;
            text-align: justify;
            -align: justify;
            text-align-last: justify;
            -align-last: justify;
          }
          & > span:nth-of-type(2) {
            width: 30%;
            margin: 10px 0;
            .el-input-custom {
              width: 45%;
            }
          }
          & > span {
            display: inline-block;
            width: 18%;
            font-size: 12px;
            color: #666;
            text-align: center;
            span {
              display: inline-block;
              width: 80%;
              border: 1px solid #ccc;
              border-radius: 5px;
              margin-right: 3px;
            }
            .el-input-custom {
              width: 60%;
            }
          }
        }
      }
      .input-wrap {
        float: left;
        input {
          padding-left: 0;
          padding-right: 0;
          text-align: center;
        }
      }
      .loanMess {
        width: 60px;
        height: 35px;
        background: rgba(244, 244, 244, 1);
        border-radius: 2px;
        font-size: 16px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(81, 81, 81, 1);
        line-height: 40px;
        text-align: center;
      }
      .loan-active {
        width: 60px;
        height: 35px;
        font-size: 16px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(81, 81, 81, 1);
        line-height: 40px;
      }
      .business-wrap {
        width: 500px;
      }
      .text-desc {
        width: 160px;
        height: 34px;
        font-size: 12px;
        font-family: PingFangSC-Regular;
        font-weight: 300;
        color: rgba(81, 81, 81, 1);
        line-height: 17px;
        margin-left: 10px;
      }
      textarea {
        border: 1px solid #ccc;
        width: 248px;
        height: 80px;
      }
      .verify {
        .send {
          text-align: center;
          width: 80px;
          height: 38px;
          border-radius: 4px;
          border: 1px solid #ccc;
          font-size: 12px;
          font-family: PingFangSC-Medium;
          font-weight: 500;
          color: rgba(155, 155, 155, 1);
          line-height: 38px;
          margin-left: 20px;
          cursor: pointer;
        }
        .time {
          font-size: 16px;
          color: #888;
        }
      }
      .person-text {
        text-align: right;
        width: 100px;
        height: 40px;
        font-size: 14px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(81, 81, 81, 1);
        line-height: 40px;
      }
      .desc {
        height: 80px;
        line-height: 80px;
      }
      .upload {
        height: 80px;
        line-height: 80px;
      }
      input {
        width: 250px;
        height: 40px;
        border: 1px solid #ccc;
        border-radius: 5px;
        padding: 13px 10px;
        box-sizing: border-box;
        font-size: 14px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(81, 81, 81, 1);
        line-height: 40px;
      }
      .name,
      .card {
        width: 100px;
        height: 40px;
      }
      .radio {
        margin-top: 9px;
        margin-left: 19px;
      }
      /deep/ .el-radio__label {
        color: #aaa;
      }
      /deep/ .is-checked .el-radio__inner {
        border-color: #333;
        background: #fff;
        &:after {
          background-color: #333;
        }
      }
      /deep/ .is-checked + .el-radio__label {
        color: #333;
      }
      /deep/ .el-radio__inner:hover {
        border-color: #333;
      }
      .business {
        cursor: pointer;
        width: 40px;
        height: 40px;
        border-radius: 3px;
        border: 1px solid #ccc;
        position: relative;
        .my-upload-img {
          position: absolute;
          top: -7%;
          left: 16%;
          color: #888;
          font-size: 40px;
          font-weight: lighter;
        }
      }
      .tags-item {
        width: auto;
        padding: 0 3px;
        box-sizing: border-box;
        height: 40px;
        background: rgba(208, 172, 86, 1);
        border-radius: 4px;
        line-height: 40px;
        margin-right: 8px;
        font-size: 14px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        margin-bottom: 8px;
      }
    }
  }
  .agreement {
    font-size: 12px;
    cursor: pointer;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    line-height: 12px;
    margin-top: 29px;
    a {
      color: rgba(74, 144, 226, 1);
    }
  }
  .register {
    .immediate {
      width: 108px;
      height: 40px;
      font-size: 12px;
      cursor: pointer;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(74, 144, 226, 1);
      line-height: 40px;
      margin-left: 20px;
    }
    .agree {
      width: 280px;
      height: 40px;
      background: rgba(168, 14, 14, 1);
      font-size: 16px;
      cursor: pointer;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: 40px;
      text-align: center;
      border-radius: 5px;
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
.tags {
  background: #ccc;
  border-radius: 2px;
  color: #fff;
  padding: 5px 10px;
  cursor: pointer;
}
.tags.select {
  background: #d0ac56;
}
</style>
