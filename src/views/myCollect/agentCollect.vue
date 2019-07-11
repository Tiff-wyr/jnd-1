<template>
  <div>
    <div class="agentC">
      <div class="clearfix">

        <div v-if="!tableData.length" class="empty-list-show">
          <img :src="emptyList" alt="">
          <p>暂无数据...</p>
        </div>
        <div v-for="(item,index) in tableData" :key="index" class="agentItem fll" @click="agentD(item.brokerId)">
          <div class="clearfix fs">
            <img :src="item.image" alt="" class="fll pic" style="cursor: pointer">
            <div class="fll ml4">
              <div class="name">{{ item.brokerName }}</div>
              <div class="job">金融顾问</div>
              <div class="tel">{{ item.phone }}</div>
            </div>
            <div class="fll sub" @click.stop="sub(item.brokerId)">X</div>
          </div>
          <div class="clearfix mt8 mb16">
            <div
              v-for="(it,id) in item.businessList"
              v-if="id < 6"
              :key="id"
              class="fll mt8 little-item"
            >{{ it.business }}</div>
          </div>
          <div class="btn" @click.stop="chat(item.brokerId)">立即联系</div>
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
import emptyList from '@/assets/empty-list2.png'
import { mapState } from 'vuex'
export default {
  name: 'AgentCollect',
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
    this.getAgentColl()
  },
  methods: {
    chat(id) {
      this.$router.push({
        path: `/myMessage/${this.$store.state.userInfo.id}/messageCenter`,
        query: { id: id, roleId: 2 }
      })
    },
    agentD(id) {
      this.$router.push(`/agentDetail/${id}`)
    },
    getAgentColl() {
      this.$axios
        .get(
          `borrowerKeep/showPage/${this.$store.state.userInfo.id}?pn=${
            this.page
          }&page=${this.size}`
        )
        .then(res => {
          this.tableData = res.rows
          this.count = res.total
        })
    },
    handleCurrentChange(val) {
      this.page = val
      this.getAgentColl()
    },
    handleSizeChange(val) {
      this.size = val
      this.getAgentColl()
    },
    sub(id) {
      this.$axios
        .get(
          `borrowerKeep/removeBorrowerKeepById/${
            this.$store.state.userInfo.id
          }/${id}`
        )
        .then(res => {
          if (res.status === 200) {
            this.$message.success('删除成功')
            this.getAgentColl()
          }
        })
    }
  }
}
</script>

<style scoped lang="scss">
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
      padding: 0 5px;
      height: 24px;
      border-radius: 4px;
      border: 1px solid rgba(217, 217, 217, 1);
      text-align: center;
      font-size: 12px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(155, 155, 155, 1);
      line-height: 24px;
      margin-right: 14px;
    }
    .btn {
      position: absolute;
      left: 50%;
      bottom: 10px;
      transform: translateX(-50%);
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
      cursor: pointer;
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
