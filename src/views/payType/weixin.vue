<template>
  <div>
    <div class="top1"></div>
    <div class="top2">
      <div class="clearfix w960 fs">
        <img src="./WePayLogo.png" alt="" class="fll" style="width: 119px;height: 32px;">
        <div class="line fll"></div>
        <div class="text fll">我的收银台</div>
      </div>
    </div>
    <div class="gray">
      <div class="w960">
        <div class="order">订单号：</div>
        <div class="phone">{{uniqueId}}</div>
      </div>
      <div class="main-pay">
        <div class="sao">扫一扫付款（元）</div>
        <div class="money">{{ wxMoney }}</div>
        <div class="clearfix">
          <div class="fll">
            <div>
              <img :src="codeWei" alt="二维码">
            </div>
            <div>
              <img src="./sao.png" alt="">
            </div>
          </div>
          <div class="fll ml10">
            <img src="./phone.png" alt="">
          </div>
        </div>
      </div>
    </div>
    <div class="dialog-customer">
      <el-dialog :visible.sync="dialogVisible" width="500px">
        <div class="container">
          <div>
            <img :src="success" alt="">
            <span>支付成功！</span>
          </div>
          <div class="info">您已支付完成，点击返回上一页即可查看资源.</div>
        </div>
        <span slot="footer">
          <el-button type="danger" @click="handleBack">
            <span v-if="time">({{time}})</span>返回上一页
          </el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import success from "../../assets/success.png";
import { checkPayStatus, updateBaseStatus } from '@/api/pay.wxpay'
import { param2Obj } from '../../util/util'
export default {
  name: "weixin",
  data() {
    return {
      success,
      dialogVisible: false,
      codeWei: "",
      time: 5,
      uniqueId: '',
      code_url: '',
      params: {},
      wxMoney: ''
    };
  },
  created() {
    this.uniqueId = sessionStorage.getItem('uniqueId')
    this.code_url = sessionStorage.getItem('code_url')
    this.wxMoney = sessionStorage.getItem('wxMoney')
    this.getCode(this.code_url)
    this.params = param2Obj(window.location.href)
    const timer1 = setInterval(() => {
      this.checkStatus(this.uniqueId, this.params)
    }, 5000);
    this.$once("hook:beforeDestroy", () => {
      clearInterval(timer1);
    });
  },
  methods: {
    getCode(url) {
      let data = new FormData();
      data.append("code_url", url);
      this.$axios
        .post(`WXPay/qr_codeImg`, data, {
          responseType: "arraybuffer"
        })
        .then(response => {
          return (
            "data:image/png;base64," +
            btoa(
              new Uint8Array(response).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                ""
              )
            )
          );
        })
        .then(data => {
          this.codeWei = data;
        });
    },
    checkStatus(uniqueId, params) {
      checkPayStatus(uniqueId).then(res => {
        if (res.data.status === 200) {
            this.$message.success(res.data.msg);
            this.dialogVisible = true
            this.updateBase(params, () => {
              let timer2 = setInterval(() => {
                this.time--;
                if (!this.time) {
                  this.dialogVisible = false
                  clearInterval(timer2);
                  window.close();
                }
              }, 1000);
            })
          }
      })
    },
    updateBase(params, callback) {
      updateBaseStatus(params).then(res => {
        if (res.data.status === 200) {
          callback()
        } else {
          this.$message.warning(res.data.msg)
        }
      })
    },
    complete() {
      checkPayStatus(this.uniqueId).then(res => {
        if (res.data.status === 200) {
          this.$message.success(res.data.msg);
          this.dialogVisible = true
          this.updateBase(this.params)
        } else {
          this.$message.warning(res.data.msg);
        }
      })
    },
    handleBack() {
      window.close();
    }
  },
  destroyed() {
    sessionStorage.removeItem('uniqueId')
    sessionStorage.removeItem('code_url')
    sessionStorage.removeItem('wxMoney')
  },
};
</script>
<style lang="scss">
.dialog-customer .el-dialog__body {
  padding: 0 20px 30px;
}
.dialog-customer .el-button--danger {
  background: #a80e0e;
  border-color: #a80e0e;
}
</style>

<style scoped lang="scss">
.ml10 {
  margin-left: 10px;
}
.w960 {
  width: 960px;
  height: 80px;
  margin: 0 auto;
  padding-top: 15px;
  box-sizing: border-box;
}
.top1 {
  width: 100%;
  height: 27px;
  background: rgba(217, 217, 217, 1);
}
.top2 {
  width: 100%;
  height: 70px;
  background: rgba(255, 255, 255, 1);
  .text {
    height: 16px;
    font-size: 16px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(123, 123, 123, 1);
    line-height: 16px;
    margin-top: 14px;
  }
  .line {
    width: 1px;
    height: 30px;
    line-height: 30px;
    background: rgba(155, 155, 155, 1);
    margin-left: 5px;
    margin-right: 5px;
    margin-top: 0;
  }
}
.gray {
  width: 100%;
  padding-bottom: 60px;
  box-sizing: border-box;
  background: rgba(245, 245, 245, 1);
  .order {
    margin: 12px 0 20px 0;
    height: 16px;
    font-size: 16px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(81, 81, 81, 1);
    line-height: 16px;
  }
  .phone {
    height: 14px;
    font-size: 16px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(81, 81, 81, 1);
    line-height: 14px;
  }
  .main-pay {
    width: 960px;
    height: 540px;
    padding: 56px 200px 0 230px;
    background: rgba(255, 255, 255, 1);
    box-sizing: border-box;
    margin: 33px auto 0;
    .sao {
      width: 222px;
      text-align: center;
      height: 14px;
      font-size: 14px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(123, 123, 123, 1);
      line-height: 14px;
    }
    .money {
      width: 222px;
      text-align: center;
      height: 30px;
      font-size: 30px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(168, 14, 14, 1);
      line-height: 30px;
      margin: 8px 0 20px 0;
    }
  }
}
.complete {
  text-align: center;
  width: 120px;
  height: 40px;
  background: rgba(168, 14, 14, 1);
  border-radius: 20px;
  font-size: 16px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 40px;
  margin: 20px 0 0 60px;
}

.dialog-customer {
  .container {
    div {
      img {
        width: 40px;
        vertical-align: middle;
      }
      span {
        vertical-align: middle;
        display: inline-block;
        font-size: 18px;
        font-weight: 600;
      }
    }
    .info {
      padding-left: 44px;
      font-size: 16px;
      color: #999;
    }
  }
}
</style>
