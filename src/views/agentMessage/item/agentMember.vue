<template>
  <div class="jnd-container">
    <activityBox :visible="activityVisble" :phone="phone" @close="handleCloseAvtivity" @useMember="useMember"/>
    <div class="top">
      <div class="member-info">
        <div :class="{'member0': vipLevel == 0, 'member1': vipLevel == 1, 'member2': vipLevel == 2, 'member3': vipLevel == 3, }" class="left">
          <p class="user">{{ userIdentity | levelFilter }}{{ phone | phoneFilter }}</p>
          <span v-if="vipLevel == 0" class="dredge" @click="handleDredge">开通会员</span>
          <template v-else>
            <p class="time">{{ memberData.closeVipTime | closeVipTimeFilter }}</p>
            <span v-if="vipLevel !== 3" class="itme upgrade" @click="handleUpGrade">升级</span><span class="itme" @click="handleRenew">续费</span>
          </template>
          <span class="dredge" @click="handlePayOnce">购买单次</span>
        </div>
        <div class="right"/>
      </div>
    </div>
    <div class="member-system">
      <div class="title-container">
        <p class="member-title lr-lines">会员等级</p>
        <p class="tips">多种选择 定制化会员</p>
      </div>
      <div class="member-container">
        <div v-for="item in memberData.vipLevel" :class="{'member0': item.vid == 0, 'member1': item.vid == 1, 'member2': item.vid == 2, 'member3': item.vid == 3, }" :key="item.vid" class="item">
          <div class="title"><i class="logo"/>9能金科</div>
          <div class="container">{{ item.vipName }}</div>
          <div class="price">￥{{ item.price }}</div>
          <img :src="item.vid === 3 ? cNum : oNum" alt="">
          <img v-if="item.vid === 3" :src="tyM3" class="projection" alt="">
          <img v-if="item.vid === 2" :src="tyM2" class="projection" alt="">
          <img v-if="item.vid === 1" :src="tyM1" class="projection" alt="">
          <img v-if="item.vid === 0" :src="tyM0" class="projection" alt="">
        </div>
      </div>
    </div>

    <div class="member-privilege">
      <div class="title-container">
        <p class="member-title lr-lines">会员特权</p>
        <p class="tips">专享尊贵权益</p>
      </div>
      <div class="member-privilege-container">
        <ul class="member-list">
          <li class="list-header"><span>功能特权</span><span v-for="item in memberData.vipAdvantage" :key="item.vipName">{{ item.vipName }}</span></li>

          <li><span>电话数量(/天)</span><span v-for="(item, index) in memberData.vipAdvantage" :key="index" :class="{ 'noVip': !item.phoneNum }">{{ item.phoneNum ? item.phoneNum : '×' }}</span></li>

          <li><span>沟通数量(/天)</span><span v-for="(item, index) in memberData.vipAdvantage" :key="index" :class="{ 'noVip': !item.freeChatNum }">{{ item.freeChatNum ? item.freeChatNum : '×' }}</span></li>

          <li class="tips"><span>短信提醒</span><span v-for="(item, index) in memberData.vipAdvantage" :key="index"><i :class="{'vip': item.msgRemind, 'noVip': !item.msgRemind}">{{ item.msgRemind ? '' : '×' }}</i></span></li>

          <li class="tips"><span>特权标志</span><span v-for="(item, index) in memberData.vipAdvantage" :key="index"><i :class="{'vip': item.sign, 'noVip': !item.sign}">{{ item.sign ? '' : '×' }}</i></span></li>
        </ul>
        <p class="hint-info">短信提醒：离线状态下更加快捷便利的了解到贷款人的消息。</p>
        <p class="hint-info">沟通数量：与贷款人随时随地的聊天。</p>
        <p class="hint-info">电话数量：获取平台第一手资源。</p>
      </div>
    </div>
    <memberBox :visible="isMask" :phone="phone" :data="memberDataList" @close="isMask = false" @goPay="handlePay" @change="payInfo"/>
    <payTypeBox :visible="payTypeMask" @close="payTypeMask = false" @goPay="handleGoPayOnce"/>

    <div class="agent-member-dialog">
      <el-dialog
        :visible.sync="dialogVisible"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :show-close="false"
        width="500px"
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
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :show-close="false"
        width="500px"
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
import success from '../../../assets/success.png'
import warning from '../../../assets/warning.png'
import cNum from '../../../../static/resource/vip/c-num.png'
import oNum from '../../../../static/resource/vip/other-num.png'
import tyM0 from '../../../../static/resource/vip/ty-member0.png'
import tyM1 from '../../../../static/resource/vip/ty-member1.png'
import tyM2 from '../../../../static/resource/vip/ty-member2.png'
import tyM3 from '../../../../static/resource/vip/ty-member3.png'
import { mapState, mapMutations } from 'vuex'
import { getMember } from '@/api/pay.alipay'
import { formatPhone } from '@/util/util'
import memberBox from '@/component/memberBox'
import payTypeBox from '@/component/payTypeBox'
import { checkAliPayRusult, createAliPayOrderSn, getMemberDatas, reviewAliPay } from '@/util/pay.alipay'
import { getQrCodes, checkWxPayRusult, reviewWxPay } from '@/util/pay.wxpay'
import activityBox from '@/component/activityBox'
import { getGetStatus } from '@/api/activity'
export default {
  name: 'AgentMember',
  components: {
    activityBox,
    memberBox,
    payTypeBox
  },
  filters: {
    phoneFilter(val) {
      return formatPhone(val)
    },
    closeVipTimeFilter(val) {
      return val + '到期'
    },
    levelFilter(val) {
      const levelMap = {
        0: '用户',
        1: '会员',
        2: '高级会员',
        3: '超级会员'
      }
      return levelMap[val]
    }
  },
  data() {
    return {
      cNum,
      oNum,
      tyM0,
      tyM1,
      tyM2,
      tyM3,
      success,
      warning,
      vipLevel: 0,
      phone: '',
      memberData: {},
      isMask: false,
      payTypeMask: false,
      params: {},
      memberDataList: [],
      dialogVisible: false,
      dialogSuccessVisible: false,
      payType: '',
      vipType: '',
      month: '',
      businessType: 0,
      activityVisble: false
    }
  },
  computed: {
    ...mapState(['userInfo', 'isPay']),
    userIdentity() {
      return this.$store.state.userInfo.vip
    }
  },
  watch: {
    isPay(val, oldVal) {
      if (val.isPay) {
        this.dialogVisible = true
      }
    },
    userIdentity(val) {
      this.vipLevel = val
    }
  },
  created() {
    if (this.$store.state.userInfo) {
      this.vipLevel = this.$store.state.userInfo.vip
      this.phone = this.$store.state.userInfo.phone
      this.getMember()
    }
    this.getStatus()
  },
  methods: {
    ...mapMutations(['SET_USER_VIP']),
    getStatus() {
      getGetStatus(this.phone).then(res => {
        if (res.data.status === 200) {
          this.activityVisble = true
        }
      })
    },
    useMember() {
      this.activityVisble = false
      this.SET_USER_VIP(1)
      this.vipLevel = 1
      this.getMember()
    },
    handleCloseAvtivity() {
      this.activityVisble = false
    },
    getMember() {
      getMember(this.phone).then(res => {
        this.memberData = res.data
      })
    },
    getMemberDatas(businessType) {
      getMemberDatas(businessType, this.phone, (res) => {
        for (const key in res.data) {
          this.memberDataList.push(res.data[key])
        }
      })
    },
    handleDredge() { // 开通会员
      this.memberDataList = []
      this.businessType = 0
      this.getMemberDatas(0)
      this.isMask = true
    },
    handleUpGrade() { // 升级会员
      this.memberDataList = []
      this.businessType = 2
      this.getMemberDatas(2)
      this.isMask = true
    },
    handleRenew() { // 续费会员
      this.memberDataList = []
      this.businessType = 1
      this.getMemberDatas(1)
      this.isMask = true
    },
    handlePayOnce() { // 购买单次
      this.businessType = 3
      this.payTypeMask = true
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
    handleGoPayOnce(val) {
      if (val.checked) {
        if (val.payType) {
          this.payType = val.payType
          this.params = {
            phone: this.phone,
            vipType: 0,
            month: 0,
            businessType: 3
          }
          if (val.payType === 2) {
            delete this.params.month
            this.aliPay(this.params)
          } else {
            this.wxPay(this.params)
          }
        } else {
          this.$message.warning('请选择支付方式')
        }
      } else {
        this.$message.warning('需同意《服务条款》')
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
            businessType: this.businessType
          }
          if (this.businessType === 2) {
            this.params.upVipType = val.vipLevel
            this.params.vipType = this.vipLevel
          }
          if (val.payType === 2) {
            this.aliPay(this.params)
          } else {
            this.wxPay(this.params)
          }
        } else {
          this.$message.warning('请选择要开通的会员和支付方式')
        }
      } else {
        this.$message.warning('需同意《服务条款》')
      }
    },
    handleSuccessDialog(msg) {
      this.$message.success(msg)
      this.dialogVisible = false
      this.dialogSuccessVisible = false
      this.isMask = false
      this.payTypeMask = false
      if (this.businessType !== 3) {
        this.SET_USER_VIP(this.vipType)
        this.vipLevel = this.vipType
      }
      this.getMember()
    },
    handleFailDialog(msg) {
      this.$message.warning(msg)
      this.dialogVisible = false
      this.dialogSuccessVisible = true
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
      this.getMember()
    },
    reviewPay(val) {
      // eslint-disable-next-line eqeqeq
      if (this.payType == 2) {
        reviewAliPay(this.orderSn, this.params)
      } else {
        reviewWxPay(this.orderSn, this.params)
      }
      this.dialogSuccessVisible = false
      this.dialogVisible = true
    },
    handlePayFail() {
      this.handlePayComplete()
      this.dialogSuccessVisible = false
      this.dialogVisible = false
      this.isMask = false
      this.payTypeMask = false
    },
    handleConfirmPay() {
      this.dialogSuccessVisible = false
      this.dialogVisible = false
      this.isMask = false
      this.payTypeMask = false
      this.getMember()
    }
  }
}
</script>
<style lang="scss">
.agent-member-dialog .el-dialog__body {
  padding: 30px 20px 10px;
}
</style>
<style scoped lang="scss">
.lr-lines {
  position: relative;
  &::before, &::after {
    display: block;
    content: ' ';
    position: absolute;
    width:212px;
    height:2px;
    background:linear-gradient(90deg,rgba(241,215,153,0) 0%,rgba(229,197,125,1) 59%,rgba(206,162,72,1) 100%);
  }
  &::before {
    left: 180px;
    top: 50%;
    margin-top: -1px;
  }
  &::after {
    right: 190px;
    top: 50%;
    margin-top: -1px;
    transform: rotate(180deg);
  }
}
.title-container {
  text-align: center;
  .member-title {
    font-size: 20px;
    letter-spacing: 10px;
  }
  .tips {
    font-size: 12px;
    color: #9B9B9B;
    font-weight:300;
  }
}

.jnd-container {
  width: 944px;
  background: #fff;
  color: #515151;
  .top {
    height: 349px;
    background-image: url("../../../../static/resource/vip/memberBg.png");
    .member-info {
      height: 137px;
      width: 552px;
      margin: 0 auto;
      overflow: hidden;
      transform: translateY(56px);
      text-align: center;
      .left {
        width: 164px;
        height: 100%;
        float: left;
        color: #fff;
        &.member0 {
          background: url("../../../../static/resource/vip/m0.png");
          .dredge {
            color: #ED6450;
          }
        }
        &.member1 {
          background: url("../../../../static/resource/vip/m1.png");
          .user {
            margin-bottom: 4px;
          }
          .upgrade, .dredge {
            color: #E7C882;
          }
        }
        &.member2 {
          background: url("../../../../static/resource/vip/m2.png");
          .upgrade, .dredge {
            color: #D29C7E;
          }
        }
        &.member3 {
          background: url("../../../../static/resource/vip/m3.png");
          .dredge {
            color: #FFAC37;
          }
        }
        .user {
          margin: 12px 0;
        }
        .time {
          font-size: 12px;
          font-weight:400;
          margin-bottom: 8px;
        }
        .dredge {
          display: block;
          width:92px;
          height:26px;
          line-height: 26px;
          margin: 12px auto;
          background: #fff;
          border-radius:14px;
          font-size: $jnd-font-size-base;
          cursor: pointer;
        }
        .itme {
          display: inline-block;
          width:44px;
          height: 16px;
          line-height: 16px;
          border-radius: 10px;
          border:1px solid #fff;
          font-size: 12px;
          margin: 0 5px;
          cursor: pointer;
          &.upgrade {
            background: #fff;
          }
        }
      }
      .right {
        float: right;
        width: 388px;
        height: 100%;
        background-image: url("../../../../static/resource/vip/memberBg2.png");
      }
    }
  }
  .member-system {
    margin-top: -110px;
    .member-container {
      padding: 0 80px 50px;
      overflow: hidden;
      margin: 50px 0 20px;
      .item {
        width:180px;
        height:112px;
        border-radius:6px;
        float: left;
        margin-right: 20px;
        position: relative;
        color: #fff;
        padding: 10px 12px;
        box-sizing: border-box;
        &:last-of-type {
          margin-right: 0;
        }
        &.member3 {
          background: linear-gradient(223deg,rgba(255,198,80,1) 0%,rgba(255,166,50,1) 59%,rgba(254,124,18,1) 100%);
        }
        &.member2 {
          background: linear-gradient(223deg,rgba(253,202,177,1) 0%,rgba(196,140,109,1) 59%,rgba(163,105,70,1) 100%);
        }
        &.member1 {
          background: linear-gradient(223deg,rgba(241,215,153,1) 0%,rgba(229,197,125,1) 59%,rgba(206,162,72,1) 100%);
        }
        &.member0 {
          background: linear-gradient(37deg,rgba(184,184,184,1) 0%,rgba(216,216,216,1) 100%);
        }
        .title {
          font-size: 12px;
        }
        .container {
          margin-top: 14px;
        }
        .price {
          margin-top: 16px;
          font-size: 12px;
          width:80px;
          height:22px;
          line-height: 22px;
          border: 1px solid #fff;
          border-radius: 12px;
          text-align: center;
        }
        img {
          position: absolute;
          right: 10px;
          bottom: 0;
        }
        .projection {
          bottom: -28px;
          left: 0;
          right: 0;
        }
      }
    }
  }
  .member-privilege {
    .title-container {
      margin-bottom: 30px;
    }
    .member-privilege-container {
      width: 720px;
      margin: 0 auto;
      padding-bottom: 50px;
      .member-list {
        li {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items:center;
          list-style: none;
          text-align: center;
          border-bottom: 1px solid #EBEBEB;
          border-left: 1px solid #EBEBEB;
          &.list-header {
            border-top: 1px solid #EBEBEB;
            span {
              font-size: 16px;
              padding: 12px 0;
            }
          }
          &:nth-of-type(even) {
            background: #FFEEC8;
          }
          span {
            display: inline-block;
            padding: 10px 0;
            font-size: 12px;
            color: #515151;
            flex-grow: 1;
            flex-basis: calc(100% / 6);
            border-right: 1px solid #EBEBEB;
            i {
              font-style: normal;
            }
            .vip {
              display: inline-block;
              width: 16px;
              height: 16px;
              background: #D0AC56;
              border-radius: 50%;
              text-align: center;
              &::after {
                display: inline-block;
                content: '';
                border: 2px solid #fff;
                border-left: 0;
                border-top: 0;
                height: 8px;
                -webkit-transform: rotate(45deg);
                transform: rotate(45deg);
                width: 3px;
              }
            }
          }
          .noVip {
            color: #A80E0E;
            font-size: 20px;
            font-weight: 600;
          }
        }
      }
      .hint-info {
        height:12px;
        font-size:12px;
        color: #9B9B9B;
        margin: 15px 0;
      }
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
