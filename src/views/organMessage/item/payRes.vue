<template>
  <div>
    <div class="resource mb24">
      <div class="title">付费资源</div>
      <div
        v-loading="listLoading"
        class="table"
        element-loading-text="数据正在加载中..."
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.5)"
      >
        <div class="loans-pro">
          <div class="loans-header clearfix">
            <div class="header-same fll">贷款人</div>
            <div class="header-same fll">注册地区</div>
            <div class="header-same fll">贷款金额</div>
            <div class="header-same fll">手机号</div>
            <div class="header-same fll">操作</div>
          </div>
          <div v-show="!tableData" class="empty-list-show">
            <img :src="emptyList" alt="">
            <p>暂无数据...</p>
          </div>
          <div v-for="(item, index) in tableData" :key="index" class="loans-pro-item clearfix">
            <div class="fll" style="cursor: pointer" @click="enterDe(item.borrowerId)">
              <div class="fll pro-item-same">{{ item.borrowerName == null ? '-' : item.borrowerName }}</div>
              <div class="fll pro-item-same">{{ item.address == null ? '-' : item.address }}</div>
              <div class="fll pro-item-same">{{ item.loanAmount == null ? 0 : item.loanAmount }}</div>
              <div class="fll pro-item-same">{{ item.phone == null ? '-' : item.phone }}</div>
            </div>
            <div class="fll pro-item-same">
              <div class="operate" @click="deleteBorrower(item.borrowerId)">删除</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div style="text-align: right">
      <div class="page">
        <el-pagination
          :page-size="size"
          :total="count"
          background=""
          layout="prev, pager, next"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import emptyList from '../../../assets/empty-list2.png'
import { backTop } from '@/util/util'
import { getPayResource } from '@/api/organ'
export default {
  name: 'PayRes',
  data() {
    return {
      emptyList,
      listLoading: true,
      tableData: [],
      page: 1,
      size: 10,
      count: 1,
      cityList: null,
      moneyList: null,
      typeList: null,
      loanTypeList: null,
      ageList: null,
      jobList: null,
      incomeList: null
    }
  },
  created() {
    this.getData()
  },
  methods: {
    handleFilter() {
      this.getData()
    },
    enterDe(id) {
      this.$router.push(`/userDetail?type=1&borId=${id}`)
    },
    handleSelectionChange(val) {},
    handleCurrentChange(val) {
      this.page = val
      this.getData()
    },
    handleSizeChange(val) {
      this.size = val
      this.getData()
    },
    getData() {
      this.listLoading = true
      getPayResource(this.$store.state.userInfo.id, this.page, this.size).then(res => {
        this.listLoading = false
        this.tableData = res.data.rows
        this.count = res.data.total
        backTop()
      })
    },

    deleteBorrower(id) {
      this.$axios
        .post(
          `agencyResource/deleteAgencyResource?agencyId=${
            this.$store.state.userInfo.id
          }&borId=${id}`
        )
        .then(res => {
          if (res.status === 200) {
            this.$message.success(res.msg)
            this.getData()
            this.listLoading = false
          }
        })
    }
  }
}
</script>

<style scoped lang="scss">
.resource {
  width: 944px;
  height: 648px;
  background: rgba(255, 255, 255, 1);
  .title {
    width: 100%;
    height: 66px;
    padding-left: 56px;
    box-sizing: border-box;
    font-size: 16px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(81, 81, 81, 1);
    line-height: 66px;
  }
  .table {
    min-height: 500px;
    .loans-pro {
      padding: 0 38px;
      box-sizing: border-box;
      background: rgba(255, 255, 255, 1);
      .loans-header {
        width: 866px;
        height: 40px;
        background: rgba(250, 250, 250, 1);
        .header-same {
          text-align: center;
          width: 173px;
          height: 14px;
          font-size: 14px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: rgba(155, 155, 155, 1);
          line-height: 40px;
        }
      }

      .loans-pro-item {
        height: 52px;
        border-bottom: 1px solid #f0f0f0;
        .pro-item-same {
          font-size: 14px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: rgba(81, 81, 81, 1);
          width: 173px;
          line-height: 52px;
          text-align: center;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        &:hover .operate {
          width: 80px;
          height: 32px;
          background: rgba(168, 14, 14, 1);
          border-radius: 4px;
          background: rgba(168, 14, 14, 1);
          color: rgba(255, 255, 255, 1);
          margin-top: 10px;
          line-height: 32px;
          margin-left: 50px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
