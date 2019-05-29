<template>
  <div>
    <registerTop></registerTop>
    <div class="wrappy">
      <div class="w900">
        <div class="user-main">
          <div class="user-title">
            <div class="title">欢迎注册就能贷网</div>
            <div class="number">已有账号，</div>
            <div class="login" @click="$router.push({path:'/home',query:{login:1}})">立即登陆</div>
          </div>
          <el-form
            label-position="right"
            ref="formData"
            :model="formData"
            label-width="110px"
            :rules="rules"
          >
            <div class="user-form">
              <div class="person-item clearfix">
                <el-form-item label="姓名:" prop="brokerName" style="width: 350px;">
                  <el-input v-model="formData.brokerName" type="text"></el-input>
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
                <el-form-item label="上传照片:" prop="image">
                  <personImg v-model="formData.image" :phone="phone" @success="uploadSuccess"></personImg>
                  <div class="fll text-desc">请上传正面照，支持JPG/JPEG/PNG格式图片，照片不大于2M</div>
                </el-form-item>
              </div>
              <div class="person-item clearfix">
                <el-form-item label="身份证号:" prop="identify" style="width: 350px;">
                  <el-input v-model="formData.identity" type="text"></el-input>
                </el-form-item>
              </div>
              <div class="person-item clearfix">
                <el-form-item label="所在地:" prop="address">
                  <el-select v-model="formData.address1" style="width: 100px;" @change="getCity">
                    <el-option
                      v-for="item in provinceData"
                      :key="item.pid"
                      :label="item.provincial"
                      :value="item.pid"
                      style="width: 100px;"
                    ></el-option>
                  </el-select>
                  <el-select v-model="formData.address2" style="margin-left: 10px;width: 100px;">
                    <el-option
                      style="width: 100px;"
                      v-for="item in cityData"
                      :key="item.cid"
                      :label="item.city"
                      :value="item.cid"
                    ></el-option>
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
                    ></el-option>
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
                    ></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="person-item clearfix">
                <el-form-item label="擅长业务:" prop="businessScope">
                  <div class="business-wrap clearfix">
                    <div
                      class="fll tags-item"
                      v-for="(item,index) in formData.businessScope"
                      :key="index"
                      v-if="isShowTag"
                    >{{item.business}}</div>
                    <div class="business fll" @click="goodMask">
                      <div class="my-upload-img">+</div>
                    </div>
                  </div>
                </el-form-item>
              </div>
              <div class="person-item clearfix">
                <el-form-item label="贷款信息:" prop="loanInfos">
                  <span
                    class="tags"
                    :class="{'select': validateArr[0] === 1}"
                    @click="handleLoanInfo1(1)"
                  >信用贷</span>
                  <span
                    class="tags"
                    :class="{'select': validateArr[1] === 2}"
                    @click="handleLoanInfo2(2)"
                  >房贷</span>
                  <span
                    class="tags"
                    :class="{'select': validateArr[2] === 3}"
                    @click="handleLoanInfo3(3)"
                  >车贷</span>
                  <span
                    class="tags"
                    :class="{'select': validateArr[3] === 4}"
                    @click="handleLoanInfo4(4)"
                  >企业贷</span>
                  <div class="wrap-box">
                    <ul>
                      <li
                        class="header"
                        v-if="validateArr[0] !== '' || validateArr[1] !== '' || validateArr[2] !== '' || validateArr[3] !== ''"
                      >
                        <span></span>
                        <span>月利率最低到最高</span>
                        <span>最快放贷时间</span>
                        <span>最高贷款额度</span>
                        <span>最长贷款期限</span>
                      </li>
                      <li
                        v-for="(item, index) in formData.loanInfos"
                        :key="item.id"
                        v-if="(index + 1) === validateArr[index]"
                      >
                        <span>{{ item.loanName }}</span>
                        <span>
                          <span>
                            <el-input
                              class="el-input-custom"
                              v-model="item.minRate"
                              @change="checkMinRate(item)"
                            ></el-input>~
                            <el-input
                              class="el-input-custom"
                              v-model="item.maxRate"
                              @change="checkMaxRate(item)"
                            ></el-input>
                          </span>%
                        </span>
                        <span>
                          <el-input
                            class="el-input-custom"
                            v-model="item.loanTime"
                            @change="checkLoanTime(item)"
                          ></el-input>&nbsp;天
                        </span>
                        <span>
                          <el-input
                            class="el-input-custom"
                            v-model="item.loanAmount"
                            @change="checkLoanAmount(item)"
                          ></el-input>&nbsp;万
                        </span>
                        <span>
                          <el-input
                            class="el-input-custom"
                            v-model="item.loanTerm"
                            @change="checkLoanTerm(item)"
                          ></el-input>&nbsp;年
                        </span>
                      </li>
                    </ul>
                  </div>
                </el-form-item>
              </div>
              <div class="person-item clearfix">
                <el-form-item label="手机号:" prop="phone" style="width: 350px;">
                  <el-input type="text" v-model="formData.phone" @change="checkPhone"></el-input>
                </el-form-item>
              </div>
              <div class="person-item clearfix">
                <el-form-item label="验证码:" prop="password" style="width: 250px; float: left">
                  <el-input type="text" v-model="formData.password" autocomplete="off"></el-input>
                </el-form-item>
                <div class="fll verify">
                  <div class="send" v-if="showing" @click="send">{{verifyCode}}</div>
                  <div v-else class="time send">{{time}}s</div>
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
                <div class="agreement"><el-checkbox v-model="isChecked"></el-checkbox> 阅读并同意 <a href="#/agreement?userRegister" target="_blank">《9能贷用户注册协议》</a></div>
                </el-form-item>
              </div>
            </div>
          </el-form>
        </div>
      </div>
    </div>
    <div class="mask" v-if="isMask" @click="closeMask"></div>
    <div class="goodBuss" v-if="isBusiness">
      <div class="buss-title">编辑擅长业务标签</div>
      <div class="buss-tag">
        <div class="tag-title">常用业务标签</div>
        <div class="tag-contain clearfix">
          <div
            :class="formData.businessScope.indexOf(item) !== -1? 'tag tag-active fll clearfix' : 'tag fll clearfix'"
            @click="HandleSelsectTags(item)"
            v-for="(item,index) in tags"
            :key="index"
          >+{{item.business}}</div>
        </div>
        <div class="always">已添加标签</div>
        <div class="select-tag-contain clearfix">
          <div class="select-tag fll" v-for="(item, index) in formData.businessScope" :key="index">
            <span class="jian" @click="removeSelectTag(index)">-</span>
            <span class="tag-item">{{item.business}}</span>
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
import registerTop from "../component/registerTop";
import personImg from "../component/imgUpload";
import wcheckbox from "../component/w-checkBox";
import validater from "../util/validater";
import { randomWord } from "@/util/util";
import { mapState, mapMutations } from "vuex";
import { validaterPhone, validaterName } from "@/util/validate";
const reg = /^\d+(\.(?!.*0$)\d{1,2})?$/;
const regZ = /^\d+$/;
export default {
  components: {
    registerTop,
    personImg,
    wcheckbox
  },
  computed: {
    ...mapState(["userInfo"])
  },
  data() {
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
    const validateLoanInfos = (rule, value, callback) => {
      let length = this.validateArr.length;
      let count = 0;
      for (let i = 0; i < length; i++) {
        if (this.validateArr[i] !== "") {
          count++;
        }
      }
      if (count > 0) {
        var vArr = [];
        for (let i = 0; i < length; i++) {
          if (
            this.validateArr[i].toString() === this.formData.loanInfos[i].id
          ) {
            // 某个标签被选中
            var obj = {};
            for (let key in this.formData.loanInfos[i]) {
              if (this.formData.loanInfos[i][key] !== "") {
                obj[key] = this.formData.loanInfos[i][key];
              }
            }
            if (Object.keys(obj).length == 7) {
              vArr.push(true);
            }
          }
        }
        if (vArr.length === count) {
          callback();
        } else {
          callback(new Error("请将贷款信息填写完整"));
        }
      } else {
        callback(new Error("请至少填写一条贷款信息"));
      }
    };
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
      validateArr: ["", "", "", ""],
      phone: "",
      isXLoan: false,
      isCarLoan: false,
      isFLoan: false,
      isQLoan: false,
      optionType: [
        {
          value: "1",
          label: "信用贷"
        },
        {
          value: "2",
          label: "抵押贷"
        }
      ],
      optionBuss: [
        {
          value: "1",
          label: "个人贷"
        },
        {
          value: "2",
          label: "企业贷"
        }
      ],
      isShowTag: false,
      showing: true,
      time: 60,
      verifyCode: "发送验证码",
      formData: {
        businessType: [],
        loanType: [],
        // brokerId:'',//经纪人编号
        brokerName: "", //经纪人姓名
        phone: "", //手机号
        image: "", //图片
        sex: 1, //性别
        introduction: "", //个人简介
        job: "", //部门职位
        age: "", //部门职位
        recommended: "", //推荐指数
        identity: "", //身份证号
        email: "", //邮箱
        address: "", //住址
        company: "", //所属公司
        address1: "", //业务地区
        address2: "", //业务地区
        businessScope: [],
        //业务范畴
        businessIntroduction: "", //业务介绍
        password: "",
        //贷款信息
        loanInfos: [
          {
            id: "1",
            loanName: "信用贷",
            minRate: "",
            maxRate: "",
            loanTerm: "",
            loanAmount: "",
            loanTime: ""
          },
          {
            id: "2",
            loanName: "房贷",
            minRate: "",
            maxRate: "",
            loanTerm: "",
            loanAmount: "",
            loanTime: ""
          },
          {
            id: "3",
            loanName: "车贷",
            minRate: "",
            maxRate: "",
            loanTerm: "",
            loanAmount: "",
            loanTime: ""
          },
          {
            id: "4",
            loanName: "企业贷",
            minRate: "",
            maxRate: "",
            loanTerm: "",
            loanAmount: "",
            loanTime: ""
          }
        ]
      },

      isMask: false,
      isBusiness: false,
      tags: [],

      query: {
        tag: ""
      },
      //省
      provinceData: [],
      //市 区
      cityData: [],
      rules: {
        // phone: [
        //   { validator: validater.phoneNumber, trigger: "change" },
        //   { required: true, trigger: "change", message: "手机号不能为空" }
        // ],
        // password: [
        //   { required: true, trigger: "change", message: "验证码不能为空" }
        // ],
        // brokerName: [
        //   { required: true, trigger: "change", validator: validateName }
        // ],
        // businessScope: [
        //   { required: true, trigger: "change", message: "擅长业务不能为空" }
        // ],
        // loanType: [
        //   { required: true, trigger: "change", message: "贷款类型不能为空" }
        // ],
        // loanInfos: [
        //   { required: true, trigger: "change", validator: validateLoanInfos }
        // ],
        // businessType: [
        //   { required: true, trigger: "change", message: "业务分类不能为空" }
        // ],
        // address: [
        //   { required: true, trigger: "change", validator: validateAddress }
        // ],
        // identify: [
        //   { validator: validater.idCard, trigger: "change" }
        // ],
        // image: [{ required: true, trigger: "change", message: "头像不能为空" }],
        sex: [{ required: true, trigger: "change", message: "性别不能为空" }]
      }
    };
  },
  methods: {
    ...mapMutations(["SET_USER"]),
    closeMask() {
      this.formData.businessScope = [];
      this.isMask = false;
      this.isBusiness = false;
    },
    checkMinRate(item) {
      console.log(item)
      if (!reg.test(item.minRate)) {
        this.$message.error("最低月利率格式不正确");
        item.minRate = "";
      }
    },
    checkMaxRate(item) {
      if (!reg.test(item.maxRate)) {
        this.$message.error("最高月利率格式不正确");
        item.maxRate = "";
      } else if (item.minRate > item.maxRate) {
        this.$message.error("最低月利率不能高于最高月利率格式");
        item.maxRate = "";
      }
    },
    checkLoanTime(item) {
      if (!regZ.test(item.loanTime)) {
        this.$message.error("最快放贷时间格式不正确");
        item.loanTime = "";
      }
    },
    checkLoanAmount(item) {
      if (!regZ.test(item.loanAmount)) {
        this.$message.error("最高贷款额度格式不正确");
        item.loanAmount = "";
      }
    },
    checkLoanTerm(item) {
      if (!regZ.test(item.loanTerm)) {
        this.$message.error("最长贷款期限格式不正确");
        item.loanTerm = "";
      }
    },
    xLoan() {
      this.isXLoan = !this.isXLoan;
    },
    cLoan() {
      this.isCarLoan = !this.isCarLoan;
    },
    fLoan() {
      this.isFLoan = !this.isFLoan;
    },
    qLoan() {
      this.isQLoan = !this.isQLoan;
    },
    //保存标签
    saveTag() {
      this.isMask = false;
      this.isBusiness = false;
      this.isShowTag = true;
    },
    //取消标签
    cancelTag() {
      this.formData.businessScope = [];
      this.isMask = false;
      this.isBusiness = false;
      this.isShowTag = false;
    },
    //发送验证码
    send() {
      const reg = /^1\d{10}$/;
      if (this.formData.phone) {
        if (reg.test(this.formData.phone)) {
          this.showing = false;
          let timer = setInterval(() => {
            this.time--;
            if (this.time < 0) {
              clearInterval(timer);
              this.showing = true;
              this.verifyCode = "重新获取";
              this.time = 60;
            }
          }, 1000);
          this.$axios
            .get(`/base/getRegisterCode/${this.formData.phone}`)
            .then(res => {
              if (res.status !== 200) {
                this.$message.warning(res.msg);
                clearInterval(timer);
                this.showing = true;
                this.verifyCode = "重新获取";
                this.time = 60;
              }
            });
        }
      } else {
        this.$message.warning("请输入手机号");
      }
    },
    handleLoanInfo1(val) {
      this.flag1 = !this.flag1;
      if (this.flag1) {
        this.validateArr.splice(val - 1, 1, val);
      } else {
        this.validateArr.splice(val - 1, 1, "");
      }
    },
    handleLoanInfo2(val) {
      this.flag2 = !this.flag2;
      if (this.flag2) {
        this.validateArr.splice(val - 1, 1, val);
      } else {
        this.validateArr.splice(val - 1, 1, "");
      }
    },
    handleLoanInfo3(val) {
      this.flag3 = !this.flag3;
      if (this.flag3) {
        this.validateArr.splice(val - 1, 1, val);
      } else {
        this.validateArr.splice(val - 1, 1, "");
      }
    },
    handleLoanInfo4(val) {
      this.flag4 = !this.flag4;
      if (this.flag4) {
        this.validateArr.splice(val - 1, 1, val);
      } else {
        this.validateArr.splice(val - 1, 1, "");
      }
    },
    formmatData(params) {
      if (!this.flag1) {
        params.loanInfos.splice(0, 1, "");
      }
      if (!this.flag2) {
        params.loanInfos.splice(1, 1, "");
      }
      if (!this.flag3) {
        params.loanInfos.splice(2, 1, "");
      }
      if (!this.flag4) {
        params.loanInfos.splice(3, 1, "");
      }
    },
    //注册
    register() {
      this.$refs.formData.validate(valid => {
        if (valid) {
          if (this.isChecked) {
            console.log(this.formData)
            let params = {
              ...this.formData
            }
            console.log(params)
            this.formmatData(params);
            let data = new FormData();
            let arr = [];
            for (let i = 0; i < this.formData.loanInfos.length; i++) {
              if (this.formData.loanInfos[i]) {
                arr.push(this.formData.loanInfos[i]);
              }
            }
            params.loanInfos = arr;
            let businessScope = params.businessScope
              .map(item => item.businessId)
              .join(",");
            let loanInfos = JSON.stringify(params.loanInfos);
            for (let item in params) {
              if (item === "businessType") {
                data.append(item, params[item].join(","));
              } else if (item === "loanType") {
                data.append(item, params[item].join(","));
              } else if (item === "businessScope") {
                data.append("businessScope", businessScope);
              } else if (item === "loanInfos") {
                data.append("loanInfos", loanInfos);
              } else if (item === "code") {
                data.append("password", params.code);
              } else {
                data.append(item, params[item]);
              }
            }
            this.$axios.post("/userBroker/registerUserBroker", this.formData).then(res => {
              if (res.status === 200) {
                this.formData.businessScope = [];
                this.formData.loanInfos = [
                  {
                    id: "1",
                    loanName: "信用贷",
                    minRate: "",
                    maxRate: "",
                    loanTerm: "",
                    loanAmount: "",
                    loanTime: ""
                  },
                  {
                    id: "2",
                    loanName: "房贷",
                    minRate: "",
                    maxRate: "",
                    loanTerm: "",
                    loanAmount: "",
                    loanTime: ""
                  },
                  {
                    id: "3",
                    loanName: "车贷",
                    minRate: "",
                    maxRate: "",
                    loanTerm: "",
                    loanAmount: "",
                    loanTime: ""
                  },
                  {
                    id: "4",
                    loanName: "企业贷",
                    minRate: "",
                    maxRate: "",
                    loanTerm: "",
                    loanAmount: "",
                    loanTime: ""
                  }
                ];
                this.$router.push({
                  path: "/registerJump",
                  query: { number: this.formData.phone }
                });
              } else {
                this.$message.warning(res.msg);
              }
            });
            console.log(this.formData)
          } else {
            this.$message.warning('注册前请阅读并同意相关协议');
          }
          
        } else {
          return false;
        }
      });
    },
    //  检测手机号是否被注册
    checkPhone() {
      if (this.formData.phone) {
        this.formData.phone = this.formData.phone.trim();
        this.$axios.get(`user/selectPhone/${this.formData.phone}`).then(res => {
          if (res.status === 200) {
            this.$message.warning("手机号已注册");
            this.formData.phone = "";
          } else {
            return;
          }
        });
      }
    },

    goodMask() {
      this.isMask = true;
      this.isBusiness = true;
    },
    // 添加选择的业务标签
    HandleSelsectTags(item) {
      let index = this.formData.businessScope.indexOf(item);
      if (index !== -1) {
        this.formData.businessScope.splice(index, 1);
      } else {
        this.formData.businessScope.push(item);
      }
    },
    // 移除选中的业务标签
    removeSelectTag(index) {
      this.formData.businessScope.splice(index, 1);
    },
    //获取省
    getProvince() {
      this.$axios.get("city/getShengHot").then(res => {
        this.provinceData = res;
      });
    },
    //获取 市 区
    getCity(val) {
      this.formData.address2 = "";
      this.$axios.get(`city/getCityHot/${val}`).then(res => {
        this.cityData = res;
      });
    },
    //获取擅长业务标签
    getGoodBusiness() {
      this.$axios.get("business/getAllBusiness").then(res => {
        res.splice(0, 1);
        this.tags = res;
      });
    },
    uploadSuccess(file) {
      this.formData.image = file;
    }
  },
  created() {
    this.phone = new Date().getTime() + randomWord(false, 10);
    this.getProvince();
    this.getGoodBusiness();
  }
};
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

