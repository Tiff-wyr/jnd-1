<template>
  <div>
    <div class="wrappy">
      <div class="w1200">
        <div class="clearfix">
          <div class="loan-left fll">
            <div v-for="(item,index) in proData" :key="index" class="left1 clearfix">
              <img :src="item.productOccupation" alt="" class="fll">
              <div class="fll left-one">
                <div class="salary mt4">{{ item.productProperty }}</div>
                <div class="credit mt18">{{ item.productCharacteristic }}</div>
              </div>
              <div class="fll left-two">
                <div class="same mt14">抵押物:
                  <span class="toge">&nbsp;{{ item.productCondition }}</span>
                </div>
                <div class="same mt18">利率范围:
                  <span class="toge">&nbsp;{{ item.productInterest }}%</span>
                </div>
              </div>
              <div class="fll left-three">
                <div class="same mt14">到账时间：
                  <span class="toge">&nbsp;{{ item.producLoanLength }}</span>
                </div>
                <div class="same mt18">贷款金额:
                  <span class="toge">&nbsp;&nbsp;最高{{ item.productEndAmount }}万</span>
                </div>
              </div>
              <div class="btn fll left-four" @click="enterDetail">立即查看</div>
            </div>
          </div>
          <div class="loan-right fll">
            <div class="top">
              <div class="agent-rank">经纪人排行榜</div>
              <div
                v-for="(item,index) in agentNumData"
                :key="index"
                class="rank-item clearfix fs"
                @click="enterAgent(item.brokerId)"
              >
                <div class="fll" style="width: 50px;text-align: center;margin-top: 13px;">
                  <img :src="item.icon" alt="">
                </div>
                <img v-if="item.image" :src="item.image" alt="" class="fll agent-img">
                <img v-else src="/static/resource/pic/agent.png" alt="" class="fll agent-img">
                <div class="fll ml5">
                  <div class="clearfix mt8 w120">
                    <div class="name fll">{{ item.brokerName }}</div>
                    <!-- <div class="num flr">{{item.count}}笔</div> -->
                  </div>
                  <div class="desc">{{ item.company }}</div>
                </div>
              </div>
            </div>
            <div class="bottom" @click="$router.push('/agent')">更多顾问>></div>
          </div>
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
import banner01 from '@/assets/banner01.png'
import banner02 from '@/assets/banner02.png'
import banner03 from '@/assets/banner03.png'
const bannerList = [banner01, banner02, banner03]
export default {
  name: 'Loans',
  components: {
    footerSame,
    bottomTap
  },
  data() {
    return {
      bannerList,
      emptyList,
      tableData: [],
      formData: [],
      page: 1,
      size: 5,
      count: 1,
      agentNumData: [],
      proData: []
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.getData()
    })
  },
  created() {
    this.getData()
    // 经纪人排行榜
    this.getAgentNum()
    // 产品
    this.getPro()
  },
  methods: {
    enterAgent(id) {
      this.$router.push(`/agentDetail/${id}`)
    },
    enterDetail(id) {
      this.$router.push(`/productList`)
    },
    lookDetail(id) {
      this.$router.push(`productDetail/${id}`)
    },
    enter() {
      router.push('/productList')
    },
    getData() {
      this.$axios
        .get(`product/getLimitProduct/${this.page}/${this.size}`)
        .then(res => {
          this.tableData = res.list
          this.count = res.totalCount
          backTop()
        })
    },
    getPro() {
      this.$axios.get(`product/proList`).then(res => {
        this.proData = res
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
    getAgentNum() {
      this.$axios.get('userBroker/getUserBrokerByOrderCountDesc').then(res => {
        this.agentNumData = res
      })
    }
  }
}
</script>
<style scoped lang="scss">
.w120 {
  width: 120px;
}
.mb22 {
  margin-bottom: 22px;
}
.ml5 {
  margin-left: 5px;
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

.mt8 {
  margin-top: 8px;
}
.mt18 {
  margin-top: 18px;
}
.mt14 {
  margin-top: 14px;
}
.mt4 {
  margin-top: 4px;
}
.mt68 {
  margin-top: 68px;
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
.loan-left {
  width: 902px;
  height: 580px;
  background: rgba(255, 255, 255, 1);
  padding: 60px 49px 0 49px;
  box-sizing: border-box;
}
.loan-right {
  margin-left: 30px;
  .top {
    width: 268px;
    background: rgba(255, 255, 255, 1);
    .agent-rank {
      text-align: center;
      height: 70px;
      font-size: 20px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(81, 81, 81, 1);
      line-height: 70px;
    }
    .rank-item {
      height: 82px;
      padding: 0 20px 22px 12px;
      box-sizing: border-box;
      cursor: pointer;
      .medal {
        margin-top: 11px;
        margin-right: 4px;
      }
      .agent-img {
        width: 60px;
        height: 60px;
      }
      .name {
        height: 16px;
        font-size: 16px;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: rgba(81, 81, 81, 1);
        line-height: 16px;
      }
      .num {
        height: 16px;
        font-size: 16px;
        font-family: DINAlternate-Bold;
        font-weight: bold;
        color: rgba(81, 81, 81, 1);
        line-height: 16px;
        letter-spacing: 1px;
      }
      .desc {
        height: 12px;
        font-size: 12px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(155, 155, 155, 1);
        line-height: 12px;
        letter-spacing: 1px;
        margin-top: 16px;
      }
    }
  }
  .bottom {
    text-align: center;
    width: 268px;
    height: 31px;
    background: rgba(234, 234, 234, 1);
    font-size: 16px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(155, 155, 155, 1);
    line-height: 31px;
    cursor: pointer;
  }
}
.left1 {
  font-size: 0;
  margin-bottom: 60px;
}

.left-one {
  width: 126px;
  height: 68px;
  margin-left: 30px;
}
.left-two {
  width: 149px;
  height: 68px;
  margin-left: 76px;
}
.left-three {
  width: 151px;
  height: 68px;
  margin-left: 22px;
}
.left-four {
  text-align: center;
  margin-left: 38px;
  width: 120px;
  height: 55px;
  background: rgba(208, 172, 86, 1);
  border-radius: 4px;
  font-size: 18px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 55px;
  margin-top: 10px;
  cursor: pointer;
}
.salary {
  height: 24px;
  font-size: 20px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(81, 81, 81, 1);
  line-height: 24px;
}
.credit {
  height: 14px;
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(127, 127, 127, 1);
  line-height: 14px;
}
.same {
  height: 14px;
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(127, 127, 127, 1);
  line-height: 14px;
}
.toge {
  height: 14px;
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(168, 14, 14, 1);
  line-height: 14px;
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
