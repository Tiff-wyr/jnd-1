<template>
  <div>
    <div class="wrappy">
      <div class="w1200">
        <div class="clearfix">
          <div class="area fll">
            <div class="area-item clearfix">
              <div class="fll city">所在地区</div>

              <city-radios :conditions="conditionsNum" class="fll" style="width: 700px;" @selectProvince="selectProvince" @selectCity="selectCity"/>
              <div class="up" @click="citySpread">
                展开
                <span :class="cityUp? 'arrow rotate' : 'arrow' "/>
              </div>
            </div>
            <div class="clearfix mb15">
              <div class="fll city">贷款类型</div>
              <wradio :radios="loans" v-model="query.loanType" name="loan" class="fll"/>
            </div>
            <div class="clearfix mb15">
              <div class="fll city">业务分类</div>
              <wradio :radios="business" v-model="query.businessType" name="business" class="fll"/>
            </div>
            <div class="clearfix area-item">
              <div class="fll city">擅长业务</div>
              <div
                :class="goodUp? 'fll radio-wrap clearfix radio-wrap-active' : 'fll radio-wrap clearfix'"
              >
                <wcheckbox :radios="goods" v-model="query.selectedBusiness" name="good" class="fll"/>
              </div>
              <div class="up" @click="goodSpread">
                展开
                <span :class="goodUp? 'arrow rotate' : 'arrow' "/>
              </div>
            </div>
          </div>
          <div class="fll organ-right">
            <div class="clearfix mb40">
              <input v-model="listQuery.q" type="text" class="fll con-search" placeholder="请输入内容">
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
          <div class="organ-loan">贷款顾问</div>
        </div>
        <div v-if="isJianSuo">
          <div v-if="tableData.length == 0" class="empty-list">
            <img :src="emptyList" alt="" class="empty-img">
            <p>暂无数据...</p>
          </div>
          <div v-for="(item, index) in tableData" :key="index" class="adviser clearfix">
            <div class="pic fll">
              <img
                v-if="item.image"
                :src="item.image"
                alt=""
              >
              <img
                v-else
                src="/static/resource/pic/agent.png"
                alt=""
              >
            </div>
            <div class="fll ml36">
              <div class="adviser-name">{{ item.brokerName }}</div>
              <div class="clearfix">
                <div class="fll adviser-same">业务范畴:&nbsp;</div>
                <div class="fll adviser-same ww320">{{ item.businessScopeInfo }}</div>
              </div>
              <div class="clearfix mt10">
                <div class="fll adviser-same">业务介绍:&nbsp;</div>
                <div class="fll adviser-same w320">{{ item.introduction }}</div>
              </div>
            </div>
            <div class="fll num">{{ item.phone | phoneFilter }}</div>
            <div class="fll adviser-btn" @click="detail(item.brokerId)">立即查看</div>
          </div>
          <div class="page">
            <el-pagination
              :current-page="pn"
              :page-size="page"
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
          <div v-if="formData.length == 0" class="empty-list">
            <img :src="emptyList" alt="" class="empty-img">
            <p>暂无数据...</p>
          </div>
          <div v-for="(item, index) in formData" :key="index" class="adviser clearfix">
            <div class="pic fll">
              <img
                v-if="item.image"
                :src="item.image"
                alt="头像"
                title="头像"
              >
              <img
                v-else
                src="/static/resource/pic/agent.png"
                alt="头像"
              >
            </div>
            <div class="fll ml36">
              <div class="adviser-name">{{ item.brokerName }}</div>
              <div class="clearfix">
                <div class="fll adviser-same">业务范畴:&nbsp;</div>
                <div class="fll adviser-same ww320" v-html="item.businessScopeInfo"/>
              </div>
              <div class="clearfix mt10">
                <div class="fll adviser-same">业务介绍:&nbsp;</div>
                <div class="fll adviser-same w320">{{ item.introduction }}</div>
              </div>
            </div>
            <div class="fll num">{{ item.phone | phoneFilter }}</div>
            <div class="fll adviser-btn" @click="detail(item.brokerId)">立即查看</div>
          </div>
          <div class="page">
            <el-pagination
              :current-page="listQuery.page"
              :page-size="listQuery.pageSize"
              :total="Searchcount"
              layout="prev, pager, next"
              @current-change="handleCurrentChange"
            />
          </div>
        </div>
        <footerSame/>
      </div>
    </div>
    <router-view/>
    <bottomTap/>
  </div>
</template>

<script>
import bottomTap from '../component/bottomTap'
import footerSame from '../component/footerSame'
import wradio from '../component/w-radios'
import cityRadios from '@/component/cityRadios'
import wcheckbox from '../component/w-checkBox'
import emptyList from '../assets/empty-list.png'
import detailApi from '@/api/detail'
import { backTop } from '@/util/util'
import banner01 from '@/assets/banner01.png'
import banner02 from '@/assets/banner02.png'
import banner03 from '@/assets/banner03.png'
const bannerList = [banner01, banner02, banner03]
import { formatPhone } from '@/util/util'
import { HappyScroll } from 'vue-happy-scroll'
import 'vue-happy-scroll/docs/happy-scroll.css'
export default {
  name: 'Agent',
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
  components: {
    footerSame,
    wradio,
    cityRadios,
    wcheckbox,
    HappyScroll,
    bottomTap
  },
  data() {
    return {
      bannerList,
      emptyList,
      isJianSuo: true,
      isMask: false,
      viewing: false,
      isShowing: true,
      showing: true,
      cityUp: false, // 城市是否展开
      goodUp: false,
      verifyCode: '获取验证码',
      time: '60',
      labelPosition: 'right',
      formLabelAlign: {
        name: '',
        money: '',
        number: '',
        card: ''
      },
      tableData: [],
      formData: [],
      loans: [],
      business: [],
      goods: [], // 擅长业务

      query: {
        address1: '',
        address2: '',
        loanType: '',
        businessType: '',
        selectedBusiness: ''
      },
      pn: 1,
      page: 10,
      count: 1,
      Searchpn: 1,
      Searchpage: 10,
      Searchcount: 1,
      listQuery: {
        page: 1,
        pageSize: 10,
        roleId: 2,
        q: ''
      },
      conditionsNum: 6
    }
  },
  watch: {
    'query.loanType': function(val) {
      this.handleGetCondition()
    },
    'query.businessType': function(val) {
      this.handleGetCondition()
    },
    'query.selectedBusiness': function(val) {
      this.handleGetCondition()
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.getCondition()
    })
  },
  created() {
    this.getCondition()
    this.getGoods()
    this.getLoanType()
    this.getBusinessType()
  },
  methods: {
    handleGetCondition() {
      this.pn = 1
      this.page = 10
      this.isJianSuo = true
      this.getCondition('search')
    },
    selectProvince(val) {
      console.log(val)
      this.query.address1 = val.pid
      this.query.address2 = ''
      this.handleGetCondition('search')
    },
    selectCity(val) {
      this.query.address1 = val.pid
      this.query.address2 = val.cid
      this.handleGetCondition('search')
    },
    search() { // 搜索
      this.listQuery.page = 1
      this.isJianSuo = false
      if (this.listQuery.q) {
        detailApi.getAngentList(this.listQuery).then(res => {
          this.formData = res.data.data
          this.Searchcount = res.data.total
        })
      }
    },
    // 根据条件
    getCondition(type) {
      this.$axios
        .get(
          `userBroker/showPageUserBrokerByCondition`, {
            ...this.query,
            pn: this.pn,
            page: this.page
          }
        )
        .then(res => {
          this.tableData = res.rows
          this.count = res.total
          if (type !== 'search') {
            backTop()
          }
        })
    },
    // 获取擅长业务
    getGoods() {
      this.$axios.get(`business/getAllBusiness`).then(res => {
        this.goods = res.map(item => {
          return { value: item.businessId, label: item.business }
        })
      })
    },
    // 经纪人详情
    detail(id) {
      this.$router.push(`agentDetail/${id}`)
    },
    handleCurrentChange(val) {
      this.pn = val
      this.getCondition()
    },
    handleSizeChange(val) {
      this.page = val
      this.getCondition()
    },
    mask() {
      this.isMask = true
      this.viewing = true
    },
    applyLoan() {
      setTimeout(() => {
        this.isShowing = false
      }, 500)
    },
    returnF() {
      setTimeout(() => {
        this.$router.push('/home')
      }, 500)
    },
    closeW() {
      setTimeout(() => {
        this.isMask = false
        this.viewing = false
        this.isShowing = true
      }, 500)
    },
    //  展开或关闭城市
    citySpread() {
      this.cityUp = !this.cityUp
      if (this.cityUp) {
        this.conditionsNum = 35
      } else {
        this.conditionsNum = 6
      }
    },
    goodSpread() {
      this.goodUp = !this.goodUp
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
    }
  }
}
</script>
<style scoped lang="scss">
.mb40 {
  margin-bottom: 40px;
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
.mt40 {
  margin-top: 40px;
}
.mt20 {
  margin-top: 20px;
}
.mb20 {
  margin-bottom: 20px;
}
.mb15 {
  margin-bottom: 15px;
}
.mt10 {
  margin-top: 10px;
}
.ml36 {
  margin-left: 36px;
}
.organ {
  img {
    width: 100%;
    height:448px;
  }
}
.area {
  width: 902px;
  padding: 20px 18px;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 1);
  .area-item {
    position: relative;
    margin-bottom: 15px;
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
  width: 168px;
  height: 28px;
  font-size: 24px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(0, 0, 0, 1);
  line-height: 28px;
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
.page {
  margin-top: 24px;
  text-align: right;
}
.adviser {
  position: relative;
  width: 1200px;
  height: 180px;
  background: rgba(255, 255, 255, 1);
  padding: 26px 40px;
  box-sizing: border-box;
  .pic {
    width: 128px;
    height: 128px;
    border-radius: 50%;
    overflow: hidden;
    text-align: center;
    img {
      width: 100%;
      transform: translateY(-14px);
    }
  }
  .adviser-name {
    height: 20px;
    font-size: 20px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(81, 81, 81, 1);
    line-height: 20px;
    margin-top: 27px;
    margin-bottom: 10px;
  }
  .adviser-same {
    height: 14px;
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(127, 127, 127, 1);
    line-height: 14px;
  }
  .ww320 {
    width: 270px;
    height: 14px;
    line-height: 14px;
    overflow: hidden;
  }
  .w320 {
    line-height: 18px;
    width: 270px;
    height: 36px;
    overflow: hidden;
  }
  .num {
    width: 135px;
    height: 24px;
    font-size: 20px;
    font-family: DINAlternate-Bold;
    font-weight: bold;
    color: rgba(81, 81, 81, 1);
    margin-top: 52px;
    margin-left: 184px;
    overflow: hidden;
  }
  .adviser-btn {
    width: 100px;
    height: 50px;
    background: rgba(255, 255, 255, 1);
    border-radius: 4px;
    font-size: 16px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(81, 81, 81, 1);
    line-height: 50px;
    text-align: center;
    margin-top: 39px;
    margin-left: 184px;
    cursor: pointer;
  }
  &:hover {
    z-index: 998;
    box-shadow: 0px 0px 14px 0px rgba(217, 217, 217, 1);
  }
  &:hover .adviser-btn {
    background: rgba(168, 14, 14, 1);
    color: rgba(255, 255, 255, 1);
  }
}

.mask {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: #000;
  opacity: 0.7;
}
.contain {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 700px;
  height: 500px;
  background-color: #fff;
  padding: 36px 0;
  box-sizing: border-box;
  .progress {
    height: 92px;
    background: rgba(240, 240, 240, 1);
    padding: 20px 30px;
    box-sizing: border-box;
    .text {
      height: 12px;
      font-size: 12px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(81, 81, 81, 1);
      line-height: 12px;
      margin-bottom: 5px;
    }
    img {
      width: 36px;
      height: 36px;
    }
    .pro-line {
      position: relative;
      width: 550px;
      height: 8px;
      background: rgba(217, 217, 217, 1);
      margin-top: 30px;
      margin-right: 5px;
      border-radius: 3px;
      overflow: hidden;
      .yellow {
        position: absolute;
        left: 0;
        top: 0;
        width: 275px;
        height: 6px;
        margin-top: 1px;
        background: rgba(208, 172, 86, 1);
        border-radius: 3px;
      }
    }
  }
  .form-line {
    width: 1px;
    height: 229px;
    background-color: #ccc;
    margin: 0 30px;
  }
  .special {
    margin-top: 40px;
    width: 70px;
    height: 14px;
    font-size: 14px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(81, 81, 81, 1);
    line-height: 14px;
  }
  .text1 {
    width: 200px;
    height: 51px;
    font-size: 12px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(155, 155, 155, 1);
    line-height: 17px;
    margin-top: 16px;
  }
  .text2 {
    width: 200px;
    height: 34px;
    margin-top: 20px;
    line-height: 17px;
    font-size: 12px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(155, 155, 155, 1);
  }
  .mask-btn {
    width: 330px;
    height: 46px;
    background: rgba(208, 172, 86, 1);
    border-radius: 4px;
    text-align: center;
    font-size: 16px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 46px;
    margin: 20px auto;
    cursor: pointer;
  }
  .middle {
    width: 600px;
    height: 240px;
    margin: 0 auto;
  }
  .verify {
    .send {
      text-align: center;
      width: 85px;
      height: 38px;
      border-radius: 6px;
      border: 1px solid #ccc;
      font-size: 12px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(81, 81, 81, 1);
      line-height: 38px;
      margin-left: 15px;
      cursor: pointer;
      background: rgba(216, 216, 216, 1);
    }
    .time {
      font-size: 16px;
      color: #888;
    }
  }
}
.victory {
  width: 700px;
  height: 337px;
  background: rgba(255, 255, 255, 1);
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 36px 0;
  box-sizing: border-box;
  .progress {
    height: 92px;
    background: rgba(240, 240, 240, 1);
    padding: 20px 30px;
    box-sizing: border-box;
    .text {
      height: 12px;
      font-size: 12px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(81, 81, 81, 1);
      line-height: 12px;
      margin-bottom: 5px;
    }
    img {
      width: 36px;
      height: 36px;
    }
    .pro-line {
      position: relative;
      width: 550px;
      height: 8px;
      background: rgba(217, 217, 217, 1);
      margin-top: 30px;
      margin-right: 5px;
      border-radius: 3px;
      overflow: hidden;
      .yellow {
        position: absolute;
        left: 0;
        top: 0;
        width: 550px;
        height: 6px;
        margin-top: 1px;
        background: rgba(208, 172, 86, 1);
        border-radius: 3px;
      }
    }
  }
  .victory-text1 {
    height: 14px;
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(81, 81, 81, 1);
    line-height: 14px;
  }
  .return,
  .close {
    cursor: pointer;
    width: 56px;
    height: 20px;
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(81, 81, 81, 1);
    line-height: 20px;
  }
}
</style>
