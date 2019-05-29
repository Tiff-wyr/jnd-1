<template>
  <div class="secure-center">
    <div class="title">安全中心</div>

    <toggleItem :title="'账户密码'" @click="handlePassword" :isShow="updatePasswordShow">
      当前密码强度：<span class="password-level">{{nowLevel === 1 ? '弱' : nowLevel === 2 ? '中' : nowLevel === 3 ? '强' : '' }}</span>
      <div slot="hidden">
        <el-form ref="passwordForm" :model="passwordForm" :rules="passwordFormRules" label-position="right" label-width="120px" style="margin-left: 100px;">
          <el-form-item label="当前密码" prop="oldPassword">
            <el-input class="w180" placeholder="请输入当前密码" v-model="passwordForm.oldPassword" type="password"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newPassword">
            <el-input class="w180" placeholder="请输入新密码" v-model="passwordForm.newPassword" type="password"></el-input>
            <div class="password-strong" v-if="checkPassword > 0">
              <span class="level-item" :class="{'item': checkPassword >= 1 }"></span>
              <span class="level-item" :class="{'item': checkPassword >= 2 }"></span>
              <span class="level-item" :class="{'item': checkPassword == 3 }"></span>
            </div>
          </el-form-item>
          <el-form-item label="确认密码" prop="confirmPassword">
            <el-input class="w180" placeholder="请输入确认密码" v-model="passwordForm.confirmPassword" type="password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="save" @click="savePassword">保存</el-button>
          </el-form-item>
        </el-form>
      </div>
    </toggleItem>
    <toggleItem :title="'绑定手机'" @click="handlePhone" :isShow="updatePhoneShow">
      已绑定手机号：{{ phone }}
      <div slot="hidden" v-if="isNext">
        <el-form ref="phoneForm" :model="phoneForm" :rules="phoneFormRules" label-position="right" label-width="120px" style="margin-left: 100px;">
          <span style="padding: 0 40px;color: red;">修改后，旧手机号将不可登录平台，新绑定手机号将会成为您的登录账号，请谨慎操作</span>
          <el-form-item label="当前手机号" prop="oldPassword" style="margin-top: 30px;">
            <span style="color: #9B9B9B;">{{ phone }}</span>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input class="w180" v-model="phoneForm.password" type="password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="save" @click="next">下一步</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div slot="hidden" v-else>
        <el-form ref="newPhoneForm" :model="newPhoneForm" :rules="newPhoneFormRules" label-position="right" label-width="120px" style="margin-left: 100px;">
          
          <el-form-item label="新手机号" prop="newPhone">
            <el-input class="w180" v-model="newPhoneForm.newPhone"></el-input>
            <el-button class="send-code" @click="sendPhoneCode('two')" v-if="phoneCodeShow">{{ codeBtnText }}</el-button>
            <el-button class="send-code" v-else>{{ time }} s</el-button>
          </el-form-item>
          <el-form-item label="验证码" prop="newCode">
            <el-input class="w100" v-model="newPhoneForm.newCode"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="save" @click="binding">绑定</el-button>
          </el-form-item>
        </el-form>
      </div>
    </toggleItem>
    <toggleItem :title="'绑定邮箱'" @click="handleEmail" :isShow="updateEmailShow">
      已绑定邮箱：{{ email }}
      <div slot="hidden">
        <el-form ref="emailForm" :model="emailForm" :rules="emailFormRules" label-position="right" label-width="120px" style="margin-left: 100px;">
          <el-form-item label="新邮箱" prop="newEmail">
            <el-input class="w180" v-model="emailForm.newEmail"></el-input>
          </el-form-item>
          <el-form-item label="邮箱验证码" prop="emailCode">
            <el-input class="w100" v-model="emailForm.emailCode"></el-input>
            <el-button class="send-code" @click="sendEmailCode" v-if="phoneCodeShow">{{ codeBtnText }}</el-button>
            <el-button class="send-code" v-else>{{ time }} s</el-button>
          </el-form-item>
          <el-form-item>
            <el-button class="save" @click="bindingEmail">绑定</el-button>
          </el-form-item>
        </el-form>
      </div>
    </toggleItem>

    <jndDialog :visible="dialogVisible" :msgType="'warning'" width="40%" :title="'修改密码'">
      <div class="container">
        密码修改成功，请重新登录
      </div>
      <span slot="footer">
        <el-button type="danger" @click="confirm">确认</el-button>
      </span>
    </jndDialog>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import validater from "../../../util/validater";
import jndDialog from '../../../component/jndDialog'
import toggleItem from '../../../component/toggleItem'
import { removeToken } from '@/util/auth'
import { validaterPhone, validatrerPassword, validEmail } from '@/util/validate'
import publicApi from "../../api/public";
export default {
  name: "secuCen",
  components: {
    jndDialog,
    toggleItem
  },
  data() {
    const validatrePassword = (rule, value, callback) => {
      if (value) {
        if (validatrerPassword(value)) {
          callback()
        } else {
          callback(new Error('密码格式为6至16位的数字或字母组合'))
        }
      } else {
        callback(new Error('请填写新密码'))
      }
    }
    const validateConfirmPassword = (rule, value, callback) => {
      if (value) {
        if (value === this.passwordForm.newPassword) {
          callback()
        } else {
          callback(new Error('两次填写的密码不一致'))
        }
      } else {
        callback(new Error('请填写确认密码'))
      }
    }
    const validatePhone = (rule, value, callback) => {
      if (value) {
        if (validaterPhone(value)) {
          callback()
        } else {
          callback(new Error('手机号格式错误'))
        }
      } else {
        callback(new Error('手机号不能为空'))
      }
    }
    const validateEmail = (rule, value, callback) => {
      if (value) {
        if (validEmail(value)) {
          callback()
        } else {
          callback(new Error('邮箱格式错误'))
        }
      } else {
        callback(new Error('邮箱不能为空'))
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value) {
        callback()
      } else {
        callback(new Error('密码不能为空'))
      }
    }
    return {
      updatePasswordShow: false,
      updatePhoneShow: false,
      updateEmailShow: false,
      dialogVisible: false,
      passwordForm: {
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      },
      passwordFormRules: {
        oldPassword: [{ required: true, message: '当前密码不能为空', trigger: 'change' }],
        newPassword: [{ required: true, trigger: 'change', validator: validatrePassword }],
        confirmPassword: [{ required: true, trigger: 'change', validator: validateConfirmPassword }]
      },
      phoneForm: {
        password: '',
        oldPhone: ''
      },
      phoneFormRules: {
        password: [{ required: true, trigger: 'change', validator: validatePassword }],
      },
      newPhoneForm: {
        newCode: '',
        newPhone: '',
      },
      newPhoneFormRules: {
        newPhone: [{ required: true, trigger: 'change', validator: validatePhone }],
        newCode: [{ required: true, message: '验证码不能为空', trigger: 'change' }]
      },
      emailForm: {
        newEmail: '',
        emailCode: ''
      },
      emailFormRules: {
        newEmail: [{ required: true, trigger: 'change', validator: validateEmail }],
        emailCode: [{ required: true, message: '验证码不能为空', trigger: 'change' }]
      },
      nowLevel: '',
      level: 0, //密码等级
      phoneCodeShow: true,
      time: 60,
      codeBtnText: '发送验证码',
      timer: null,
      isNext: true,
      email: "",
      id: '',
      phone: ''
    };
  },
  computed: {
    checkPassword(val) {
      let checkChar = /[a-zA-Z]/g;
      let checkNum = /[0-9]/g;
      if (this.passwordForm.newPassword.length >= 6) {
        if (
          checkChar.test(this.passwordForm.newPassword) &&
          checkNum.test(this.passwordForm.newPassword)
        ) {
          this.level = 2;
          if (this.passwordForm.newPassword.length > 8) this.level = 3;
        } else if (
          (checkChar.test(this.passwordForm.newPassword) ||
            checkNum.test(this.passwordForm.newPassword)) &&
          this.passwordForm.newPassword.length > 8
        ) {
          this.level = 2;
        }
      } else if (this.passwordForm.newPassword.length > 0) {
        this.level = 1;
      } else {
        this.level = 0;
      }
      return this.level
    }
  },
  created() {
    if (this.$store.state.userInfo) {
      this.nowLevel = this.$store.state.userInfo.level
      this.id = this.$store.state.userInfo.id
      this.phone = this.$store.state.userInfo.phone
      this.getPersonal();
    } else {
      this.$router.push('/home')
    }
  },
  methods: {
    ...mapMutations(["SET_USER_PHONE", "SET_USER_LEVEL", 'SET_USER','SET_TOKEN']),
    handlePassword() {
      this.updatePasswordShow = !this.updatePasswordShow
      this.updatePhoneShow = false
      this.updateEmailShow = false
      this.resetPasswrodForm()
    },
    handlePhone() {
      this.clearTimer()
      this.updatePhoneShow = !this.updatePhoneShow
      this.updatePasswordShow = false
      this.updateEmailShow = false
      this.isNext = true
      this.clearTimer()
      this.codeBtnText = '发送验证码'
      this.resetPhoneForm()
    },
    handleEmail() {
      this.clearTimer()
      this.updateEmailShow = !this.updateEmailShow
      this.updatePasswordShow = false
      this.updatePhoneShow = false
      this.clearTimer()
      this.resetEmailForm()
      this.codeBtnText = '发送验证码'
    },
    clearTimer() {
      if (this.timer !== null) {
        clearInterval(this.timer);
        this.phoneCodeShow = true;
        this.time = 60;
        this.codeBtnText = '重新获取'
      }
    },
    savePassword() { // 修改密码
      this.$refs.passwordForm.validate(valid => {
        if (valid) {
          this.$axios.get(`user/updatePasswordByPhone/${this.phone}/${this.passwordForm.oldPassword}/${this.passwordForm.newPassword}/${this.level}`)
          .then(res => {
            if (res.status === 200) { // 修改成功，退出账号
              this.SET_USER_LEVEL(this.level);
              this.$message.success(res.msg);
              this.isPassword = true;
              this.passText = "修改";
              this.dialogVisible = true
              this.SET_USER(null)
            } else {
              this.$message.warning(res.msg);
            }
            this.resetPasswrodForm()
          });
        } else {
          return false
        }
      })
    },
    confirm() {
      this.dialogVisible = false
      this.SET_USER(null)
      this.$router.push('/home')
      let phone=localStorage.getItem('phone')
      let password =localStorage.getItem('password')
      if(phone && password){
        localStorage.removeItem('phone')
        localStorage.removeItem('password')
      }else{
        return
      }
    },
    sendCode(phone) {
      this.$axios.get(`base/getUpdatePhoneCode/${phone}`).then(res => {
        if (res.status !== 200) {
          this.$message.warning(res.msg)
          this.clearTimer()
        }
      });
    },
    // 下一步 修改手机号
    next() {
      this.$refs.phoneForm.validate(valid => {
        if (valid) {
          publicApi.validateAccountPwd(this.phone, this.phoneForm.password).then(res => {
            if (res.data.status === 200) {
              this.isNext = !this.isNext;
              this.$nextTick(() => {
                this.$refs.newPhoneForm.clearValidate()
              })
            } else {
              this.$message.warning(res.data.msg)
            }
          })
        }
      })
    },
    sendPhoneCode(val) {
      this.phoneCodeShow = false;
      this.timer = setInterval(() => {
        this.time--;
        if (this.time < 0) {
          this.clearTimer()
        }
      }, 1000);
      this.$refs.newPhoneForm.validateField(['newPhone'], valid => {
        if (!valid) {
          publicApi.validateRegister(this.newPhoneForm.newPhone).then(res => {
            if (res.data.status === 200) { //未被注册
              this.sendCode(this.newPhoneForm.newPhone)
            } else {
              this.clearTimer()
              this.$message.warning(res.data.msg);
              this.newPhoneForm.newPhone = "";
            }
          })
        } else {
          this.clearTimer()
          return false
        }
      })
    },
    binding() { // 绑定手机号
      this.$refs.newPhoneForm.validate(valid => {
        if (valid) {
          this.$axios.get(`user/updatePhone/${this.phone}/${this.newPhoneForm.newPhone}/${this.newPhoneForm.newCode}`).then(res => {
            if (res.status === 200) {
              this.$message.success(res.msg);
              this.SET_USER_PHONE(this.newPhoneForm.newPhone);
              this.phone = this.newPhoneForm.newPhone
              this.isNext = true
              this.updatePhoneShow = false
              this.clearTimer()
            } else {
              this.$message.warning(res.msg);
            }
          });
        } else {
          return false
        }
      })
    },
    sendEmailCode() {
      this.$refs.emailForm.validateField(['newEmail'], (valid) => {
        if (!valid) {
          this.phoneCodeShow = false;
          this.timer = setInterval(() => {
            this.time--;
            if (this.time < 0) {
              this.clearTimer()
            }
          }, 1000);
          this.$axios.get(`email/sendEmailCode?email=${this.emailForm.newEmail}`).then(res => {
            if (res.status !== 200) {
              this.$message.warning(res.msg);
              this.clearTimer()
            }
          });
        } else {
          return false
        }
      })
    },
    bindingEmail() {
      this.$refs.emailForm.validate(valid => {
        if (valid) {
          this.$axios.get(
            `/email/modifyEmail/${this.id}/${
              this.$store.state.userInfo.roleId
            }/${this.emailForm.emailCode}?email=${this.emailForm.newEmail}`
          ).then(res => {
            if (res.status === 200) {
              this.$message.success("邮箱绑定成功");
              this.email = this.emailForm.newEmail;
              this.updateEmailShow = false
              this.clearTimer()
            } else {
              this.$message.warning(res.msg);
            }
          });
        } else {
          return false
        }
      })
    },
    // //初始化经纪人个人信息
    getPersonal() {
      this.$axios.get(`userBroker/getUserBrokerById/${this.id}`).then(res => {
        this.email = res.email;
      });
    },
    resetPasswrodForm() {
      this.passwordForm = {
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      }
    },
    resetPhoneForm() {
      this.phoneForm = {
        password: '',
        oldPhone: ''
      }
      this.newPhoneForm = {
        newCode: '',
        newPhone: ''
      }
    },
    resetEmailForm() {
      this.emailForm = {
        newEmail: '',
        emailCode: ''
      }
    }
  }
};
</script>

<style scoped lang="scss">
.w180 {
  width: 180px;
}
.w100 {
  width: 120px;
}
.secure-center {
  width: 944px;
  background-color: #fff;
  font-size: 16px;
  box-sizing: border-box;
  font-weight: 500;
  color: rgba(81, 81, 81, 1);
  padding: 30px;
  .title {
    height: 66px;
    line-height: 66px;
    padding: 0 20px;
  }
  .password-level {
    color: #A80E0E;
    font-weight: 600;
  }
  .el-button {
    background: #A80E0E;
    border-color: #A80E0E;
    color: #fff;
  }
  .send-code {
    background: #EBEBEB; 
    border-color: #EBEBEB; 
    color: #515151; 
    margin-left: 10px; 
    width: 112px;
  }
  .password-strong {
    display: inline-block;
    span {
      display: inline-block;
      width: 25px;
      height: 8px;
      border: 1px solid #eee;
      margin-right: 2px;
      &.item {
        background: #0f0;
      }
    }
  }
}
</style>
