<template>
  <div>
    <div class="wrappy">
      <div class="w1200">
        <div class="accordion-wrap">
          <ul class="list">
            <li v-for="(item, index) in items" :key="index" :class="{ active: currentIndex === index }" :style="{ backgroundImage: 'url(' + item.bg + ')' }" class="item" @mouseover="mouseover(index)">
              <h3>{{ item.title }}</h3>
              <div v-if="currentIndex === index" class="content" v-html="item.content"/>
              <a v-if="currentIndex === index" :href="'/productList?type=' + item.key" class="btn">{{ item.title }}</a>
            </li>
          </ul>
        </div>
        <div class="clearfix mt48 mb24">
          <div class="loans-product fll">贷款产品</div>
          <div class="flr clearfix">
            <div class="organ-more fll" @click="enter">更多</div>
            <img src="../../static/resource/right.png" alt="" class="fll img-right">
          </div>
        </div>
        <div class="loans-pro">
          <div class="loans-header clearfix">
            <div class="header-same fll">名称</div>
            <div class="header-same fll">利率</div>
            <div class="header-same fll">使用期限</div>
            <div class="header-same fll">额度</div>
            <div class="header-same fll">放款时间</div>
            <div class="header-same fll">操作</div>
          </div>
          <div v-if="tableData.length == 0" class="empty-list">
            <img :src="emptyList" alt="" class="empty-img">
            <p>暂无数据...</p>
          </div>
          <div v-for="(item,index) in tableData" :key="index" class="loans-pro-item clearfix">
            <div class="name fll">{{ item.productName }}</div>
            <div class="rate fll">{{ item.productInterest }}%</div>
            <div class="deadline fll">{{ item.productLife }}</div>
            <div class="limit fll">{{ item.productStartAmount }}~{{ item.productEndAmount }}万</div>
            <div class="time fll">{{ item.producLoanLength }}</div>
            <div class="operate fll" @click="lookDetail(item.productId)">查看</div>
          </div>
        </div>
        <div class="page">
          <el-pagination
            :page-size="size"
            :pager-count="5"
            :total="count"
            background=""
            layout="prev, pager, next"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
        <footerSame/>
      </div>
    </div>
    <bottomTap/>
  </div>
</template>

<script>
import router from '../router/index'
import footerSame from '../component/footerSame'
import bottomTap from '../component/bottomTap'
import emptyList from '../assets/empty-list.png'
import { backTop } from '@/util/util'
export default {
  name: 'Loans',
  metaInfo: {
    title: '贷款_房贷_车贷_公司贷_工资贷_学生贷_公积金贷_贷款申请_找9能贷款',
    meta: [{
      name: 'keyWords',
      content: '贷款,买房贷款,住房贷款,组合贷款,买车贷款,助学贷款,商业贷款,信用贷款,网上贷款,按揭贷款,装修贷款,小额贷款,按揭贷款,创业贷款,个人贷款,过桥贷款,北京贷款,二手房贷款,二手车贷款,住房公积金贷款,公积金贷款,大学生创业贷款,9能贷款'
    }, {
      name: 'description',
      content: '9能贷款联合各类大型的金融机构,深度挖掘安全的金融服务渠道机构,为用户提供安全、多元的贷款产品和定制化的专业资金服务,打造更契合用户自身需求的贷款管理方案.买房抵押贷款,房屋抵押贷款,房产抵押贷款,汽车抵押贷款,汽车抵押不压车,无抵押贷款.'
    }]
  },
  components: {
    footerSame,
    bottomTap
  },
  data() {
    return {
      currentIndex: 0,
      items: [{
        title: '车贷',
        content: `
          <p>按揭房也能贷</p>
          <p>抵押物: 房产抵押</p>
          <p>到账时间: 3 ~ 7个工作日</p>
          <p>利率范围: 0.35% ~ 0.65%</p>
          <p>贷款金额: 最高3000万</p>
        `,
        bg: '../static/loans/loans0.png',
        key: 6
      }, {
        title: '芝麻分贷',
        content: `
          <p>按揭房也能贷</p>
          <p>抵押物: 房产抵押</p>
          <p>到账时间: 3 ~ 7个工作日</p>
          <p>利率范围: 0.35% ~ 0.65%</p>
          <p>贷款金额: 最高3000万</p>
        `,
        bg: '../static/loans/loans1.png',
        key: 9
      }, {
        title: '信用贷',
        content: `
          <p>按揭房也能贷</p>
          <p>抵押物: 房产抵押</p>
          <p>到账时间: 3 ~ 7个工作日</p>
          <p>利率范围: 0.35% ~ 0.65%</p>
          <p>贷款金额: 最高3000万</p>
        `,
        bg: '../static/loans/loans2.png',
        key: 8
      }, {
        title: '社保贷',
        content: `
          <p>按揭房也能贷</p>
          <p>抵押物: 房产抵押</p>
          <p>到账时间: 3 ~ 7个工作日</p>
          <p>利率范围: 0.35% ~ 0.65%</p>
          <p>贷款金额: 最高3000万</p>
        `,
        bg: '../static/loans/loans3.png',
        key: 3
      }, {
        title: '经营贷',
        content: `
          <p>按揭房也能贷</p>
          <p>抵押物: 房产抵押</p>
          <p>到账时间: 3 ~ 7个工作日</p>
          <p>利率范围: 0.35% ~ 0.65%</p>
          <p>贷款金额: 最高3000万</p>
        `,
        bg: '../static/loans/loans4.png',
        key: 1
      }, {
        title: '公积金贷',
        content: `
          <p>按揭房也能贷</p>
          <p>抵押物: 房产抵押</p>
          <p>到账时间: 3 ~ 7个工作日</p>
          <p>利率范围: 0.35% ~ 0.65%</p>
          <p>贷款金额: 最高3000万</p>
        `,
        bg: '../static/loans/loans5.png',
        key: 4
      }, {
        title: '房贷',
        content: `
          <p>按揭房也能贷</p>
          <p>抵押物: 房产抵押</p>
          <p>到账时间: 3 ~ 7个工作日</p>
          <p>利率范围: 0.35% ~ 0.65%</p>
          <p>贷款金额: 最高3000万</p>
        `,
        bg: '../static/loans/loans6.png',
        key: 7
      }, {
        title: '打卡工资贷',
        content: `
          <p>按揭房也能贷</p>
          <p>抵押物: 房产抵押</p>
          <p>到账时间: 3 ~ 7个工作日</p>
          <p>利率范围: 0.35% ~ 0.65%</p>
          <p>贷款金额: 最高3000万</p>
        `,
        bg: '../static/loans/loans7.png',
        key: 5
      }, {
        title: '保险贷',
        content: `
          <p>按揭房也能贷</p>
          <p>抵押物: 房产抵押</p>
          <p>到账时间: 3 ~ 7个工作日</p>
          <p>利率范围: 0.35% ~ 0.65%</p>
          <p>贷款金额: 最高3000万</p>
        `,
        bg: '../static/loans/loans8.png',
        key: 2
      }],
      emptyList,
      tableData: [],
      formData: [],
      page: 1,
      size: 5,
      count: 1
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.getData()
    })
  },
  created() {
    this.getData()
  },
  methods: {
    lookDetail(id) {
      this.$router.push(`productDetail?id=${id}`)
    },
    enter() {
      router.push('/productList')
    },
    getData() {
      backTop()
      this.$axios.get(`product/getLimitProduct/${this.page}/${this.size}`).then(res => {
        this.tableData = res.list
        this.count = res.totalCount
      })
    },
    handleCurrentChange(val) {
      this.page = val
      this.getData()
    },
    handleSizeChange(val) {
      this.size = val
      this.getData()
    },
    mouseover(val) {
      console.log(1)
      this.currentIndex = val
    }
  }
}
</script>
<style scoped lang="scss">
.accordion-wrap {
  width: 100%;
  height: 560px;
  .list {
    list-style: none;
    display: flex;
    height: 100%;
    color: #fff;
    .item {
      position: relative;
      width: 96px;
      transition: all .5s;
      padding: 50px 16px;
      box-sizing: border-box;
      &.active {
        width: 432px;
      }
      h3 {
        font-size: 20px;
        margin-bottom: 20px;
      }
      .content {
        line-height: 2;
        font-size: 14px;
        white-space: nowrap;
      }
      .btn {
        position: absolute;
        left: 0;
        bottom: 74px;
        height: 40px;
        padding: 0 30px 0 10px;
        box-sizing: border-box;
        line-height: 40px;
        background: #A80E0E;
        color: #fff;
        &::after {
          display: inline-block;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          content: ' ';
          width: 0;
          height: 0;
          right: 0;
          border-width: 6px 6px 6px 14px;
          border-style: solid;
          border-color: transparent transparent transparent #fff;
        }
      }
    }
  }
}
.loans-pro {
  width: 1200px;
  height: auto;
  background: rgba(255, 255, 255, 1);
  .loans-header {
    height: 78px;
    .header-same {
      text-align: center;
      width: 200px;
      height: 78px;
      font-size: 16px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(81, 81, 81, 1);
      line-height: 78px;
    }
  }
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
  /*margin-left: 1030px;*/
  cursor: pointer;
}
.loans-product {
  width: 112px;
  height: 28px;
  font-size: 24px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(0, 0, 0, 1);
  line-height: 28px;
}
.loans-pro-item {
  height: 88px;
  .rate {
    text-align: center;
    width: 200px;
    font-size: 16px;
    font-weight: bold;
    color: rgba(168, 14, 14, 1);
    line-height: 88px;
  }
  .name {
    text-align: center;
    width: 200px;
    font-size: 16px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(81, 81, 81, 1);
    line-height: 88px;
  }
  .time {
    text-align: center;
    width: 200px;
    font-size: 16px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(81, 81, 81, 1);
    line-height: 88px;
  }
  .limit {
    text-align: center;
    width: 200px;
    font-size: 16px;
    font-family: DINAlternate-Bold;
    font-weight: bold;
    color: rgba(168, 14, 14, 1);
    line-height: 88px;
  }
  .deadline {
    text-align: center;
    width: 200px;
    font-size: 16px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(81, 81, 81, 1);
    line-height: 88px;
  }
  .operate {
    text-align: center;
    width: 200px;
    font-size: 16px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(155, 155, 155, 1);
    line-height: 88px;
    cursor: pointer;
  }
  &:hover {
    box-shadow: 0px 4px 13px 0px rgba(217, 217, 217, 1);
  }
  &:hover .operate {
    width: 99px;
    height: 41px;
    background: rgba(168, 14, 14, 1);
    border-radius: 4px;
    font-size: 16px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 41px;
    margin: 24px 50px;
  }
}

.page {
  margin-top: 24px;
  text-align: right;
  margin-bottom: 30px;
}
</style>
