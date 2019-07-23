<template>
  <div>
    <div class="agentC">
      <div class="clearfix">

        <div v-if="!tableData.length" class="empty-list-show">
          <img :src="emptyList" alt="">
          <p>暂无数据...</p>
        </div>
        <div v-for="(item,index) in tableData" :key="index" class="agentItem fll" @click="agentD(item.product.productId)">
          <div class="clearfix fs">
            <img
              :src="item.product.productLogo"
              alt=""
              class="fll pic"
              style="cursor: pointer"
            >
            <div class="fll ml4">
              <div class="name">{{ item.product.productName }}</div>
              <div class="job">{{ item.product.productPublisher }}</div>
              <div
                v-if="item.product.productStartAmount && item.product.productEndAmount"
                class="tel"
              >{{ item.product.productStartAmount }}万~{{ item.product.productEndAmount }}万</div>
            </div>
            <div class="fll sub" @click.stop="cancelRestore(item.product.productId)">X</div>
          </div>
          <div class="mt16 little-item mb20">{{ item.product.productCharacteristic }}</div>
          <div class="btn" @click.stop="agentD(item.product.productId)">立即查看</div>
        </div>
      </div>
    </div>
    <div class="page" style="margin-top: 50px;text-align: right">
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
  </div>
</template>

<script>
import { mapState } from 'vuex'
import emptyList from '@/assets/empty-list2.png'
export default {
  name: 'ProductCollect',
  data() {
    return {
      emptyList,
      page: 1,
      size: 5,
      count: 6,
      tableData: []
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  created() {
    this.getProductColl()
  },
  methods: {
    agentD(id) {
      this.$router.push(`/productDetail?id=${id}`)
    },
    getProductColl() {
      this.$axios
        .post(
          `borpro/selectByBorId/${this.userInfo.id}/${this.page}/${this.size}`
        )
        .then(res => {
          this.tableData = res.list
          this.count = res.totalCount
        })
    },
    handleCurrentChange(val) {
      this.page = val
      this.getProductColl()
    },
    handleSizeChange(val) {
      this.size = val
      this.getProductColl()
    },
    // 取消产品
    cancelRestore(id) {
      this.$axios
        .post(
          `borpro/deleteBorPro?borId=${
            this.$store.state.userInfo.id
          }&productId=${id}`
        )
        .then(res => {
          this.$message.success('取消收藏')
          this.getProductColl()
        })
    }
  }
}
</script>

<style scoped lang="scss">
.mt16 {
  margin-top: 16px;
}
.mb20 {
  margin-bottom: 20px;
}
.mt8 {
  margin-top: 8px;
}
.mb16 {
  margin-bottom: 16px;
}
.ml4 {
  margin-left: 4px;
}

.agentC {
  height: 470px;
  padding: 20px 24px 20px 56px;
  box-sizing: border-box;
  .agentItem {
    position: relative;
    width: 248px;
    height: 216px;
    background: rgba(255, 255, 255, 1);
    border-radius: 4px;
    margin-right: 40px;
    padding: 10px 0 0 24px;
    box-sizing: border-box;
    margin-bottom: 20px;
    border: 1px solid #eee;
    &:hover {
      box-shadow: 0px 0px 13px 0px rgba(217, 217, 217, 1);
    }
    &:hover .sub {
      display: block;
    }
    .sub {
      color: #a80e0e;
      font-size: 15px;
      display: none;
      cursor: pointer;
    }
    .pic {
      width: 80px;
      height: 78px;
    }
    .name {
      height: 16px;
      font-size: 16px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(81, 81, 81, 1);
      line-height: 16px;
    }
    .job {
      margin-top: 4px;
      width: 72px;
      height: 12px;
      font-size: 12px;
      font-family: PingFangSC-Light;
      font-weight: 300;
      color: rgba(155, 155, 155, 1);
      line-height: 12px;
    }
    .tel {
      margin-top: 15px;
      width: 111px;
      height: 16px;
      font-size: 16px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(81, 81, 81, 1);
      line-height: 16px;
      letter-spacing: 1px;
    }
    .little-item {
      width: 192px;
      height: 51px;
      font-size: 12px;
      font-family: PingFangSC-Light;
      font-weight: 300;
      color: rgba(155, 155, 155, 1);
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      overflow: hidden;
      line-height: 17px;
    }
    .btn {
      position: absolute;
      left: 50%;
      bottom: 10px;
      transform: translateX(-50%);
      cursor: pointer;
      text-align: center;
      width: 70px;
      height: 24px;
      border-radius: 4px;
      font-size: 14px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(155, 155, 155, 1);
      line-height: 24px;
      border: 1px solid rgba(217, 217, 217, 1);
    }
    &:hover .btn {
      background: rgba(168, 14, 14, 1);
      color: rgba(255, 255, 255, 1);
    }
  }
  /deep/ .el-pager .number {
    color: rgba(165, 165, 165, 1);
  }
  /deep/ .el-pagination.is-background .el-pager li {
    color: rgba(165, 165, 165, 1);
    width: 28px;
    height: 28px;
    border-radius: 4px;
    border: 1px solid rgba(235, 235, 235, 1);
  }
  /deep/ .el-pagination.is-background .el-pager li:not(.disabled).active {
    background: rgba(245, 245, 245, 1);
    color: rgba(81, 81, 81, 1);
    border-style: none;
  }
  /deep/ .el-pager li:disabled :hover {
    color: rgba(165, 165, 165, 1);
  }
}
</style>
