<template>
  <div>
    <div class="collect mb24">
      <div class="title">消息中心</div>
      <el-tabs v-model="activeName" @tab-click="tabClick">
        <el-tab-pane label="inBox"><span slot="label">收件箱</span>
          <div>
            <div v-if="isInbox" class="inbox">
              <el-table
                v-loading="listLoading"
                ref="multipleTable"
                :data="shouData"
                tooltip-effect="dark"
                element-loading-text="数据正在加载中..."
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.5)"
                style="width: 100%; color: #9b9b9b;"
                @selection-change="handleSelectionChange">
                <el-table-column
                  type="selection"
                  align="center"
                  width="55"/>
                <el-table-column label="发件人" align="center" width="150">
                  <template slot-scope="scope" show-overflow-tooltip>
                    <div @click="lookShouRow(scope.row.id)">{{ scope.row.fromName }}</div>
                  </template>
                </el-table-column>

                <el-table-column label="内容" align="center">
                  <template slot-scope="scope" show-overflow-tooltip>
                    <div @click="lookShouRow(scope.row.id)">{{ scope.row.content }}</div>
                  </template>
                </el-table-column>
                <el-table-column label="发送时间" align="center">
                  <template slot-scope="scope" show-overflow-tooltip>
                    <div @click="lookShouRow(scope.row.id)">{{ scope.row.startTime }}</div>
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
                <div class="fll inbox-title"> 与 {{ detailData.fromName }}的对话</div>
              </div>
              <div class="chat-box">
                <div class="box-left clearfix" style="margin-top: 20px">
                  <div class="fll">
                    <div class="message-box-left">{{ detailData.content }}</div>
                    <div class="box-time">{{ detailData.startTime }}</div>
                  </div>
                </div>

              </div>
              <div class="chat-send-box">
                <input v-model="sendMessData.content" class="chat-message" placeholder="请输入内容" type="text" @keyup.enter="sendMess">
                <button class="send" @click="sendMess">发送</button>
              </div>
            </div>

          </div>
        </el-tab-pane>
        <el-tab-pane label="outBox"><span slot="label">发件箱</span>
          <div class="outbox">
            <el-table
              v-loading="listLoading"
              ref="multipleTable"
              :data="faData"
              tooltip-effect="dark"
              element-loading-text="数据正在加载中..."
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(0, 0, 0, 0.5)"
              style="width: 100%; color: #9b9b9b;"
              @selection-change="handleSelectionChangeOutbox">
              <el-table-column
                type="selection"
                align="center"
                width="55"/>

              <el-table-column label="收件人" align="center" width="150">
                <template slot-scope="scope" show-overflow-tooltip>
                  <div>{{ scope.row.toName }}</div>
                </template>
              </el-table-column>

              <el-table-column label="内容" align="center">
                <template slot-scope="scope" show-overflow-tooltip>
                  <div>{{ scope.row.content }}</div>
                </template>
              </el-table-column>

              <el-table-column label="发送时间" align="center">
                <template slot-scope="scope" show-overflow-tooltip>
                  <div>{{ scope.row.startTime }}</div>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div v-show="!isChange" class="clearfix" style="margin-top: 30px">
            <div class="fll sub" @click="subOutbox">删除</div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>

  </div>
</template>

<script>
import { time, backTop } from '../util/util'
export default {
  name: 'AgentMessageCenter',
  data() {
    return {
      listLoading: true,
      isInbox: true, // 切换收件箱的聊天与列表
      isChange: false, // 列表与聊天框是否切换
      checkAll: false,
      isIndeterminate: true,
      role: '',
      checked: false,
      shouData: [],
      faData: [],
      activeName: '',
      selectMultipleInbox: [],
      selectMultipleOutbox: [],
      arrInbox: [],
      arrOutbox: [],
      inbox: '',
      outbox: '',
      agentOrganId: '',
      sendMessData: {
        from: this.$store.state.userInfo.phone,
        to: '',
        content: '',
        startTime: '',
        type: 2,
        isRead: 0
      },
      detailData: {
        content: '',
        from: '',
        id: '',
        isRead: 1,
        startTime: '',
        to: '',
        type: 2,
        fromName: ''
      },
      shouPhone: ''
    }
  },
  created() {
    this.getSMessage()
    this.getFMessage()
    // agentOrganId 信贷经理 机构 的id
    this.agentOrganId = this.$route.query.id
    this.role = this.$route.query.roleId
    if (this.agentOrganId && this.role) {
      this.isInbox = false
      this.isChange = true
      if (this.role === 2) {
        // 信贷经理
        this.$axios.get(`userBroker/getUserBrokerById/${this.agentOrganId}`).then(res => {
          this.detailData.fromName = res.brokerName
          this.shouPhone = res.phone
        })
      } else {
        // 机构
        this.$axios.get(`userAgency/selectUserAgencyById/${this.agentOrganId}`).then(res => {
          console.log('aaa', res)
          this.detailData.fromName = res.agencyName
          this.shouPhone = res.phone
        })
      }
    }
  },
  methods: {
    tabClick(val) {
      console.log(this.activeName)
      this.isInbox = true
      this.isChange = false
      this.sendMessData.content = ''
    },
    returnS() {
      this.isInbox = true
      this.isChange = false
      this.sendMessData.content = ''
    },
    lookShouRow(id) {
      this.isInbox = false
      this.isChange = true
      const shouId = id
      this.getDetailMess(shouId)
    },
    getDetailMess(id) {
      this.$axios.get(`message/getMessageById/${id}`).then(res => {
        this.detailData = res
        this.shouPhone = res.from
      })
    },
    handleSelectionChange(val) {
      this.selectMultipleInbox = val
    },
    handleSelectionChangeOutbox(val) {
      this.selectMultipleOutbox = val
    },
    handleCurrentChange(val) {
      this.page = val
    },
    handleSizeChange(val) {
      this.size = val
    },
    // 收件箱
    getSMessage() {
      this.listLoading = true
      this.$axios.get(`/message/getPageReceiveMessage/${this.$store.state.userInfo.phone}`).then(res => {
        this.shouData = res.rows
        this.listLoading = false
        backTop()
      })
    },
    // 发件箱
    getFMessage() {
      this.listLoading = true
      this.$axios.get(`/message/getPageSendMessage/${this.$store.state.userInfo.phone}`).then(res => {
        this.faData = res.rows
        this.listLoading = false
        backTop()
      })
    },
    // 单独删除
    deleteShouRow(id) {
      this.$axios.get(`message/removeReceiveMessage/${id}/${this.$store.state.userInfo.phone}`).then(res => {
        if (res.status === 200) {
          this.$message.success('删除成功')
          this.getSMessage()
          this.listLoading = false
        }
      })
    },
    deleteFaRow(id) {
      this.$axios.get(`message/removeSendMessage/${id}/${this.$store.state.userInfo.phone}`).then(res => {
        if (res.status === 200) {
          this.$message.success('删除成功')
          this.getFMessage()
          this.listLoading = false
        }
      })
    },
    subInbox() {
      if (this.selectMultipleInbox.length > 0) {
        this.selectMultipleInbox.forEach(item => {
          this.arrInbox.push(item.id)
          this.inbox = this.arrInbox.join(',')
        })
        this.$axios.get(`/message/removeReceiveMessageBatch/${this.inbox}/${this.$store.state.userInfo.phone}`).then(res => {
          if (res.status === 200) {
            this.$message.success('删除成功')
            this.getSMessage()
            this.listLoading = false
          }
        })
      } else {
        this.$message.warning('请选择您要删除的项')
      }
    },
    subOutbox() {
      if (this.selectMultipleOutbox.length > 0) {
        this.selectMultipleOutbox.forEach(item => {
          this.arrOutbox.push(item.id)
          this.outbox = this.arrOutbox.join(',')
        })
        this.$axios.get(`message/removeSendMessageBatch/${this.outbox}/${this.$store.state.userInfo.phone}`).then(res => {
          if (res.status === 200) {
            this.$message.success('删除成功')
            this.getFMessage()
            this.listLoading = false
          }
        })
      } else {
        this.$message.warning('请选择您要删除的项')
      }
    },
    // 发送信息
    sendMess() {
      if (this.sendMessData.content) {
        // 点击列表发送信息
        const data = new FormData()
        this.sendMessData.startTime = time()
        for (const item in this.sendMessData) {
          if (item === 'to') {
            data.append(item, this.shouPhone)
          } else {
            data.append(item, this.sendMessData[item])
          }
        }
        this.$axios.post('message/saveMessage', data).then(res => {
          if (res.status === 200) {
            this.activeName = '1'
            this.$message.success('消息发送成功')
            this.sendMessData.content = ''
            this.getFMessage()
          }
        })
      } else {
        this.$message.warning('内容不能为空')
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .collect{
    width:944px;
    height: auto;
    padding-bottom: 30px;
    box-sizing: border-box;
    background:rgba(255,255,255,1);
    .title{
      width: 100%;
      height:66px;
      padding-left: 56px;
      box-sizing: border-box;
      font-size:16px;
      font-family:PingFangSC-Medium;
      font-weight:500;
      color:rgba(81,81,81,1);
      line-height:66px;
    }
  }

  /deep/ .el-tabs__nav{
    width: 100%;
    background:rgba(250,250,250,1);
  }
  /deep/ .el-tabs__active-bar{
    width: 0;
    height: 0;
  }
  /deep/ .el-tabs__item{
    width: 50%;
    padding: 0 0;
    text-align: center;
    color:rgba(81,81,81,1);
  }
  /deep/
  .el-tabs__item.is-active{
    color:rgba(168,14,14,1);
    border-top: 1px solid #A80E0E;
    background-color: #fff;
  }
  /deep/ .el-tabs__active-bar:hover{
    color:rgba(81,81,81,1);
  }
  /deep/ .el-tabs__nav-wrap::after{
    background-color: #fff;
  }

  .inbox,.outbox{
    /deep/ .el-table {
      thead {
        background-color: #FAFAFA;
        color: #9b9b9b;
      }
      th {
        text-align: center;
      }
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

        font-size: 14px;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: rgba(81, 81, 81, 1);
        line-height: 40px;
        margin-left:280px;
      }
    }
    .chat-box {
      height: 340px;
      overflow: -moz-scrollbars-vertical;
      .message-box-left {
        position: relative;
        width: 500px;
        min-height: 50px;
        margin-left: 20px;
        margin-top: 20px;
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(81,81,81,1);
        line-height:20px;

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
    .chat-send-box {
      text-align: right;
      .chat-message {
        display: block;
        box-sizing: border-box;
        width: 866px;
        height: 40px;
        margin: 16px auto;
        padding-left: 10px;
        font-size: 16px;
        background: rgba(249, 249, 249, 1);
        border-radius: 2px;
        border: 1px solid rgba(240, 240, 240, 1);
      }
      .send {
        margin-right: 0;
        width: 80px;
        height: 32px;
        background: rgba(208, 172, 86, 1);
        color: #fff;
        border-radius: 34px;
        cursor: pointer;
        border: none;
      }
    }
  }
  .sub{
    cursor: pointer;
    margin-left: 57px;
    text-align: center;
    width:60px;
    height:28px;
    border-radius:4px;
    border:1px solid rgba(155,155,155,1);
    font-size:14px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(81,81,81,1);
    line-height:28px;
  }
  /deep/ .el-pager .number{
    color:rgba(165,165,165,1);
  }
  /deep/ .el-pagination.is-background .el-pager li{
    color:rgba(165,165,165,1);
    width:28px;
    height:28px;
    border-radius:4px;
    border:1px solid rgba(235,235,235,1);
  }
  /deep/ .el-pagination.is-background .el-pager li:not(.disabled).active{
    background:rgba(245,245,245,1);
    color:rgba(81,81,81,1);
    border-style: none;
  }
  /deep/ .el-pager li:disabled :hover{
    color:rgba(165,165,165,1);
  }
</style>
