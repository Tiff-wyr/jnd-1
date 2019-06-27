<template>
  <div>
    <div class="title">浏览记录</div>
    <el-tabs>
      <el-tab-pane>
        <span slot="label">浏览记录</span>
        <div
          v-loading="listLoading"
          style="height: 500px;background-color: #fff"
          element-loading-text="数据正在加载中..."
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.5)"
        >
          <div
            v-for="(item,index) in recordData"
            :key="index"
            class="record-item clearfix"
            @click="enterDetail(item.roleId,item.id)"
          >
            <div class="year fll">{{ item.startTime }}</div>
            <div class="year fll">{{ item.roleName }}：{{ item.name }}</div>
          </div>
          <div v-show="!recordData.length" class="empty-list-show">
            <img :src="emptyList" alt="">
            <p>暂无数据...</p>
          </div>
        </div>
        <div class="page">
          <el-pagination
            :page-size="size"
            :current-page="page"
            :total="count"
            background=""
            layout="prev, pager, next"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label">访问记录</span>
        <div
          v-loading="listLoading"
          style="height: 500px;background-color: #fff"
          element-loading-text="数据正在加载中..."
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.5)"
        >
          <div v-show="!recordBData.length" class="empty-list-show">
            <img :src="emptyList" alt="">
            <p>暂无数据...</p>
          </div>
          <div
            v-for="(item,index) in recordBData"
            :key="index"
            class="record-item"
            @click="enter(item.roleId,item.id)"
          >
            <div class="year fll">{{ item.startTime }}</div>
            <div class="year fll">{{ item.roleName }}：{{ item.name }}</div>
          </div>
        </div>
        <div class="page">
          <el-pagination
            :page-size="Size"
            :current-page="Page"
            :total="Count"
            background=""
            layout="prev, pager, next"
            @size-change="handleSizeBChange"
            @current-change="handleCurrentBChange"
          />
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import emptyList from '@/assets/empty-list2.png'
import { backTop } from '@/util/util'
export default {
  name: 'AccessRecord',
  data() {
    return {
      emptyList,
      listLoading: true,
      recordData: [],
      recordBData: [],
      page: 1,
      Page: 1,
      size: 7,
      Size: 7,
      count: 1,
      Count: 1
    }
  },
  created() {
    // 贷款人浏览记录
    this.getRecord()
    //  贷款人被浏览记录
    this.getBRecord()
  },
  methods: {
    enterDetail(role, id) {
      if (role === 2) {
        // 经纪人
        this.$router.push(`/agentDetail/${id}`)
      } else if (role === 3) {
        // 机构
        this.$router.push(`/organDetail/${id}`)
      } else {
        // 产品
        this.$router.push(`/productDetail/${id}`)
      }
    },
    enter(role, id) {
      if (role === 2) {
        // 经纪人
        this.$router.push(`/agentDetail/${id}`)
      } else if (role === 3) {
        // 机构
        this.$router.push(`/organDetail/${id}`)
      } else {
        // 产品
        this.$router.push(`/productDetail/${id}`)
      }
    },
    handleCurrentChange(val) {
      this.page = val
      this.getRecord()
    },
    handleSizeChange(val) {
      this.size = val
      this.getRecord()
    },
    handleCurrentBChange(val) {
      this.Page = val
      this.getBRecord()
    },
    handleSizeBChange(val) {
      this.Size = val
      this.getBRecord()
    },
    getRecord() {
      this.listLoading = true
      this.$axios
        .get(
          `borrowerRecord/getBorrowerBrowseRecord/${
            this.$store.state.userInfo.id
          }/${this.page}/${this.size}`
        )
        .then(res => {
          this.listLoading = false
          this.count = res.total
          this.recordData = res.rows
          backTop()
        })
    },
    getBRecord() {
      this.listLoading = true
      this.$axios
        .get(
          `borrowerRecord/getBorrowerBrowsedRecord/${
            this.$store.state.userInfo.id
          }/${this.Page}/${this.Size}`
        )
        .then(res => {
          this.listLoading = false
          this.Count = res.total
          this.recordBData = res.rows
        })
    }
  }
}
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
/deep/ .el-tabs__nav {
  width: 100%;
  background: rgba(250, 250, 250, 1);
}
/deep/ .el-tabs__active-bar {
  width: 0;
  height: 0;
}
/deep/ .el-tabs__item {
  width: 50%;
  padding: 0 0;
  text-align: center;
  color: rgba(81, 81, 81, 1);
}
/deep/ .el-tabs__item.is-active {
  color: rgba(168, 14, 14, 1);
  border-top: 1px solid #a80e0e;
  background-color: #fff;
}
/deep/ .el-tabs__active-bar:hover {
  color: rgba(81, 81, 81, 1);
}
/deep/ .el-tabs__nav-wrap::after {
  background-color: #fff;
}
/deep/ .el-tabs__header {
  margin-bottom: 0px;
}
.record-item {
  background: rgba(255, 255, 255, 1);
  box-sizing: border-box;
  height: 70px;
  line-height: 70px;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
  .year {
    margin-left: 56px;
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(81, 81, 81, 1);
    line-height: 70px;
  }
}

.page {
  text-align: right;
  margin-top: 25px;
}
</style>
