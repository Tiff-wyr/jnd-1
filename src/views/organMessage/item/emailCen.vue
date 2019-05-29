<template>
  <div>
    <div class="collect mb24">
      <div class="title">邮件中心</div>
      <div v-if="isInbox" class="inbox">
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          v-loading="listLoading"
          element-loading-text="数据正在加载中..."
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.5)"
          style="width: 100%;color: #515151"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" align="center" width="55"></el-table-column>
          <el-table-column label="发件人" prop="fromName" align="center" width="150"></el-table-column>
          <el-table-column width="380" label="内容">
            <template slot-scope="scope">
              <span
                style="overflow: hidden; white-space: nowrap;text-overflow: ellipsis"
              >{{scope.row.content}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="startTime" label="发送时间" width="200" show-overflow-tooltip></el-table-column>
          <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              <el-button size="mini" type="danger" @click="deleteRow(scope.row)">删除</el-button>
              <el-button size="mini" type="success" @click="lookRow(scope.row.id)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-show="!isChange" class="clearfix" style="margin-top: 30px">
        <div class="fll sub" @click="subInbox">删除</div>
      </div>
      <div v-if="!isInbox" class="inbox-detail">
        <div class="chat-top-wrap clearfix">
          <div class="fll return-inbox" @click="returnS">&nbsp;&lt; &nbsp;返回收件箱</div>
        </div>
        <div class="chat-box">
          <div class="box-left clearfix" style="margin-top: 20px">
            <div class="fll">
              <div class="message-box-left">{{detailData.content}}</div>
              <div class="box-time">{{detailData.startTime}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "agentEmail",
  data() {
    return {
      listLoading: true,
      isInbox: true, // 切换收件箱的聊天与列表
      isChange: false, // 列表与聊天框是否切换
      tableData: [],
      checkAll: false,
      isIndeterminate: true,
      checked: false,
      selectMultiple: [],
      arr: [],
      str: "",
      detailData: {
        content: "我要申请贷款",
        from: "18000000081",
        id: 81,
        isRead: 1,
        startTime: "2019-02-16 14:30:19.0",
        to: "18000000001",
        type: 2,
        fromName: ""
      }
    };
  },
  methods: {
    returnS() {
      this.isInbox = true;
      this.isChange = false;
    },
    rowClick(row, event, column) {},
    lookRow(id) {
      this.isInbox = false;
      this.isChange = true;
      let shouId = id;
      this.getDetailMess(shouId);
    },

    getDetailMess(id) {
      this.$axios.get(`message/getMessageById/${id}`).then(res => {
        console.log(res);
        this.detailData = res;
      });
    },
    handleSelectionChange(val) {
      this.selectMultiple = val;
      console.log(this.selectMultiple);
    },

    getData() {
      this.listLoading = true;
      this.$axios
        .get(`message/getPageSysMessage/${this.$store.state.userInfo.phone}`)
        .then(res => {
          this.tableData = res.rows;
          this.listLoading = false;
          window.scrollTo(0, 0);
        });
    },
    //全选删除
    subInbox() {
      this.selectMultiple.forEach(item => {
        this.arr.push(item.id);
        this.str = this.arr.join(",");
      });
      this.$axios
        .get(
          `/message/removeSysMessageBatch/${this.str}/${
            this.$store.state.userInfo.phone
          }`
        )
        .then(res => {
          if (res.status === 200) {
            this.$message.success("删除成功");
            this.getData();
            this.listLoading = false;
          }
        });
    },
    //单独删除
    deleteRow(row) {
      this.$axios
        .get(
          `message/removeSysMessage/${row.id}/${
            this.$store.state.userInfo.phone
          }`
        )
        .then(res => {
          if (res.status === 200) {
            this.$message.success("删除成功");
            this.getData();
            this.listLoading = false;
          }
        });
    }
  },
  created() {
    this.getData();
  }
};
</script>

<style scoped lang="scss">
.collect {
  width: 944px;
  height: auto;
  padding-bottom: 30px;
  box-sizing: border-box;
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

.inbox {
  /deep/ .el-table {
    thead {
      background-color: #fafafa;
      color: #9b9b9b;
    }
    th {
      text-align: center;
    }
  }
  .readActive {
    color: #f00;
  }
}
.inbox-detail {
  padding: 0 36px 20px 36px;
  .chat-top-wrap {
    width: 100%;
    height: 40px;
    border-bottom: 1px solid #f0f0f0;
    .return-inbox {
      height: 14px;
      font-size: 14px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(155, 155, 155, 1);
      line-height: 40px;
      cursor: pointer;
    }
    .inbox-title {
      height: 14px;
      font-size: 14px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(81, 81, 81, 1);
      line-height: 40px;
      margin-left: 308px;
    }
  }
  .chat-box {
    height: 500px;
    overflow: -moz-scrollbars-vertical;
    .message-box-left {
      position: relative;
      width: 500px;
      font-size: 14px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(81, 81, 81, 1);
      line-height: 20px;
      margin-left: 20px;
      margin-top: 20px;
    }
    .box-left {
      .box-name {
        width: 75px;
        text-align: center;
        height: 14px;
        font-size: 14px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(81, 81, 81, 1);
        line-height: 14px;
        margin-top: 8px;
      }
      .box-time {
        margin-left: 20px;
        margin-top: 12px;
        height: 12px;
        font-size: 12px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(217, 217, 217, 1);
        line-height: 12px;
      }
    }
  }
}
.sub {
  cursor: pointer;
  margin-left: 57px;
  text-align: center;
  width: 60px;
  height: 28px;
  border-radius: 4px;
  border: 1px solid rgba(155, 155, 155, 1);
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(81, 81, 81, 1);
  line-height: 28px;
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
</style>
