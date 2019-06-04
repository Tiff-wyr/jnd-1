<template>
  <div>
    <div class="wrappy">
      <div class="w1200">
        <div class="clearfix">
          <div class="organ-left fll">
            <div class="area-item clearfix mb15">
              <div class="fll city">所在地区</div>
              <div
                :class="cityUp? 'fll radio-wrap clearfix radio-wrap-active' : 'fll radio-wrap clearfix'"
              >
                <wradio :radios="cities" name="city" v-model="query.city" class="fll"></wradio>
              </div>
              <div class="up" @click="citySpread">
                展开
                <span :class="cityUp? 'arrow rotate' : 'arrow' "></span>
              </div>
            </div>
            <div class="clearfix mb15">
              <div class="fll city">类&nbsp;&nbsp;&nbsp;&nbsp;别</div>
              <wradio :radios="loans" name="loan" v-model="query.loan" class="fll"></wradio>
            </div>
            <div class="clearfix" v-if="isBank">
              <div class="fll city">业&nbsp;&nbsp;&nbsp;&nbsp;务</div>
              <wradio :radios="business" name="business" v-model="query.business" class="fll"></wradio>
            </div>
          </div>
          <div class="organ-right fll">
            <div class="clearfix mb40">
              <input type="text" class="fll con-search" v-model="searchCon" placeholder="请输入内容">
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
          <div class="empty-list" v-if="formData.length == 0">
            <img :src="emptyList" alt="" class="empty-img">
            <p>暂无数据...</p>
          </div>
          <div class="organ-item clearfix mb30" v-for="(item,index) in formData" :key="index">
            <div class="fll align fs img-box">
              <div class="logo">
                <img
                  :src="item.agency.agencyLogo"
                  v-if="item.agency.agencyLogo"
                  alt=""
                >
                <img
                  src="/static/resource/pic/organ.png"
                  v-else
                >
              </div>
              
              <div class="name">{{item.agency.agencyName}}</div>
            </div>
            <div class="fll organ-info">
              <div class="clearfix">
                <div class="organ-rate fll ml40 w180">
                  利率：
                  <span class="percent-rate">{{item.interest}}</span>
                </div>
                <div class="organ-rate fll mt4 w180">注册地:&nbsp;{{item.agency.address}}</div>
                <div class="organ-rate fll mt4 w250">机构类型：&nbsp;{{item.agency.agencyProperty}}</div>
                <div class="organ-rate fll mt4 w250">
                  <a
                    :href="'http://' + item.agency.agencyURL"
                    target="_blank"
                  >网址：&nbsp; {{item.agency.agencyURL ? item.agency.agencyURL : ''}}</a>
                </div>
              </div>
              <div class="desc">机构简介：&nbsp;{{item.agency.agencyIntroduction}}</div>
              <div class="line-desc"></div>
              <div class="clearfix">
                <div class="item2 fll">
                  <div class="item1-num">{{item.product.productName}}</div>
                  <div class="item-same">产品名称</div>
                </div>
                <div class="item1 fll align">
                  <div class="item-num">
                    {{item.product.productInterest}}
                    <span class="percent">%</span>
                  </div>
                  <div class="item-same">利息</div>
                </div>
                <div class="item1 fll align">
                  <div class="item-num">{{item.product.producLoanLength}}</div>
                  <div class="item-same">放款时间</div>
                </div>
                <div class="item1 fll align">
                  <div class="item-num">{{item.product.productLife}}</div>
                  <div class="item-same">使用年限</div>
                </div>
                <div class="item1 fll align">
                  <div class="item-num">
                    {{item.product.productStartAmount}}
                    <span class="percent">万起</span>
                  </div>
                  <div class="item-same">起贷金额</div>
                </div>
                <div class="item1 fll">
                  <div class="item6-num">{{item.product.productRepaymentMethod}}</div>
                  <div class="item-same">归还方式</div>
                </div>
                <div class="item1 fll">
                  <div class="item6-num">{{item.product.productPublisher}}</div>
                  <div class="item-same">发行机构</div>
                </div>
                <div class="flr organ-btn align" @click="lookDetail(item.agency.agencyId)">立即查看</div>
              </div>
            </div>
          </div>
          <div class="page">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              background=""
              :current-page="page"
              :page-size="size"
              :pager-count="5"
              layout="prev, pager, next"
              :total="count"
            ></el-pagination>
          </div>
        </div>
        <div v-else>
          <div class="empty-list" v-if="tableData.length == 0">
            <img :src="emptyList" alt="" class="empty-img">
            <p>暂无数据...</p>
          </div>
          <div class="organ-item clearfix mb30" v-for="(item,index) in tableData" :key="index">
            <div class="fll align fs img-box">
              <img
                :src="item.agencyLogo"
                v-if="item.agencyLogo"
                alt=""
              >
              <img
                src="/static/resource/pic/organ.png"
                v-else
                alt=""
              >
              <div class="name" v-html="item.agencyName">{{item.agencyName}}</div>
            </div>
            <div class="fll organ-info">
              <div class="clearfix">
                <div class="organ-rate fll ml40 w180">
                  利率：
                  <span class="percent-rate">{{item.productInterest}}</span>
                </div>
                <div class="organ-rate fll mt4 w180">
                  注册地:&nbsp;
                  <span v-html="item.address">{{item.address}}</span>
                </div>
                <div class="organ-rate fll mt4 w250">
                  机构类型：&nbsp;
                  <span v-html="item.agencyProperty">{{item.agencyProperty}}</span>
                </div>
                <div class="organ-rate fll mt4 w180">
                  网址：&nbsp;
                  <a :href="'http://' + item.agencyURL" target="_blank">
                    <span v-html="item.agencyURL"></span>
                  </a>
                </div>
              </div>
              <div class="desc" v-html="'机构简介：' + item.agencyIntroduction"></div>
              <div class="line-desc"></div>
              <div class="clearfix">
                <div class="item2 fll">
                  <div class="item1-num" v-html="item.productName">{{item.productName}}</div>
                  <div class="item-same">产品名称</div>
                </div>
                <div class="item1 fll align">
                  <div class="item-num" v-html="item.productInterest">
                    {{item.productInterest}}
                    <span class="percent">%</span>
                  </div>
                  <div class="item-same">利息</div>
                </div>
                <div class="item1 fll align">
                  <div class="item-num" v-html="item.producLoanLength">{{item.producLoanLength}}</div>
                  <div class="item-same">放款时间</div>
                </div>
                <div class="item1 fll align">
                  <div class="item-num" v-html="item.productLife">{{item.productLife}}</div>
                  <div class="item-same">使用年限</div>
                </div>
                <div class="item1 fll align">
                  <div class="item-num" v-html="item.productStartAmount">
                    {{item.productStartAmount}}
                    <span class="percent">万起</span>
                  </div>
                  <div class="item-same">起贷金额</div>
                </div>
                <div class="item1 fll">
                  <div
                    class="item6-num"
                    v-html="item.productRepaymentMethod"
                  >{{item.productRepaymentMethod}}</div>
                  <div class="item-same">归还方式</div>
                </div>
                <div class="item1 fll">
                  <div class="item6-num" v-html="item.productPublisher">{{item.productPublisher}}</div>
                  <div class="item-same">发行机构</div>
                </div>
                <div class="flr organ-btn align" @click="lookDetail(item.agencyId)">立即查看</div>
              </div>
            </div>
          </div>
          <div class="page">
            <el-pagination
              @size-change="handleSizeSearchChange"
              @current-change="handleCurrentSearchChange"
              background=""
              :current-page="Searchpn"
              :page-size="Searchpage"
              :pager-count="5"
              layout="prev, pager, next"
              :total="Searchcount"
            ></el-pagination>
          </div>
        </div>
        <footerSame></footerSame>
      </div>
    </div>
    <bottomTap></bottomTap>
  </div>
</template>

<script>
import footerSame from "../component/footerSame";
import wradio from "../component/w-radios";
import bottomTap from "../component/bottomTap";
import emptyList from "../assets/empty-list.png";
import banner01 from '@/assets/banner01.png'
import banner02 from '@/assets/banner02.png'
import banner03 from '@/assets/banner03.png'
const bannerList = [banner01, banner02, banner03]
export default {
  name: "Organization",
  components: {
    footerSame,
    wradio,
    bottomTap
  },
  data() {
    return {
      bannerList,
      emptyList,
      isJianSuo: true,
      searchCon: "",
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
        city: "",
        loan: "",
        business: ""
      },
      countData: {
        agencyCount: "",
        brokerCount: "",
        borrowerCount: ""
      }
    };
  },
  watch: {
    "query.city": function(val) {
      this.page = 1;
      this.size = 10;
      this.isJianSuo = true;
      this.searchCon = "";
      this.getCondition();
    },
    "query.loan": function(val) {
      this.page = 1;
      this.size = 10;
      this.isJianSuo = true;
      this.searchCon = "";
      if (val === "1") {
        this.isBank = false;
        this.query.business = "";
        this.getCondition();
      } else {
        this.isBank = true;
        this.getCondition();
      }
    },
    "query.business": function(val) {
      this.page = 1;
      this.size = 10;
      this.isJianSuo = true;
      this.searchCon = "";
      this.getCondition();
    },
    '$route': function(val) {
      console.log(val)
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.getData()
    })
  },
  methods: {
    search() {
      this.isJianSuo = false;
      if (this.searchCon) {
        this.$axios
          .get(
            `solr/getPageUserAgency?q=${this.searchCon}&page=${
              this.Searchpn
            }&size=${this.Searchpage}`
          )
          .then(res => {
            if (res.data !== "") {
              this.tableData = res.data;
            } else {
              this.tableData = [];
            }
            this.Searchcount = res.total;
            window.scrollTo(0, 0);
          });
      } else {
        this.$message.warning("请输入查询内容");
      }
    },
    lookDetail(id) {
      this.$router.push(`/organDetail/${id}`);
    },
    getData() {
      this.$axios
        .get(
          `/userAgency/selectByCondition?currentPage=${this.page}&pageSize=${
            this.size
          }`
        )
        .then(res => {
          this.formData = res.data.list;
          this.count = res.data.totalCount;
        });
    },
    //根据条件
    getCondition() {
      this.$axios
        .get(
          `userAgency/selectByCondition?agencyAddress=${
            this.query.city
          }&agencyName=${this.query.loan}&agencyProperty=${
            this.query.business
          }&currentPage=${this.page}&pageSize=${this.size}`
        )
        .then(res => {
          if (res.data !== "") {
            this.formData = res.data.list;
          } else {
            this.formData = [];
          }
          this.count = res.data.totalCount;
          window.scrollTo(0, 0);
        });
    },
    handleSizeSearchChange(val) {
      this.Searchpage = val;
      this.search();
    },
    handleCurrentSearchChange(val) {
      this.Searchpn = val;
      this.search();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getCondition();
    },
    handleSizeChange(val) {
      this.size = val;
      this.getCondition();
    },
    //获取地区
    getCity() {
      this.$axios.get("city/getAHotCity").then(res => {
        this.cities = res.map(item => {
          return { value: item.hid, label: item.cname };
        });
      });
    },
    //  展开或关闭城市
    citySpread() {
      this.cityUp = !this.cityUp;
    },
    getCount() {
      this.$axios.get("get/getCount").then(res => {
        this.countData = res;
      });
    },
    //类别
    getType() {
      this.$axios.get("get/getAgencyCategory").then(res => {
        this.loans = res.map(item => {
          return { value: item.id, label: item.categoryName };
        });
      });
    },
    //业务
    getBusiness() {
      this.$axios.get("get/getAgencyProperty").then(res => {
        this.business = res.map(item => {
          return { value: item.id, label: item.propertuName };
        });
      });
    }
  },
  created() {
    this.getData();
    this.getCity();
    this.getCount();
    this.getType();
    this.getBusiness();
  }
};
</script>
<style scoped lang="scss">
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