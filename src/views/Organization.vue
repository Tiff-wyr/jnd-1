<template>
  <div>
    <div class="wrappy">
      <div class="w1200">
        <div class="clearfix">
          <div class="organ-left fll">
            <div class="filter-item clearfix mb15">
              <div class="fll city">所在地区</div>
              <div class="filter-content">
                <city-radios :conditions="cityShowNum" @selectProvince="selectProvince" @selectCity="selectCity"/>
              </div>
              <div :class="{ toggle: cityShowNum !== 6 }" class="toggle-item" @click="handleCityShow">
                {{ cityShowNum === 6 ? '展开' : '收起' }}
              </div>
            </div>
            <div class="clearfix mb15">
              <div class="fll city">类&nbsp;&nbsp;&nbsp;&nbsp;别</div>
              <wradio :radios="loans" v-model="query.loan" name="loan" class="fll"/>
            </div>
            <div v-if="isBank" class="clearfix">
              <div class="fll city">业&nbsp;&nbsp;&nbsp;&nbsp;务</div>
              <wradio :radios="business" v-model="query.business" name="business" class="fll"/>
            </div>
          </div>
          <div class="organ-right fll">
            <div class="clearfix mb40">
              <input v-model="searchCon" type="text" class="fll con-search" placeholder="请输入内容">
              <div class="search fll" @click="search">搜索</div>
            </div>
            <div class="top clearfix">
              <div class="top1 fll">
                <img src="../../static/resource/organ/veri.png" alt="">
                <div class="organ-text">专业认证</div>
              </div>
              <div class="top1 fll">
                <img src="../../static/resource/organ/xin.png" alt="">
                <div class="organ-text">信誉平台</div>
              </div>
              <div class="fll top2">
                <img src="../../static/resource/organ/mian.png" alt="">
                <div class="organ-text">免费服务</div>
              </div>
            </div>
          </div>
        </div>
        <div class="mt48 mb24">
          <div class="organ-loan">贷款机构</div>
        </div>
        <div v-if="isJianSuo">
          <div v-if="formData.length == 0" class="empty-list">
            <img :src="emptyList" alt="" class="empty-img">
            <p>暂无数据...</p>
          </div>
          <div v-for="(item,index) in formData" :key="index" class="organ-item clearfix mb30" @click="lookDetail(item.agency.agencyId)">
            <div class="fll align fs img-box">
              <div class="logo">
                <img
                  v-if="item.agency.agencyLogo"
                  :src="item.agency.agencyLogo"
                  alt=""
                >
                <img
                  v-else
                  src="/static/resource/pic/organ.png"
                >
              </div>

              <div class="name">{{ item.agency.agencyName }}</div>
            </div>
            <div class="fll organ-info">
              <div :class="{ isProduct: !item.interest}" class="clearfix">
                <div v-if="item.interest" class="organ-rate fll ml40 w180">
                  利率：
                  <span class="percent-rate">{{ item.interest }}</span>
                </div>
                <div :class="{ml40: !item.interest}" class="organ-rate fll mt4 w180">注册地:&nbsp;{{ item.agency.address }}</div>
                <div class="organ-rate fll mt4 w250">机构类型：&nbsp;{{ item.agency.agencyProperty }}</div>
                <div class="organ-rate fll mt4 w250">
                  <a
                    :href="'http://' + item.agency.agencyURL"
                    target="_blank"
                  >网址：&nbsp; {{ item.agency.agencyURL ? item.agency.agencyURL : '' }}</a>
                </div>
              </div>
              <div class="desc">机构简介：&nbsp;{{ item.agency.agencyIntroduction }}</div>
              <div v-if="item.interest" class="line-desc"/>
              <div v-if="item.product" class="clearfix">
                <div class="item2 fll">
                  <div class="item1-num">{{ item.product.productName }}</div>
                  <div class="item-same">产品名称</div>
                </div>
                <div class="item1 fll align">
                  <div class="item-num">
                    {{ item.product.productInterest }}
                    <span class="percent">%</span>
                  </div>
                  <div class="item-same">利息</div>
                </div>
                <div class="item1 fll align">
                  <div class="item-num">{{ item.product.producLoanLength }}</div>
                  <div class="item-same">放款时间</div>
                </div>
                <div class="item1 fll align">
                  <div class="item-num">{{ item.product.productLife }}</div>
                  <div class="item-same">使用年限</div>
                </div>
                <div class="item1 fll align">
                  <div class="item-num">
                    {{ item.product.productStartAmount }}
                    <span class="percent">万起</span>
                  </div>
                  <div class="item-same">起贷金额</div>
                </div>
                <div class="item1 fll">
                  <div class="item6-num">{{ item.product.productRepaymentMethod }}</div>
                  <div class="item-same">归还方式</div>
                </div>
                <div class="item1 fll">
                  <div class="item6-num">{{ item.product.productPublisher }}</div>
                  <div class="item-same">发行机构</div>
                </div>
                <div class="flr organ-btn align">立即查看</div>
              </div>
            </div>
          </div>
          <div class="page">
            <el-pagination
              :current-page="page"
              :page-size="size"
              :pager-count="5"
              :total="count"
              background=""
              layout="prev, pager, next"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </div>
        </div>
        <!-- 搜索显示 -->
        <div v-else>
          <div v-if="tableData.length == 0" class="empty-list">
            <img :src="emptyList" alt="" class="empty-img">
            <p>暂无数据...</p>
          </div>
          <div v-for="(item,index) in tableData" :key="index" class="organ-item clearfix mb30" @click="lookDetail(item.agency.agencyId)">
            <div class="fll align fs img-box">
              <div class="logo">
                <img
                  v-if="item.agencyLogo"
                  :src="item.agencyLogo"
                  alt=""
                >
                <img
                  v-else
                  src="/static/resource/pic/organ.png"
                  alt=""
                >
              </div>
              <div class="name" v-html="item.agencyName"/>
            </div>
            <div class="fll organ-info">
              <div :class="{ isProduct: !item.interest}" class="clearfix">
                <div class="organ-rate fll ml40 w180">
                  利率：
                  <span class="percent-rate">{{ item.productInterest }}</span>
                </div>
                <div class="organ-rate fll mt4 w180">
                  注册地:&nbsp;
                  <span v-html="item.address"/>
                </div>
                <div class="organ-rate fll mt4 w250">
                  机构类型：&nbsp;
                  <span v-html="item.agencyProperty"/>
                </div>
                <div class="organ-rate fll mt4 w180">
                  网址：&nbsp;
                  <a :href="'http://' + item.agencyURL" target="_blank">
                    <span v-html="item.agencyURL"/>
                  </a>
                </div>
              </div>
              <div class="desc" v-html="'机构简介：' + item.agencyIntroduction"/>
              <div class="line-desc"/>
              <div class="clearfix">
                <div class="item2 fll">
                  <div class="item1-num">{{ item.productName }}</div>
                  <div class="item-same">产品名称</div>
                </div>
                <div class="item1 fll align">
                  <div class="item-num">
                    {{ item.interest }}
                    <span class="percent">%</span>
                  </div>
                  <div class="item-same">利息</div>
                </div>
                <div class="item1 fll align">
                  <div class="item-num">{{ item.producLoanLength }}天</div>
                  <div class="item-same">放款时间</div>
                </div>
                <div class="item1 fll align">
                  <div class="item-num">{{ item.productLife }}年</div>
                  <div class="item-same">使用年限</div>
                </div>
                <div class="item1 fll align">
                  <div class="item-num">
                    {{ item.productStartAmount }}
                    <span class="percent">万起</span>
                  </div>
                  <div class="item-same">起贷金额</div>
                </div>
                <div class="item1 fll">
                  <div
                    class="item6-num"
                  >{{ item.productRepaymentMethod }}</div>
                  <div class="item-same">归还方式</div>
                </div>
                <div class="item1 fll">
                  <div class="item6-num">{{ item.productPublisher }}</div>
                  <div class="item-same">发行机构</div>
                </div>
                <div class="flr organ-btn align">立即查看</div>
              </div>
            </div>
          </div>
          <div class="page">
            <el-pagination
              :current-page="Searchpn"
              :page-size="Searchpage"
              :pager-count="5"
              :total="Searchcount"
              background=""
              layout="prev, pager, next"
              @size-change="handleSizeSearchChange"
              @current-change="handleCurrentSearchChange"
            />
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
import wradio from '../component/w-radios'
import bottomTap from '../component/bottomTap'
import emptyList from '../assets/empty-list.png'
import cityRadios from '@/component/cityRadios'
import { backTop } from '@/util/util'
export default {
  name: 'Organization',
  metaInfo: {
    title: '银行办贷款_办理银行贷款_贷款机构_贷款服务机构_正规贷款机构_9能贷款',
    meta: [{
      name: 'keyWords',
      content: '机构贷款,办银行贷款,找机构贷款,银行办理贷款,正规贷款机构,助学贷款机构,培训贷款机构,小额贷款机构,北京贷款机构,教育机构贷款,学生贷款机构,贷款担保机构,个人贷款机构,贷款买车机构,汽车贷款机构,贷款服务机构,好的贷款机构,网上正规贷款机构,企业办理银行贷款,办理银行贷款公司,房产抵押贷款机构,正规的小额贷款机构,专业办理银行贷款,中介办理银行贷款,委托办理银行贷款'
    }, {
      name: 'description',
      content: '9能贷联合各类大型的金融机构,深度挖掘安全的金融服务渠道机构,为用户提供安全、多元的贷款产品和定制化的专业资金服务,打造更契合用户自身需求的贷款管理方案.办理银行贷款流程,银行贷款办理流程,银行贷款办理条件,银行办理贷款时间,贷款如何办理,怎么办理贷款,银行贷款怎么办理,如何办理抵押贷款,公积金贷款怎么办理,买房怎么办理贷款,怎么办理信用卡贷款,如何办理公积金贷款,银行贷款怎么办理.'
    }]
  },
  components: {
    footerSame,
    wradio,
    bottomTap,
    cityRadios
  },
  data() {
    return {
      cityShowNum: 6,
      emptyList,
      isJianSuo: true,
      searchCon: '',
      isBank: true,
      formData: [],
      cityUp: false, // 城市是否展开
      page: 1,
      size: 10,
      count: 100,
      Searchpn: 1,
      Searchpage: 10,
      Searchcount: 1,
      cities: [],
      loans: [],
      business: [],
      tableData: [],
      query: {
        address1: '',
        address2: '',
        loan: '',
        business: ''
      },
      countData: {
        agencyCount: '',
        brokerCount: '',
        borrowerCount: ''
      }
    }
  },
  watch: {
    'query.loan': function(val) {
      this.page = 1
      this.size = 10
      this.isJianSuo = true
      this.searchCon = ''
      if (val === '1') {
        this.isBank = false
        this.query.business = ''
        this.getCondition()
      } else {
        this.isBank = true
        this.getCondition()
      }
    },
    'query.business': function(val) {
      this.page = 1
      this.size = 10
      this.isJianSuo = true
      this.searchCon = ''
      this.getCondition()
    }
  },
  created() {
    this.getCondition()
    this.getType()
    this.getBusiness()
  },
  methods: {
    search() {
      this.isJianSuo = false
      if (this.searchCon) {
        this.$axios
          .get(
            `solr/getPageUserAgency?q=${this.searchCon}&page=${
              this.Searchpn
            }&size=${this.Searchpage}`
          )
          .then(res => {
            if (res.data !== '') {
              this.tableData = res.data
            } else {
              this.tableData = []
            }
            this.Searchcount = res.total
            backTop()
          })
      } else {
        this.$message.warning('请输入查询内容')
      }
    },
    lookDetail(id) {
      this.$router.push(`/organDetail?id=${id}`)
    },
    selectProvince(val) {
      this.query.address1 = val.pid
      this.query.address2 = ''
      this.getCondition()
    },
    selectCity(val) {
      this.query.address1 = val.pid
      this.query.address2 = val.cid
      this.getCondition()
    },
    // 根据条件
    getCondition() {
      this.$axios
        .get(
          `userAgency/selectByCondition?address1=${
            this.query.address1
          }&address2=${
            this.query.address2
          }&agencyName=${this.query.loan}&agencyProperty=${
            this.query.business
          }&currentPage=${this.page}&pageSize=${this.size}`
        )
        .then(res => {
          if (res.data !== '') {
            this.formData = res.data.list
          } else {
            this.formData = []
          }
          this.count = res.data.totalCount
          backTop()
        })
    },
    handleSizeSearchChange(val) {
      this.Searchpage = val
      this.search()
    },
    handleCurrentSearchChange(val) {
      this.Searchpn = val
      this.search()
    },
    handleCurrentChange(val) {
      this.page = val
      this.getCondition()
    },
    handleSizeChange(val) {
      this.size = val
      this.getCondition()
    },
    handleCityShow() {
      this.cityShowNum = this.cityShowNum === 6 ? 50 : 6
    },
    // 类别
    getType() {
      this.$axios.get('get/getAgencyCategory').then(res => {
        this.loans = res.map(item => {
          return { value: item.id, label: item.categoryName }
        })
      })
    },
    // 业务
    getBusiness() {
      this.$axios.get('get/getAgencyProperty').then(res => {
        this.business = res.map(item => {
          return { value: item.id, label: item.propertuName }
        })
      })
    }
  }
}
</script>
<style scoped lang="scss">
.filter-item {
  @include clearfix;
  position: relative;
  margin-bottom: 20px;
  .label {
    float: left;
    width: 112px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background: #D0AC56;
    color: $jnd-font-color-white;
    font-size: $jnd-font-size-big;
  }
  .filter-content {
    float: left;
    width: 672px;
  }
  .toggle-item {
    @include arrow;
    position: absolute;
    right: 0;
    top: 10px;
    color: $jnd-font-color-gray;
    cursor: pointer;
  }
}
.isProduct {
  margin: 35px 0 50px;
}
.mb40 {
  margin-bottom: 40px;
}
.mb15 {
  margin-bottom: 15px;
}
.w180 {
  width: 180px;
}
.w250 {
  width: 250px;
}
.mb30 {
  margin-bottom: 30px;
}
.ml40 {
  margin-left: 40px;
}
.mb20 {
  margin-bottom: 20px;
}
.img-right {
  margin-top: 14px;
}
.organ-more {
  height: 14px;
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(155, 155, 155, 1);
  line-height: 14px;
  margin-top: 14px;
  margin-left: 973px;
}
.mt4 {
  margin-top: 4px;
}
.organ {
  img {
    width: 100%;
    height:448px;
  }
}
.page {
  text-align: right;
}

.organ-loan {
  width: 168px;
  height: 28px;
  font-size: 24px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(0, 0, 0, 1);
  line-height: 28px;
}
.organ-left {
  width: 902px;
  background: rgba(255, 255, 255, 1);
  padding: 20px 18px;
  box-sizing: border-box;
  .area-item {
    position: relative;
    .up {
      position: absolute;
      right: 0;
      top: 13px;
      height: 14px;
      font-size: 14px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(155, 155, 155, 1);
      line-height: 14px;
      cursor: pointer;
      .arrow {
        display: inline-block;
        vertical-align: middle;
        margin-top: 3px;
        margin-left: 3px;
        width: 0;
        height: 0;
        border: 7px solid transparent;
        border-top-color: rgba(155, 155, 155, 1);
      }
      .rotate {
        transform: rotateZ(180deg);
        margin-top: -10px;
      }
    }
    .radio-wrap {
      box-sizing: border-box;
      width: 700px;
      height: 30px;
      overflow: hidden;
      padding-bottom: 20px;
      transition: height ease 0.5s;
    }
    .radio-wrap-active {
      height: auto;
    }
  }
  .city {
    width: 112px;
    height: 40px;
    background: rgba(208, 172, 86, 1);
    text-align: center;
    font-size: 16px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    line-height: 40px;
  }
}
.organ-right {
  width: 268px;
  height: 201px;
  background: rgba(255, 255, 255, 1);
  margin-left: 30px;
  padding: 10px 18px;
  box-sizing: border-box;
  .search {
    width: 60px;
    height: 40px;
    background: rgba(168, 14, 14, 1);
    border-radius: 0px 4px 4px 0px;
    color: #fff;
    line-height: 40px;
    text-align: center;
    cursor: pointer;
  }
  .con-search {
    width: 170px;
    height: 40px;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    border: 1px solid rgba(205, 205, 205, 1);
    padding-left: 5px;
    line-height: 40px;
    box-sizing: border-box;
    color: #333;
  }
  .organ-text {
    margin-top: 18px;
    width: 56px;
    height: 14px;
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(81, 81, 81, 1);
    line-height: 14px;
  }
  .organ-line {
    width: 216px;
    height: 1px;
    background: #ccc;
    margin-top: 30px;
  }
  .top1 {
    margin-right: 24px;
    font-size: 0;
  }
  .top2 {
    font-size: 0;
  }
  .bottom {
    margin-top: 29px;
    .bottom1,
    .bottom2 {
      text-align: center;
    }
    .bottom1 {
      margin-right: 16px;
    }
  }
  .num {
    height: 24px;
    font-size: 18px;
    font-family: DINAlternate-Bold;
    font-weight: bold;
    color: rgba(208, 172, 86, 1);
    line-height: 24px;
    letter-spacing: 2px;
    overflow: hidden;
  }
  .num2 {
    height: 14px;
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(81, 81, 81, 1);
    line-height: 14px;
    margin-top: 24px;
  }
}
.organ-item {
  width: 1200px;
  height: 218px;
  background: rgba(255, 255, 255, 1);
  padding: 30px 40px;
  box-sizing: border-box;
  &:hover {
    box-shadow: 0px 0px 13px 0px rgba(217, 217, 217, 1);
  }
  .img-box {
    width: 128px;
    .logo {
      width: 100%;
      height: 128px;
      line-height: 128px;
      border-radius: 50%;
      overflow: hidden;
      text-align: center;
      img {
        width: 100%;
      }
    }
  }
  .organ-info {
    width: calc(100% - 128px);
  }
  .name {
    text-align: center;
    height: 20px;
    font-size: 20px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(81, 81, 81, 1);
    line-height: 20px;
    margin-top: 10px;
  }
  .desc {
    height: 14px;
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(81, 81, 81, 1);
    line-height: 14px;
    margin-left: 40px;
    margin-top: 10px;
    padding-right: 50px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .organ-rate {
    height: 20px;
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(81, 81, 81, 1);
    line-height: 20px;
    a {
      color: rgba(81, 81, 81, 1);
    }
  }
  .percent-rate {
    height: 28px;
    font-size: 16px;
    font-family: DINAlternate-Bold;
    font-weight: bold;
    color: rgba(168, 14, 14, 1);
    line-height: 28px;
  }
}

.line-desc {
  width: 915px;
  height: 2px;
  margin-left: 40px;
  background-color: #f0f0f0;
  margin-top: 19px;
  margin-bottom: 19px;
}
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
.item6-num {
  height: 16px;
  font-size: 16px;
  font-family: PingFangSC-Semibold;
  font-weight: 600;
  color: rgba(81, 81, 81, 1);
  line-height: 16px;
  white-space: nowrap;
}
.item-num {
  height: 16px;
  font-size: 16px;
  font-family: DINAlternate-Bold;
  font-weight: bold;
  color: rgba(168, 14, 14, 1);
  line-height: 16px;
}
.percent {
  font-size: 12px;
  color: rgba(81, 81, 81, 1);
}
.item1 {
  width: 100px;
  text-align: center;
}
.item2 {
  width: 150px;
  margin-left: 40px;
  text-align: left;
}
.organ-btn {
  width: 100px;
  height: 40px;
  background: rgba(168, 14, 14, 1);
  font-size: 16px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  line-height: 40px;
  margin-left: 56px;
  cursor: pointer;
}
</style>
