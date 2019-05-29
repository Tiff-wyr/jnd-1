<template>
  <div>
    <div class="title">访问记录</div>
    <div
      class="wrap"
      v-loading="listLoading"
      element-loading-text="数据正在加载中..."
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.5)"
    >
      <div class="empty-list-show" v-show="!tableData">
        <img :src="emptyList" alt="">
        <p>暂无数据...</p>
      </div>
      <div
        class="record-item clearfix"
        v-for="(item,index) in tableData"
        :key="index"
        @click="detail(item)"
      >
        <div class="year fll">{{item.time}}</div>
        <div class="year fll">{{item.borrower ? item.borrower.borrowerName : ''}}</div>
      </div>
    </div>
    <div class="page">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        background=""
        :page-size="size"
        :pager-count="5"
        layout="prev, pager, next"
        :total="count"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import emptyList from '../../../assets/empty-list2.png'
export default {
  name: "accessRec",
  data() {
    return {
      emptyList,
      listLoading: true,
      tableData: [],
      page: 1,
      size: 10,
      count: 1
    };
  },
  methods: {
    detail(item) {
      this.$router.push(`/userDetail?type=3&roleId=${this.$store.state.userInfo.roleId}&brokerOrAgencyId=${this.$store.state.userInfo.id}&borId=${item.borrower.borrowerId}`);
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
          `borLook/agencyLookBor/${this.$store.state.userInfo.id}/${
            this.page
          }/${this.size}`
        )
        .then(res => {
          this.listLoading = false;
          this.count = res.totalCount;
          this.tableData = res.list;
          window.scrollTo(0 , 0);
        });
    }
  },
  created() {
    this.getData();
  }
};
</script>

<style scoped lang="scss">

.title {
  width: 888px;
  height: 66px;
  padding-left: 56px;
  font-size: 16px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(81, 81, 81, 1);
  line-height: 66px;
  background: rgba(255, 255, 255, 1);
  box-sizing: border-box;
}
.wrap {
  min-height: 500px;
}
.record-item {
  background: #fff;
  box-sizing: border-box;
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
  .year {
    margin-left: 56px;
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(81, 81, 81, 1);
    line-height: 50px;
  }
}

.page {
  text-align: right;
  margin-top: 25px;
}
</style>


