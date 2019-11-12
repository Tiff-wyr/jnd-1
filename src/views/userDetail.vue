<template>
  <div>
    <div class="wrappy">
      <div class="w1200">
        <div class="clearfix">
          <div class="fll user-wrap">
            <div class="top">
              <div class="clearfix">
                <div class="fll">
                  <img v-if="tableData.image" :src="tableData.image" alt="" style="width: 120px;height: 120px;border-radius: 50%" >
                  <img v-else src="/static/resource/user.png" alt="" style="width: 120px;height: 120px;border-radius: 50%" >
                </div>
                <div class="fll">
                  <div class="name">{{ tableData.borrowerName }}</div>
                  <div class="clearfix">
                    <img src="../assets/message.png" class="fll" style="width: 20px;height: 20px;vertical-align: middle; margin-right: 10px;" alt="">
                    <div class="fll send" @click="sendMess">发送消息</div>
                  </div>
                </div>
                <div class="fll phone">{{ tableData.phone }}</div>
              </div>
            </div>
            <div class="message">
              <div class="clearfix mt26">
                <div class="fll yellow-line"/>
                <div class="fll ml10 feature">基本信息</div>
              </div>
              <div class="line2"/>
              <div class="clearfix">
                <div class="fll">
                  <div class="clearfix mb30">
                    <div class="clearfix mb30">
                      <div class="fll text-age">年龄：</div>
                      <div class="fll w120">{{ tableData.age }}</div>
                    </div>
                    <div class="fll text-age">所在地区：</div>
                    <div class="fll w120">{{ tableData.address }}</div>
                  </div>
                </div>
                <div class="fll ml30">
                  <div class="clearfix mb30">
                    <div class="fll text-age">职业：</div>
                    <div class="fll w120">{{ tableData.jobTypeValue }}</div>
                  </div>
                  <div class="clearfix">
                    <div class="fll text-age">月收入：</div>
                    <div class="fll w120">{{ tableData.monthIncome }}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="message">
              <div class="clearfix mt26">
                <div class="fll yellow-line"/>
                <div class="fll ml10 feature">贷款信息</div>
              </div>
              <div class="line2"/>
              <div class="clearfix">
                <div class="fll">
                  <div v-if="!tableData.isPawn" class="clearfix mb30">
                    <div class="fll text-age">贷款金额：</div>
                    <div class="fll w120">{{ tableData.loanAmount }}</div>
                  </div>
                  <div class="clearfix mb30">
                    <div class="fll text-age">有无本地社保：</div>
                    <div class="fll w120">{{ tableData.sheBaoValue }}</div>
                  </div>
                  <div class="clearfix mb30">
                    <div class="fll text-age">名下车辆情况：</div>
                    <div class="fll w120">{{ tableData.carStatusValue }}</div>
                  </div>
                  <div class="clearfix mb30">
                    <div class="fll text-age">信用情况：</div>
                    <div class="fll w120">{{ tableData.creditStatusValue }}</div>
                  </div>
                  <div class="clearfix mb30">
                    <div class="fll text-age">发布时间：</div>
                    <div class="fll w120">{{ tableData.startTime }}</div>
                  </div>
                </div>
                <div class="fll ml30">
                  <div class="clearfix mb30">
                    <div class="fll text-age">贷款期限：</div>
                    <div class="fll w120">{{ tableData.loanTimeValue }}</div>
                  </div>
                  <div class="clearfix mb30">
                    <div class="fll text-age">有无本地公积金：</div>
                    <div class="fll w120">{{ tableData.gongJiJinValue }}</div>
                  </div>
                  <div class="clearfix mb30">
                    <div class="fll text-age">名下房产信息：</div>
                    <div class="fll w120">{{ tableData.houseInfoValue }}</div>
                  </div>
                  <div class="clearfix mb30">
                    <div class="fll text-age">是否有芝麻分：</div>
                    <div class="fll w120">{{ tableData.zhiMaCreditValue }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="fll ml30" @click="enterMem">
            <img src="../../static/resource/user-img.png" alt="">
          </div>
        </div>
        <footerSame/>
      </div>
    </div>
  </div>
</template>

<script>
import footerSame from '../component/footerSame'
import detailApi from '@/api/detail'
import { param2Obj } from '../util/util'
import { getBorDetail } from '@/api/agent'
export default {
  name: 'UserDetail',
  components: {
    footerSame
  },
  data() {
    return {
      userId: '',
      tableData: {}
    }
  },
  created() {
    const params = param2Obj(location.href)
    this.userId = params.borId

    if (params.type === 2) {
      delete params.borId
    }
    if (params.orderId) {
      getBorDetail(params.orderId).then(res => {
        console.log(res)
        this.tableData = res.data
      })
    } else {
      this.getData(params)
    }
    // 保存信贷经理浏览贷款人记录
    this.getAgentRecord()
    // 保存机构浏览贷款人记录
    this.getOrganRecord()
  },
  methods: {
    getData(params) {
      detailApi.getUserDetail(params).then(res => {
        this.tableData = res.data.data
      })
    },
    // 发送信息
    sendMess() {
      if (this.$store.state.userInfo) {
        if (this.$store.state.userInfo.roleId === 2) {
          // 信贷经理
          this.$router.push({
            path: `/agentMessage/${
              this.$store.state.userInfo.id
            }/agentMessageCenter`,
            query: { id: this.userId }
          })
        } else if (this.$store.state.userInfo.roleId === 3) {
          // 机构
          this.$router.push({
            path: `/organMessage/${this.$store.state.userInfo.id}/messCen`,
            query: { id: this.userId }
          })
        }
      } else {
        this.$message.warning('请先登录')
      }
    },
    getAgentRecord() {
      if (this.$store.state.userInfo) {
        if (this.$store.state.userInfo.roleId === 2) {
          this.$axios
            .get(
              `brokerBrowseRecord/saveRecord/${this.$store.state.userInfo.id}/${
                this.userId
              }`
            )
            .then(res => {})
        }
      }
    },
    getOrganRecord() {
      if (this.$store.state.userInfo) {
        if (this.$store.state.userInfo.roleId === 3) {
          const data = new FormData()
          data.append('agencyId', this.$store.state.userInfo.id)
          data.append('borId', this.userId)
          this.$axios.post(`agencyLook/addAgencyLookBor`, data).then(res => {})
        }
      }
    },
    enterMem() {
      if (this.$store.state.userInfo) {
        if (this.$store.state.userInfo.roleId === 3) {
          // 机构
          this.$router.push(
            `/organMessage/${this.$store.state.userInfo.id}/memberCen`
          )
        } else {
          // 信贷经理
          this.$router.push(
            `/agentMessage/${this.$store.state.userInfo.id}/agentMember`
          )
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.mb30 {
  margin-bottom: 30px;
}
.w120 {
  width: 150px;
  height: 14px;
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(81, 81, 81, 1);
  line-height: 14px;
}
.mt26 {
  margin-top: 26px;
}
.ml10 {
  margin-left: 10px;
}
.ml30 {
  margin-left: 30px;
}
.user-wrap {
  width: 902px;
  background: rgba(255, 255, 255, 1);
  padding: 20px 60px;
  box-sizing: border-box;
  .top {
    .name {
      height: 20px;
      font-size: 20px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(81, 81, 81, 1);
      line-height: 20px;
      margin: 26px 0 32px 0;
    }
    .send {
      height: 14px;
      font-size: 14px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(81, 81, 81, 1);
      line-height: 14px;
      cursor: pointer;
    }
    .phone {
      height: 120px;
      font-size: 24px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(81, 81, 81, 1);
      line-height: 120px;
      letter-spacing: 1px;
      margin-left: 250px;
    }
  }
  .message {
    .yellow-line {
      width: 4px;
      height: 16px;
      background: rgba(208, 172, 86, 1);
    }
    .feature {
      height: 16px;
      font-size: 16px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(81, 81, 81, 1);
      line-height: 16px;
    }
    .line2 {
      width: 782px;
      height: 1px;
      background: #f0f0f0;
      margin-top: 10px;
      margin-bottom: 25px;
    }
    .text-age {
      height: 14px;
      font-size: 14px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(155, 155, 155, 1);
      line-height: 14px;
    }
  }
}
</style>
