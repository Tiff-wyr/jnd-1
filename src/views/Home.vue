<template>
  <div class="home">
    <div class="img">
      <el-carousel trigger="click">
        <el-carousel-item v-for="(item, index) in bannerList" :key="item" @click.native="handleBanner(index)">
          <div :style="{ width: 100 + '%', height: 100 + '%', background: 'url(' + item + ') top center no-repeat', backgroundSize: '100% 100%' }"/>
        </el-carousel-item>
      </el-carousel>
      <div class="apply">
        <div class="item">
          <span class="label">贷款金额</span>
          <el-select v-model="searchForm.loanAmount" class="option">
            <el-option v-for="item in loanAmountOptions" :key="item.id" :label="item.label" :value="item.id"/>
          </el-select>
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
        <div class="btn" @click="handleSearch">搜索贷款</div>
      </div>
    </div>
    <div class="wrap pt48">
      <div class="w1200">
        <div class="wrap-top clearfix mb24 ml111">
          <div class="clearfix fll single">
            <img src="../../static/resource/group9.png" alt="" class="fll">
            <div class="fll common">
              <div class="text1">放款快</div>
              <div class="text2">最快2小时放款</div>
            </div>
          </div>
          <div class="clearfix fll single ml217">
            <img src="../../static/resource/Group7.png" alt="" class="fll">
            <div class="fll common">
              <div class="text1">利率低</div>
              <div class="text2">利率低至0.26%</div>
            </div>
          </div>
          <div class="clearfix fll single ml227">
            <img src="../../static/resource/Group3.png" alt="" class="fll">
            <div class="fll common">
              <div class="text1">额度高</div>
              <div class="text2">最高可贷1000万</div>
            </div>
          </div>
        </div>
        <div class="wrap-bottom clearfix ml111">
          <div class="clearfix fll single">
            <img src="../../static/resource/Group.png" alt="" class="fll">
            <div class="fll common">
              <div class="text1">门槛低</div>
              <div class="text2">月入2000即可贷</div>
            </div>
          </div>
          <div class="clearfix fll single ml208">
            <img src="../../static/resource/Group11.png" alt="" class="fll">
            <div class="fll common">
              <div class="text1">渠道广</div>
              <div class="text2">多种贷款方式供您选择</div>
            </div>
          </div>
          <div class="clearfix fll single ml188">
            <img src="../../static/resource/Group8.png" alt="" class="fll">
            <div class="fll common">
              <div class="text1">服务好</div>
              <div class="text2">资深顾问在线为您解答</div>
            </div>
          </div>
        </div>
        <div class="special mt48 mb24">特别推荐</div>
        <div class="clearfix special-wrap">
          <div v-for="(item,index) in specialData" :key="index" class="fll com mr20">
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
        <div class="main clearfix">
          <div class="fll">
            <div class="clearfix mt48 mb24">
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
              <div class="agent fll">经纪人推荐</div>
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
          <div class="fll mt48">
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
import { getGetStatus } from '@/api/activity'
import { fetchAgent, fetchSpecial, fetchProduct } from '@/api/home'
const bannerList = [banner01, banner02, banner03]
const loanAmountOptions = [
  { id: 0, label: '0.3万元', value: 0.3 },
  { id: 1, label: '1万元', value: 1 },
  { id: 2, label: '5万元', value: 5 },
  { id: 3, label: '10万元', value: 10 },
  { id: 4, label: '20万元', value: 20 },
  { id: 5, label: '50万元', value: 50 },
  { id: 6, label: '100万元', value: 100 },
  { id: 7, label: '500万元', value: 500 },
  { id: 8, label: '其他', value: 0 }
]
const loanTimeOptions = [
  { id: 1, label: '3个月' },
  { id: 2, label: '6个月' },
  { id: 3, label: '12个月' },
  { id: 4, label: '2年' },
  { id: 5, label: '3年' },
  { id: 6, label: '5年' },
  { id: 7, label: '10年' }
]
const jobOptions = [
  { id: '', label: '不限' },
  { id: 1, label: '企业职员' },
  { id: 2, label: '经商/企业法人' },
  { id: 3, label: '公务员/教师' },
  { id: 4, label: '律师/医生' },
  { id: 5, label: '自由职业' },
  { id: 6, label: '农民/务工' },
  { id: 7, label: '学生' },
  { id: 8, label: '上班族' },
  { id: 9, label: '企业主' },
  { id: 10, label: '个体户' },
  { id: 11, label: '无工作' }
]
export default {
  name: 'Home',
  metaInfo: {
    title: '9能贷-专业的大型一站式金融服务平台，万款产品汇聚，100%下款_9能贷款',
    meta: [{
      name: 'keyWords',
      content: '贷款,平台贷款,平台 贷款,贷款 平台,贷款的平台,好贷款平台,小额贷款平台,手机贷款平台,学生贷款平台,靠谱贷款平台,容易贷款平台,分期贷款平台,好贷款的平台,抵押贷款平台,信用贷款平台,企业贷款平台,大额贷款平台,网上贷款平台,线上贷款平台,可靠的贷款平台,靠谱的贷款平台,公积金贷款平台,网络小额贷款平台,小微企业贷款平台'
    }, {
      name: 'description',
      content: '9能贷款联合各类大型的金融机构,深度挖掘安全的金融服务渠道机构,为用户提供安全、多元的贷款产品和定制化的专业资金服务,打造更契合用户自身需求的贷款管理方案.找贷款,找经纪人,找机构,办理贷款上9能贷款;放款快,利率低0.35%,额度高,门槛低,渠道广.贷款平台哪个好,贷款哪个平台好,有什么贷款平台,什么平台可以贷款,贷款平台哪个靠谱,哪个贷款平台靠谱.'
    }]
  },
  components: {
    footerSame,
    bottomTap,
    calculator
  },
  data() {
    return {
      loanAmountOptions,
      loanTimeOptions,
      jobOptions,
      searchForm: {
        loanAmount: 1,
        loanTime: 3,
        job: ''
      },
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
  created() {
    this.getSpecial()
    this.getProduct()
    this.getAgentData()
    this.getOrganData()
    this.getLoanData()
  },
  methods: {
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
    // 经纪人推荐
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
        if (this.getUser) {
          if (this.getUser.roleId === 2) {
            getGetStatus(this.getUser.phone).then(res => {
              if (res.data.status === 200) {
                this.$router.push(`/agentMessage/${this.getUser.id}/agentMember`)
              } else {
                this.$message.warning(res.data.msg)
              }
            })
          } else {
            this.$message.warning('只有经纪人可以领取')
          }
        } else {
          this.$message.warning('登录后方可领取')
        }
      } else if (val === 1) {
        this.$router.push('/agent')
      } else {
        this.$router.push('/organization')
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
.apply-btn {
  cursor: pointer;
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
.mt28 {
  margin-top: 28px;
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
.ml188 {
  margin-left: 188px;
}
.ml208 {
  margin-left: 208px;
}
.ml227 {
  margin-left: 227px;
}
.ml217 {
  margin-left: 217px;
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
        margin-bottom: 30px;
        height: 50px;
        overflow: hidden;
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
      }
      .btn {
        height: 60px;
        line-height: 60px;
        text-align: center;
        border-radius: 6px;
        color: #fff;
        background: #FC4546;
        cursor: pointer;
      }
    }
  }
}
.wrap {
  width: 100%;
  background: rgba(246, 246, 246, 1);
  padding-bottom: 30px;
  box-sizing: border-box;
  .common {
    margin-left: 24px;
    margin-top: 11px;
  }
}
.single {
  font-size: 0;
  .text1 {
    width: 54px;
    height: 25px;
    font-size: 18px;
    font-weight: 500;
    color: rgba(81, 81, 81, 1);
    line-height: 25px;
  }
  .text2 {
    height: 17px;
    font-size: 12px;
    font-weight: 400;
    color: rgba(155, 155, 155, 1);
    line-height: 17px;
  }
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
