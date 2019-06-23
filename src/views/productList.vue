<template>
  <div>
    <div class="wrappy">
      <div class="w1200">
        <div class="clearfix">
          <div class="area fll">
            <div class="clearfix mb15 area-item">
              <div class="fll city">所在地区</div>
              <div
                :class="cityUp? 'fll radio-wrap clearfix radio-wrap-active' : 'fll radio-wrap clearfix'"
              >
                <wradio :radios="cities" v-model="query.city" name="city" class="fll"/>
              </div>
              <div class="up" @click="citySpread">展开
                <span :class="cityUp? 'arrow rotate' : 'arrow' "/>
              </div>
            </div>
            <div class="clearfix mb15">
              <div class="fll city">贷款类型</div>
              <wradio :radios="loans" v-model="query.loan" name="loan" class="fll"/>
            </div>
            <div class="clearfix mb15">
              <div class="fll city">业务分类</div>
              <wradio :radios="business" v-model="query.business" name="business" class="fll"/>
            </div>
            <div class="clearfix mb15">
              <div class="fll city">贷款额度</div>
              <wradio :radios="loanLimits" v-model="query.loanLimit" name="loanLimit" class="fll"/>
            </div>
            <div class="clearfix mb15">
              <div class="fll city">贷款利率(月)</div>
              <wradio :radios="loanRates" v-model="query.loanRate" name="loanRate" class="fll"/>
            </div>
            <div class="clearfix mb15">
              <div class="fll city">贷款期限</div>
              <wradio :radios="loanLifes" v-model="query.loanLife" name="loanLife" class="fll"/>
            </div>
            <div class="clearfix area-item">
              <div class="fll city">贷款条件</div>
              <div
                :class="loanUp? 'fll radio-wrap clearfix radio-wrap-active' : 'fll radio-wrap clearfix'"
              >
                <wcheckBox
                  :radios="loanConditions"
                  v-model="query.loanCondition"
                  name="loanCondition"
                  class="fll"
                  style="width: 700px"
                />
              </div>
              <div class="up" @click="loanSpread">展开
                <span :class="loanUp? 'arrow rotate' : 'arrow' "/>
              </div>
            </div>
          </div>
          <div class="fll organ-right">
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
        <div class="mt30 mb24 organ-loan">贷款产品</div>
        <div v-if="isJianSuo">
          <div class="loans-pro">
            <div class="loans-header clearfix">
              <div class="header-same fll">产品名称</div>
              <div class="header-same fll">额度</div>
              <div class="header-same fll">使用年限</div>
              <div class="header-same fll">利息</div>
              <div class="header-same fll">放款时间</div>
              <div class="header-same fll">发行机构</div>
              <div class="header-same fll">操作</div>
            </div>

            <div v-if="tableData.length == 0" class="empty-list">
              <img :src="emptyList" alt="" class="empty-img">
              <p>暂无数据...</p>
            </div>
            <div v-for="(item,index) in tableData" :key="index" class="loans-pro-item clearfix">
              <div class="name fll pro-item-same">{{ item.productName }}</div>
              <div
                class="rate fll pro-item-same"
              >{{ item.productStartAmount }}-{{ item.productEndAmount }}万</div>
              <div class="deadline fll pro-item-same">{{ item.productLife }}</div>
              <div class="limit fll pro-item-same">{{ item.productInterest }}%</div>
              <div class="time fll pro-item-same">{{ item.producLoanLength }}</div>
              <div class="bank fll pro-item-same">{{ item.productPublisher }}</div>
              <div class="operate fll pro-item-same">
                <div class="look" @click="lookDetail(item.productId)">查看</div>
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
        <div v-else>
          <div class="loans-pro">
            <div class="loans-header clearfix">
              <div class="header-same fll">产品名称</div>
              <div class="header-same fll">额度</div>
              <div class="header-same fll">使用年限</div>
              <div class="header-same fll">利息</div>
              <div class="header-same fll">放款时间</div>
              <div class="header-same fll">发行机构</div>
              <div class="header-same fll">操作</div>
            </div>

            <div v-if="formData.length == 0" class="empty-list">
              <img :src="emptyList" alt="" class="empty-img">
              <p>暂无数据...</p>
            </div>

            <div v-for="(item,index) in formData" :key="index" class="loans-pro-item clearfix">
              <div class="name fll pro-item-same" v-html="item.productName">{{ item.productName }}</div>
              <div class="rate fll pro-item-same">
                <span>{{ item.productStartAmount }}</span>~
                <span>{{ item.productEndAmount }}</span>万
              </div>
              <div
                class="time fll pro-item-same"
              >{{ item.producLoanLength }}年</div>
              <div
                class="limit fll pro-item-same"
              >{{ item.productInterest }}%</div>
              <div class="deadline fll pro-item-same">{{ item.productLife }}天</div>
              <div
                class="bank fll pro-item-same"
                v-html="item.productPublisher"
              >{{ item.productPublisher }}</div>
              <div class="operate fll pro-item-same">
                <div class="look" @click="lookDetail(item.productId)">查看</div>
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
  </div>
</template>

<script>
import footerSame from '../component/footerSame'
import wradio from '../component/w-radios'
import wcheckBox from '../component/w-checkBox'
import emptyList from '../assets/empty-list.png'
import { backTop } from '@/util/util'
export default {
  name: 'ProductList',
  components: {
    footerSame,
    wradio,
    wcheckBox
  },
  data() {
    return {
      emptyList,
      formData: [],
      isJianSuo: true,
      searchCon: '',
      cityUp: false, // 城市是否展开
      loanUp: false, // 贷款
      tableData: [],
      cities: [],
      loans: [], // 贷款类型
      business: [], // 业务分类
      loanLimits: [{}], // 贷款额度
      loanRates: [{}], // 贷款利
      loanLifes: [], // 贷款期限
      loanConditions: [], // 贷款条件
      query: {
        city: '',
        loan: '',
        business: '',
        loanLimit: '',
        loanRate: '',
        loanLife: '',
        loanCondition: ''
      },
      page: 1,
      size: 5,
      count: 0,
      Searchpn: 1,
      Searchpage: 5,
      Searchcount: 1
    }
  },
  watch: {
    'query.city': function(val) {
      (this.page = 1), (this.size = 5), (this.isJianSuo = true)
      this.searchCon = ''
      this.getDataCondition()
    },
    'query.loan': function(val) {
      (this.page = 1), (this.size = 5), (this.isJianSuo = true)
      this.searchCon = ''
      this.getDataCondition()
    },
    'query.business': function(val) {
      (this.page = 1), (this.size = 5), (this.isJianSuo = true)
      this.searchCon = ''
      this.getDataCondition()
    },
    'query.loanLimit': function(val) {
      (this.page = 1), (this.size = 5), (this.isJianSuo = true)
      this.searchCon = ''
      this.getDataCondition()
    },
    'query.loanRate': function(val) {
      (this.page = 1), (this.size = 5), (this.isJianSuo = true)
      this.searchCon = ''
      this.getDataCondition()
    },
    'query.loanLife': function(val) {
      (this.page = 1), (this.size = 5), (this.isJianSuo = true)
      this.searchCon = ''
      this.getDataCondition()
    },
    'query.loanCondition': function(val) {
      (this.page = 1), (this.size = 5), (this.isJianSuo = true)
      this.searchCon = ''
      this.getDataCondition()
    }
  },
  created() {
    this.getData()
    this.getCity()
    this.getLoanType()
    this.getBusinessType()
    this.getLoanLimit()
    this.getLoanLife()
    this.getLoanCondition()
    this.getProRate()
  },
  methods: {
    search() {
      this.isJianSuo = false
      if (this.searchCon) {
        this.$axios
          .get(
            `solr/getPageProduct?q=${this.searchCon}&page=${
              this.Searchpn
            }&size=${this.Searchpage}`
          )
          .then(res => {
            console.log('产品', res)
            this.formData = res.data
            this.Searchcount = res.total
          })
      } else {
        this.$message.warning('请输入查询内容')
      }
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
      this.getDataCondition()
    },
    handleSizeChange(val) {
      this.size = val
      this.getDataCondition()
    },
    getData() {
      this.$axios
        .get(`/product/getLimitProduct/${this.page}/${this.size}`)
        .then(res => {
          this.tableData = res.list
          this.count = res.totalCount
          backTop()
        })
    },
    // 根据条件
    getDataCondition() {
      this.$axios
        .get(
          `product/selectByCondition?agencyAddress=${
            this.query.city
          }&productLoanType=${this.query.loan}&productType=${
            this.query.business
          }&productAmount=${this.query.loanLimit}&interest=${
            this.query.loanRate
          }&productLife=${this.query.loanLife}&productProperty=${
            this.query.loanCondition
          }&currentPage=${this.page}&pageSize=${this.size}`
        )
        .then(res => {
          this.tableData = res.list
          this.count = res.totalCount
        })
    },
    // 获取地区
    getCity() {
      this.$axios.get('city/getAHotCity').then(res => {
        this.cities = res.map(item => {
          return { value: item.hid, label: item.cname }
        })
      })
    },
    //  展开或关闭城市
    citySpread() {
      this.cityUp = !this.cityUp
    },
    loanSpread() {
      this.loanUp = !this.loanUp
    },
    // 查看进入详情页
    lookDetail(id) {
      this.$router.push(`productDetail/${id}`)
    },
    // 贷款类型
    getLoanType() {
      this.$axios.get('get/getLoanType').then(res => {
        this.loans = res.map(item => {
          return { value: item.id, label: item.typeName }
        })
      })
    },
    // 业务分类
    getBusinessType() {
      this.$axios.get('get/getType').then(res => {
        this.business = res.map(item => {
          return { value: item.id, label: item.busName }
        })
      })
    },
    // 贷款额度
    getLoanLimit() {
      this.$axios.get('get/getAmount').then(res => {
        this.loanLimits = res.map(item => {
          return { value: item.id, label: item.amountName }
        })
      })
    },
    // 利率
    getProRate() {
      this.$axios.get('get/getInterest').then(res => {
        this.loanRates = res.map(item => {
          return { value: item.id, label: item.interestName }
        })
      })
    },
    // 贷款期限
    getLoanLife() {
      this.$axios.get('get/getServiceLife').then(res => {
        this.loanLifes = res.map(item => {
          return { value: item.id, label: item.lifeName }
        })
      })
    },
    // 贷款条件
    getLoanCondition() {
      this.$axios.get('get/getLoanRequirements').then(res => {
        this.loanConditions = res.map(item => {
          return { value: item.lrId, label: item.lrName }
        })
      })
    }
  }
}
</script>

<style scoped lang="scss">
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
.mb40 {
  margin-bottom: 40px;
}

.mb15 {
  margin-bottom: 15px;
}
.mb20 {
  margin-bottom: 20px;
}

.empty-list {
  background: #fff;
  padding: 30px 0 50px;
  text-align: center;
  .empty-img {
    width: 200px;
  }
  p {
    margin-top: 50px;
    color: #999;
  }
}
.image {
  img {
    width: 100%;
    height: auto;
  }
}
.area {
  padding: 20px 18px;
  box-sizing: border-box;
  width: 902px;
  background: rgba(255, 255, 255, 1);
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
.organ-loan {
  width: 96px;
  height: 24px;
  font-size: 24px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(0, 0, 0, 1);
  line-height: 24px;
}
.loans-pro {
  width: 1200px;

  background: rgba(255, 255, 255, 1);

  .loans-header {
    height: 53px;
    box-shadow: 2px 2px 4px 1px #fefefe;
    .header-same {
      text-align: center;
      width: 171px;
      height: 53px;
      font-size: 16px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(81, 81, 81, 1);
      line-height: 53px;
    }
  }

  .loans-pro-item {
    height: 80px;
    .pro-item-same {
      width: 171px;
      line-height: 80px;
      text-align: center;
    }
    .rate {
      font-size: 16px;
      font-weight: bold;
      color: rgba(168, 14, 14, 1);
    }
    .name {
      font-size: 16px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(81, 81, 81, 1);
    }
    .time {
      font-size: 16px;
      font-family: PingFangSC-Regular;
      font-weight: bold;
      color: rgba(168, 14, 14, 1);
    }
    .limit {
      font-size: 16px;
      font-family: DINAlternate-Bold;
      font-weight: bold;
      color: rgba(168, 14, 14, 1);
    }
    .deadline {
      font-size: 16px;
      font-family: PingFangSC-Regular;
      font-weight: bold;
      color: rgba(168, 14, 14, 1);
    }
    .bank {
      font-size: 16px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(81, 81, 81, 1);
    }
    .operate {
      font-size: 16px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(155, 155, 155, 1);
      .look {
        width: 120px;
        height: 50px;
        line-height: 50px;
        margin-top: 14px;
        margin-left: 27px;
        cursor: pointer;
      }
    }

    &:hover {
      box-shadow: 0px 4px 13px 0px rgba(217, 217, 217, 1);
      background: rgba(250, 250, 250, 1);
    }
    &:hover .operate .look {
      background: rgba(168, 14, 14, 1);
      color: rgba(255, 255, 255, 1);
    }
  }
}
.page {
  margin-top: 24px;
  text-align: right;
  margin-bottom: 30px;
}
</style>
