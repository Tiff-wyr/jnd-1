<template>
  <div>
    <div class="wrappy">
      <div class="w1200">
        <div>
          <div class="detail-title">产品详情</div>
          <div class="clearfix">
            <div class="fll">
              <div class="detail-left">
                <div class="clearfix">
                  <div class="fll" v-if="productDetailData.productLogo">
                    <img
                      :src="productDetailData.productLogo"
                      alt=""
                      style="width: 90px;height: 90px;border-radius: 50%"
                    >
                  </div>
                  <div class="fll" v-else>
                    <img
                      src="/static/resource/pic/pro.png"
                      alt=""
                      style="width: 90px;height: 90px;border-radius: 50%"
                    >
                  </div>
                  <div class="fll">
                    <div class="detail-loan-title">{{productDetailData.productName}}</div>
                    <div class="clearfix re-star">
                      <img src="../../static/resource/agent/star.png" class="fll" v-if="isCollect" alt="" />
                      <img src="../../static/resource/agent/star1.png" class="fll" v-else alt="" />
                      <div class="fll">
                        <div class="fll restore" @click="restore" v-if="isCollect">加入收藏</div>
                        <div class="fll restore" @click="cancelRestore" v-else>取消收藏</div>
                      </div>
                    </div>
                  </div>
                  <div class="flr">
                    <div class="btn" @click="hurryUpApply">快速申请</div>
                  </div>
                </div>
                <div class="left-line"></div>
                <div class="left-limit">
                  额度：
                  <span class="limit-same">{{productDetailData.productStartAmount}}万起</span>
                </div>
                <div class="left-limit mt22">
                  期限：
                  <span class="limit-same">{{productDetailData.productLife}}</span>
                </div>
                <div class="left-limit mt22">
                  利息：
                  <span class="limit-same">{{productDetailData.productInterest}}%</span>
                </div>
                <div class="left-limit mt22">
                  身份要求：
                  <span class="limit-same">{{productDetailData.productIdentity}}</span>
                </div>
                <div class="left-limit mt22">
                  贷款类型：
                  <span class="limit-same">{{productDetailData.productLoanType}}</span>
                </div>
                <div class="left-limit mt22">
                  发行机构：
                  <span class="limit-same">{{productDetailData.productPublisher}}</span>
                </div>
                <div class="clearfix mt25">
                  <div class="fll yellow-line"></div>
                  <div class="fll ml10 apply">申请条件</div>
                  <img
                    src="../../static/resource/product-detail/apply.png"
                    alt=""
                    class="fll ml400"
                  >
                </div>
                <div class="line2"></div>
                <div class="left-limit">
                  年龄要求：
                  <span class="limit-same">{{productDetailData.productAge}}</span>
                </div>
                <div class="left-limit mt22">
                  职业要求：
                  <span class="limit-same">{{productDetailData.productOccupation}}</span>
                </div>
                <div class="left-limit mt22">
                  资产要求：
                  <span class="limit-same">{{productDetailData.productProperty}}</span>
                </div>
                <div class="clearfix mt22">
                  <div class="fll left-limit">其他要求:</div>
                  <div class="fll same">{{ productDetailData.productCondition | textFilter }}</div>
                </div>
                <div class="clearfix mt25">
                  <div class="fll yellow-line"></div>
                  <div class="fll ml10 feature">产品特点</div>
                </div>
                <div class="line2"></div>
                <div class="clearfix mt22">
                  <div class="fll left-limit">产品特点:</div>
                  <div class="fll same">{{productDetailData.productCharacteristic | textFilter}}</div>
                </div>
                <div class="clearfix mt25">
                  <div class="fll yellow-line"></div>
                  <div class="fll ml10 feature">热门产品推荐</div>
                </div>
                <div class="line2"></div>
                <div class="clearfix">
                  <div
                    class="product-tui fll clearfix"
                    v-for="(item,index) in hotProductData"
                    :key="index"
                  >
                    <div class="fll">
                      <img
                        :src="item.productLogo"
                        v-if="item.productLogo"
                        alt=""
                        @click="enterProduct(item.productId)"
                        style="width: 60px;height: 60px;cursor: pointer"
                      >
                      <img
                        src="/static/resource/pic/pro.png"
                        v-else
                        alt=""
                        @click="enterProduct(item.productId)"
                        style="width: 60px;height: 60px;cursor: pointer"
                      >
                    </div>
                    <div class="fll ml10">
                      <div class="name">{{item.productName}}</div>
                      <div class="rate">
                        月利率：
                        <span style="color:#A80E0E">{{item.productInterest}}%</span>
                      </div>
                      <div class="limit">
                        额度：
                        <span
                          style="color:#A80E0E"
                        >{{item.productStartAmount}}~{{item.productEndAmount}}万</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="fll ml30">
              <div class="detail-top">
                <div class="top-title">代理该产品的机构</div>
                <div class="top-item">
                  <div class="clearfix">
                    <img
                      :src="organData.agencyLogo"
                      v-if="organData.agencyLogo"
                      alt=""
                      @click="enterOrgan(organData.agencyId)"
                      class="fll"
                      style="width: 60px;height: 60px;cursor: pointer"
                    >
                    <img
                      src="/static/resource/pic/organ.png"
                      v-else
                      alt=""
                      @click="enterOrgan(organData.agencyId)"
                      class="fll"
                      style="width: 60px;height: 60px;cursor: pointer"
                    >
                    <div class="fll ml10 organ-info">
                      <div class="title">{{organData.agencyName}}</div>
                      <div class="area">{{organData.address}}</div>
                      <div class="wang">{{organData.agencyURL}}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="prodetai-wrap">
      <el-dialog :visible.sync="dialogVisible" width="770px">
        <div class="dialog-title">
          <el-steps :active="stepStatus" align-center space="100%" class="init">
            <el-step title="申请贷款" icon="el-icon-tickets" process-status="finish"></el-step>
            <el-step title="成功了" icon="el-icon-success"></el-step>
          </el-steps>
        </div>
        <div class="dialog-container" v-if="isApply">
          <div class="left">
            <el-form ref="applyForm" :model="applyForm" :rules="applyFormRules" label-position="right" label-width="120px">
              <el-form-item label="您的姓名" prop="borrowerName">
                <el-input class="input-item" v-model="applyForm.borrowerName" placeholder="请输入您的姓名"></el-input>
              </el-form-item>
              <el-form-item label="性别" prop="sex">
                <el-radio-group v-model="applyForm.sex">
                  <el-radio label="1">男</el-radio>
                  <el-radio label="0">女</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="贷款金额" prop="loanAmount">
                <el-input class="input-item" v-model="applyForm.loanAmount" placeholder="请输入金额（万元）"></el-input>
              </el-form-item>
              <el-form-item label="选择地区" prop="address">
                <el-select class="select-item" @change="handleProvince" v-model="applyForm.address1" placeholder="请选择地区">
                  <el-option v-for="item in provinceList" :value="item.pid" :key="item.pid + 'Province'" :label="item.provincial"></el-option>
                </el-select>
                <el-select class="select-item address2" v-model="applyForm.address2" placeholder="请选择地区">
                  <el-option v-for="item in cityList" :value="item.cid" :key="item.cid + 'city'" :label="item.city"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="联系手机" prop="phone">
                <el-input class="input-item" placeholder="请输入手机号" v-model="applyForm.phone"></el-input>
              </el-form-item>
              <el-form-item label="手机验证码" prop="code">
                <el-input class="input-item code" placeholder="请输入验证码" v-model="applyForm.code"></el-input>
                <el-button type="info" @click="getVertifyCode" v-show="codeBtnShow" style="width: 115px;">{{ codeBtnText }}</el-button>
                <el-button type="info" v-show="!codeBtnShow" style="width: 115px; margin-left: 0;">{{ times }}</el-button>
              </el-form-item>
              <el-form-item>
                <span>
                  <el-checkbox v-model="checked" class="check-box"></el-checkbox>阅读并同意<a href="#/agreement?userRegister" target="_blank" style="color: #4a90e2;">《9能贷用户注册协议》</a><a href="#/agreement?userProtect" target="_blank" style="color: #4a90e2;">《用户隐私保护政策》</a>
                </span>
              </el-form-item>
              <el-form-item>
                <el-button class="input-item confirm-btn" @click="nowApplyLoan">立即申请贷款</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="right">
            <h3>特别声明:</h3>
            <p>您的信息将只作为产品推荐，贷款过程中遇到的任何预先收费行为均为诈骗，请您时刻保持警惕避免损失。</p>
            <p>填写虚假信息将对您办理贷款带来不利影响，建议您不要这么做。</p>
          </div>
        </div>
        <div class="dialog-container is-finish" v-else>
          <p>您的申请已经提交, 请保持电话联系通畅</p>
          <p>账号：{{ applyForm.phone }}&nbsp;&nbsp;&nbsp;&nbsp;密码：（您手机收到的验证码）</p>
          <p>这是您的平台账号，<span @click="$router.push({path:'/home',query:{login:1}})" style="color: #A80E0E;">登录</span>平台，即可享受平台专业的金融服务。</p>
          <div class="btn-box">
            <a href="#/home">返回首页</a><span @click="dialogVisible = false">关闭窗口</span>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { validaterPhone, validaterName, validaterLoanAmount } from '@/util/validate'
import api from '@/api/filterData'
import {saveNotLoginProductOrder} from '@/api/apply'
import publicApi from '@/api/public'
export default {
  name: "productDetail",
  filters: {
    textFilter(val) {
      if (val == "null") {
        return "暂无";
      } else {
        return val;
      }
    }
  },
  computed: {
    ...mapState(["userInfo"])
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
      if (this.applyForm.address1) {
        callback()
      } else {
        callback(new Error('请选择地区'))
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
    }
    return {
      flag: false,
      isCollect: true, //收藏
      productTable: [],
      tableData: [],
      formData: [],
      productDetailData: {
        productName: "",
        productCharacteristic: "", //特点
        productPublisher: "", // 发型机构
        productInterest: "", //利率
        productLoanType: "", //贷款类型
        productOccupation: "", //职业
        productIdentity: "", //身份
        productMinAge: "",
        productMaxAge: "",
        productProperty: "", //资产
        productStartAmount: "", //额度
        productEndAmount: "",
        productLife: "", //年限
        productCondition: "" //条件
      },
      organData: {
        agencyName: "",
        agencyLogo: "",
        agencyAddress: "",
        agencyURL: ""
      },
      productId: "",
      hotProductData: [],
      isApply: true,
      stepStatus: 0,
      checked: false,
      dialogVisible: false,
      applyForm: {
        productId: '',
        borrowerName: '',
        address1: '',
        address2: '',
        phone: '',
        code: '',
        sex: '1',
        loanAmount: ''
      },
      applyFormRules: {
        borrowerName: [{ required: true, trigger: 'change', validator: validateName}],
        address: [{ required: true, trigger: 'change', validator: validateAddress }],
        phone: [{ required: true, trigger: 'change', validator: validatePhone }],
        code: [{ required: true, message: '验证码不能为空', trigger: 'change' }],
        sex: [{ required: true, message: '性别不能为空', trigger: 'change' }],
        loanAmount: [{ required: true, trigger: 'change', validator: validateLoanAmount }]
      },
      timer: null,
      codeBtnText: '获取验证码',
      times: 60,
      codeBtnShow: true,
      provinceList: [],
      cityList: [],
      isClick: true,
      clickInterval: false
    };
  },
  methods: {
    getProvinceList() {
      api.getProvice().then(res => {
        this.provinceList = res.data
      })
    },
    getCityList(id) {
      api.getCity(id).then(res => {
        console.log(res)
        this.cityList = res.data
      })
    },
    handleProvince(val) {
      this.applyForm.address2 = ''
      this.getCityList(val)
    },
    //机构详情页
    enterOrgan(id) {
      this.$router.push(`/organDetail/${id}`);
    },
    //产品详情页
    enterProduct(id) {
      this.$router.push(`/productDetail/${id}`);
      this.getDetail(id);
    },
    //快速申请
    hurryUpApply() {
      this.isApply = true
      this.stepStatus = 0
      if (this.$store.state.userInfo) {
        if (this.$store.state.userInfo.roleId === 1) {
          let data = new FormData();
          data.append("borrowerId", this.$store.state.userInfo.id);
          data.append("productId", this.productId);
          this.$axios.post(`orderAll/saveProductOrder`, data).then(res => {
            if (res.status === 200) {
              this.$message.success(res.msg);
            } else {
              this.$message.warning(res.msg);
            }
          });
        } else {
          this.$message.warning("借款人方可申请");
        }
      } else {
        this.resetForm()
        this.getProvinceList()
        this.applyForm.productId = this.productId
        this.dialogVisible = true
      }
    },
    nowApplyLoan() { // 立即申请贷款
      this.$refs.applyForm.validate(valid => {
        if (valid) {
          if (this.checked) {
            if(!this.clickInterval) {
              saveNotLoginProductOrder(this.applyForm).then(res => {
                if (res.data.status === 200) {
                  this.stepStatus = 1
                  this.isApply = false
                } else {
                  this.$message.warning(res.data.msg)
                }
              })
              this.clickInterval = true
              setTimeout(() => {
                this.clickInterval = false
              }, 5000);
            } else {
              this.$message.warning('请不要重复点击')
            }
          } else {
            this.$message.warning('请阅读并同意《就能贷用户注册协议》')
          }
          
        } else {
          return false
        }
      })
    },
    clearTimer() {
      clearInterval(this.timer)
      this.codeBtnText = '重新获取'
      this.codeBtnShow = true
      this.times = 60
    },
    getVertifyCode() {
      
      if (this.applyForm.phone) {
        if (this.isClick) {
          this.isClick = false
          setTimeout(() => {
            this.isClick = true
          }, 2000);
          this.timer = setInterval(() => {
            this.times--;
            this.codeBtnShow = false
            if (this.times <= 0) {
              this.clearTimer()
            }
          }, 1000);
          publicApi.validateRegister(this.applyForm.phone).then(res => { // 检测手机号是否注册
            if (res.data.status === 500) {
              this.$message.success("该手机号已被注册，请登录后再进行申请");
              this.clearTimer()
              this.resetForm()
            } else {
              publicApi.sendPhoneCode(this.applyForm.phone).then(res => {
                if (res.data.status === 500) {
                  this.$message.warning(res.data.msg);
                  this.clearTimer();
                  this.resetForm()
                } else {
                  this.$message.success('验证码已发送');
                }
              });
            }
          })
        }
      } else {
        this.$message.warning('请填写手机号')
      }
      
    },
    //产品详情
    getDetail(id) {
      this.$axios.get(`product/selectProductById/${id}`).then(res => {
        this.productDetailData = res;
      });
    },
    //代理该产品的机构
    getOrgan(id) {
      this.$axios.get(`product/selectAgencyByProId/${id}`).then(res => {
        this.organData = res;
      });
    },
    //收藏产品
    restore() {
      if (this.$store.state.userInfo) {
        if (this.$store.state.userInfo.roleId === 1) {
          this.$axios
            .post(
              `borpro/addBorPro?borId=${
                this.$store.state.userInfo.id
              }&productId=${this.productId}`
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
    //取消产品
    cancelRestore() {
      this.$axios
        .post(
          `borpro/deleteBorPro?borId=${
            this.$store.state.userInfo.id
          }&productId=${this.productId}`
        )
        .then(res => {
          this.isCollect = true;
          this.$message.success("取消收藏");
        });
    },
    // 热门产品推荐
    getHotProduct() {
      this.$axios.get(`product/getHotPro/1/6`).then(res => {
        this.hotProductData = res;
      });
    },
    collectPan() {
      let data = new FormData();
      data.append("borId", this.$store.state.userInfo.id);
      data.append("productId", this.productId);
      this.$axios.post(`borpro/selectBorPro`, data).then(res => {
        if (res === 0) {
          this.isCollect = true;
        } else {
          this.isCollect = false;
        }
      });
    },
    skimRecord() {
      if (this.$store.state.userInfo) {
        if (this.$store.state.userInfo.roleId === 1) {
          let data = new FormData();
          data.append("borId", this.$store.state.userInfo.id);
          data.append("proId", this.productId);
          this.$axios.post(`borLookPro/addLookPro`, data).then(res => {
            if (res.status === 200) {
            }
          });
        }
      }
    },
    resetForm() {
      this.applyForm = {
        productId: '',
        borrowerName: '',
        address1: '',
        address2: '',
        phone: '',
        code: '',
        sex: '1',
        loanAmount: ''
      }
    }
  },
  created() {
    let id = this.$route.params.id;
    this.productId = id;
    this.applyForm.productId = id
    this.getDetail(id);
    this.getOrgan(id);
    this.getHotProduct();
    //收藏判断
    if (this.$store.state.userInfo) {
      this.collectPan();
      this.skimRecord();
    }
  }
};
</script>

<style scoped lang="scss">
.ml400 {
  margin-left: 400px;
}
.mt25 {
  margin-top: 25px;
}
.mt22 {
  margin-top: 10px;
}
.ml10 {
  margin-left: 10px;
}
.ml16 {
  margin-left: 16px;
}
.ml128 {
  margin-left: 128px;
}
.ml15 {
  margin-left: 15px;
}
.mt12 {
  margin-top: 12px;
}
.ml30 {
  margin-left: 30px;
}
.detail-title {
  width: 112px;
  height: 28px;
  font-size: 24px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(0, 0, 0, 1);
  line-height: 28px;
  margin-bottom: 24px;
}
.detail-left {
  width: 902px;
  background: rgba(255, 255, 255, 1);
  padding: 36px 60px 66px 60px;
  box-sizing: border-box;
  .btn {
    margin-top: 25px;
    text-align: center;
    width: 100px;
    height: 40px;
    background: rgba(168, 14, 14, 1);
    font-size: 16px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 40px;
    cursor: pointer;
  }
  .left-line,
  .line2 {
    width: 782px;
    height: 1px;
    background: #f0f0f0;
    margin-top: 10px;
    margin-bottom: 20px;
  }
  .left-limit {
    height: 14px;
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(155, 155, 155, 1);
    line-height: 2;
  }
  .limit-same {
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(81, 81, 81, 1);
    line-height: 2;
  }
  .same {
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(81, 81, 81, 1);
    line-height: 2;
    width: 465px;
    margin-left: 10px;
  }
  .detail-loan-title {
    font-size: 20px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(81, 81, 81, 1);
    margin-left: 20px;
    margin-top: 16px;
    margin-bottom: 16px;
  }
  .re-star {
    margin-left: 20px;
    .restore {
      width: 64px;
      font-size: 14px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(155, 155, 155, 1);
      margin-left: 5px;
      cursor: pointer;
    }
    .star {
      width: 15px;
      height: 15px;
      margin-top: 2px;
    }
  }

  .yellow-line {
    width: 4px;
    height: 16px;
    background: rgba(208, 172, 86, 1);
  }
  .apply {
    height: 16px;
    font-size: 16px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(81, 81, 81, 1);
    line-height: 16px;
  }
  .feature {
    height: 16px;
    font-size: 16px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(81, 81, 81, 1);
    line-height: 16px;
  }
}
.detail-top {
  width: 268px;
  background: rgba(255, 255, 255, 1);
  .top-title {
    text-align: center;
    width: 268px;
    height: 74px;
    font-size: 20px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(81, 81, 81, 1);
    line-height: 74px;
  }
  .top-item {
    height: 100px;
    padding: 0 24px 30px 24px;
    box-sizing: border-box;
    .organ-info {
      width: calc(100% - 80px);
    }
    .title {
      height: 14px;
      font-size: 14px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(81, 81, 81, 1);
      line-height: 14px;
    }
    .area {
      height: 12px;
      font-size: 12px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(155, 155, 155, 1);
      line-height: 12px;
      margin-top: 12px;
      margin-bottom: 8px;
    }
    .wang {
      height: 12px;
      font-size: 12px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(155, 155, 155, 1);
      line-height: 12px;
    }
  }
  .top-add {
    width: 268px;
    height: 15px;
  }
}
.detail-bottom {
  width: 268px;
  background: rgba(255, 255, 255, 1);
  margin-top: 40px;
  .victory-title {
    text-align: center;
    height: 74px;
    font-size: 20px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(81, 81, 81, 1);
    line-height: 74px;
  }
  .victory-item {
    height: 100px;
    padding: 0 24px 30px 24px;
    box-sizing: border-box;
    .name {
      height: 14px;
      font-size: 14px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(81, 81, 81, 1);
      line-height: 14px;
      margin-top: 15px;
    }
    .number {
      height: 12px;
      font-size: 12px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(155, 155, 155, 1);
      line-height: 12px;
      margin-top: 15px;
    }
  }
  .top-add {
    width: 268px;
    height: 15px;
  }
}
.product-tui {
  width: 250px;
  margin-bottom: 20px;
  padding-left: 30px;
  box-sizing: border-box;
  .name {
    height: 14px;
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(81, 81, 81, 1);
    line-height: 14px;
  }
  .rate {
    height: 12px;
    font-size: 12px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(155, 155, 155, 1);
    line-height: 12px;
    margin: 10px 0 6px 0;
  }
  .limit {
    height: 12px;
    font-size: 12px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(155, 155, 155, 1);
    line-height: 12px;
  }
}
.dialog-title {
  width: 100%;
  background: rgba(240, 240, 240, 1);
  padding: 20px 30px;
  margin: 20px 0;
  box-sizing: border-box;
}
.dialog-container {
  width: 100%;
  margin-top: 20px;
  overflow: hidden;
  &.is-finish {
    text-align: center;
    p {
      margin: 10px 0;
    }
    .btn-box {
      width: 200px;
      margin: 30px auto 10px;
      text-align:justify;
      overflow: hidden;
      a {
        float: left;
      }
      span {
        float: right;
        color: #A80E0E;
        cursor: pointer;
      }
    }
  }
  .left,
  .right {
    float: left;
  }
  .left {
    width: 450px;
    .input-item {
      width: 240px;
      &.code {
        width: 120px;
        margin-right: 4px;
      }
      &.confirm-btn {
        background: #d0ac56;
        color: #fff;
        border-color: #d0ac56;
      }
    }
    .select-item {
      width: 110px;
      &.address2 {
        margin-left: 15px;
      }
    }
    .check-box {
      margin-right: 16px;
    }
  }
  .right {
    width: 270px;
    font-size: 12px;
    border-left: 1px solid #d9d9d9;
    padding: 60px 20px 40px 40px;
    box-sizing: border-box;
    h3 {
      color: #515151;
    }
    p {
      margin: 10px 0;
      color: #9b9b9b;
    }
  }
}
</style>
<style lang="scss">
.prodetai-wrap {
  .el-dialog {
    .el-dialog__header {
      padding: 10px 20px 10px;
    }
    .el-dialog__body {
      padding: 20px 0;
      .el-checkbox__input.is-checked .el-checkbox__inner {
        background: #d0ac56;
        border-color: #d0ac56;
      }
      .el-step__icon-inner[class*="el-icon"]:not(.is-status) {
        color: #d0ac56;
      }
      .el-step__icon.is-icon {
        background: #f0f0f0;
      }
      .el-step__title.is-finish {
        color: #515151;
      }
      .el-step.is-horizontal .el-step__line {
        height: 4px;
        background: #d9d9d9;
        .el-step__line-inner {
          transition-delay: 3ms!important;
          border-width: 2px!important;
          width: 50%!important;
          border-color: #D0AC56;
        }
      }
    }
  }
}
.prodetai-wrap .el-dialog .el-dialog__body .el-step.is-horizontal .is-finish .el-step__line .el-step__line-inner {
  transition-delay: 3ms!important;
  border-width: 2px!important;
  width: 100%!important;
  border-color: #D0AC56;
}
</style>
