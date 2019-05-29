<template>
  <div>
    <div class="resource mb24">
      <div class="filter-container">
        <el-cascader
          class="filter-item filter-item-select"
          change-on-select
          :options="cityList"
          @change="handleCity"
          :props="props"
          clearable
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
            v-for="item in loanTypeList"
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
          v-show="listQuery.fIsPawn == 1"
          class="filter-item filter-item-select"
          v-model="Collateral"
          clearable
          multiple
          @change="handleCollateral"
          placeholder="请选择抵押物"
        >
          <el-option
            v-for="item in pawnList"
            :key="item.pawnId"
            :value="item.pawnId"
            :label="item.pawn"
            multiple
          ></el-option>
        </el-select>
        <el-button type="primary" @click="handleFilter">查 询</el-button>
      </div>
      <div class="title">资源中心</div>
      <div class="table-wrap">

      
      <el-table :data="tableData" v-loading="listLoading" element-loading-text="数据正在加载中..." element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.5)">
        <el-table-column label="贷款人" align="center" width="120px">
          <template slot-scope="scope">
            {{ scope.row.borrowerName }}
          </template>
        </el-table-column>
        <el-table-column label="注册地区" align="center">
          <template slot-scope="scope">
            {{ scope.row.address }}
          </template>
        </el-table-column>
        <el-table-column label="贷款金额" align="center">
          <template slot-scope="scope">
            {{ scope.row.loanAmountValue | moneyFilter }}
          </template>
        </el-table-column>
        <el-table-column label="手机号" align="center">
          <template slot-scope="scope">
            {{ scope.row.phone }}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="100px">
          <template slot-scope="scope">
            <div class="operate" @click="joinResource(scope.row.borrowerId)">立即查看</div>
          </template>
        </el-table-column>
      </el-table>
      </div>
    </div>
    <memberBox :visible="isMask" @close="isMask = false" @goPay="handlePay" :phone="phone" :data="memberData" @change="payInfo"></memberBox>
    <div style="text-align: right">
      <div class="page">
      <el-pagination
        background
        :current-page="listQuery.page"
        :page-size="listQuery.pageSize"
        :total="count"
        layout="total, prev, pager, next"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"/>
      </div>
    </div>
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
            <el-button @click="handlePayFail">支付失败</el-button>
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
          <el-button type="danger" @click="handleConfirmPay">确 认</el-button>
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
import { getResourceCenList } from '@/views/api/organ'
import memberBox from '@/component/memberBox'
import { checkAliPayRusult, createAliPayOrderSn, getMemberDatas, reviewAliPay } from '@/util/pay.alipay'
import { getQrCodes, checkWxPayRusult, reviewWxPay } from '@/util/pay.wxpay'
export default {
  name: "resourceCen",
  filters: {
    moneyFilter(val) {
      return val + '万'
    }
  },
  components: {
    memberBox
  },
  data() {
    return {
      success,
      warning,
      dialogVisible: false,
      dialogSuccessVisible: false,
      props: {
        value: "id",
        label: "label",
        children: "citys"
      },
      Collateral: "",
      listQuery: {
        agencyId: '',
        page: 1,
        pageSize: 10,
        fAddress: '',
        fLoanAmount: '',
        fBusinessType: '',
        fIsPawn: '',
        fAge: '',
        fJob: '',
        fIncome: '',
        fPawnKey: ''
      },
      listLoading: true,
      checked: true,
      isMask: false,
      isContain: false,
      tableData: [],
      count: 0,
      vipType: "",
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
      isVip: false,
      phone: '',
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
    this.getAllIsPawn()
    if (this.$store.state.userInfo) {
      this.isVip = this.$store.state.userInfo.vip > 0
      this.phone = this.$store.state.userInfo.phone
      this.listQuery.agencyId = this.$store.state.userInfo.id
    }
  },
  computed: {
    ...mapState(["userInfo"])
  },
  methods: {
    ...mapMutations(["SET_USER_VIP"]),
    getData() {
      this.listLoading = true;
      getResourceCenList(this.listQuery).then(res => {
        this.tableData = res.data.rows;
        this.count = res.data.total;
        this.listLoading = false;
        window.scrollTo(0, 0);
      })
    },
    getMemberDatas() {
      this.memberData = []
      getMemberDatas(0, this.phone, (res) => {
        for (let key in res.data) {
          this.memberData.push(res.data[key])
        }
      })
    },
    getAllIsPawn() {
      api.getAllIsPawn().then(response => {
        this.loanTypeList = response.data;
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
      api.getAllPawn().then(response => {
        this.pawnList = response.data;
      });
    },
    handleCity(val) {
      if (val.length == 1) {
        this.listQuery.fAddress = val[0];
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
      } else if (val.length == 2) {
        console.log(val, val.join(','))
        this.listQuery.fAddress = val.join(',')
      } else {
        this.listQuery.fAddress = "";
      }
    },
    handleFilter() {
      this.page = 1;
      this.getData()
    },
    handleCollateral(val) {
      // 选择抵押物
      this.listQuery.Collateral = val.join(",");
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.getData();
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val;
      this.getData();
    },
    //加入资源
    joinResource(id) {
      let data = new FormData();
      data.append("borId", id);
      data.append("agencyId", this.$store.state.userInfo.id);
      this.$axios.post(`agencyResource/addAgencyResource`, data).then(res => {
        if (res.status === 200) {
          this.$message.success("成功加入付费资源");
          this.$router.push(`/userDetail?type=1&borId=${id}`);
          this.getData();
          this.listLoading = false;
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
      createAliPayOrderSn(params, (res) => {
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
.table-wrap {
  padding: 10px 40px;
  .operate {
    width: 80px;
    height: 32px;
    border-radius: 4px;
    line-height: 32px;
    margin: 0 auto;
    cursor: pointer;
    &:hover {
      background: rgba(168, 14, 14, 1);
      color: rgba(255, 255, 255, 1);
    }
  }

}

.resource {
  width: 944px;
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
