<template>
  <div class="home">
    <div class="img">
      <el-carousel trigger="click">
        <el-carousel-item v-for="(item, index) in bannerList" :key="item" @click.native="handleBanner(index)">
          <div :style="{ width: 100 + '%', height: 100 + '%', background: 'url(' + item + ') top center no-repeat', backgroundSize: '100% 100%', cursor: 'pointer' }"/>
        </el-carousel-item>
      </el-carousel>
      <div class="apply">
        <div class="item">
          <span class="label">贷款金额</span>
          <el-select v-if="loanAmountStatus" v-model="searchForm.loanAmount" class="option" @change="handleLoanAmount">
            <el-option v-for="item in loanAmountOptions" :key="item.id" :label="item.label" :value="item.value"/>
          </el-select>
          <el-input v-else ref="loanAmountInput" v-model="searchForm.loanAmount" class="option" placeholder="请输入贷款金额" @input="handleLoanAmount" @blur="handleBlur"/>
          <span v-if="!loanAmountStatus" class="unit">万元</span>
        </div>
        <div class="item">
          <span class="label">贷款期限</span>
          <el-select v-model="searchForm.loanTime" class="option">
            <el-option v-for="item in loanTimeOptions" :key="item.id" :label="item.label" :value="item.id"/>
          </el-select>
        </div>
        <div class="item">
          <span class="label">职业身份</span>
          <el-select v-model="searchForm.job" class="option">
            <el-option v-for="item in jobOptions" :key="item.id" :label="item.label" :value="item.id"/>
          </el-select>
        </div>
        <div class="btn qucik-apply" @click="handleApply">快速申请</div>
        <div class="btn search" @click="handleSearch">搜索产品</div>
      </div>
    </div>
    <div class="wrap pt48">
      <div class="w1200">
        <div class="count-data">
          <dl class="count-item">
            <dt>
              <img src="../assets/home/proCount.png" >
            </dt>
            <dd>
              <p class="num"><count-to :start-val="0" :end-val="5000" :duration="3000" class="num"/>+</p>
              <p class="text">产品可供查看</p>
            </dd>
          </dl>
          <dl class="count-item">
            <dt>
              <img src="../assets/home/organCount.png" >
            </dt>
            <dd>
              <p class="num"><count-to :start-val="0" :end-val="1600" :duration="3000" class="num"/>+</p>
              <p class="text">金融机构资金支持</p>
            </dd>
          </dl>
          <dl class="count-item">
            <dt>
              <img src="../assets/home/userCount.png" >
            </dt>
            <dd>
              <p class="num"><count-to :start-val="0" :end-val="25500" :duration="3000" class="num"/>+</p>
              <p class="text">信贷经理在线沟通</p>
            </dd>
          </dl>
          <dl class="count-item">
            <dt>
              <img src="../assets/home/moneyCount.png" >
            </dt>
            <dd>
              <p class="num"><count-to :start-val="0" :end-val="526281000" :duration="3000" class="num"/></p>
              <p class="text">累计交易金额</p>
            </dd>
          </dl>
        </div>
        <div class="special mt48 mb24">特别推荐</div>
        <div class=" special-wrap">
          <div v-for="(item,index) in specialData" :key="index" class="com">
            <div class="word1">{{ item.productType }}</div>
            <div>
              <div class="word2">{{ item.productPublisher }}</div>
            </div>
            <div class="word3">
              {{ item.productInterest }}%
              <!-- <span class="symbol">%</span> -->
            </div>
            <div class="word4">利息</div>
            <div class="word5">{{ item.productStartAmount }}-{{ item.productEndAmount }}万</div>
            <div class="btn" @click="specialLook(item.productId)">立即查看</div>
          </div>
        </div>
        <div class="main mt48">
          <div>
            <div class="clearfix mb24">
              <div class="product fll">产品推荐</div>
              <div class="fll">
                <div class="more fll" @click="$router.push('/loans')">更多</div>
                <img src="../../static/resource/right.png" alt="" class="fll img-right">
              </div>
            </div>
            <div class="clearfix">
              <div class="product-wrap fll align">
                <div class="mark2">
                  <div class="agent-write">优质产品 多样选择</div>
                  <div class="agent-btn" @click="$router.push('/Loans')">立即查看</div>
                </div>
              </div>
              <div class="product-table fll">
                <ul v-for="(item,index) in productData" :key="index" class="product-item">
                  <li>
                    <span class="product-name">{{ item.productName }}</span>
                    <br>
                    <span>产品名称</span>
                  </li>
                  <li>
                    <span>{{ item.productInterest }} %</span>
                    <br>
                    <span>利息</span>
                  </li>
                  <li>
                    <span>{{ item.producLoanLength }}</span>
                    <br>
                    <span>放款时间</span>
                  </li>
                  <li>
                    <span>{{ item.productLife }}</span>
                    <br>
                    <span>使用年限</span>
                  </li>
                  <li>
                    <span>{{ item.productStartAmount }} 万</span>
                    <br>
                    <span>起贷金额</span>
                  </li>
                  <li class="btn-box">
                    <div class="flr organ-btn align" @click="proDetail(item.productId)">立即查看</div>
                  </li>
                </ul>
              </div>
            </div>
            <div class="clearfix mt48 mb24">
              <div class="agent fll">信贷经理推荐</div>
              <div class="fll">
                <div class="more-agent fll" @click="$router.push('/agent')">更多</div>
                <img src="../../static/resource/right.png" alt="" class="fll img-right">
              </div>
            </div>
            <div class="clearfix">
              <div class="agent-wrap fll align">
                <div class="mark3">
                  <div class="agent-write">资深人士 专业服务</div>
                  <div class="agent-btn" @click="$router.push('/agent')">立即查看</div>
                </div>
              </div>
              <div class="agent-table fll">
                <div class="clearfix">
                  <div v-for="(item,index) in agentData" :key="index" class="fll align mr42" @click="agDetail(item.brokerId)">
                    <span :style="{display: 'block', width: '100px', height: '100px', cursor: 'pointer', backgroundImage: 'url(' + item.image + ')', backgroundSize: '100% auto', 'background-position': 'center center', 'backgroundRepeat': 'no-repeat'}" />
                    <div class="agent-name">{{ item.brokerName }}</div>
                    <div class="agent-job">金融顾问</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="clearfix mt48 mb24">
              <div class="organize fll">机构推荐</div>
              <div class="fll">
                <div class="more fll" @click="$router.push('/organization')">更多</div>
                <img src="../../static/resource/right.png" alt="" class="fll img-right">
              </div>
            </div>
            <div class="clearfix">
              <div class="organize-wrap fll align">
                <div class="mark1">
                  <div class="agent-write">权威机构 财富保障</div>
                  <div class="agent-btn" @click="$router.push('/Organization')">立即查看</div>
                </div>
              </div>
              <div class="organize-table fll">
                <div class="clearfix">
                  <div v-if="organData.length === 0" class="empty-list">
                    <img :src="emptyList" alt="">
                    <p>暂无数据...</p>
                  </div>
                  <div v-for="(item,index) in organData" :key="index" class="fll organW" @click="orDetail(item.agencyId)">
                    <a v-if="item.agencyLogo" :style="{background: 'url(' + item.agencyLogo + ') center center no-repeat', backgroundSize: '100% auto'}"/>
                    <a v-else :style="{ background: 'url(/static/resource/pic/organ.png) center center no-repeat', backgroundSize: '100% auto'}" />
                    {{ item.agencyName }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <calculator style="width: 268px; margin-left: 20px; margin-bottom: 30px;" location="home"/>
            <div class="loans clearfix align">
              <div class="loans-use">贷款用途</div>
              <div class="loans-left fll mr60">
                <img src="../../static/resource/Group16Copy.png" alt="">
                <div class="loans-text">装修贷款</div>
                <img src="../../static/resource/Group20Copy.png" alt="">
                <div class="loans-text">创业贷款</div>
                <img src="../../static/resource/Group21Copy.png" alt="">
                <div class="loans-text">购车贷款</div>
                <img src="../../static/resource/Group27Copy.png" alt="">
                <div class="loans-text">购房贷款</div>
              </div>
              <div class="loans-right fll">
                <img src="../../static/resource/Group17Copy.png" alt="">
                <div class="loans-text">资金周转</div>
                <img src="../../static/resource/Group19Copy.png" alt="">
                <div class="loans-text">经营贷款</div>
                <img src="../../static/resource/Group22Copy.png" alt="">
                <div class="loans-text">旅行贷款</div>
                <img src="../../static/resource/icon.png" alt="">
                <div class="loans-text">结婚贷款</div>
              </div>
            </div>
            <div class="message clearfix">
              <img src="../../static/resource/laba.png" alt="" class="fll">
              <div class="fll mess-main">
                <vue-seamless-scroll :data="loanData" :class-option="defaultOption" class="seamless-warp">
                  <div
                    v-for="(item,index) in loanData"
                    :key="index"
                    class="mess-text"
                  >{{ item.borrowerName }}:{{ item.phone }}&nbsp;&nbsp;申请了贷款</div>
                </vue-seamless-scroll>
              </div>
            </div>
          </div>
        </div>
        <footerSame/>
      </div>
    </div>
    <bottomTap/>
  </div>
</template>

<script>
import footerSame from '../component/footerSame'
import bottomTap from '../component/bottomTap'
import calculator from '@/views/consult/components/Calculator'
import emptyList from '../assets/empty-list.png'
import banner01 from '@/assets/banner01.png'
import banner02 from '@/assets/banner02.png'
import banner03 from '@/assets/banner03.png'
import banner04 from '@/assets/banner04.png'
import { getGetStatus } from '@/api/activity'
import CountTo from 'vue-count-to'
import { fetchAgent, fetchSpecial, fetchProduct } from '@/api/home'
import { loanTimeList, jobTypeList, loanAmountList } from '@/util/filterData'
import { mapState } from 'vuex'
const bannerList = [banner01, banner02, banner03, banner04]
const loanAmountOptions = loanAmountList()
const loanTimeOptions = loanTimeList()
const jobOptions = jobTypeList()
export default {
  name: 'Home',
  metaInfo: {
    title: '9能金科-专业的大型一站式金融服务平台，万款产品汇聚，100%下款_9能金科款',
    meta: [{
      name: 'keyWords',
      content: '贷款,平台贷款,平台 贷款,贷款 平台,贷款的平台,好贷款平台,小额贷款平台,手机贷款平台,学生贷款平台,靠谱贷款平台,容易贷款平台,分期贷款平台,好贷款的平台,抵押贷款平台,信用贷款平台,企业贷款平台,大额贷款平台,网上贷款平台,线上贷款平台,可靠的贷款平台,靠谱的贷款平台,公积金贷款平台,网络小额贷款平台,小微企业贷款平台'
    }, {
      name: 'description',
      content: '9能金科款联合各类大型的金融机构,深度挖掘安全的金融服务渠道机构,为用户提供安全、多元的贷款产品和定制化的专业资金服务,打造更契合用户自身需求的贷款管理方案.找贷款,找信贷经理,找机构,办理贷款上9能金科款;放款快,利率低0.35%,额度高,门槛低,渠道广.贷款平台哪个好,贷款哪个平台好,有什么贷款平台,什么平台可以贷款,贷款平台哪个靠谱,哪个贷款平台靠谱.'
    }]
  },
  components: {
    footerSame,
    bottomTap,
    calculator,
    CountTo
  },
  data() {
    return {
      loanAmountOptions,
      loanTimeOptions,
      jobOptions,
      searchForm: {
        loanAmount: 5,
        loanTime: 3,
        job: 0
      },
      loanAmountStatus: true,
      defaultOption: {
        step: 0.4,
        openWatch: true,
        waitTime: 1000
      },
      bannerList,
      emptyList,
      specialData: [],
      productData: [],
      agentData: [],
      organData: [],
      loanData: []
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  created() {
    this.getSpecial()
    this.getProduct()
    this.getAgentData()
    this.getOrganData()
    this.getLoanData()
  },
  methods: {
    handleLoanAmount(val) {
      if (val === 0 || val === '') {
        this.loanAmountStatus = false
        this.$nextTick(() => {
          this.$refs.loanAmountInput.focus()
        })
      }
    },
    handleBlur(e) {
      if (e.target.value === '') {
        this.loanAmountStatus = true
        this.searchForm.loanAmount = 0.3
      }
    },
    // 特别推荐详情页
    specialLook(id) {
      this.$router.push(`/productDetail?id=${id}`)
    },
    proDetail(id) {
      this.$router.push(`/productDetail?id=${id}`)
    },
    orDetail(id) {
      this.$router.push(`/organDetail?id=${id}`)
    },
    agDetail(id) {
      this.$router.push(`/agentDetail?id=${id}`)
    },
    handleApply() {
      console.log(this.userInfo)
      if (this.userInfo) {
        if (this.userInfo.roleId === 1) {
          this.$message.success('平台已受理了您的快速申请，您可以查看平台其它产品')
        } else {
          this.$message.warning('您不是贷款用户，无法使用该功能')
        }
      } else {
        this.$router.push('/userRegister')
      }
    },
    handleSearch() {
      this.$router.push(`/productList?param=${JSON.stringify(this.searchForm)}`)
    },
    // 特别推荐
    getSpecial() {
      fetchSpecial().then(res => {
        this.specialData = res.data
      })
    },
    // 产品推荐
    getProduct() {
      fetchProduct().then(res => {
        this.productData = res.data
      })
    },
    // 信贷经理推荐
    getAgentData() {
      fetchAgent().then(res => {
        this.agentData = res.data
      })
    },
    // 机构推荐
    getOrganData() {
      this.$axios.get(`userAgency/indexAgency`).then(res => {
        this.organData = res
      })
    },
    getLoanData() {
      this.$axios.get('userBorrower/indexBorrower').then(res => {
        this.loanData = res.map(item => {
          const phone = item.phone.substr(0, 3) + '*****' + item.phone.substr(8, 10)
          item.phone = phone
          return item
        })
      })
    },
    handleBanner(val) {
      if (val === 0) {
        return
      } else if (val === 1) {
        console.log(this.$store.state.userInfo)
        if (this.$store.state.userInfo) {
          this.$router.push('/productList')
        } else {
          this.$router.push('/userRegister')
        }
      } else if (val === 2) {
        this.$router.push('/agent')
      } else {
        if (this.$store.state.userInfo) {
          if (this.$store.state.userInfo.roleId === 2) {
            getGetStatus(this.$store.state.userInfo.phone).then(res => {
              if (res.data.status === 200) {
                this.$router.push(`/agentMessage/${this.$store.state.userInfo.id}/agentMember`)
              } else {
                this.$message.warning(res.data.msg)
              }
            })
          } else {
            this.$message.warning('只有信贷经理可以领取')
          }
        } else {
          this.$message.warning('登录后方可领取')
        }
      }
    }
  }
}
</script>
<style lang="scss">
.el-carousel, .el-carousel__container {
  height: 368px!important;
  min-width: 1200px;
}
.apply {
  .el-input__inner {
    border: none;
  }
  .el-select .el-input__inner:focus {
    border: none;
  }
}
</style>

<style scoped lang="scss">
$gray: #333;
.count-data {
  display: flex;
  justify-content: space-around;
  align-items: center;
  .count-item {
    display: flex;
    align-items: center;
    dt {
      margin-right: 10px;
      img {
        width: 46px;
      }
    }
    .num {
      font-size: 24px;
      color: #D51010;
    }
    .text {
      color: #4A4A4A;
      font-size: 14px;
    }
  }
}
.mb24 {
  margin-bottom: 24px;
}

.mt48 {
  margin-top: 48px;
}
.mr60 {
  margin-right: 60px;
}
.align {
  text-align: center;
}
.mr42 {
  margin-right: 39px;
}
.mr20 {
  margin-right: 10px;
}
.home {
  .img {
    position: relative;
    height:368px;
    img {
      width: 100%;
      height: 368px;
    }
    .apply {
      position: absolute;
      left: 12.5%;
      top: 0;
      width: 360px;
      height: 100%;
      z-index: 998;
      background: rgba(0,0,0,.4);
      padding: 30px;
      box-sizing: border-box;
      font-family: PingFangSC-Regular;
      font-weight: 500;

      .item {
        background: #ffffff;
        display: flex;
        align-items: center;
        border-radius: 6px;
        margin-bottom: 12px;
        height: 50px;
        overflow: hidden;
        position: relative;
        .label {
          width: 90px;
          text-align: center;
          color: #6A6A6A;
          font-size: $jnd-font-size-base;
          background: #F8F6F6;
          height: 100%;
          line-height: 50px;
        }
        .option {
          flex: 1;
          border: none;
        }
        .unit {
          position: absolute;
          right: 24px;
          font-size: 14px;
          top: 50%;
          transform: translateY(-50%);
        }
      }
      .btn {
        height: 50px;
        line-height: 50px;
        text-align: center;
        border-radius: 6px;
        color: #fff;
        cursor: pointer;
      }
      .qucik-apply {
        background: #FC4546;
        margin: 20px 0 14px;
      }
      .search {
        background: #F5E3E3;
        color: #F05B5C;
      }
    }
  }
}
.wrap {
  width: 100%;
  background: rgba(246, 246, 246, 1);
  padding-bottom: 30px;
  box-sizing: border-box;
}
.special {
  width: 112px;
  height: 28px;
  font-size: 24px;
  font-weight: 500;
  color: rgba(0, 0, 0, 1);
  line-height: 28px;
}
.special-wrap {
  width: 1200px;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  .com {
    position: relative;
    text-align: center;
    overflow: hidden;
    width: 285px;
    height: 266px;
    background: rgba(255, 255, 255, 1);
    &:hover .btn {
      bottom: 10px;
    }
    &:hover {
      box-shadow: 0px 0px 13px 0px rgba(217, 217, 217, 1);
    }
    &:hover .word5 {
      transform: scale(0.1, 0.1);
    }
    .btn {
      position: absolute;
      bottom: -50px;
      width: 128px;
      height: 45px;
      cursor: pointer;
      background: rgba(168, 14, 14, 1);
      font-size: 14px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
      line-height: 45px;
      margin: 0 78px 0 78px;
      transition: bottom 0.2s ease;
    }
  }
  .word1 {
    height: 20px;
    font-size: 14px;
    font-weight: 400;
    color: rgba(155, 155, 155, 1);
    line-height: 20px;
    margin: 26px 89px 0 88px;
  }
  .word2 {
    width: 100px;
    height: 24px;
    background: rgba(168, 14, 14, 1);
    font-size: 14px;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 24px;
    margin-top: 8px;
    margin-left: auto;
    margin-right: auto;
  }
  .word3 {
    width: 85px;
    height: 53px;
    font-size: 38px;
    font-weight: bold;
    font-family: DINAlternate-Bold;
    color: rgba(168, 14, 14, 1);
    line-height: 53px;
    margin: 22px 100px 0 100px;
    .symbol {
      color: rgba(168, 14, 14, 1);
      font-size: 16px;
    }
  }
  .word4 {
    height: 13px;
    font-size: 13px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(155, 155, 155, 1);
    line-height: 13px;
    margin-bottom: 35px;
    margin-top: 5px;
  }
  .word5 {
    height: 24px;
    font-size: 17px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(155, 155, 155, 1);
    line-height: 24px;
    transition: transform 0.2s ease;
  }
}
.main {
  display: flex;
  justify-content: space-between;
  .more {
    height: 14px;
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(155, 155, 155, 1);
    line-height: 14px;
    margin-top: 14px;
    margin-left: 747px;
    cursor: pointer;
  }
  .img-right {
    margin-top: 14px;
  }
  .more-agent {
    height: 14px;
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(155, 155, 155, 1);
    line-height: 14px;
    margin-top: 14px;
    margin-left: 719px;
    cursor: pointer;
  }
  .product,
  .agent,
  .organize {
    height: 28px;
    font-size: 24px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(0, 0, 0, 1);
    line-height: 28px;
  }
  .product-wrap,
  .agent-wrap,
  .organize-wrap {
    width: 280px;
    height: 364px;
  }
  .product-wrap {
    background-image: url("../../static/resource/you.png");
    position: relative;
    .mark2 {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
      background: rgba(0, 0, 0, .2);
    }
  }
  .agent-wrap {
    background-image: url("../../static/resource/agent.png");
    position: relative;
    .mark3 {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
      background: rgba(0, 0, 0, .2);
    }
  }
  .organize-wrap {
    background-image: url("../../static/resource/organ.png");
    position: relative;
    .mark1 {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
      background: rgba(0, 0, 0, .2);
    }
  }
  .agent-table,
  .organize-table {
    width: 590px;
    height: 364px;
    background: rgba(255, 255, 255, 1);
    padding: 24px 0 0 32px;
    box-sizing: border-box;
    margin-left: 30px;
  }
  .organize-table {
    width: 590px;
    display: flex;
    align-items: center;
    .organW {
      width: 100px;
      overflow: hidden;
      text-align: center;
      margin-right: 36px;
      margin-bottom: 36px;
      a {
        display: block;
        width: 100px;
        height: 100px;
        border: 1px solid #f0f0f0;
        box-sizing: border-box;
        cursor: pointer;
        margin-bottom: 14px;
      }
    }
  }
}
.product-table {
  width: 590px;
  height: 360px;
  background: rgba(255, 255, 255, 1);
  margin-left: 30px;
  .product-item {
    display: flex;
    align-items: center;
    list-style: none;
    width: 590px;
    height: 121px;
    &:hover {
      box-shadow: 0px 4px 13px 0px rgba(236, 236, 236, 1);
    }
    li {
      width: 120px;
      line-height: 44px;
      text-align: center;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      span {
        color: #515151;
        font-weight: 500;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      span:first-of-type {
        color: #a80e0e;
        font-weight: 700;
      }
      &:first-of-type {
        span {
          color: #515151;
          font-weight: 500;
        }
      }
    }
    .organ-btn {
      text-align: center;
      width: 80px;
      height: 50px;
      background: rgba(168, 14, 14, 1);
      font-size: 14px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
      line-height: 50px;
      margin-top: 36px;
      margin-bottom: 35px;
      margin-right: 20px;
      cursor: pointer;
    }
  }
}
.organ-text1 {
  text-align: center;
  width: 100px;
  overflow: hidden;
  height: 16px;
  font-size: 16px;
  font-family: PingFangSC-Semibold;
  font-weight: 600;
  color: rgba(81, 81, 81, 1);
  line-height: 16px;
  margin: 3px 0 6px 0;
}
.organ-text2 {
  text-align: center;
  width: 100px;
  overflow: hidden;
  height: 12px;
  font-size: 12px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(155, 155, 155, 1);
  line-height: 12px;
}
.loans {
  width: 268px;
  height: 532px;
  background: rgba(255, 255, 255, 1);
  margin-left: 20px;
  padding: 24px 35px 30px;
  box-sizing: border-box;
}
.agent-write {
  height: 30px;
  font-size: 24px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  line-height: 30px;
  margin-top: 132px;
}
.agent-btn {
  width: 180px;
  height: 50px;
  background: rgba(239, 239, 239, 0.2);
  border: 1px solid rgba(255, 255, 255, 1);
  font-size: 18px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 50px;
  margin: 20px 50px;
  box-sizing: border-box;
  cursor: pointer;
}
.agent-name {
  width: 100px;
  overflow: hidden;
  height: 16px;
  font-size: 16px;
  font-family: PingFangSC-Semibold;
  font-weight: 600;
  color: rgba(81, 81, 81, 1);
  line-height: 16px;
  margin: 8px 0 6px 0;
}
.agent-job {
  width: 100px;
  overflow: hidden;
  height: 12px;
  font-size: 12px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(155, 155, 155, 1);
  line-height: 12px;
  margin-bottom: 8px;
}
.loans-use {
  height: 20px;
  font-size: 20px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(81, 81, 81, 1);
  line-height: 20px;
  margin-bottom: 26px;
}
.loans-text {
  margin: 5px 0 20px;
  height: 14px;
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(81, 81, 81, 1);
  line-height: 14px;
}
.message {
  width: 268px;
  height: 146px;
  background: #fff;
  margin-top: 30px;
  margin-left: 20px;
  padding: 18px 18px;
  box-sizing: border-box;
  overflow: hidden;
  .mess-main {
    width: 180px;
    margin-left: 10px;
    box-sizing: border-box;
    overflow: hidden;
    .mess-text {
      width: 180px;
      height: 10px;
      font-size: 10px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(121, 183, 255, 1);
      line-height: 10px;
      margin-bottom: 10px;
    }
  }
}
</style>
