<template>
  <div>
    <registerTop/>
    <div class="wrappy">
      <div class="w900">
        <div class="user-main">
          <div class="user-title">
            <div class="title">欢迎注册就能贷网</div>
            <div class="number">已有账号，</div>
            <div class="login" @click="$router.push({path:'/',query:{login:1}})">立即登陆</div>
          </div>
          <el-form
            ref="organMess"
            :model="organMess"
            :rules="rules"
            label-position="right"
            label-width="130px"
          >
            <div class="user-form">
              <div class="person-item clearfix">
                <el-form-item label="机构名称:" prop="agencyName">
                  <el-input v-model="organMess.agencyName" type="text" class="name"/>
                </el-form-item>
              </div>
              <div class="person-item clearfix">
                <el-form-item label="机构代码:" prop="agencyCode">
                  <el-input v-model="organMess.agencyCode" type="text" class="name"/>
                </el-form-item>
              </div>
              <div class="person-item clearfix">
                <el-form-item label="机构属性:" prop="agencyProperty">
                  <el-select
                    v-model="organMess.agencyProperty"
                    multiple
                    placeholder="请选择"
                    style="width: 250px;"
                  >
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </div>
              <div class="person-item clearfix">
                <el-form-item label="上传营业执照:" prop="agencyLicense">
                  <personImg
                    v-model="organMess.agencyLicense"
                    :phone="phone"
                    @success="uploadSuccess"
                  />
                  <div class="fll text-desc">请上传营业执照正面照，支持JPG/JPEG/PNG格式图片，照片不大于2M</div>
                </el-form-item>
              </div>
              <div class="person-item clearfix">
                <el-form-item label="机构简介:" prop="agencyIntroduction" style="width: 380px;">
                  <el-input v-model="organMess.agencyIntroduction" type="textarea"/>
                </el-form-item>
              </div>
              <div class="person-item clearfix">
                <el-form-item label="机构所在地:" prop="agencyAddress">
                  <el-select
                    v-model="organMess.agencyAddress"
                    style="width: 155px;"
                    @change="getCity"
                  >
                    <el-option
                      v-for="item in provinceData"
                      :key="item.pid"
                      :label="item.provincial"
                      :value="item.pid"
                      style="width: 155px;"
                    />
                  </el-select>
                  <el-select
                    v-model="organMess.agencyAddress1"
                    style="margin-left: 5px;width: 140px;"
                  >
                    <el-option
                      v-for="item in cityData"
                      :key="item.cid"
                      :label="item.city"
                      :value="item.cid"
                      style="width: 140px;"
                    />
                  </el-select>
                </el-form-item>
              </div>
              <div class="person-item clearfix">
                <el-form-item label="营业期限:" prop="startBusiness">
                  <div>
                    <el-date-picker
                      v-model="organMess.startBusiness"
                      type="date"
                      placeholder="开始日期"
                      style="width: 135px;"
                      format="yyyy-MM-dd"
                      value-format="yyyy-MM-dd"
                    />
                    <el-date-picker
                      v-model="organMess.endBusiness"
                      style="width: 135px;"
                      type="date"
                      placeholder="结束日期"
                      format="yyyy-MM-dd"
                      value-format="yyyy-MM-dd"
                    />
                  </div>
                </el-form-item>
              </div>
              <div class="person-item clearfix">
                <el-form-item label="填写人姓名:" prop="agencyUsername">
                  <el-input
                    v-model="organMess.agencyUsername"
                    type="text"
                    class="name"
                    autocomplete="off"
                  />
                </el-form-item>
              </div>
              <div class="person-item clearfix">
                <el-form-item label="填写人邮箱:" prop="email">
                  <el-input v-model="organMess.email" type="text" class="name" autocomplete="off"/>
                </el-form-item>
              </div>
              <div class="person-item clearfix">
                <el-form-item label="填写人手机号:" prop="phone">
                  <el-input
                    v-model="organMess.phone"
                    type="text"
                    class="name"
                    autocomplete="off"
                  />
                </el-form-item>
              </div>
              <div class="person-item clearfix">
                <el-form-item label="验证码:" prop="password" style="width: 250px; float: left">
                  <el-input v-model="organMess.password" type="text" autocomplete="off"/>
                </el-form-item>
                <div class="fll verify">
                  <div v-if="showing" class="send" @click="send">{{ verifyCode }}</div>
                  <div v-else class="time send">{{ time }}s</div>
                </div>
              </div>
              <div class="person-item clearfix">
                <el-form-item label="填写人身份:" prop="agencyIdentity">
                  <div>
                    <el-radio-group v-model="organMess.agencyIdentity">
                      <el-radio :label="1" :value="1">法定代表人</el-radio>
                      <el-radio :label="2" :value="2">代理人</el-radio>
                    </el-radio-group>
                  </div>
                </el-form-item>
              </div>
              <div class="person-item clearfix">
                <el-form-item>
                  <div class="clearfix register">
                    <div class="fll agree" @click="register">同意协议并注册</div>
                    <div
                      class="fll immediate"
                      @click="$router.push({path:'/',query:{login:1}})"
                    >已有账号？立即登陆</div>
                  </div>
                  <div class="agreement">
                    <el-checkbox v-model="isChecked"/>阅读并同意
                    <a href="#/agreement?loanOfficerRegister" target="_blank">《9能贷信贷员注册协议》</a>
                    <a href="#/agreement?loanOfficerCodeConduct" target="_blank">《9能贷信贷员行为规范》</a>
                  </div>
                </el-form-item>
              </div>
            </div>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import registerTop from '../component/registerTop'
import { mapState, mapMutations } from 'vuex'
import validater from '../util/validater'
import personImg from '../component/imgUpload'
import { randomWord } from '@/util/util'
import { validaterPhone, validaterName } from '@/util/validate'
import { fetchProvince, fetchCity } from '@/api/register'
export default {
  name: 'OrganRegister',
  components: {
    personImg,
    registerTop
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
    const validateStartBusiness = (rule, value, callback) => {
      if (this.organMess.startBusiness && this.organMess.endBusiness) {
        if (this.organMess.endBusiness <= this.organMess.startBusiness) {
          callback(new Error('开始时间不能大于过期时间'))
        } else {
          callback()
        }
      } else {
        callback(new Error('营业期限不能为空'))
      }
    }
    const validateName = (rule, value, callback) => {
      if (value) {
        if (validaterName(value)) {
          callback()
        } else {
          callback(new Error('机构名称格式错误'))
        }
      } else {
        callback(new Error('机构名称不能为空'))
      }
    }
    const validateUserName = (rule, value, callback) => {
      if (value) {
        if (validaterName(value)) {
          callback()
        } else {
          callback(new Error('姓名格式错误'))
        }
      } else {
        callback(new Error('填写人姓名不能为空'))
      }
    }
    const validateAddress = (rule, value, callback) => {
      if (this.organMess.agencyAddress && this.organMess.agencyAddress1) {
        callback()
      } else {
        callback(new Error('请选择地址'))
      }
    }
    return {
      isChecked: true,
      phone: '',
      showing: true,
      time: 60,
      verifyCode: '发送验证码',
      organMess: {
        agencyProperty: [], // 机构属性
        agencyName: '',
        agencyCode: '',
        agencyIntroduction: '',
        startBusiness: '',
        endBusiness: '',
        agencyLicense: '',
        agencyAddress: '',
        agencyAddress1: '',
        agencyUsername: '',
        agencyIdentity: 1,
        phone: '',
        email: '',
        password: ''
      },
      options: [
        {
          value: '1',
          label: '代理服务'
        },
        {
          value: '2',
          label: '自有资金'
        }
      ],
      flag: false,
      // 省
      provinceData: [],
      // 市 区
      cityData: [],
      rules: {
        phone: [
          { required: true, trigger: 'change', validator: validatePhone }
        ],
        email: [
          { validator: validater.emailValue, trigger: 'change' },
          { required: true, trigger: 'change', message: '邮箱不能为空' }
        ],
        password: [
          { required: true, trigger: 'change', message: '验证码不能为空' }
        ],
        agencyName: [
          { required: true, trigger: 'change', validator: validateName }
        ],
        agencyUsername: [
          { required: true, trigger: 'change', validator: validateUserName }
        ],
        agencyCode: [
          { required: true, trigger: 'change', message: '机构代码不能为空' }
        ],
        agencyProperty: [
          { required: true, trigger: 'change', message: '机构属性不能为空' }
        ],
        agencyLicense: [
          { required: true, trigger: 'change', message: '营业执照不能为空' }
        ],
        agencyIntroduction: [
          { required: true, trigger: 'change', message: '机构简介不能为空' }
        ],
        agencyAddress: [
          { required: true, trigger: 'change', validator: validateAddress }
        ],
        startBusiness: [
          {
            required: true,
            trigger: 'change',
            validator: validateStartBusiness
          }
        ],
        agencyIdentity: [
          { required: true, trigger: 'change', message: '填写人身份不能为空' }
        ]
      }
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  created() {
    this.phone = new Date().getTime() + randomWord(false, 10)
    this.getProvince()
  },
  methods: {
    ...mapMutations(['SET_USER']),
    // 检测手机号是否被注册
    checkPhone(timer) {
      this.$axios.get(`user/selectPhone/${this.organMess.phone}`).then(res => {
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
      this.$axios.get(`base/getRegisterCode/${this.organMess.phone}`).then(res => {
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
    send() {
      const reg = /^1\d{10}$/
      if (this.organMess.phone) {
        if (reg.test(this.organMess.phone)) {
          this.showing = false
          const timer = setInterval(() => {
            this.time--
            if (this.time < 0) {
              this.clearTimer()
            }
          }, 1000)
          this.checkPhone(timer)
        }
      } else {
        this.$message.warning('请输入手机号')
      }
    },
    // 注册
    register() {
      this.$refs.organMess.validate(valid => {
        if (valid) {
          if (this.isChecked) {
            if (!this.flag) {
              const data = new FormData()
              for (const item in this.organMess) {
                if (item === 'agencyProperty') {
                  data.append(item, this.organMess[item].join(','))
                } else {
                  data.append(item, this.organMess[item])
                }
              }
              this.$axios.post('userAgency/registerAgency', data).then(res => {
                if (res.status === 200) {
                  this.$message.success(res.msg)
                  this.$router.push({
                    path: '/registerJump',
                    query: { number: this.organMess.phone }
                  })
                } else {
                  this.$message.warning(res.msg)
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
    // 获取省
    getProvince() {
      fetchProvince().then(res => {
        this.provinceData = res.data
      })
    },
    // 获取 市 区
    getCity(val) {
      this.organMess.agencyAddress1 = ''
      if (val) {
        fetchCity(val).then(res => {
          this.cityData = res.data
        })
      }
    },
    uploadSuccess(file) {
      this.organMess.agencyLicense = file.data
      this.$refs.organMess.validate()
    },
    createUniqueString() {
      const timestamp = +new Date() + ''
      const randomNum = parseInt((1 + Math.random()) * 65536) + ''
      return (+(randomNum + timestamp)).toString()
    }
  }
}
</script>

<style scoped lang="scss">
.avatar-uploader {
  background-color: #333;
}
.avatar-uploader .el-upload {
  border: 3px dashed #000;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #fff;
  width: 80px;
  height: 80px;
  line-height: 80px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.w900 {
  width: 900px;
  margin: 0 auto;
}
.ml20 {
  margin-left: 20px;
}
.user-main {
  height: auto;
  background: rgba(255, 255, 255, 1);
  padding-bottom: 24px;
  box-sizing: border-box;
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
    width: 100%;
    height: auto;
    margin-top: 20px;
    margin-left: 200px;
    .person-item {
      width: 100%;
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
      .name {
        width: 250px;
        height: 40px;
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
    }
  }

  .register {
    .immediate {
      width: 108px;
      height: 40px;
      font-size: 12px;
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
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: 40px;
      text-align: center;
      border-radius: 5px;
      cursor: pointer;
    }
  }
  .agreement {
    font-size: 12px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    line-height: 12px;
    margin-top: 29px;
    a {
      color: rgba(74, 144, 226, 1);
    }
  }
}
/deep/ .el-date-editor--daterange {
  width: 250px;
}
</style>
