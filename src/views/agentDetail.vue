<template>
  <div>
    <div class="wrappy">
      <div class="w1200">
        <div class="person clearfix mb30">
          <img
            :src="agentDetail.image"
            v-if="agentDetail.image"
            alt=""
            class="fll"
            style="width: 120px;height: 120px"
          >
          <img
            src="/static/resource/pic/agent.png"
            v-else
            alt=""
            class="fll"
            style="width: 120px;height: 120px"
          >
          <div class="fll">
            <div class="clearfix">
              <div class="fll" style="margin-left: 14px">
                <div class="clearfix">
                  <div class="name fll">{{agentDetail.brokerName}}</div>
                  <!-- <img src="../../static/resource/agent/vip.png" alt=""> -->
                </div>
                
                <div class="desc">{{agentDetail.introduction}}</div>
              </div>
              <div class="agent-detail clearfix fll">
                <div class="fll">
                  <div class="clearfix">
                    <div class="fll align">
                      <div class="num">{{agentDetail.workingYears}}</div>
                      <div class="clearfix mt16">
                        <img src="../../static/resource/agent/1.png" alt="" class="fll">
                        <div class="num-text fll">从业年限</div>
                      </div>
                    </div>
                    <div class="fll align ml20">
                      <div class="num">{{agentDetail.serveClientTotal}}</div>
                      <div class="clearfix mt16">
                        <img src="../../static/resource/agent/2.png" alt="" class="fll">
                        <div class="num-text fll">服务客户</div>
                      </div>
                    </div>
                    <div class="fll align ml20">
                      <div class="num">{{agentDetail.batchLoanTotal}}</div>
                      <div class="clearfix mt16">
                        <img src="../../static/resource/agent/3.png" alt="" class="fll">
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
                    <div class="text2">{{agentDetail.phone | phoneFilter}}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="clearfix">
              <div class="clearfix fll ml20" style="margin-top: 16px;">
                <img
                  src="../assets/message.png"
                  alt=""
                  class="fll"
                  style="width: 20px;height: 20px;vertical-align: middle; margin-right: 10px;"
                >
                <div class="restore fll" @click="sendMess">发送消息</div>
              </div>
              <div class="clearfix flr" style="margin-top: 16px;">
                <img src="../../static/resource/agent/star.png" class="fll" v-if="isCollect" alt="" style="width: 20px; heihgt: 20px; vertical-align: center; margin-right: 10px;" />
                <img src="../../static/resource/agent/star1.png" class="fll" v-else alt="" style="width: 20px; heihgt: 20px; vertical-align: center; margin-right: 10px;" />
                <div class="fll">
                  <div class="restore" @click="restore" v-if="isCollect">加入收藏</div>
                  <div class="restore" @click="cancelRestore" v-else>取消收藏</div>
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
                <div class="name">姓名：{{agentDetail.brokerName}}</div>
                <div class="clearfix name-same">
                  <div
                    class="name fll"
                    style="height: 18px;line-height: 18px;border-bottom-color:transparent"
                  >推荐指数：</div>
                  <div class="fll">
                    <el-rate v-model="agentDetail.recommended" disabled text-color="#ff9900" style="margin-top: 8px;"></el-rate>
                  </div>
                </div>
                <div class="name">擅长业务：<br><span v-for="item in agentDetail.businessScopeInfo" :key="item" class="tag">{{ item }}</span></div>
                <div class="name">业务地区：{{agentDetail.businessAreaValue}}</div>
                <div class="name">所属公司：{{agentDetail.company}}</div>
                <div class="desc-title">个人简介：</div>
                <div class="desc">{{agentDetail.introduction}}</div>
              </div>
            </div>
            <div class="bottom" v-if="loanData.length > 0">
              <div class="title">成功案例</div>
              <div class="content-item-victory" :key="index" v-for="(item,index) in loanData">
                <span class="name">{{item.borrowerName}}</span>
                <span class="money">贷款金额：{{item.loanAmountValue}}万</span>
              </div>
            </div>
          </div>
          <div class="fll">
            <div class="top-form">
              <el-form ref="agentApplyForm" :model="borrowerData" :rules="borrowerDataRules" label-position="right" label-width="96px">
                <el-form-item label="姓名：" prop="borrowerName">
                  <el-input :disabled="!!this.$store.state.userInfo" v-model="borrowerData.borrowerName" placeholder="请输入姓名" class="input-item"></el-input>
                  <el-radio-group v-model="borrowerData.sex" :disabled="!!this.$store.state.userInfo" style="margin-left: 10px;">
                    <el-radio :label="1">男</el-radio>
                    <el-radio :label="0">女</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="贷款金额：" prop="loanAmount">
                  <el-input v-model="borrowerData.loanAmount" class="input-item" placeholder="请输入贷款金额（万元）"></el-input>
                </el-form-item>
                <el-form-item label="所在地：" prop="address">
                  <el-select v-model="borrowerData.address1" style="width: 100px;" clearable @change="getCity">
                    <el-option
                      v-for="item in provinceData" :key="item.pid" :label="item.provincial" :value="item.pid"></el-option>
                  </el-select>
                  <el-select v-model="borrowerData.address2" clearable style="margin-left: 10px;width: 100px;">
                    <el-option v-for="item in cityData" :key="item.cid" :label="item.city" :value="item.cid"></el-option>
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
                      :label="item.pawnId"
                      :key="index"
                      v-for="(item,index) in pawnData"
                    >{{item.pawn}}</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                <el-form-item v-else label="无抵押：" prop="noPawn">
                  <el-select v-model="borrowerData.age" style="width: 100px;" placeholder="年龄">
                    <el-option v-for="item in ageData" :key="item.id" :label="item.ageArea" :value="item.id"></el-option>
                  </el-select>

                  <el-select v-model="borrowerData.borrowerJob" style="margin-left: 5px;width: 100px;" placeholder="职业">
                    <el-option v-for="item in jobData" :key="item.jobId" :label="item.jobName" :value="item.jobId" style="width: 100px;"></el-option>
                  </el-select>

                  <el-select v-model="borrowerData.borrowerMonthlyIncome" style="margin-left: 5px;width: 100px;" placeholder="月收入">
                    <el-option v-for="item in monthMoneyData" :key="item.id" :label="item.incomeName" :value="item.id"></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item v-if="!userInfo" label="手机号：" prop="phone">
                  <el-input v-model="borrowerData.phone" class="input-item" placeholder="请输入手机号"></el-input>
                </el-form-item>
                <el-form-item v-if="!userInfo" label="验证码：" prop="code">
                  <el-input v-model="borrowerData.code" style="width: 90px;" placeholder="验证码"></el-input>
                  <el-button v-if="showing" @click="send" style="width: 110px;">{{ verifyCode }}</el-button>
                  <el-button v-else @click="send" style="width: 110px;">{{ time }}s</el-button>
                </el-form-item>
                <el-form-item prop="agree">
                  <el-checkbox style="display: inline-block" v-model="agree">阅读并同意</el-checkbox><a href="#/agreement?userRegister" target="_blank" style="color: #4a90e2;">《9能贷用户注册协议》</a><a href="#/agreement?userProtect" target="_blank" style="color: #4a90e2;">《用户隐私保护政策》</a>
                </el-form-item>
                <el-form-item>
                  <el-button class="apply" @click="freeApply">免费申请</el-button>
                </el-form-item>
              </el-form>
            </div>
            <div class="bottom-form">
              <div class="clearfix main-form" :key="index" v-for="(item,index) in productTableData">
                <div class="fll w180">
                  <div class="item1-num">{{item.loanName}}</div>
                  <div class="item-same">无需抵车即可贷款</div>
                </div>
                <div class="item1 fll align w180">
                  <div class="item-num">{{item.rate}}</div>
                  <div class="item-same">利息</div>
                </div>
                <div class="item1 fll align w180">
                  <div class="item-num">最快{{item.loanTime}}天内到账</div>
                  <div class="item-same">放款时间</div>
                </div>
                <div class="item1 fll align w180">
                  <div class="item-num">贷款期限最长达{{item.loanTerm}}年</div>
                  <div class="item-same">使用年限</div>
                </div>
                <div class="item1 fll w180" style="text-align: right">
                  <div class="item-num">最高可贷{{item.loanAmount}}万</div>
                  <div class="item-same">最高额度</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <footerSame></footerSame>
      </div>
    </div>
  </div>
</template>

<script>
import layout from "../layout/layout";
import validateApplyApi from "./api/validateApply";
import footerSame from "../component/footerSame";
import { mapState } from "vuex";
import { validaterPhone, validaterName, validaterLoanAmount } from "@/util/validate";
import { formatPhone } from '@/util/util'
export default {
  name: "agentDetail",
  components: {
    layout,
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
        callback(new Error("手机号不能为空"));
      } else {
        if (validaterPhone(value)) {
          callback();
        } else {
          callback(new Error("手机号格式不正确"));
        }
      }
    };
    const validateName = (rule, value, callback) => {
      if (value) {
        if (validaterName(value)) {
          callback();
        } else {
          callback(new Error("姓名格式错误"));
        }
      } else {
        callback(new Error("姓名不能为空"));
      }
    };
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
          callback();
        } else {
          callback(new Error("贷款金额格式错误"));
        }
      } else {
        callback(new Error("贷款金额不能为空"));
      }
    };
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
    const validateNoPawn  = (rule, value, callback) => {
      console.log(this.borrowerData.age)
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
      agree: true,
      flag: false,
      monthMoneyData: [],
      jobData: [],
      ageData: [],
      isLogin: false,
      isCollect: true,
      showing: true,
      time: 60,
      verifyCode: "发送验证码",
      checkList: [],
      loanData: [],
      productTableData: [],
      agentDetail: {},
      pawnData: [],
      borrowerData: {
        brokerId: "",
        borrowerName: "",
        sex: 1,
        loanAmount: "",
        address1: "",
        address2: "",
        businessType: 1,
        isPawn: 0,
        phone: "",
        code: "",
        pawnKey: [],
        age: "",
        borrowerJob: "",
        borrowerMonthlyIncome: ""
      },
      borrowerDataRules: {
        borrowerName: [{ required: true, trigger: "change", validator: validateName }],
        sex: [{ required: true, trigger: "change", message: '请选择性别' }],
        loanAmount: [{ required: true, trigger: "change", validator: validateLoanAmount }],
        address: [{ required: true, trigger: "change", validator: validateAddress }],
        businessType: [{ required: true, trigger: "change", message: '请选择所在地' }],
        isPawn: [{ required: true, trigger: "change", message: '请选择有无抵押' }],
        pawnKey: [{ required: true, trigger: "change", validator: validatePawnKey }],
        noPawn: [{ required: true, trigger: "change", validator: validateNoPawn }],
        phone: [{ required: true, trigger: "change", validator: validatePhone }],
        code: [{ required: true, trigger: "change", message: '验证码不能为空' }],
        agree: [{ required: true, trigger: "change", validator: validateAgree }]
      },
      //省
      provinceData: [],
      //市 区
      cityData: [],
      agentId: "",
      timer: null
    };
  },
  computed: {
    ...mapState(["userInfo"]),
  },
  watch: {
    userInfo(val) {
      this.borrowerData.borrowerName = val.name
      this.borrowerData.phone = val.phone
    }
  },
  methods: {
    getAge() {
      this.$axios.get(`age/getAllAgeArea`).then(res => {
        this.ageData = res;
      });
    },
    getMonthMoney() {
      this.$axios.get("get/getIncome").then(res => {
        this.monthMoneyData = res;
      });
    },
    getJob() {
      this.$axios.get("get/getJob").then(res => {
        res.forEach(item => {
          if (item.jobId === 0) {
            item.jobName = "其他";
          }
        });
        this.jobData = res;
      });
    },
    //发送消息
    sendMess() {
      if (this.$store.state.userInfo) {
        if (this.$store.state.userInfo.roleId === 1) {
          this.$router.push({
            path: `/myMessage/${this.$store.state.userInfo.id}/messageCenter`,
            query: { id: this.agentId, roleId: 2 }
          });
        } else {
          this.$message.warning("借款人方可发送信息");
        }
      } else {
        this.$message.warning("请先登录");
      }
    },
    //发送验证码
    send() {
      let value = this.borrowerData.phone;
      if (this.borrowerData.phone) {
        if (!validaterPhone(this.borrowerData.phone)) {
          this.$message.warning("手机号码不符合规范");
        } else {
          this.showing = false;
          this.timer = setInterval(() => {
            this.time--;
            if (this.time < 0) {
              this.clearTimer();
            }
          }, 1000);
          this.$axios
            .get(`user/selectPhone/${this.borrowerData.phone}`)
            .then(res => {
              if (res.status === 200) {
                this.$message.success("您已注册该平台，请登录");
                this.clearTimer();
                this.resetForm();
              } else {
                this.$axios.get(`base/getUpdatePhoneCode/${this.borrowerData.phone}`).then(res => {
                  if (res.status === 200) {
                    this.$message.success('验证码发送成功，请注意查收')
                  } else {
                    this.$message.warning(res.msg)
                  }
                });
              }
            });
        }
      } else {
        this.$message.warning("手机号不能为空");
      }
    },
    clearTimer() {
      clearInterval(this.timer);
      this.showing = true;
      this.verifyCode = "重新获取";
      this.time = 60;
    },
    //免费申请
    freeApply() {
      this.$refs.agentApplyForm.validate(valid => {
        if (valid) {
          let data = new FormData();
          for (let item in this.borrowerData) {
            if (item === "brokerId") {
              data.append("brokerId", this.agentId);
            } else {
              data.append(item, this.borrowerData[item]);
            }
          }

          if (this.$store.state.userInfo) {
            if (this.$store.state.userInfo.roleId === 1) {
              data.delete("phone");
              data.delete("code");
              data.append("borrowerId", this.$store.state.userInfo.id);
              this.$axios.post("orderAll/saveLoginOrder", data).then(res => {
                if (res.status === 200) {
                  this.$message.success(res.msg);
                } else {
                  this.$message.warning(res.msg);
                }
                if (this.timer !== null) {
                  this.clearTimer();
                }
              });
              this.resetForm();
            } else {
              this.$message.warning("借款人方可申请");
            }
          } else {
            if (!this.flag) {
              this.$axios.post("orderAll/saveNoLoginOrder", data).then(res => {
                if (res.status === 200) {
                  this.$message.success(res.msg);
                  this.$router.push({
                    path: "/applyVictory",
                    query: {
                      number: this.borrowerData.phone
                    }
                  });
                } else {
                  this.$message.warning(res.msg);
                }
                setTimeout(() => {
                  this.resetForm();
                }, 100);
                
                if (this.timer !== null) {
                  this.clearTimer();
                }
              });
              this.flag = true
              setTimeout(() => {
                this.flag = false
              }, 5000);
            } else {
              this.$message.warning('请不要重复点击')
            }
          }
        }
      })
    },
    //经纪人详情
    getAgentData(id) {
      this.$axios.get(`userBroker/getUserBrokerById/${id}`).then(res => {
        res.businessScopeInfo = res.businessScopeInfo.split(',')
        this.agentDetail = Object.assign({}, res);
      });
    },
    //经纪人成功案例
    getVictory(id) {
      this.$axios.get(`orderAll/getTopSixOrderByBrokerId/${id}`).then(res => {
        res.map(item => {
          let firstName = item.borrowerName.substr(0, 1);
          let allName =
            item.sex === "0" ? `${firstName}女士` : `${firstName}先生`;
          return { ...item, allName };
        });
        this.loanData = res;
      });
    },
    //经纪人贷款产品
    getProductData(id) {
      this.$axios.get(`loanInfo/getAllLoanInfoByBrokerId/${id}`).then(res => {
        this.productTableData = res;
      });
    },
    //收藏经纪
    restore() {
      if (this.$store.state.userInfo) {
        if (this.$store.state.userInfo.roleId === 1) {
          this.$axios
            .post(
              `borrowerKeep/saveBorrowerKeep?borrowerId=${
                this.$store.state.userInfo.id
              }&brokerId=${this.agentId}`
            )
            .then(res => {
              this.isCollect = false;
              this.$message.success("收藏成功");
            });
        } else {
          this.$message.warning("借款人方可收藏");
        }
      } else {
        this.$message.warning("请先登录");
      }
    },
    //取消经纪
    cancelRestore() {
      this.$axios
        .get(
          `borrowerKeep/removeBorrowerKeepById/${
            this.$store.state.userInfo.id
          }/${this.agentId}`
        )
        .then(res => {
          this.isCollect = true;
          this.$message.success("取消收藏");
        });
    },
    //获得所有抵押物信息
    getPawn() {
      this.$axios.get("/pawn/getAllPawn").then(res => {
        this.pawnData = res.filter(item => {
          return item.pawnId !== 1;
        });
      });
    },
    //获取省
    getProvince() {
      this.$axios.get("city/getAllProvincial").then(res => {
        this.provinceData = res;
      });
    },
    //获取 市 区
    getCity(val) {
      this.borrowerData.address2 = ''
      this.$axios.get(`city/getAllCity/${val}`).then(res => {
        this.cityData = res;
      });
    },
    //保存经纪人被贷款人浏览记录
    skimRecord() {
      if (this.$store.state.userInfo) {
        if (this.$store.state.userInfo.roleId === 1) {
          this.$axios
            .get(
              `brokerBrowsedRecord/saveRecord/${this.agentId}/${
                this.$store.state.userInfo.id
              }`
            )
            .then(res => {});
        } else {
          return;
        }
      }
    },
    collectPan() {
      if (this.$store.state.userInfo) {
        this.$axios
          .get(
            `borrowerKeep/checkBorrowerKeepBroker/${
              this.$store.state.userInfo.id
            }/${this.agentId}`
          )
          .then(res => {
            if (res === 0) {
              this.isCollect = true;
            } else {
              this.isCollect = false;
            }
          });
      }
    },
    resetForm() {
      this.borrowerData = {
        brokerId: "",
        borrowerName: this.$store.state.userInfo.name,
        sex: 1,
        loanAmount: "",
        address1: "",
        address2: "",
        businessType: 1,
        isPawn: 0,
        phone: "",
        code: "",
        pawnKey: [],
        age: "",
        borrowerJob: "",
        borrowerMonthlyIncome: ""
      };
    }
  },
  created() {
    if (this.$store.state.userInfo) {
      this.borrowerData.borrowerName = this.$store.state.userInfo.name
      this.borrowerData.sex = this.$store.state.userInfo.sex
    }
    let id = this.$route.params.id;
    this.agentId = id;
    this.getAgentData(id);
    this.getVictory(id);
    this.getProductData(id);
    this.getPawn();
    this.getProvince();
    this.skimRecord();

    //收藏判断
    this.collectPan();
    //年龄
    this.getAge();
    //职业
    this.getJob();
    //月收入
    this.getMonthMoney();
  }
};
</script>
<style lang="scss">
.top-form {
  .input-item {
    width: 210px;
  }
  .el-button:focus, .el-button:hover {
    background: #a80e0e;
    color: #fff;
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
</style>

<style scoped lang="scss">
.cheak {
  margin-top: 3px;
  margin-left: 100px;
}
.read {
  height: 17px;
  font-size: 12px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: #7b7b7b;
  line-height: 17px;
  display: inline-block;
  .blue {
    color: #4a90e2;
  }
}
.w180 {
  width: 162px;
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
  .name {
    height: 28px;
    font-size: 20px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(81, 81, 81, 1);
    line-height: 28px;
  }
  .desc {
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
    .name-same {
      border-bottom: 1px solid #f0f0f0;
      height: auto;
      padding: 8px 0;
      box-sizing: border-box;
      line-height: 2;
    }
    .name {
      line-height: 2;
      border-bottom: 1px solid #f0f0f0;
      height: auto;
      font-size: 14px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(81, 81, 81, 1);
      padding: 10px 0;
      .tag {
        display: inline-block;
        width: 60px;
        height: 24px;
        line-height: 24px;
        font-size: 12px;
        background: #F0F0F0;
        border: 1px solid #D9D9D9;
        border-radius: 4px;
        text-align: center;
        margin: 4px;
      }
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
  min-height: 100px;
  width: 268px;
  margin-top: 30px;
  background-color: #fff;
  .title {
    height: 60px;
    background: rgb(208, 172, 86);
    text-align: center;
    font-size: 20px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    line-height: 60px;
  }
  .content-item-victory {
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
  margin-top: 30px;
  margin-left: 30px;
  .main-form {
    width: 902px;
    height: 87px;
    box-sizing: border-box;
    border-bottom: 1px solid #f0f0f0;
    padding: 21px 40px;
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
      color: rgba(81, 81, 81, 1);
      font-family: PingFangSC-Regular;
      font-weight: 400;
      line-height: 16px;
    }
  }
}
</style>