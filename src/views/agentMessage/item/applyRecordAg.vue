<template>
  <div class="apply-container">
    <main class="main">
      <div class="title">申请记录</div>
      <div class="table-wrap"
        v-loading="listLoading"
        element-loading-text="数据正在加载中..."
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.5)"
      >
        <div class="header clearfix">
          <div class="fll text">名称</div>
          <div class="fll text">贷款金额</div>
          <div class="fll text">手机号</div>
          <div class="fll text">申请时间</div>
        </div>
        <div class="empty-list-show" v-show="!tableData.length">
          <img :src="emptyList" alt="">
          <p>暂无数据...</p>
        </div>
      </div>
      <div
        class="table clearfix"
        v-for="(item,index) in tableData"
        @click="enterDetail(item)"
        :key="index"
      >
        <div class="fll table-text">{{item.borrowerName}}</div>
        <div class="fll table-text">{{item.loanAmount}}万元</div>
        <div class="fll table-text">{{item.phone == null ? '--' : item.phone}}</div>
        <div class="fll table-text">{{item.startTime}}</div>
      </div>
    </main>
    <div class="page" style="margin-top: 30px;float: right">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-size="size"
        :current-page="page"
        layout="total, prev, pager, next"
        :total="count"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import emptyList from "../../../assets/empty-list2.png";
export default {
  data() {
    return {
      emptyList,
      listLoading: true,
      tableData: [],
      page: 1,
      size: 8,
      count: 0
    };
  },
  methods: {
    enterDetail(item) {
      this.$router.push(`/userDetail?type=2&orderId=${item.orderId}&borId=${item.borrowerId}`);
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getData();
    },
    handleSizeChange(val) {
      this.size = val;
      this.getData();
    },
    getData() {
      this.listLoading = true;
      this.$axios
        .get(
          `orderAll/getPageOrderByBrokerId/${this.$store.state.userInfo.id}/${
            this.page
          }/${this.size}`
        )
        .then(res => {
          this.listLoading = false;
          this.tableData = res.rows;
          this.count = res.total;
          window.scrollTo(0, 0);
        });
    }
  },
  created() {
    this.getData();
  }
};
</script>

<style scoped lang="scss">
.main {
  width: 944px;
  background: #fff;
  padding: 24px 56px;
  box-sizing: border-box;
  font-family: PingFangSC-Medium;
  color: rgba(81, 81, 81, 1);
  font-weight: 500;
  font-size: 16px;
  .title {
    height: 42px;
    line-height: 16px;
  }
  .header {
    width: 832px;
    height: 40px;
    .text {
      width: 208px;
      text-align: center;
      font-size: 14px;
      line-height: 40px;
    }
  }
  .table {
    width: 832px;
    height: 62px;
    border-bottom: 1px solid #f0f0f0;
    cursor: pointer;
    .table-text {
      width: 208px;
      line-height: 62px;
      font-size: 14px;
      color: rgba(155, 155, 155, 1);
      text-align: center;
    }
  }
}
//   .table {
//     width: 832px;
//     height: 62px;
//     border-bottom: 1px solid #f0f0f0;
//     cursor: pointer;
//     .table-text {
//       width: 208px;
//       line-height: 62px;
//       font-size: 14px;
//       font-family: PingFangSC-Regular;
//       font-weight: 400;
//       color: rgba(155, 155, 155, 1);
//       text-align: center;
//     }
//   }
// }
</style>
