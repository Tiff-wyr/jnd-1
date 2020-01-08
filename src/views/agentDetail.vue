<template>
  <div>
    <div class="wrappy">
      <div class="w1200">
        <div class="person clearfix mb30">
          <img
            v-if="agentDetail.image"
            :src="agentDetail.image"
            alt=""
            class="fll"
            style="width: 120px;height: 120px"
          >
          <img
            v-else
            src="/static/resource/pic/agent.png"
            alt=""
            class="fll"
            style="width: 120px;height: 120px"
          >
          <div class="fll">
            <div class="clearfix">
              <div class="fll" style="margin-left: 14px">
                <div class="clearfix">
                  <div class="name fll">{{ agentDetail.brokerName }}</div>
                  <!-- <img src="../../static/resource/agent/vip.png" alt=""> -->
                </div>

                <div class="desc">{{ agentDetail.introduction }}</div>
              </div>
              <div class="agent-detail clearfix fll">
                <div class="fll">
                  <div class="clearfix">
                    <div class="fll align">
                      <div class="num">{{ agentDetail.workingYears }}</div>
                      <div class="clearfix mt16">
                        <img src="../../static/resource/agent/1.png" alt="" class="fll">
                        <div class="num-text fll">从业年限</div>
                      </div>
                    </div>
                    <div class="fll align ml20">
                      <div class="num">{{ agentDetail.serveClientTotal }}</div>
                      <div class="clearfix mt16">
                        <img src="../../static/resource/agent/2.png" alt="" class="fll">
                        <div class="num-text fll">服务客户</div>
                      </div>
                    </div>
                    <div class="fll align ml20">
                      <div class="num">{{ agentDetail.batchLoanTotal }}</div>
                      <div class="clearfix mt16">
                        <img src="../../static/resource/agent/3.png" alt="" class="fll">
                        <div class="num-text fll">批贷总额</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div style="margin-left: 20px" class="clearfix fll">
                  <img src="../../static/resource/agent/tel.png" alt="" class="fll" style="width: 56px;height: 47px">
                  <div class="fll">
                    <div class="text1">电话咨询贷款，最快捷，最方便！</div>
                    <div class="text2">{{ agentDetail.phone | phoneFilter }}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="clearfix">
              <div class="clearfix fll ml20" style="margin-top: 16px;">
                <img src="../assets/message.png" alt="" class="fll" style="width: 20px;height: 20px;vertical-align: middle; margin-right: 10px;">
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
              <div class="title">9能金科网诚信认证</div>
              <div class="content-agent">
                <div class="name">姓名：{{ agentDetail.brokerName }}</div>
                <div class="clearfix name-same">
                  <div
                    class="name fll"
                    style="height: 18px;line-height: 18px;border-bottom-color:transparent"
                  >推荐指数：</div>
                  <div class="fll">
                    <el-rate v-model="agentDetail.recommended" disabled text-color="#ff9900" style="margin-top: 8px;"/>
                  </div>
                </div>
                <div class="name">擅长业务：<br><span v-for="item in agentDetail.businessScopeInfo" :key="item" class="tag">{{ item }}</span></div>
                <div class="name">所在地区：{{ agentDetail.address }}</div>
                <div class="name">所属公司：{{ agentDetail.company }}</div>
                <div class="desc-title">个人简介：</div>
                <div class="desc">{{ agentDetail.introduction }}</div>
              </div>
            </div>
            <div v-if="loanData.length > 0" class="bottom">
              <div class="title">成功案例</div>
              <div v-for="(item,index) in loanData" :key="index" class="content-item-victory">
                <span class="name">{{ item.name }}</span>
                <span class="money">贷款金额：{{ item.loanAmount }}</span>
              </div>
            </div>
          </div>
          <div class="fll">
            <div class="top-form">
              <apply :options="options" :phone="this.$store.state.userInfo ? this.$store.state.userInfo.phone : ''"/>
            </div>
            <div class="bottom-form">
              <div v-for="(item,index) in productTableData" :key="index" class="clearfix main-form">
                <div class="fll w180">
                  <div class="item1-num">{{ item.loanName }}</div>
                  <div class="item-same">无需抵车即可贷款</div>
                </div>
                <div class="item1 fll align w180">
                  <div class="item-num">{{ item.rate }}</div>
                  <div class="item-same">利息</div>
                </div>
                <div class="item1 fll align w180">
                  <div class="item-num">最快{{ item.loanTime }}天内到账</div>
                  <div class="item-same">放款时间</div>
                </div>
                <div class="item1 fll align w180">
                  <div class="item-num">贷款期限最长达{{ item.loanTerm }}年</div>
                  <div class="item-same">使用年限</div>
                </div>
                <div class="item1 fll w180" style="text-align: right">
                  <div class="item-num">最高可贷{{ item.loanAmount }}万</div>
                  <div class="item-same">最高额度</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <footerSame/>
      </div>
    </div>
  </div>
</template>

<script>
import apply from '@/component/apply'
import footerSame from '@/component/footerSame'
import { formatPhone } from '@/util/util'
import { fetchSuccessList } from '@/api/agent'
export default {
  name: 'AgentDetail',
  metaInfo: {
    title: '9能金科款_贷款申请_申请贷款100%下款_个人贷款申请找9能金科款',
    meta: [{
      name: 'keyWords',
      content: '助学贷款申请,贷款申请,申请贷款,助学贷款申请表,信用贷款申请,公积金贷款申请,个人贷款申请书,个人贷款申请,企业贷款申请书,贷款卡申请书,公司贷款申请书范文,大学生创业贷款申请,银行申请贷款,申请公积金贷款,申请贷款表,贷款申请表,银行贷款申请,个人申请贷款,贷款申请条件,申请创业贷款,公司贷款申请,小额贷款申请,申请小额贷款,装修贷款申请,企业贷款申请,网上申请贷款'
    }, {
      name: 'description',
      content: '9能金科款联合各类大型的金融机构,深度挖掘安全的金融服务渠道机构,为用户提供安全、多元的贷款产品和定制化的专业资金服务,打造更契合用户自身需求的贷款管理方案.找贷款,找信贷经理,找机构,办理贷款上9能金科款;放款快,利率低0.35%,额度高,门槛低,渠道广.怎样申请助学贷款,如何申请助学贷款,助学贷款怎么申请,怎样申请小额贷款,怎样写贷款申请书,如何向银行申请贷款,如何申请创业贷款'
    }]
  },
  components: {
    footerSame,
    apply
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
    return {
      isCollect: true,
      loanData: [],
      productTableData: [],
      agentDetail: {},
      agentId: ''
    }
  },
  computed: {
    options() {
      return {
        key: 'brokerId',
        value: this.agentId
      }
    }
  },
  created() {
    const id = this.$route.query.id
    this.agentId = id
    this.getAgentData(id)
    this.getVictory(id)
    this.getProductData(id)
    this.skimRecord()
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
            query: { id: this.agentId, roleId: 2 }
          })
        } else {
          this.$message.warning('借款人方可发送信息')
        }
      } else {
        this.$message.warning('请先登录')
      }
    },
    // 信贷经理详情
    getAgentData(id) {
      this.$axios.get(`userBroker/getUserBrokerById/${id}`).then(res => {
        res.businessScopeInfo = res.businessScopeInfo.split(',')
        this.agentDetail = Object.assign({}, res)
      })
    },
    // 信贷经理成功案例
    getVictory(id) {
      fetchSuccessList(id).then(res => {
        this.loanData = res.data.map(item => {
          const sex = item.sexValue === '男' ? '先生' : '女士'
          item.name = `${item.borrowerName.substr(0, 1)}${sex}`
          return item
        })
      })
    },
    // 信贷经理贷款产品
    getProductData(id) {
      this.$axios.get(`loanInfo/getAllLoanInfoByBrokerId/${id}`).then(res => {
        this.productTableData = res
      })
    },
    // 收藏经纪
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
    // 取消经纪
    cancelRestore() {
      this.$axios
        .get(
          `borrowerKeep/removeBorrowerKeepById/${
            this.$store.state.userInfo.id
          }/${this.agentId}`
        )
        .then(res => {
          this.isCollect = true
          this.$message.success('取消收藏')
        })
    },
    // 保存信贷经理被贷款人浏览记录
    skimRecord() {
      if (this.$store.state.userInfo) {
        if (this.$store.state.userInfo.roleId === 1) {
          this.$axios
            .get(
              `brokerBrowsedRecord/saveRecord/${this.agentId}/${
                this.$store.state.userInfo.id
              }`
            )
            .then(res => {})
        } else {
          return
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
              this.isCollect = true
            } else {
              this.isCollect = false
            }
          })
      }
    }
  }
}
</script>
<style scoped lang="scss">
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
