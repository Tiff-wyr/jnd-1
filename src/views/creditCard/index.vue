<template>
  <div class="app-container">
    <main class="credit-card-main">
      <section class="credit-list">
        <div v-for="(item, index) in resultList" :key="index" class="credit-item">
          <div class="credit-main">
            <div class="credit-info">
              <div class="img-wrap">
                <img :src="item.bigImgUrl" alt="">
              </div>
              <div class="card-info">
                <h4 class="card-name">{{ item.title }}</h4>
                <p>{{ item.info | infoFilter }}</p>
                <ul class="card-server">
                  <li>
                    <span>免首年年费，当年刷卡消费18笔或5万人民币（或等值外币），减免次年年费</span>
                    <p>免首年年费，当年刷卡消费18笔或5万人民币（或等值外币），减免次年年费</p>
                  </li>
                </ul>
              </div>
            </div>
            <div class="btn-wrap">
              <el-button type="danger" class="btn" @click="handleApply">免费申请</el-button>
              <div class="tips"><svg t="1577933983644" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1918" width="20" height="20"><path d="M756.004571 275.260952a471.430095 471.430095 0 0 1-16.384 0.292572C598.79619 275.504762 536.81981 210.992762 536.283429 210.456381L522.142476 195.047619 508.099048 210.456381C507.465143 211.090286 441.977905 280.478476 288.329143 275.260952L268.580571 274.529524v292.571428c0 76.55619 25.551238 188.318476 246.735239 273.749334l6.826666 2.681904 6.875429-2.681904c221.184-85.430857 246.735238-197.193143 246.735238-273.749334v-292.571428l-19.748572 0.682666z m-367.469714 216.015238l78.506667 57.929143s108.348952-112.152381 212.992-164.425143l14.969905 16.822858S564.175238 509.952 496.88381 653.848381L388.534857 491.27619z" fill="#4DDB78" p-id="1919"/></svg>民生银行官方申请通道</div>
            </div>
          </div>
          <div class="credit-foot">
            <ul>
              <li>
                <p class="type">卡币种</p>
                <p class="content">人民币</p>
              </li>
              <li>
                <p class="type">发卡组织</p>
                <p class="content">银联</p>
              </li>
              <li>
                <p class="type">卡等级</p>
                <p class="content">白金卡</p>
              </li>
              <li>
                <p class="type">取现额度</p>
                <p class="content">40%</p>
              </li>
              <li>
                <p class="type">免息期</p>
                <p class="content">20天到50天</p>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
    <footerSame style="margin-bottom: 30px;"/>
    <bottomTap/>
  </div>
</template>
<script>
import footerSame from '@/component/footerSame'
import bottomTap from '@/component/bottomTap'
export default {
  name: 'CreditCard',
  components: {
    footerSame,
    bottomTap
  },
  filters: {
    infoFilter(val) {
      if (val) {
        return val.replace(/<br>/g, ',')
      }
    }
  },
  data() {
    return {
      resultList: []
    }
  },
  created() {
    this.getCardList()
  },
  methods: {
    getCardList() {
      this.$axios.get('https://creditcard.cmbc.com.cn/wsv2/get_card_list', {
        source: 'WX',
        category: 112,
        encryptStr: '',
        transNum: '',
        logTag: ''
      }).then(res => {
        console.log(res)
        this.resultList = res.data
      })
    },
    handleApply() {
      window.location.href = 'https://creditcard.cmbc.com.cn/wsv2/'
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  padding: 30px 0;
  background: #F6F6F6;
}
.credit-card-main {
  width: 1200px;
  margin: 0 auto;
  .credit-list {
    .credit-item {
      box-shadow: 0 0 4px 2px rgba($color: #d1d1d1, $alpha: .2);
      margin-bottom: 30px;
      .credit-main {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #fff;
        padding: 40px;
        box-sizing: border-box;
        .credit-info {
          display: flex;
          .card-info {
            .card-name {
              color: #515151;
              font-size: 22px;
            }
              p {
                color: #9B9B9B;
                font-size: 14px;
              }
            .card-server {
              margin-top: 30px;
              padding-left: 20px;
              box-sizing: border-box;
              li {
                color: #A80E0E;
                span {
                  color: #515151;
                }
                p {
                  color: #AAAAAA;
                }
              }
            }
          }
        }
        .img-wrap {
          width:256px;
          margin-right: 30px;
          img {
            width: 100%;
          }
        }
        .btn-wrap {
          .btn {
            background: #A80E0E;
            width: 160px;
            border-color: #A80E0E;
          }
          .tips {
            color: #515151;
            font-size: 14px;
            margin-top: 10px;
          }
        }
      }
      .credit-foot {
        background: #F8F8F8;
        padding: 28px 0;
        ul {
          list-style: none;
          display: flex;
          justify-content: space-around;
          text-align: center;
          color: #515151;
          font-size: 16px;
          li {
            padding: 0 83px;
          }
          li:nth-of-type(2n) {
            border-left: 1px solid #ccc;
            border-right: 1px solid #ccc;
          }
          .type {
            margin-bottom: 16px;
            font-size: 14px;
          }
        }
      }
    }
  }
}
</style>
