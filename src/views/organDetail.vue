<template>
  <div>
    <div class="wrappy">
      <div class="w1200">
        <div class="person clearfix mb30">
          <img v-if="organDetail.agencyLogo" :src="organDetail.agencyLogo" alt="" class="fll" style="width: 120px;height: 120px">
          <img v-else src="/static/resource/pic/organ.png" alt="" class="fll" style="width: 120px;height: 120px">
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
            <div class="top-form">
              <apply :options="options"/>
            </div>

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
          </div>
        </div>
        <footerSame/>
      </div>
    </div>
  </div>
</template>

<script>
import footerSame from '../component/footerSame'
import { formatPhone } from '@/util/util'
import apply from '@/component/apply'
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
      organId: '',
      organDetail: {},
      loanData: [],
      productData: []
    }
  },
  computed: {
    options() {
      return {
        key: 'agencyId',
        value: this.organId
      }
    }
  },
  created() {
    this.organId = this.$route.query.id
    this.getDetail(this.organId)
    this.getProduct(this.organId)
    this.getVictory(this.organId)
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
    }
  }
}
</script>

<style scoped lang="scss">
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
  margin-top: 30px;
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
