<template>
  <div class="product-wrap">
    <main class="product-main">
      <section class="top">
        <div :class="{ toggle: filterBoxToggle }" class="filter-container">
          <div class="filter-main">
            <div class="filter-item">
              <div class="label">所在地区</div>
              <div class="filter-content">
                <city-radios :conditions="cityShowNum" @selectProvince="selectProvince" @selectCity="selectCity"/>
              </div>
              <div :class="{ toggle: cityShowNum !== 6 }" class="toggle-item" @click="handleCityShow">
                {{ cityShowNum === 6 ? '展开' : '收起' }}
              </div>
            </div>
            <div class="filter-item">
              <div class="label">贷款类型</div>
              <div class="filter-content">
                <filter-list :data-list="loansTypeOptions" v-model="listQuery.productLoanType" @change="handleChange"/>
              </div>
            </div>
            <div class="filter-item">
              <div class="label">业务分类</div>
              <div class="filter-content">
                <filter-list :data-list="businessTypeOptions" v-model="listQuery.productType" @change="handleChange"/>
              </div>
            </div>
            <template v-if="filterBoxToggle">
              <div class="filter-item">
                <div class="label">贷款额度</div>
                <div class="filter-content">
                  <filter-list :data-list="loanAmountOptions" v-model="listQuery.productAmount" :options="{ key: 'amountName', value: 'id' }" @change="handleChange"/>
                </div>
              </div>
              <div class="filter-item">
                <div class="label">贷款利率（月）</div>
                <div class="filter-content">
                  <filter-list :data-list="intersetOptions" v-model="listQuery.interest" :options="{ key: 'interestName', value: 'id' }" @change="handleChange"/>
                </div>
              </div>
              <div class="filter-item">
                <div class="label">贷款期限</div>
                <div class="filter-content">
                  <filter-list :data-list="lifeOptions" v-model="listQuery.productLife" :options="{ key: 'lifeName', value: 'id' }" @change="handleChange"/>
                </div>
              </div>
              <div class="filter-item">
                <div class="label">贷款条件</div>
                <div class="filter-content">
                  <filter-list :data-list="conditionOptions" v-model="listQuery.productProperty" :options="{ key: 'lrName', value: 'lrId' }" :mutiple="true" @change="handleChange"/>
                </div>
              </div>
            </template>
          </div>
          <div class="tips-btn" @click="handleMore">{{ filterBoxToggle ? '收起更多' : '展开更多' }}</div>
        </div>
        <div class="right">
          <div class="input-wrap">
            <input v-model="searchKey" type="text" placeholder="请输入内容"><span @click="handleSearch">搜索</span>
          </div>
          <div class="img-box">
            <div>
              <img src="../../../static/resource/organ/veri.png" alt="">
              <div class="organ-text">专业认证</div>
            </div>
            <div>
              <img src="../../../static/resource/organ/xin.png" alt="">
              <div class="organ-text">信誉平台</div>
            </div>
            <div>
              <img src="../../../static/resource/organ/mian.png" alt="">
              <div class="organ-text">免费服务</div>
            </div>
          </div>
        </div>
      </section>
      <section class="bottom">
        <div class="title">贷款产品</div>
        <div class="list">
          <div v-loading="listLoading" element-loading-text="数据正在加载中..." element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.5)" class="table-main">
            <ul>
              <li class="table-header">
                <div>产品名称</div>
                <div>额度</div>
                <div>使用年限</div>
                <div>利息</div>
                <div>放款时间</div>
                <div>发行机构</div>
                <div>操作</div>
              </li>
              <li v-for="(item, index) in resultList" :key="index">
                <div v-if="conditionQuery" class="base-color">{{ item.productName }}</div>
                <div v-else class="base-color" v-html="item.productName"/>
                <div class="theme-color">{{ item.productStartAmount }}-{{ item.productEndAmount }}万</div>
                <div class="theme-color">{{ item.productLife }}</div>
                <div class="theme-color">{{ item.productInterest }}%</div>
                <div class="theme-color">{{ item.producLoanLength }}</div>
                <div class="base-color">{{ item.productPublisher }}</div>
                <div class="base-color">
                  <span class="btn" @click="handleDetail(item)">立即查看</span>
                </div>
              </li>
            </ul>
            <div v-if="resultList.length == 0" class="empty-list">
              <img :src="emptyList" alt="" class="empty-img">
              <p>暂无数据...</p>
            </div>
          </div>
        </div>
        <div class="page-container">
          <el-pagination
            :current-page="listQuery.currentPage"
            :page-size="listQuery.pageSize"
            :pager-count="5"
            :total="totalCount"
            background=""
            layout="prev, pager, next"
            @current-change="handleCurrentChange"/>
        </div>
      </section>
      <footerSame/>
    </main>
    <bottomTap/>
  </div>
</template>

<script>
import cityRadios from '@/component/cityRadios'
import footerSame from '@/component/footerSame'
import filterList from '@/component/filter'
import { fetchList, searchByKey } from '@/api/productList'
import emptyList from '@/assets/empty-list.png'
import bottomTap from '@/component/bottomTap'
import { param2Obj } from '@/util/util'
import { fetchAmount, fetchInterest, fetchLife, fetchCondition } from '@/api/filterCondition'
const loansTypeOptions = [
  { label: '不限', value: 0 },
  { label: '信用贷', value: 1 },
  { label: '抵押贷', value: 2 }
]
const businessTypeOptions = [
  { label: '不限', value: 0 },
  { label: '个人贷款', value: 1 },
  { label: '企业贷款', value: 2 }
]
export default {
  name: 'ProductList',
  components: {
    cityRadios,
    footerSame,
    filterList,
    bottomTap
  },
  data() {
    return {
      emptyList,
      loansTypeOptions,
      businessTypeOptions,
      loanAmountOptions: [],
      intersetOptions: [],
      lifeOptions: [],
      conditionOptions: [],
      filterBoxToggle: false,
      cityShowNum: 6,
      listLoading: false,
      searchKey: '',
      listQuery: {
        currentPage: 1,
        pageSize: 10,
        address1: '',
        address2: '',
        productLoanType: '', // 贷款类型
        productType: '', // 业务分类
        productAmount: '', // 额度
        interest: '', // 利率
        productLife: '', // 期限
        productProperty: '' // 条件
      },
      resultList: [],
      totalCount: 0
    }
  },
  created() {
    const params = param2Obj(window.location.href)
    if (params.type) {
      this.listQuery.productProperty = params.type
    }
    if (params.param) {
      const param = JSON.parse(params.param)
      this.listQuery.productAmount = param.loanAmount
      this.listQuery.productLife = param.loanTime
    }
    this.getList()
    this.getAmount()
    this.getInterest()
    this.getLife()
    this.getCondition()
  },
  methods: {
    getList() {
      this.conditionQuery = true
      this.listLoading = true
      fetchList(this.listQuery).then(res => {
        this.listLoading = false
        this.resultList = res.data.list
        this.totalCount = res.data.totalCount
      })
    },
    getAmount() {
      fetchAmount().then(res => {
        this.loanAmountOptions = res.data
      })
    },
    getInterest() {
      fetchInterest().then(res => {
        this.intersetOptions = res.data
      })
    },
    getLife() {
      fetchLife().then(res => {
        this.lifeOptions = res.data
      })
    },
    getCondition() {
      fetchCondition().then(res => {
        this.conditionOptions = res.data.map(item => {
          item.flag = false
          return item
        })
      })
    },
    selectProvince(val) {
      this.listQuery.address1 = val.pid
      this.listQuery.address2 = ''
      this.getList()
    },
    selectCity(val) {
      this.listQuery.address1 = val.pid
      this.listQuery.address2 = val.cid
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.currentPage = val
      console.log(this.listQuery.currentPage)
      if (this.conditionQuery) {
        this.getList()
      } else {
        this.searchList()
      }
    },
    handleChange() {
      this.getList()
    },
    handleSearch() {
      this.resetForm()
      this.searchList()
    },
    searchList() {
      this.listLoading = true
      this.conditionQuery = false
      const obj = {
        q: this.searchKey,
        page: this.listQuery.currentPage,
        size: this.listQuery.pageSize
      }
      searchByKey(obj).then(res => {
        this.listLoading = false
        this.resultList = res.data.data
        this.totalCount = res.data.total
      })
    },
    handleMore() {
      this.filterBoxToggle = !this.filterBoxToggle
    },
    handleCityShow() {
      this.cityShowNum = this.cityShowNum === 6 ? 50 : 6
    },
    handleDetail(item) {
      this.$router.push(`productDetail?id=${item.productId}`)
    },
    resetForm() {
      this.listQuery = {
        currentPage: 1,
        pageSize: 5,
        address1: '',
        address2: '',
        productLoanType: '', // 贷款类型
        productType: '', // 业务分类
        productAmount: '', // 额度
        interest: '', // 利率
        productLife: '', // 期限
        productProperty: '' // 条件
      }
    }
  }
}
</script>

<style scoped lang="scss">
.base-color {
  color: $jnd-font-color-base;
}
.theme-color {
  color: $jnd-font-color-theme;
}
.product-wrap {
  background: #F5F5F5;
  min-height: 100vh;
  height: auto;
  padding-top: 30px;
  font-size: $jnd-font-size-base;
  .product-main {
    width: 1200px;
    margin: 0 auto 30px;
    .top {
      @include clearfix;
      width: 1200px;
      margin: 0 auto;
      .filter-container, .right {
        background: $jnd-bg-color-white;
      }
      .filter-container {
        width: 902px;
        height: auto;
        float: left;
        padding-bottom: 20px;
        position: relative;
        box-sizing: border-box;
        transition: height .5s ease;
        &.toggle {
          transition: all .5s ease;
          .tips-btn::after {
            transform: rotate(180deg);
            vertical-align: top;
          }
        }
        .tips-btn {
          @include arrow;
          position: absolute;
          top: 100%;
          left: 50%;
          height: 20px;
          width: 80px;
          transform: translateX(-50%);
          background: #EBEBEB;
          font-size: $jnd-font-size-small;
          text-align: center;
          line-height: 20px;
          cursor: pointer;
        }
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
      }
      .right {
        width: 268px;
        height: 201px;
        float: right;
        padding: 10px 18px;
        box-sizing: border-box;
        .input-wrap {
          width: 232px;
          height: 40px;
          display: flex;
          align-items: center;
          margin-bottom: 44px;
          input {
            width: 170px;
            box-sizing: border-box;
            height: 40px;
            padding-left: 10px;
            border:1px solid #CDCDCD;
            outline: none;
            border-radius: 4px 0 0 4px;
            border-right: none;
          }
          span {
            width: 60px;
            height: 40px;
            background: $jnd-bg-color-theme;
            border-radius:0px 4px 4px 0px;
            color: $jnd-font-color-white;
            line-height: 40px;
            text-align: center;
            cursor: pointer;
          }
        }
        .img-box {
          display: flex;
          justify-content: space-around;
          .organ-text {
            margin-top: 10px;
            color: $jnd-font-color-base;
          }
        }
      }
    }
    .bottom {
      width: 1200px;
      margin: 50px auto 0;
      .title {
        font-size: $jnd-font-size-title;
        color: $jnd-font-color-black;
        margin-bottom: 20px;
      }
      .list {
        background: $jnd-bg-color-white;
        .table-main {
          min-height: 300px;
          li {
            display: flex;
            justify-content: space-around;
            align-items: center;
            height: 80px;
            transition: all .5s;
            text-align: center;
            &.table-header {
              height: 48px;
              font-size: $jnd-font-size-big;
              color: $jnd-font-color-gray;
            }
            div {
              width: calc(100% / 7);
              .btn {
                display: inline-block;
                width:120px;
                height:50px;
                margin: 0 auto;
                line-height: 50px;
              }
            }
            &:hover {
              background: #FAFAFA;
              .btn {
                color: $jnd-font-color-white;
                background: $jnd-bg-color-theme;
                cursor: pointer;
              }
            }
          }
        }
      }
      .page-container {
        margin-top: 20px;
        text-align: right;
      }
    }
  }
}
</style>
