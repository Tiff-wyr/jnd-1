<template>
  <div>
    <div class="wrappy">
      <div class="w1200">
        <div>
          <div class="detail-title">产品详情</div>
          <div class="clearfix">
            <div class="fll">
              <div class="detail-left">
                <div class="clearfix">
                  <div v-if="productDetailData.productLogo" class="fll">
                    <img
                      :src="productDetailData.productLogo"
                      alt=""
                      style="width: 90px;height: 90px;border-radius: 50%"
                    >
                  </div>
                  <div v-else class="fll">
                    <img
                      src="/static/resource/pic/pro.png"
                      alt=""
                      style="width: 90px;height: 90px;border-radius: 50%"
                    >
                  </div>
                  <div class="fll">
                    <div class="detail-loan-title">{{ productDetailData.productName }}</div>
                    <div class="clearfix re-star">
                      <img v-if="isCollect" src="/static/resource/agent/star.png" class="fll" alt="" >
                      <img v-else src="/static/resource/agent/star1.png" class="fll" alt="" >
                      <div class="fll">
                        <div v-if="isCollect" class="fll restore" @click="restore">加入收藏</div>
                        <div v-else class="fll restore" @click="cancelRestore">取消收藏</div>
                      </div>
                    </div>
                  </div>
                  <div class="flr">
                    <div class="btn" @click="hurryUpApply">快速申请</div>
                  </div>
                </div>
                <div class="left-line"/>
                <div class="left-limit">
                  额度：
                  <span class="limit-same">{{ productDetailData.productStartAmount }}万起</span>
                </div>
                <div class="left-limit mt22">
                  期限：
                  <span class="limit-same">{{ productDetailData.productLife }}</span>
                </div>
                <div class="left-limit mt22">
                  利息：
                  <span class="limit-same">{{ productDetailData.productInterest }}%</span>
                </div>
                <div class="left-limit mt22">
                  身份要求：
                  <span class="limit-same">{{ productDetailData.productIdentity }}</span>
                </div>
                <div class="left-limit mt22">
                  贷款类型：
                  <span class="limit-same">{{ productDetailData.productLoanType }}</span>
                </div>
                <div class="left-limit mt22">
                  发行机构：
                  <span class="limit-same">{{ productDetailData.productPublisher }}</span>
                </div>
                <div class="clearfix mt25">
                  <div class="fll yellow-line"/>
                  <div class="fll ml10 apply">申请条件</div>
                  <img
                    src="/static/resource/product-detail/apply.png"
                    alt=""
                    class="fll ml400"
                  >
                </div>
                <div class="line2"/>
                <div class="left-limit">
                  年龄要求：
                  <span class="limit-same">{{ productDetailData.productAge }}</span>
                </div>
                <div class="left-limit mt22">
                  职业要求：
                  <span class="limit-same">{{ productDetailData.productOccupation }}</span>
                </div>
                <div class="left-limit mt22">
                  资产要求：
                  <span class="limit-same">{{ productDetailData.productProperty }}</span>
                </div>
                <div class="clearfix mt22">
                  <div class="fll left-limit">其他要求:</div>
                  <div class="fll same">{{ productDetailData.productCondition | textFilter }}</div>
                </div>
                <div class="clearfix mt25">
                  <div class="fll yellow-line"/>
                  <div class="fll ml10 feature">产品特点</div>
                </div>
                <div class="line2"/>
                <div class="clearfix mt22">
                  <div class="fll left-limit">产品特点:</div>
                  <div class="fll same">{{ productDetailData.productCharacteristic | textFilter }}</div>
                </div>
                <div class="clearfix mt25">
                  <div class="fll yellow-line"/>
                  <div class="fll ml10 feature">热门产品推荐</div>
                </div>
                <div class="line2"/>
                <div class="clearfix">
                  <div
                    v-for="(item,index) in hotProductData"
                    :key="index"
                    class="product-tui fll clearfix"
                  >
                    <div class="fll">
                      <img
                        v-if="item.productLogo"
                        :src="item.productLogo"
                        alt=""
                        style="width: 60px;height: 60px;cursor: pointer"
                        @click="enterProduct(item.productId)"
                      >
                      <img
                        v-else
                        src="/static/resource/pic/pro.png"
                        alt=""
                        style="width: 60px;height: 60px;cursor: pointer"
                        @click="enterProduct(item.productId)"
                      >
                    </div>
                    <div class="fll ml10">
                      <div class="name">{{ item.productName }}</div>
                      <div class="rate">
                        月利率：
                        <span style="color:#A80E0E">{{ item.productInterest }}%</span>
                      </div>
                      <div class="limit">
                        额度：
                        <span
                          style="color:#A80E0E"
                        >{{ item.productStartAmount }}~{{ item.productEndAmount }}万</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="fll ml30">
              <div class="detail-top">
                <div class="top-title">代理该产品的机构</div>
                <div class="top-item">
                  <div class="clearfix">
                    <img
                      v-if="organData.agencyLogo"
                      :src="organData.agencyLogo"
                      alt=""
                      class="fll"
                      style="width: 60px;height: 60px;cursor: pointer"
                      @click="enterOrgan(organData.agencyId)"
                    >
                    <img
                      v-else
                      src="/static/resource/pic/organ.png"
                      alt=""
                      class="fll"
                      style="width: 60px;height: 60px;cursor: pointer"
                      @click="enterOrgan(organData.agencyId)"
                    >
                    <div class="fll ml10 organ-info">
                      <div class="title">{{ organData.agencyName }}</div>
                      <div class="area">{{ organData.address }}</div>
                      <div class="wang">{{ organData.agencyURL }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="prodetai-wrap"/>
    <popup :visible="dialogVisible" :options="options" :phone="$store.state.userInfo ? $store.state.userInfo.phone : ''" @confirm="handleConfirm" @close="handleClose"/>
  </div>
</template>

<script>
import popup from './component/popup'
export default {
  name: 'ProductDetail',
  components: {
    popup
  },
  metaInfo: {
    title: '9能贷款_住房公积金贷款条件_银行贷款需要哪些条件找9能贷款',
    meta: [{
      name: 'keyWords',
      content: '农村信用社贷款条件,住房公积金贷款条件,公积金贷款条件,工商银行贷款条件,商业贷款转公积金贷款条件,农业银行贷款条件,大学生创业贷款条件,银行贷款条件,公积金贷款的条件,小额贷款条件,个人贷款条件,信用社贷款条件,个人贷款需要什么条件,建行个人贷款条件,个人贷款的条件,邮政小额贷款条件,个人小额贷款条件,个人商业贷款条件,创业贷款条件,个人无抵押贷款条件,汽车贷款条件,个人信用贷款条件,大学生贷款条件,二手房贷款条件,个人公积金贷款条件,邮政贷款条件,个人消费贷款条件,银行个人贷款条件'
    }, {
      name: 'description',
      content: '9能贷款联合各类大型的金融机构,深度挖掘安全的金融服务渠道机构,为用户提供安全、多元的贷款产品和定制化的专业资金服务,打造更契合用户自身需求的贷款管理方案.找贷款,找经纪人,找机构,办理贷款上9能贷款;放款快,利率低0.35%,额度高,门槛低,渠道广.小额贷款公司成立条件,银行小额贷款条件,信用社小额贷款条件,信用社个人贷款条件,招行个人贷款条件,无抵押个人贷款条件,个人住房贷款条件,农业贷款条件,贷款条件,公积金贷款 条件,贷款的条件,贷款要什么条件'
    }]
  },
  filters: {
    textFilter(val) {
      if (val === 'null' || val === null) {
        return '暂无'
      } else {
        return val
      }
    }
  },
  data() {
    return {
      isCollect: true, // 收藏
      formData: [],
      productDetailData: {},
      organData: {},
      productId: '',
      hotProductData: [],
      dialogVisible: false
    }
  },
  computed: {
    options() {
      return {
        key: 'productId',
        value: this.productId
      }
    }
  },
  created() {
    const id = this.$route.query.id
    this.productId = id
    this.getDetail(id)
    this.getOrgan(id)
    this.getHotProduct()
    // 收藏判断
    if (this.$store.state.userInfo) {
      this.collectPan()
      this.skimRecord()
    }
  },
  methods: {
    hurryUpApply() {
      this.dialogVisible = true
    },
    handleConfirm() {
      this.dialogVisible = false
    },
    handleClose(val) {
      this.dialogVisible = val
    },
    // 机构详情页
    enterOrgan(id) {
      this.$router.push(`/organDetail?id=${id}`)
    },
    // 产品详情页
    enterProduct(id) {
      this.$router.push(`/productDetail?id=${id}`)
      this.getDetail(id)
      this.getOrgan(id)
    },
    // 产品详情
    getDetail(id) {
      this.$axios.get(`product/selectProductById/${id}`).then(res => {
        console.log(res)
        this.productDetailData = res
      })
    },
    // 代理该产品的机构
    getOrgan(id) {
      this.$axios.get(`product/selectAgencyByProId/${id}`).then(res => {
        this.organData = res
      })
    },
    // 收藏产品
    restore() {
      if (this.$store.state.userInfo) {
        if (this.$store.state.userInfo.roleId === 1) {
          this.$axios
            .post(
              `borpro/addBorPro?borId=${
                this.$store.state.userInfo.id
              }&productId=${this.productId}`
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
    // 取消产品
    cancelRestore() {
      this.$axios
        .post(
          `borpro/deleteBorPro?borId=${
            this.$store.state.userInfo.id
          }&productId=${this.productId}`
        )
        .then(res => {
          this.isCollect = true
          this.$message.success('取消收藏')
        })
    },
    // 热门产品推荐
    getHotProduct() {
      this.$axios.get(`product/getHotPro/1/6`).then(res => {
        this.hotProductData = res
      })
    },
    collectPan() {
      const data = new FormData()
      data.append('borId', this.$store.state.userInfo.id)
      data.append('productId', this.productId)
      this.$axios.post(`borpro/selectBorPro`, data).then(res => {
        if (res === 0) {
          this.isCollect = true
        } else {
          this.isCollect = false
        }
      })
    },
    skimRecord() {
      if (this.$store.state.userInfo) {
        if (this.$store.state.userInfo.roleId === 1) {
          const data = new FormData()
          data.append('borId', this.$store.state.userInfo.id)
          data.append('proId', this.productId)
          this.$axios.post(`borLookPro/addLookPro`, data) // 访问记录
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.ml400 {
  margin-left: 400px;
}
.mt25 {
  margin-top: 25px;
}
.ml10 {
  margin-left: 10px;
}
.ml16 {
  margin-left: 16px;
}
.ml128 {
  margin-left: 128px;
}
.ml15 {
  margin-left: 15px;
}
.mt12 {
  margin-top: 12px;
}
.ml30 {
  margin-left: 30px;
}
.detail-title {
  width: 112px;
  height: 28px;
  font-size: 24px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(0, 0, 0, 1);
  line-height: 28px;
  margin-bottom: 24px;
}
.detail-left {
  width: 902px;
  background: rgba(255, 255, 255, 1);
  padding: 36px 60px 66px 60px;
  box-sizing: border-box;
  .btn {
    margin-top: 25px;
    text-align: center;
    width: 100px;
    height: 40px;
    background: rgba(168, 14, 14, 1);
    font-size: 16px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 40px;
    cursor: pointer;
  }
  .left-line,
  .line2 {
    width: 782px;
    height: 1px;
    background: #f0f0f0;
    margin-top: 10px;
    margin-bottom: 20px;
  }
  .left-limit {
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(155, 155, 155, 1);
    line-height: 1;
  }
  .limit-same {
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(81, 81, 81, 1);
    line-height: 2;
  }
  .same {
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(81, 81, 81, 1);
    line-height: 2;
    width: 465px;
    margin-left: 10px;
    white-space: pre-wrap;
  }
  .detail-loan-title {
    font-size: 20px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(81, 81, 81, 1);
    margin-left: 20px;
    margin-top: 16px;
    margin-bottom: 16px;
  }
  .re-star {
    margin-left: 20px;
    .restore {
      width: 64px;
      font-size: 14px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(155, 155, 155, 1);
      margin-left: 5px;
      cursor: pointer;
    }
    .star {
      width: 15px;
      height: 15px;
      margin-top: 2px;
    }
  }

  .yellow-line {
    width: 4px;
    height: 16px;
    background: rgba(208, 172, 86, 1);
  }
  .apply {
    height: 16px;
    font-size: 16px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(81, 81, 81, 1);
    line-height: 16px;
  }
  .feature {
    height: 16px;
    font-size: 16px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(81, 81, 81, 1);
    line-height: 16px;
  }
}
.detail-top {
  width: 268px;
  background: rgba(255, 255, 255, 1);
  .top-title {
    text-align: center;
    width: 268px;
    height: 74px;
    font-size: 20px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(81, 81, 81, 1);
    line-height: 74px;
  }
  .top-item {
    height: 100px;
    padding: 0 24px 30px 24px;
    box-sizing: border-box;
    .organ-info {
      width: calc(100% - 80px);
    }
    .title {
      height: 14px;
      font-size: 14px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(81, 81, 81, 1);
      line-height: 14px;
    }
    .area {
      height: 12px;
      font-size: 12px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(155, 155, 155, 1);
      line-height: 12px;
      margin-top: 12px;
      margin-bottom: 8px;
    }
    .wang {
      height: 12px;
      font-size: 12px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(155, 155, 155, 1);
      line-height: 12px;
    }
  }
  .top-add {
    width: 268px;
    height: 15px;
  }
}
.detail-bottom {
  width: 268px;
  background: rgba(255, 255, 255, 1);
  margin-top: 40px;
  .victory-title {
    text-align: center;
    height: 74px;
    font-size: 20px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(81, 81, 81, 1);
    line-height: 74px;
  }
  .victory-item {
    height: 100px;
    padding: 0 24px 30px 24px;
    box-sizing: border-box;
    .name {
      height: 14px;
      font-size: 14px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(81, 81, 81, 1);
      line-height: 14px;
      margin-top: 15px;
    }
    .number {
      height: 12px;
      font-size: 12px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(155, 155, 155, 1);
      line-height: 12px;
      margin-top: 15px;
    }
  }
  .top-add {
    width: 268px;
    height: 15px;
  }
}
.product-tui {
  width: 250px;
  margin-bottom: 20px;
  padding-left: 30px;
  box-sizing: border-box;
  .name {
    height: 14px;
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(81, 81, 81, 1);
    line-height: 14px;
  }
  .rate {
    height: 12px;
    font-size: 12px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(155, 155, 155, 1);
    line-height: 12px;
    margin: 10px 0 6px 0;
  }
  .limit {
    height: 12px;
    font-size: 12px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(155, 155, 155, 1);
    line-height: 12px;
  }
}
.dialog-title {
  width: 100%;
  background: rgba(240, 240, 240, 1);
  padding: 20px 30px;
  margin: 20px 0;
  box-sizing: border-box;
}
.dialog-container {
  width: 100%;
  margin-top: 20px;
  overflow: hidden;
  &.is-finish {
    text-align: center;
    p {
      margin: 10px 0;
    }
    .btn-box {
      width: 200px;
      margin: 30px auto 10px;
      text-align:justify;
      overflow: hidden;
      a {
        float: left;
      }
      span {
        float: right;
        color: #A80E0E;
        cursor: pointer;
      }
    }
  }
  .left,
  .right {
    float: left;
  }
  .left {
    width: 450px;
    .input-item {
      width: 240px;
      &.code {
        width: 120px;
        margin-right: 4px;
      }
      &.confirm-btn {
        background: #d0ac56;
        color: #fff;
        border-color: #d0ac56;
      }
    }
    .select-item {
      width: 110px;
      &.address2 {
        margin-left: 15px;
      }
    }
    .check-box {
      margin-right: 16px;
    }
  }
  .right {
    width: 270px;
    font-size: 12px;
    border-left: 1px solid #d9d9d9;
    padding: 60px 20px 40px 40px;
    box-sizing: border-box;
    h3 {
      color: #515151;
    }
    p {
      margin: 10px 0;
      color: #9b9b9b;
    }
  }
}
</style>
<style lang="scss">
.prodetai-wrap {
  .el-dialog {
    .el-dialog__header {
      padding: 10px 20px 10px;
    }
    .el-dialog__body {
      padding: 20px 0;
      .el-checkbox__input.is-checked .el-checkbox__inner {
        background: #d0ac56;
        border-color: #d0ac56;
      }
      .el-step__icon-inner[class*="el-icon"]:not(.is-status) {
        color: #d0ac56;
      }
      .el-step__icon.is-icon {
        background: #f0f0f0;
      }
      .el-step__title.is-finish {
        color: #515151;
      }
      .el-step.is-horizontal .el-step__line {
        height: 4px;
        background: #d9d9d9;
        .el-step__line-inner {
          transition-delay: 3ms!important;
          border-width: 2px!important;
          width: 50%!important;
          border-color: #D0AC56;
        }
      }
    }
  }
}
.prodetai-wrap .el-dialog .el-dialog__body .el-step.is-horizontal .is-finish .el-step__line .el-step__line-inner {
  transition-delay: 3ms!important;
  border-width: 2px!important;
  width: 100%!important;
  border-color: #D0AC56;
}
</style>
