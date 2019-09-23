<template>
  <div>
    <div
      v-loading="listLoading"
      class="apply"
      element-loading-text="数据正在加载中..."
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.5)"
    >
      <div class="title">申请记录</div>
      <div class="header clearfix">
        <div class="fll text">名称</div>
        <div class="fll text">贷款金额</div>
        <div class="fll text">手机号</div>
        <div class="fll text">申请时间</div>
      </div>
      <div v-show="!tableData.length" class="empty-list-show">
        <img :src="emptyList" alt="">
        <p>暂无数据...</p>
      </div>
      <div
        v-for="(item,index) in tableData"
        :key="index"
        class="table clearfix"
        @click="enterUser(item)"
      >
        <div class="fll table-text">{{ item.borrowerName == null ? '--' : item.borrowerName }}</div>
        <div class="fll table-text">{{ item.loanAmount == null ? '--' : item.loanAmount }}</div>
        <div class="fll table-text">{{ item.phone == null ? '--' : item.phone }}</div>
        <div class="fll table-text">{{ item.startTime == null ? '--' : item.startTime }}</div>
      </div>
    </div>
    <div class="page" style="float: right;margin-top: 30px">
      <el-pagination
        :page-size="form.pageSize"
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
import emptyList from '../../../assets/empty-list2.png'
import { backTop } from '@/util/util'
import { applyRecord } from '@/api/organ'
export default {
  name: 'ApplyRecord',
  data() {
    return {
      emptyList,
      listLoading: true,
      tableData: [],
      count: 1,
      form: {
        agencyId: '',
        page: 1,
        pageSize: 10
      }
    }
  },
  created() {
    this.form.agencyId = this.$store.state.userInfo.id
    this.getData()
  },
  methods: {
    enterUser(item) {
      this.$router.push(`/userDetail?type=2&orderId=${item.orderId}&borId=${item.borrowerId}`)
    },
    handleCurrentChange(val) {
      this.page = val
      this.getData()
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getData()
    },
    getData() {
      this.listLoading = true
      applyRecord(this.form).then(res => {
        console.log(res)
        this.listLoading = false
        this.tableData = res.data.rows
        this.count = res.data.total
        backTop()
      })
    }
  }
}
</script>

<style scoped lang="scss">
.apply {
  width: 944px;
  height: 696px;
  background: rgba(255, 255, 255, 1);
  padding: 24px 56px;
  box-sizing: border-box;
  .title {
    height: 42px;
    font-size: 16px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(81, 81, 81, 1);
    line-height: 16px;
  }
  .header {
    width: 832px;
    height: 40px;
    background: rgba(250, 250, 250, 1);
    .text {
      width: 208px;
      text-align: center;
      font-size: 14px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(155, 155, 155, 1);
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
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(155, 155, 155, 1);
      text-align: center;
    }
  }
}
</style>
