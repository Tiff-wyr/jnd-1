<template>
  <div>
    <div class="resource mb24">
      <div class="filter-container">
        <el-cascader
          clearable
          class="filter-item filter-item-select"
          :options="cityList"
          @active-item-change="handleItemChange"
          @change="handleCity"
          :props="props"
          :change-on-select="true"
        ></el-cascader>
        <el-select
          class="filter-item filter-item-select"
          v-model="listQuery.fLoanAmount"
          clearable
          placeholder="请选择贷款金额"
        >
          <el-option
            v-for="item in moneyList"
            :key="item.id"
            :value="item.id"
            :label="item.amountName"
          ></el-option>
        </el-select>
        <el-select
          class="filter-item filter-item-select"
          v-model="listQuery.fBusinessType"
          clearable
          placeholder="请选择贷款类型"
        >
          <el-option v-for="item in typeList" :key="item.id" :value="item.id" :label="item.busName"></el-option>
        </el-select>
        
        <el-select
          class="filter-item filter-item-select"
          v-model="listQuery.fIsPawn"
          clearable
          placeholder="请选择是否有抵押物"
        >
          <el-option
            v-for="item in isPawnList"
            :key="item.id"
            :value="item.id"
            :label="item.isPawn"
          ></el-option>
        </el-select>
        <el-select
          v-show="listQuery.fIsPawn === 0"
          class="filter-item filter-item-select"
          v-model="listQuery.fAge"
          clearable
          placeholder="请选择年龄范围"
        >
          <el-option v-for="item in ageList" :key="item.id" :value="item.id" :label="item.ageArea"></el-option>
        </el-select>
        <el-select
          v-show="listQuery.fIsPawn === 0"
          class="filter-item filter-item-select"
          v-model="listQuery.fJob"
          clearable
          placeholder="请选择从事行业"
        >
          <el-option
            v-for="item in jobList"
            :key="item.jobId"
            :value="item.jobId"
            :label="item.jobName"
          ></el-option>
        </el-select>
        <el-select
          v-show="listQuery.fIsPawn === 0"
          class="filter-item filter-item-select"
          v-model="listQuery.fIncome"
          clearable
          placeholder="请选择收入范围"
        >
          <el-option
            v-for="item in incomeList"
            :key="item.id"
            :value="item.id"
            :label="item.incomeName"
          ></el-option>
        </el-select>
        <el-select
          class="filter-item filter-item-select"
          v-model="fPawnKey"
          clearable
          v-show="listQuery.fIsPawn === 1"
          @change="choosePawn"
          placeholder="请选择抵押物"
          multiple
        >
          <el-option
            v-for="item in pawnList"
            :key="item.pawnId"
            :value="item.pawnId"
            :label="item.pawn"
          ></el-option>
        </el-select>
        <el-button type="primary" @click="handleFilter">查 询</el-button>
      </div>
      <div class="title">资源中心</div>
      <div
        class="table"
        v-loading="listLoading"
        element-loading-text="数据正在加载中..."
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.5)"
      >
        <div class="loans-pro">
          <div class="loans-header clearfix">
            <div class="header-same fll">贷款人</div>
            <div class="header-same fll">地区</div>
            <div class="header-same fll">贷款金额</div>
            <div class="header-same fll">手机号</div>
            <div class="header-same fll">操作</div>
          </div>
          <div class="loans-pro-item clearfix" v-for="(item,index) in tableData" :key="index">
            <div class="fll pro-item-same">{{item.borrowerName}}</div>
            <div class="fll pro-item-same">{{item.address}}</div>
            <div class="fll pro-item-same">{{item.loanAmountValue}}万</div>
            <div class="fll pro-item-same">{{item.phone}}</div>
            <div class="fll pro-item-same">
              <div class="operate" @click="joinResource(item.borrowerId)">立即查看</div>
            </div>
          </div>
        </div>
        
        <div class="empty-list-show" v-show="!tableData.length">
          <img :src="emptyList" alt="">
          <p>暂无数据...</p>
        </div>
      </div>
      <div style="text-align: right; padding: 20px;">
        <el-pagination
          :current-page="listQuery.page"
          :page-size="listQuery.pageSize"
          :total="count"
          layout="total, prev, pager, next"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        ></el-pagination>
      </div>
    </div>
    <memberBox :visible="isMask" @close="isMask = false" @goPay="handlePay" :phone="phone" :data="memberData" @change="payInfo"></memberBox>
  
    <div class="agent-member-dialog">
      <el-dialog
        :visible.sync="dialogVisible"
        width="500px"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :show-close="false"
      >
        <div class="container">
          <div class="tips">
            <div class="left">
              <img :src="success" alt="">
            </div>
            <div class="right">
              <span>您的支付订单已创建，请在新打开的页面完成支付操作</span>
            </div>
          </div>
          <div class="btn-box">
            <el-button
              style="margin-right: 25px;"
              type="danger"
              @click="handlePayComplete(payType)"
            >支付完成</el-button>
            <el-button @click="handlePayFail(payType)">支付失败</el-button>
          </div>
          <div class="text">如果支付遇到问题，您可以联系客服</div>
        </div>
      </el-dialog>
    </div>
    <div class="dialog-customer">
      <el-dialog
        :visible.sync="dialogSuccessVisible"
        width="500px"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :show-close="false"
      >
        <div class="container">
          <div class="tips">
            <img :src="warning" alt="">
            <span>错误</span>
          </div>
          <div class="text">
            未查询到您的支付信息，请您
            <span @click="reviewPay(payType)">重新支付</span>或联系客服
          </div>
        </div>
        <span slot="footer">
          <el-button type="danger" @click="handleConfirmPay(payType)">确 认</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import success from "../../../assets/success.png";
import warning from "../../../assets/warning.png";
import api from "../../api/filterData.js";
import getListApi from "../../api/index.js";
import { mapState, mapMutations } from "vuex";
import emptyList from '@/assets/empty-list2.png'
import memberBox from '@/component/memberBox'
import { checkAliPayRusult, createAliPayOrderSn, getMemberDatas, reviewAliPay } from '@/util/pay.alipay'
import { getQrCodes, checkWxPayRusult, reviewWxPay } from '@/util/pay.wxpay'
export default {
  name: "agentResource",
  components: {
    memberBox
  },
  data() {
    return {
      emptyList,
      success,
      warning,
      dialogVisible: false,
      dialogSuccessVisible: false,
      props: {
        value: "id",
        label: "label",
        children: "citys"
      },
      listQuery: {
        page: 1,
        pageSize: 10,
        brokerId: "", // 经纪人ID
        fAddress: "",
        fLoanAmount: "",
        fBusinessType: "",
        fIsPawn: "",
        fAge: "",
        fJob: "",
        fIncome: "",
        fIsPawn: "", // 有无抵押
        fPawnKey: "" // 抵押物
      },
      fPawnKey: "",
      listLoading: true,
      checked: true,
      isMask: false,
      tableData: [],
      page: 1,
      size: 10,
      count: 1,
      payType: "",
      weiLu: "",
      order: "",
      money: "",
      cityList: [],
      moneyList: null,
      typeList: null,
      loanTypeList: null,
      ageList: null,
      jobList: null,
      incomeList: null,
      isPawnList: null,
      pawnList: null,
      timer: null,
      orderSn: '',
      phone: '',
      isVip: false,
      memberData: [],
      vipType: '',
      month: '',
      params: {
        phone: '',
        vipType: '',
        month: '',
        businessType: 0
      }
    };
  },
  created() {
    this.getData();
    this.getFilterData();
    if (this.$store.state.userInfo) {
      this.isVip = this.$store.state.userInfo.vip > 0
      this.phone = this.$store.state.userInfo.phone
    }
  },
  computed: {
    ...mapState(["userInfo"])
  },
  methods: {
    ...mapMutations(["SET_USER_VIP"]),
    //资源中心列表
    getData() {
      this.listLoading = true;
      let data = {
        brokerId: this.$store.state.userInfo.id
      };
      for (var item in this.listQuery) {
        if (this.listQuery[item]) {
          data[item] = this.listQuery[item];
        }
      }
      getListApi.getPageBorrowerByBrokerIdUnPaid(data).then(res => {
        // 未付费资源
        this.listLoading = false;
        this.tableData = res.data.rows;
        this.count = res.data.total;
        window.scrollTo(0, 0);
      });
    },
    handleCity(val) {
      if (val.length === 1) {
        this.listQuery.fAddress = val.toString();
        api.getCity(val[0]).then(res => {
          const data = res.data;
          let arr = [];
          for (let i = 0; i < data.length; i++) {
            let obj = {};
            obj["id"] = data[i]["cid"];
            obj["label"] = data[i]["city"];
            arr.push(obj);
          }
          for (let i = 0; i < this.cityList.length; i++) {
            if (this.cityList[i].id === val[0]) {
              this.cityList[i].citys = arr;
            }
          }
        });
      } else if (val.length === 2) {
        this.listQuery.fAddress = val.toString();
      } else {
        this.listQuery.fAddress = "";
      }
    },
    handleItemChange(val) {
      api.getCity(val[0]).then(res => {
        const data = res.data;
        let arr = [];
        for (let i = 0; i < data.length; i++) {
          let obj = {};
          obj["id"] = data[i]["cid"];
          obj["label"] = data[i]["city"];
          arr.push(obj);
        }
        for (let i = 0; i < this.cityList.length; i++) {
          if (this.cityList[i].id === val[0]) {
            this.cityList[i].citys = arr;
          }
        }
      });
    },
    getFilterData() {
      api.getProvice().then(response => {
        const data = response.data;
        for (let i = 0; i < data.length; i++) {
          let obj = {};
          obj["id"] = data[i]["pid"];
          obj["label"] = data[i]["provincial"];
          obj["citys"] = [];
          this.cityList.push(obj);
        }
      });
      api.getMoney().then(response => {
        this.moneyList = response.data;
      });
      api.getType().then(response => {
        this.typeList = response.data;
      });
      api.getAllAgeArea().then(response => {
        this.ageList = response.data;
      });
      api.getJob().then(response => {
        this.jobList = response.data;
      });
      api.getIncome().then(response => {
        this.incomeList = response.data;
      });
      api.getAllIsPawn().then(response => {
        this.isPawnList = response.data;
      });
      api.getAllPawn().then(response => {
        this.pawnList = response.data;
      });
    },
    handleFilter() {
      this.listQuery.page = 1;
      this.getData();
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.getData();
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val;
      this.getData();
    },
    choosePawn(val) {
      this.listQuery.fPawnKey = val.join(",");
    },
    getMemberDatas() {
      this.memberData = []
      getMemberDatas(0, this.phone, (res) => {
        for (let key in res.data) {
          this.memberData.push(res.data[key])
        }
      })
    },
    //加入资源
    joinResource(id) {
      let data = new FormData();
      data.append("borrowerId", id);
      data.append("brokerId", this.$store.state.userInfo.id);
      this.$axios.post(`brokerResource/saveBrokerResource`, data).then(res => {
        if (res.status === 200) {
          this.$message.success("成功加入付费资源");
          this.getData();
          this.listLoading = false;
          this.$router.push(`/userDetail?type=1&borId=${id}`);
        } else if (res.status === 205) {
          if (this.isVip) {
            this.$alert('您今日查看手机号次数已经用完，请明日再进行查看，或者前往会员中心升级权益。', '提示', {
              confirmButtonText: '确定',
              type: 'warning'
            });
          } else {
            this.isMask = true;
            this.getMemberDatas()
          }
        } else {
          this.$message.warning(res.msg);
        }
      });
    },
    payInfo(val) {
      if (val) {
        this.vipType = val.vid
        this.month = val.month
      } else {
        this.vipType = ''
        this.month = ''
      }
    },
    handlePay(val) { // 去支付
      // val.payType 1 weixin 2 alipay
      if (val.checked) {
        if (val.nowInd && val.payType) {
          this.payType = val.payType
          this.params = {
            phone: this.phone,
            vipType: this.vipType,
            month: this.month,
            businessType: 0
          }
          if (val.payType === 2) {
            this.aliPay(this.params)
          } else {
            this.wxPay(this.params)
          }
        } else {
          this.$message.warning("请选择要开通的会员和支付方式");
        }
      } else {
        this.$message.warning("需同意《服务条款》");
      }
    },
    aliPay(params) {
      createAliPayOrderSn(params, res => {
        this.dialogVisible = true
        this.orderSn = res.request.response
      })
    },
    wxPay(params) {
      getQrCodes(params, res => {
        this.dialogVisible = true
        this.orderSn = res.data.data.out_trade_no
      })
    },
    handleSuccessDialog(msg) {
      this.$message.success(msg);
      this.dialogVisible = false;
      this.dialogSuccessVisible = false;
      this.isMask = false
      this.SET_USER_VIP(this.vipType)
    },
    handleFailDialog(msg) {
      this.$message.warning(msg);
      this.dialogVisible = false;
      this.dialogSuccessVisible = true;
    },
    checkAliPay(msg) {
      checkAliPayRusult(this.orderSn, res => {
        this.handleSuccessDialog(res.data.msg)
      }, res => {
        this.handleFailDialog(res.data.msg)
      })
    },
    checkWxPay() {
      checkWxPayRusult(this.orderSn, res => {
        this.handleSuccessDialog(res.data.msg)
      }, res => {
        this.handleFailDialog(res.data.msg)
      })
    },
    handlePayComplete(val) {
      if (val === 1) {
        this.checkWxPay()
      } else {
        this.checkAliPay()
      }
    },
    reviewPay(val) {
      if (this.payType == 2) {
        reviewAliPay(this.orderSn, this.params)
      } else {
        reviewWxPay(this.orderSn, this.params)
      }
      this.dialogSuccessVisible = false;
      this.dialogVisible = true;
    },
    handlePayFail() {
      this.handleConfirmPay()
    },
    handleConfirmPay() {
      this.dialogSuccessVisible = false;
      this.dialogVisible = false;
      this.isMask = false
    }
  }
};
</script>

<style scoped lang="scss">
.w400 {
  width: 250px;
  height: 62px;
  margin: 0 auto;
}
.ml60 {
  margin-left: 60px;
}
.resource {
  width: 944px;
  height: 648px;
  background: rgba(255, 255, 255, 1);
  .title {
    width: 100%;
    height: 66px;
    padding-left: 56px;
    box-sizing: border-box;
    font-size: 16px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(81, 81, 81, 1);
    line-height: 66px;
  }
  .table {
    min-height: 500px;
    .loans-pro {
      padding: 0 38px;
      box-sizing: border-box;
      background: rgba(255, 255, 255, 1);
      .loans-header {
        width: 866px;
        height: 40px;
        background: rgba(250, 250, 250, 1);
        .header-same {
          text-align: center;
          width: 173px;
          height: 14px;
          font-size: 14px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: rgba(155, 155, 155, 1);
          line-height: 40px;
        }
      }

      .loans-pro-item {
        height: 52px;
        border-bottom: 1px solid #f0f0f0;
        .pro-item-same {
          font-size: 14px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: rgba(81, 81, 81, 1);
          width: 173px;
          line-height: 52px;
          height: 52px;
          text-align: center;
          overflow: hideen;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        &:hover .operate {
          width: 80px;
          height: 32px;
          background: rgba(168, 14, 14, 1);
          border-radius: 4px;
          background: rgba(168, 14, 14, 1);
          color: rgba(255, 255, 255, 1);
          margin-top: 10px;
          line-height: 32px;
          margin-left: 50px;
          cursor: pointer;
        }
      }
    }
  }
}
.mask {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: #000;
  opacity: 0.7;
}
.contain-resource {
  position: fixed;
  left: 50%;
  top: 10%;
  transform: translateX(-50%);
  width: 694px;
  height: 496px;
  background: rgba(249, 249, 249, 1);
  border-radius: 4px;
  z-index: 999;
  .res-title {
    text-align: center;
    width: 694px;
    height: 60px;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 1) 0%,
      rgba(247, 247, 247, 1) 57%,
      rgba(238, 238, 238, 1) 100%
    );
    .text1-vip {
      font-size: 16px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(208, 172, 86, 1);
      line-height: 60px;
    }
    .agree-fw {
      font-size: 10px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(155, 155, 155, 1);
      line-height: 60px;
    }
  }
  .res-main {
    width: 694px;
    height: 435px;
    background: rgba(249, 249, 249, 1);
    padding: 29px 90px 0 90px;
    box-sizing: border-box;
    .vip_radio:checked + .money-item {
      box-shadow: 0px 4px 8px 0px rgba(208, 172, 86, 0.4);
      border: 1px solid rgba(208, 172, 86, 1);
    }
    .vip_radio:checked + .money-item::after {
      position: absolute;
      content: "";
      width: 0;
      height: 0;
      top: 0;
      right: 0;
      color: #ffffff;
      border: 13px solid rgba(208, 172, 86, 1);
      border-bottom-color: transparent;
      border-left-color: transparent;
    }
    .vip_radio:checked + .money-item::before {
      position: absolute;
      content: "";
      width: 4px;
      height: 4px;
      top: 1px;
      right: 3px;
      z-index: 998;
      border: 2px solid #fff;
      border-top-color: transparent;
      border-left-color: transparent;
      transform: rotate(45deg);
    }
    .kait {
      height: 14px;
      font-size: 14px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(81, 81, 81, 1);
      line-height: 14px;
      margin-bottom: 16px;
    }
    .money-item {
      position: relative;
      width: 130px;
      height: 150px;
      background: rgba(255, 255, 255, 1);
      border: 1px solid rgba(217, 217, 217, 1);
      padding: 54px 0 14px 0;
      box-sizing: border-box;
      text-align: center;
      cursor: pointer;
      .money {
        height: 55px;
        font-size: 24px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(81, 81, 81, 1);
        border-bottom: 1px dashed #f0f0f0;
      }
      .times {
        margin-top: 10px;
        height: 14px;
        font-size: 14px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(81, 81, 81, 1);
        line-height: 14px;
      }
    }
    .zf {
      width: 56px;
      height: 14px;
      font-size: 14px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(81, 81, 81, 1);
      line-height: 14px;
      margin-top: 32px;
      margin-bottom: 24px;
    }
    .con-zf {
      width: 360px;
      height: 60px;
      margin: 0 auto;
      .pay {
        display: none;
      }
      .pay:checked + .pay_type {
        box-shadow: 0px 4px 8px 0px rgba(208, 172, 86, 0.4);
        border-radius: 4px;
        border: 1px solid rgba(208, 172, 86, 1);
      }
      .pay:checked + .pay_type::after {
        position: absolute;
        content: "";
        top: -8px;
        right: -8px;
        width: 16px;
        height: 16px;
        background: #fff;
        border-radius: 50%;
        border: 1px solid rgba(208, 172, 86, 1);
      }
      .pay:checked + .pay_type::before {
        position: absolute;
        content: "";
        top: -5px;
        right: -2px;
        z-index: 998;
        width: 4px;
        height: 6px;
        border: 1px solid rgba(208, 172, 86, 1);
        border-top-color: transparent;
        border-left-color: transparent;
        transform: rotate(45deg);
      }
      .pay_type {
        position: relative;
      }
      .zf-left,
      .zf-right {
        position: relative;
        cursor: pointer;
        padding: 12px 26px;
        width: 140px;
        box-sizing: border-box;
        height: 56px;
        background: rgba(255, 255, 255, 1);
        border-radius: 4px;
        border: 1px solid rgba(217, 217, 217, 1);
      }
      .zf-active {
        position: absolute;
        border: 1px solid rgba(208, 172, 86, 1);
        box-shadow: 0px 4px 8px 0px rgba(208, 172, 86, 0.4);
      }
    }
    .zf-btn {
      cursor: pointer;
      width: 100px;
      height: 40px;
      background: rgba(208, 172, 86, 1);
      font-size: 14px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: 40px;
      letter-spacing: 1px;
      text-align: center;
      margin: 30px auto;
    }
  }
}

.agent-member-dialog {
  .container {
    padding-right: 60px;
    padding-left: 40px;
    .tips {
      overflow: hidden;
      .left,
      .right {
        float: left;
      }
      .right {
        margin-left: 20px;
        width: 300px;
        font-size: 16px;
        font-weight: 600;
        span {
          vertical-align: middle;
        }
      }
      img {
        width: 25px;
      }
    }
    .btn-box {
      margin: 20px 45px 30px;
    }
    .text {
      font-size: 14px;
      color: #999;
      padding-left: 60px;
    }
    .info {
      padding-left: 44px;
      font-size: 16px;
      color: #999;
    }
  }
}
.dialog-customer {
  .container {
    padding: 0 30px;
    .tips {
      img {
        width: 25px;
        vertical-align: middle;
        margin-right: 10px;
      }
      span {
        vertical-align: middle;
        display: inline-block;
        font-size: 18px;
        font-weight: 600;
      }
    }
    .text {
      padding-left: 40px;
      margin-top: 10px;
      font-size: 16px;
      span {
        color: #a80e0e;
        cursor: pointer;
      }
    }
  }
}
</style>

