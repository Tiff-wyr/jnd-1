<template>
  <div>
    <div class="wrappy">
      <div class="w1200">
        <div class="person clearfix mb30">
          <img
            v-if="organDetail.agencyLogo"
            :src="organDetail.agencyLogo"
            alt=""
            class="fll"
            style="width: 120px;height: 120px"
          >
          <img
            v-else
            src="/static/resource/pic/organ.png"
            alt=""
            class="fll"
            style="width: 120px;height: 120px"
          >
          <div class="fll">
            <div class="clearfix">
              <div class="fll" style="margin-left: 14px">
                <div class="name-box">
                  <div class="name fll">{{ organDetail.agencyName }}</div>
                  <img src="../../static/resource/agent/vip.png" alt="">
                </div>
                <a :href="'http://' + organDetail.agencyURL" target="_blank">{{ organDetail.agencyURL }}</a>
              </div>
              <div class="agent-detail clearfix fll">
                <div class="fll">
                  <div class="clearfix">
                    <div class="fll align">
                      <div class="num">{{ organDetail.agencyAgeLimit }}</div>
                      <div class="clearfix mt16">
                        <img src="../../static/resource/agent/1.png" alt="" class="fll">
                        <div class="num-text fll">成立年限</div>
                      </div>
                    </div>
                    <div class="fll align ml20">
                      <div class="num">{{ organDetail.agencyTotalService }}</div>
                      <div class="clearfix mt16">
                        <img src="../../static/resource/agent/1.png" alt="" class="fll">
                        <div class="num-text fll">服务客户</div>
                      </div>
                    </div>
                    <div class="fll align ml20">
                      <div class="num">{{ organDetail.agencyLoansAmount }}</div>
                      <div class="clearfix mt16">
                        <img src="../../static/resource/agent/1.png" alt="" class="fll">
                        <div class="num-text fll">批贷总额</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div style="margin-left: 20px" class="clearfix fll">
                  <img
                    src="../../static/resource/agent/tel.png"
                    alt=""
                    class="fll"
                    style="width: 56px;height: 47px"
                  >
                  <div class="fll">
                    <div class="text1">电话咨询贷款，最快捷，最方便！</div>
                    <div class="text2">{{ organDetail.phone | phoneFilter }}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="clearfix ml20">
              <div class="clearfix fll" style="margin-top: 16px;">
                <img
                  src="../assets/message.png"
                  alt=""
                  class="fll"
                  style="width: 20px;height: 20px;vertical-align: middle; margin-right: 10px;"
                >
                <div class="restore fll" @click="sendMess">发送消息</div>
              </div>
              <div class="clearfix flr" style="margin-top: 16px;">

                <img v-if="isCollect" src="../../static/resource/agent/star.png" class="fll" alt="" style="width: 20px; heihgt: 20px; vertical-align: center; margin-right: 10px;" >
                <img v-else src="../../static/resource/agent/star1.png" class="fll" alt="" style="width: 20px; heihgt: 20px; vertical-align: center; margin-right: 10px;" >
                <div class="fll">
                  <div v-if="isCollect" class="restore" @click="restore">加入收藏</div>
                  <div v-else class="restore" @click="cancelRestore">取消收藏</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="clearfix">
          <div class="fll">
            <div class="top">
              <div class="title">9能贷网诚信认证</div>
              <div class="content-agent">
                <div class="name">{{ organDetail.agencyName }}</div>
                <div class="name">实名认证：{{ organDetail.nameAuthentication }}</div>
                <div class="name">营业执照：{{ organDetail.licenseAuthentication }}</div>
                <div class="clearfix name-same" style="padding: 10px 0; border-bottom: 1px solid #f0f0f0;">
                  <div
                    class="name fll"
                    style="height: 18px;line-height: 18px; border: none;"
                  >推荐指数：</div>
                  <div class="fll">
                    <el-rate v-model="organDetail.agencyStar" disabled text-color="#ff9900" style="margin-top: 8px;"/>
                  </div>
                </div>

                <div class="name">所属公司：{{ organDetail.companyOwned }}</div>
                <div class="desc-title">机构简介：</div>
                <div class="desc">{{ organDetail.agencyIntroduction }}</div>
              </div>
            </div>
            <div v-if="loanData.length > 0" class="bottom">
              <div class="title">成功案例</div>
              <div v-for="(item,index) in loanData" :key="index" class="content-item">
                <span class="name">{{ item.borName }}</span><span class="money">贷款金额：{{ item.proAmount }}万</span>
              </div>
            </div>
          </div>
          <div class="fll">

            <div class="bottom-form">
              <div v-for="(item,index) in productData" :key="index" class="clearfix main-form">
                <div class="fll" style="width: 180px;overflow: hidden">
                  <div class="item1-num">{{ item.productName }}</div>
                  <div class="item-same">无需抵车即可贷款</div>
                </div>
                <div class="item1 fll align">
                  <div class="item-num">{{ item.productInterest }}%</div>
                  <div class="item-same">利息</div>
                </div>
                <div class="item1 fll align">
                  <div class="item-num">{{ item.producLoanLength }}</div>
                  <div class="item-same">放款时间</div>
                </div>
                <div class="item1 fll align">
                  <div class="item-num">{{ item.productLife }}</div>
                  <div class="item-same">使用年限</div>
                </div>
                <div class="item1 fll align">
                  <div class="item-num">{{ item.productStartAmount }}万起</div>
                  <div class="item-same">起贷金额</div>
                </div>
                <div class="flr organ-btn align" @click="lookDetail(item.productId)">立即查看</div>
              </div>
            </div>
            <div class="top-form">
              <el-form ref="agentApplyForm" :model="borrowerData" :rules="borrowerDataRules" label-position="right" label-width="96px">
                <el-form-item label="姓名：" prop="borrowerName">
                  <el-input :disabled="!!this.$store.state.userInfo" v-model="borrowerData.borrowerName" placeholder="请输入姓名" class="input-item"/>
                  <el-radio-group v-model="borrowerData.sex" :disabled="!!this.$store.state.userInfo" style="margin-left: 10px;">
                    <el-radio :label="1">男</el-radio>
                    <el-radio :label="0">女</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="贷款金额：" prop="loanAmount">
                  <el-input v-model="borrowerData.loanAmount" class="input-item" placeholder="请输入贷款金额（万元）"/>
                </el-form-item>
                <el-form-item label="所在地：" prop="address">
                  <el-select v-model="borrowerData.address1" style="width: 100px;" clearable @change="getCity">
                    <el-option
                      v-for="item in provinceData"
                      :key="item.pid"
                      :label="item.provincial"
                      :value="item.pid"/>
                  </el-select>
                  <el-select v-model="borrowerData.address2" clearable style="margin-left: 10px;width: 100px;">
                    <el-option v-for="item in cityData" :key="item.cid" :label="item.city" :value="item.cid"/>
                  </el-select>
                </el-form-item>
                <el-form-item label="业务类型：" prop="businessType">
                  <el-radio-group v-model="borrowerData.businessType">
                    <el-radio :label="1">个人贷款</el-radio>
                    <el-radio :label="2">企业贷款</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="有无抵押：" prop="isPawn">
                  <el-radio-group v-model="borrowerData.isPawn">
                    <el-radio :label="1">有抵押</el-radio>
                    <el-radio :label="0">无抵押</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item v-if="borrowerData.isPawn !== 0" label="抵押物：" prop="pawnKey">
                  <el-checkbox-group v-model="borrowerData.pawnKey">
                    <el-checkbox
                      v-for="(item,index) in pawnData"
                      :label="item.pawnId"
                      :key="index"
                    >{{ item.pawn }}</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                <el-form-item v-else label="无抵押：" prop="noPawn">
                  <el-select v-model="borrowerData.age" style="width: 100px;" placeholder="年龄">
                    <el-option v-for="item in ageData" :key="item.id" :label="item.ageArea" :value="item.id"/>
                  </el-select>

                  <el-select v-model="borrowerData.borrowerJob" style="margin-left: 5px;width: 100px;" placeholder="职业">
                    <el-option v-for="item in jobData" :key="item.jobId" :label="item.jobName" :value="item.jobId" style="width: 100px;"/>
                  </el-select>

                  <el-select v-model="borrowerData.borrowerMonthlyIncome" style="margin-left: 5px;width: 100px;" placeholder="月收入">
                    <el-option v-for="item in monthMoneyData" :key="item.id" :label="item.incomeName" :value="item.id"/>
                  </el-select>
                </el-form-item>

                <el-form-item v-if="!userInfo" label="手机号：" prop="phone">
                  <el-input v-model="borrowerData.phone" class="input-item" placeholder="请输入手机号"/>
                </el-form-item>
                <el-form-item v-if="!userInfo" label="验证码：" prop="code">
                  <el-input v-model="borrowerData.code" style="width: 90px;" placeholder="验证码"/>
                  <el-button v-if="showing" style="width: 110px;" @click="send">{{ verifyCode }}</el-button>
                  <el-button v-else style="width: 110px;" @click="send">{{ time }}s</el-button>
                </el-form-item>
                <el-form-item prop="agree">
                  <el-checkbox v-model="agree" style="display: inline-block">阅读并同意</el-checkbox><a href="/agreement?userRegister" target="_blank" style="color: #4a90e2;">《9能贷用户注册协议》</a><a href="/agreement?userProtect" target="_blank" style="color: #4a90e2;">《用户隐私保护政策》</a>
                </el-form-item>
                <el-form-item>
                  <el-button class="apply" @click="freeApply">免费申请</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>
        <footerSame/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import footerSame from '../component/footerSame'
import { validaterPhone, validaterName, validaterLoanAmount } from '@/util/validate'
import { formatPhone } from '@/util/util'
export default {
  name: 'OrganDetail',
  metaInfo: {
    title: '9能贷款_贷款申请_申请贷款100%下款_个人贷款申请找9能贷款',
    meta: [{
      name: 'keyWords',
      content: '助学贷款申请,贷款申请,申请贷款,助学贷款申请表,信用贷款申请,公积金贷款申请,个人贷款申请书,个人贷款申请,企业贷款申请书,贷款卡申请书,公司贷款申请书范文,大学生创业贷款申请,银行申请贷款,申请公积金贷款,申请贷款表,贷款申请表,银行贷款申请,个人申请贷款,贷款申请条件,申请创业贷款,公司贷款申请,小额贷款申请,申请小额贷款,装修贷款申请,企业贷款申请,网上申请贷款'
    }, {
      name: 'description',
      content: '9能贷款联合各类大型的金融机构,深度挖掘安全的金融服务渠道机构,为用户提供安全、多元的贷款产品和定制化的专业资金服务,打造更契合用户自身需求的贷款管理方案.找贷款,找经纪人,找机构,办理贷款上9能贷款;放款快,利率低0.35%,额度高,门槛低,渠道广.怎样申请助学贷款,如何申请助学贷款,助学贷款怎么申请,怎样申请小额贷款,怎样写贷款申请书,如何向银行申请贷款,如何申请创业贷款'
    }]
  },
  components: {
    footerSame
  },
  filters: {
    phoneFilter(phone) {
      if (!phone) return
      if (phone.match('0000')) {
        return formatPhone(phone)
      } else {
        return phone
      }
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
    const validateAddress = (rule, value, callback) => {
      if (this.borrowerData.address1 && this.borrowerData.address2) {
        callback()
      } else {
        callback(new Error('请选择地址'))
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
    }
    const validatePawnKey = (rule, value, callback) => {
      if (this.borrowerData.isPawn) {
        if (this.borrowerData.pawnKey.length === 0) {
          callback(new Error('请选择抵押物'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    const validateNoPawn = (rule, value, callback) => {
      if (!this.borrowerData.isPawn) {
        if (this.borrowerData.age !== '' && this.borrowerData.borrowerJob !== '' && this.borrowerData.borrowerMonthlyIncome !== '') {
          callback()
        } else {
          callback(new Error('请将相关信息选择完整'))
        }
      } else {
        callback()
      }
    }
    const validateAgree = (rule, value, callback) => {
      if (this.agree) {
        callback()
      } else {
        callback(new Error('请阅读并同意9能贷相关协议'))
      }
    }
    return {
      flag: false,
      Agree: true,
      isCollect: true,
      businessArea1: '',
      businessArea2: '',
      showing: true,
      time: 60,
      organId: '',
      verifyCode: '发送验证码',
      radio1: '1',
      radio2: '1',
      organDetail: {
        agencyId: '',
        // 机构名称
        agencyName: '',
        // 机构属性
        agencyProperty: '',
        // 机构代码
        agencyCode: '',
        // 机构介绍
        agencyIntroduction: '',
        // 营业执照
        agencyLicense: '',
        // 成立年限
        agencyAgeLimit: '',
        // 营业期限
        startBusiness: '',
        endBusiness: '',
        // 机构网址
        agencyURL: '',
        // 所属公司
        companyOwned: '',
        // 机构所在地
        agencyAddress: '',
        // 填写人姓名
        agencyUsername: '',
        // 填写人身份
        agencyIdentity: '',
        // 填写人手机号
        phone: '',
        // 填写人邮箱
        email: '',
        // 邮箱是否认证
        emailAuthentication: '',
        // 机构logo
        agencyLogo: '',
        // 是否是会员
        member: '',
        // 会员期限
        memberTime: '',
        // 服务客户
        agencyTotalService: '',
        // 批贷总额
        agencyLoansAmount: '',
        // 实名认证
        nameAuthentication: '',
        // 营业执照认证
        licenseAuthentication: '',
        // 推荐指数
        agencyStar: 0,
        // 注册时间
        agencyTime: '',
        // 被浏览次数
        agency1: ''
      },

      borrowerDataRules: {
        borrowerName: [{ required: true, trigger: 'change', validator: validateName }],
        sex: [{ required: true, trigger: 'change', message: '请选择性别' }],
        loanAmount: [{ required: true, trigger: 'change', validator: validateLoanAmount }],
        address: [{ required: true, trigger: 'change', validator: validateAddress }],
        businessType: [{ required: true, trigger: 'change', message: '请选择所在地' }],
        isPawn: [{ required: true, trigger: 'change', message: '请选择有无抵押' }],
        pawnKey: [{ required: true, trigger: 'change', validator: validatePawnKey }],
        noPawn: [{ required: true, trigger: 'change', validator: validateNoPawn }],
        phone: [{ required: true, trigger: 'change', validator: validatePhone }],
        code: [{ required: true, trigger: 'change', message: '验证码不能为空' }],
        agree: [{ required: true, trigger: 'change', validator: validateAgree }]
      },
      loanData: [],
      productData: [],
      // 省
      provinceData: [],
      // 市 区
      cityData: [],
      agree: true,
      // 申请贷款
      borrowerData: {
        agencyId: this.organId,
        borrowerName: '',
        sex: 1,
        loanAmount: '',
        address1: '',
        address2: '',
        businessType: 1, // 贷款类型
        isPawn: 0, // 有无抵押
        phone: '',
        code: '',
        pawnKey: [], // 抵押物
        age: '',
        borrowerJob: '',
        borrowerMonthlyIncome: ''
      },
      pawnData: [],
      monthMoneyData: [],
      jobData: [],
      ageData: [],
      timer: null
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  watch: {
    userInfo(val) {
      this.borrowerData.borrowerName = val.name
      this.borrowerData.phone = val.phone
    }
  },
  created() {
    if (this.$store.state.userInfo) {
      this.borrowerData.borrowerName = this.$store.state.userInfo.name
      this.borrowerData.sex = this.$store.state.userInfo.sex
    }
    this.organId = this.$route.query.id
    this.getDetail(this.organId)
    this.getProduct(this.organId)
    this.getVictory(this.organId)
    this.getProvince()
    this.skimRecord()
    this.getPawn()
    // 年龄
    this.getAge()
    // 职业
    this.getJob()
    // 月收入
    this.getMonthMoney()
    // 收藏判断
    this.collectPan()
  },
  methods: {
    // 发送消息
    sendMess() {
      if (this.$store.state.userInfo) {
        if (this.$store.state.userInfo.roleId === 1) {
          this.$router.push({
            path: `/myMessage/${this.$store.state.userInfo.id}/messageCenter`,
            query: { id: this.organId, roleId: 3 }
          })
        } else {
          this.$message.warning('借款人方可发送信息')
        }
      } else {
        this.$message.warning('请先登录')
      }
    },
    lookDetail(id) {
      this.$router.push(`/productDetail?id=${id}`)
    },

    // 获取省
    getProvince() {
      this.$axios.get('city/getAllProvincial').then(res => {
        for (let i = 0, len = res.length; i < len; i++) {
          if (res[i].pid !== 0) {
            this.provinceData.push(res[i])
          }
        }
      })
    },
    // 获取 市 区
    getCity(val) {
      this.borrowerData.address2 = ''
      this.cityData.splice(0)
      this.$axios.get(`city/getAllCity/${val}`).then(res => {
        for (let i = 0, len = res.length; i < len; i++) {
          if (res[i].cid !== 0) {
            this.cityData.push(res[i])
          }
        }
      })
    },
    clearTimer() {
      clearInterval(this.timer)
      this.showing = true
      this.verifyCode = '重新获取'
      this.time = 60
    },
    // 发送验证码
    send() {
      if (this.borrowerData.phone) {
        const value = this.borrowerData.phone
        if (!validaterPhone(value)) {
          this.$message.warning('手机号码不符合规范')
        } else {
          this.showing = false
          this.timer = setInterval(() => {
            this.time--
            if (this.time < 0) {
              this.clearTimer()
            }
          }, 1000)
          this.$axios
            .get(`user/selectPhone/${this.borrowerData.phone}`)
            .then(res => {
              if (res.status === 200) {
                this.$message.success('您已注册该平台，请登录')
                this.resetForm()
                this.clearTimer()
              } else {
                this.$axios.get(`base/getUpdatePhoneCode/${this.borrowerData.phone}`).then(res => {
                  if (res.status === 200) {
                    this.$message.success('验证码发送成功，请注意查收')
                  } else {
                    this.$message.warning(res.msg)
                  }
                })
              }
            })
        }
      } else {
        this.$message.warning('手机号不能为空')
      }
    },
    // 机构详情
    getDetail(id) {
      this.$axios.get(`userAgency/selectUserAgencyById/${id}`).then(res => {
        this.organDetail = res
      })
    },

    // 机构代理的产品
    getProduct(id) {
      this.$axios.get(`product/selectProductByAgency/${id}/1/4`).then(res => {
        this.productData = res.list
      })
    },
    // 机构的成功案例
    getVictory(id) {
      this.$axios.get(`orderAll/getAgencySuccessOrder/${id}`).then(res => {
        this.loanData = res
      })
    },
    // 收藏机构
    restore() {
      if (this.$store.state.userInfo) {
        if (this.$store.state.userInfo.roleId === 1) {
          this.$axios
            .post(
              `borAgency/addBorAgency?borId=${
                this.$store.state.userInfo.id
              }&agencyId=${this.organId}`
            )
            .then(res => {
              this.isCollect = false
              this.$message.success('收藏成功')
            })
        } else {
          this.$message.warning('借款人方可收藏')
        }
      } else {
        this.$message.warning('请先登录')
      }
    },
    // 取消机构
    cancelRestore() {
      if (this.$store.state.userInfo) {
        this.$axios
          .post(
            `borAgency/deleteBorAgency?borId=${
              this.$store.state.userInfo.id
            }&agencyId=${this.organId}`
          )
          .then(res => {
            this.isCollect = true
            this.$message.success('取消收藏')
          })
      }
    },

    // 免费申请
    freeApply() {
      this.$refs.agentApplyForm.validate(valid => {
        if (valid) {
          const data = new FormData()
          this.borrowerData.agencyId = this.organId
          for (const item in this.borrowerData) {
            data.append(item, this.borrowerData[item])
          }

          if (this.$store.state.userInfo) {
            if (this.$store.state.userInfo.roleId === 1) {
              data.delete('phone')
              data.delete('code')
              data.append('borrowerId', this.$store.state.userInfo.id)
              this.$axios.post('orderAll/saveLoginOrder', data).then(res => {
                if (res.status === 200) {
                  this.$message.success(res.msg)
                } else {
                  this.$message.warning(res.msg)
                }
                if (this.timer !== null) {
                  this.clearTimer()
                }
              })
              this.resetForm()
            } else {
              this.$message.warning('借款人方可申请')
            }
          } else {
            if (!this.flag) {
              this.$axios.post('orderAll/saveNoLoginOrder', data).then(res => {
                if (res.status === 200) {
                  this.$message.success(res.msg)
                  this.$router.push({
                    path: '/applyVictory',
                    query: {
                      number: this.borrowerData.phone
                    }
                  })
                } else {
                  this.$message.warning(res.msg)
                }
                setTimeout(() => {
                  this.resetForm()
                }, 100)

                if (this.timer !== null) {
                  this.clearTimer()
                }
              })
              this.flag = true
              setTimeout(() => {
                this.flag = false
              }, 5000)
            } else {
              this.$message.warning('请不要重复点击')
            }
          }
        }
      })
    },

    // 借款人浏览机构
    skimRecord() {
      if (this.$store.state.userInfo) {
        if (this.$store.state.userInfo.roleId === 1) {
          const data = new FormData()
          data.append('borId', this.$store.state.userInfo.id)
          data.append('agencyId', this.organId)
          this.$axios.post(`borLook/addLook`, data)
        }
      }
    },

    collectPan() {
      if (this.$store.state.userInfo) {
        const data = new FormData()
        data.append('borId', this.$store.state.userInfo.id)
        data.append('agencyId', this.organId)
        this.$axios.post(`borAgency/selectBorAgency`, data).then(res => {
          if (res === 0) {
            this.isCollect = true
          } else {
            this.isCollect = false
          }
        })
      }
    },
    // 获得所有抵押物信息
    getPawn() {
      this.$axios.get('/pawn/getAllPawn').then(res => {
        this.pawnData = res.filter(item => {
          return item.pawnId !== 1
        })
      })
    },
    getAge() {
      this.$axios.get(`age/getAllAgeArea`).then(res => {
        this.ageData = res
      })
    },
    getMonthMoney() {
      this.$axios.get('get/getIncome').then(res => {
        this.monthMoneyData = res
      })
    },
    getJob() {
      this.$axios.get('get/getJob').then(res => {
        res.forEach(item => {
          if (item.jobId === 0) {
            item.jobName = '其他'
          }
        })
        this.jobData = res
      })
    },
    resetForm() {
      this.borrowerData = {
        brokerId: '',
        borrowerName: '',
        sex: 1,
        loanAmount: '',
        address1: '',
        address2: '',
        businessType: 1,
        isPawn: 0,
        phone: '',
        code: '',
        pawnKey: [],
        age: '',
        borrowerJob: '',
        borrowerMonthlyIncome: ''
      }
      if (this.$store.state.userInfo) {
        this.borrowerData.borrowerName = this.$store.state.userInfo.name
      }
    }
  }
}
</script>

<style scoped lang="scss">

.top-form {
  .input-item {
    width: 210px;
  }
  // .el-form-item {
  //   margin-bottom: 16px;
  // }

  .el-checkbox__input.is-checked + .el-checkbox__label {
    color: rgba(81, 81, 81, 1);
  }
  .el-checkbox__inner {
    background-color: #fff;
    border-color: #ccc;
  }
  .el-checkbox__input.is-checked + .el-checkbox__inner {
    background-color: rgba(208, 172, 86, 1);
    border-color: rgba(208, 172, 86, 1);
  }
  .apply {
    background: #A80E0E;
    color: #fff;
    border-color: #A80E0E;
  }
}
.cheak {
  margin-top: 3px;
  margin-left: 100px;
}

.read {
  display: inline-block;
  height: 17px;
  font-size: 12px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: #7b7b7b;
  line-height: 17px;
  .blue {
    color: #4a90e2;
  }
}

.mt16 {
  margin-top: 16px;
}

.ml20 {
  margin-left: 20px;
}

.mb30 {
  margin-bottom: 30px;
}

.person {
  width: 1200px;
  height: 160px;
  background: rgba(255, 255, 255, 1);
  padding: 20px 60px;
  box-sizing: border-box;
  .name-box {
    display: flex;
    align-items: center;
    .name {
      font-size: 20px;
      color: $jnd-font-color-base;
      margin-right: 4px;
    }
  }
  a {
    display: block;
    width: 173px;
    height: 35px;
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(155, 155, 155, 1);
    line-height: 20px;
    overflow: hidden;
    margin-top: 8px;
  }
  .restore {
    line-height: 20px;
    vertical-align: middle;
    font-size: 16px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(155, 155, 155, 1);
    cursor: pointer;
  }
  .agent-detail {
    height: 50px;
    margin-top: 20px;
    margin-left: 100px;
    .num {
      height: 20px;
      font-size: 20px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(81, 81, 81, 1);
      line-height: 20px;
      letter-spacing: 2px;
    }
    .num-text {
      height: 12px;
      font-size: 12px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(155, 155, 155, 1);
      line-height: 12px;
    }
    .text1 {
      height: 20px;
      font-size: 18px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(81, 81, 81, 1);
      line-height: 20px;
      margin-left: 10px;
    }
    .text2 {
      height: 24px;
      font-size: 20px;
      font-family: DINAlternate-Bold;
      font-weight: bold;
      color: rgba(168, 14, 14, 1);
      line-height: 24px;
      letter-spacing: 4px;
      margin-top: 10px;
      margin-left: 10px;
    }
  }
}

.top {
  width: 268px;
  .title {
    text-align: center;
    height: 60px;
    background: rgba(208, 172, 86, 1);
    font-size: 20px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    line-height: 60px;
  }
  .content-agent {
    background: rgba(255, 255, 255, 1);
    padding: 20px 10px;
    box-sizing: border-box;
    .name {
      border-bottom: 1px solid #f0f0f0;
      padding: 10px 0;
      font-size: 14px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(81, 81, 81, 1);
    }
    .desc,
    .desc-title {
      font-size: 14px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(81, 81, 81, 1);
    }
    .desc-title {
      margin-top: 10px;
      margin-bottom: 8px;
      line-height: 14px;
      height: 14px;
    }
    .desc {
      width: 210px;
      height: 80px;
      line-height: 20px;
      overflow: hidden;
    }
    .company-main {
      height: 55px;
      border-bottom: 1px solid #f0f0f0;
      .com-same {
        font-size: 14px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(81, 81, 81, 1);
        line-height: 20px;
      }
    }
  }
}

.bottom {
  width: 268px;
  margin-top: 30px;
  .title {
    height: 60px;
    background: rgba(208, 172, 86, 1);
    text-align: center;
    font-size: 20px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    line-height: 60px;
  }
  .content-item {
    padding: 20px;
    box-sizing: border-box;
    border-bottom: 1px solid #f0f0f0;
    background-color: #fff;
    font-size: 14px;
    color: #515151;
    overflow: hidden;
    .name {
      float: left;
      width: 50%;
    }
    .money {
      float: right;
      width: 50%;
    }
  }
}

.top-form {
  width: 902px;
  background: rgba(255, 255, 255, 1);
  margin-left: 30px;
  padding: 24px 56px 30px 56px;
  box-sizing: border-box;
}

.bottom-form {
  width: 902px;
  background: rgba(255, 255, 255, 1);
  margin-bottom: 30px;
  margin-left: 30px;
  .main-form {
    height: 87px;
    padding: 20px 20px 20px 30px;
    box-sizing: border-box;
    border-bottom: 1px solid #f0f0f0;
    .item1-num {
      height: 16px;
      font-size: 16px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(81, 81, 81, 1);
      line-height: 16px;
    }
    .item-same {
      height: 14px;
      font-size: 14px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(155, 155, 155, 1);
      line-height: 14px;
      margin-top: 16px;
    }
    .item-num {
      height: 16px;
      font-size: 16px;
      font-family: DINAlternate-Bold;
      font-weight: bold;
      color: rgba(81, 81, 81, 1);
      line-height: 16px;
    }
    .item1 {
      width: 128px;
      text-align: center;
      overflow: hidden;
    }
    .organ-btn {
      width: 96px;
      height: 48px;
      background: rgba(168, 14, 14, 1);
      font-size: 16px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
      line-height: 48px;
      margin-left: 60px;
      cursor: pointer;
    }
  }
}
</style>
