<template>
  <div v-if="visible" class="jnd-member-box" @click.self="closeDialog">
    <div :style="{top: top}" class="member-wrap">
      <div class="title-wrap">
        <img src="../../static/resource/vip/vip.png" alt="">
        <span class="title">就能贷VIP会员</span>
        <input v-model="checked" type="checkbox" class="check-box">
        <span class="tips">同意<a href="/agreement?memberService" target="_blank" style="color: #4a90e2;">《服务条款》</a></span>
        <i class="close" @click="closeDialog">×</i>
      </div>
      <div class="member-body">
        <div class="tab-bar">
          <ul>
            <li v-for="(item, index) in data" :class="{'checked': index === nowIndex}" :key="index" @click="toggleTabBar(index, item)"><span v-for="(i, ind) in item" v-if="ind === 0" :key="ind">{{ i.vid | vipTypeFilter }}</span></li>
          </ul>
        </div>
        <div v-for="(item, index) in data" v-show="index === nowIndex" :key="index" class="content">
          <div>
            <p>套餐选择</p>
            <ul>
              <li v-for="(i, ind) in item" :class="{'checked': ind + 1 === nowInd}" :key="ind + 'list'" class="item" @click="toggleMail(ind, i)">
                <div :class="{'discount': i.discount !== 1}" class="price">
                  {{ i.payAmount | priceFilter }}
                  <br>
                  <s v-if="i.discount !== 1" style="font-size: 12px">{{ i.totalAmount | priceFilter }}</s>
                </div>
                <div :class="{'discount-time': i.discount !== 1}" class="time">{{ i.month | timeFilter }}</div>
                <i/>
              </li>
            </ul>
          </div>
          <div>
            <p>支付选择</p>
            <ul class="pay-type-list">
              <li v-for="(item, index) in payType" :class="{'checked': index + 1 === payTypeIndex}" :key="item.value" class="pay-type-item" @click="handlePayType(index)">
                <img :src="item.src" alt="">
                <i/>
              </li>
            </ul>
          </div>
        </div>
        <button class="go-pay" @click="handlePay">去支付</button>
      </div>
    </div>
  </div>
</template>
<script>
const payType = [
  { value: 0, label: '支付宝', src: '../../../../static/resource/vip/wx.png' },
  { value: 1, label: '微信', src: '../../../../static/resource/vip/zfb.png' }
]
export default {
  name: 'MemberBox',
  filters: {
    priceFilter(val) {
      return val + '元'
    },
    vipTypeFilter(val) {
      const vipMap = {
        0: '非会员',
        1: '会员',
        2: '高级会员',
        3: '超级会员'
      }
      return vipMap[val]
    },
    timeFilter(val) {
      const timeMap = {
        0: '1次',
        1: '包月',
        3: '季度',
        6: '半年'
      }
      return timeMap[val]
    }
  },
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    top: {
      type: Number | String,
      default: '15vh'
    },
    phone: {
      type: Number | String,
      required: true
    },
    data: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      payType,
      checked: true,
      nowIndex: 0,
      nowInd: '',
      payTypeIndex: '',
      level: ''
    }
  },
  watch: {
    visible: function(val, oldVal) {
      if (val) {
        this.stop()
      } else {
        this.move()
        this.nowIndex = 0
        this.nowInd = ''
        this.payTypeIndex = ''
        this.level = ''
      }
    }
  },
  destroyed() {
    this.move()
  },
  methods: {
    closeDialog() {
      this.$emit('close')
    },
    toggleTabBar(val, item) {
      this.nowIndex = val
      this.nowInd = ''
      this.payTypeIndex = ''
      this.toggleMail()
    },
    toggleMail(val, i) {
      if (i) {
        this.level = i.vid
        this.$emit('change', i)
      }
      this.nowInd = val + 1
    },
    handlePayType(val) {
      this.payTypeIndex = val + 1
    },
    handlePay() {
      const obj = {
        nowInd: this.nowInd,
        payType: this.payTypeIndex,
        checked: this.checked,
        vipLevel: this.level
      }
      this.$emit('goPay', obj)
    },
    stop() {
      var mo = function(e) {
        e.preventDefault()
      }
      document.body.style.overflow = 'hidden'
      document.addEventListener('touchmove', mo, false) // 禁止页面滑动
    },
    move() {
      var mo = function(e) {
        e.preventDefault()
      }
      document.body.style.overflow = '' // 出现滚动条
      document.removeEventListener('touchmove', mo, false)
    }
  }
}
</script>
<style lang="scss" scoped>
li {
  list-style: none;
}
.jnd-member-box {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba($color: #000000, $alpha: 0.5);
  overflow: hidden;
  text-align: center;
  .member-wrap {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 700px;
    background: #fff;
    padding-bottom: 40px;
  }
  .title-wrap {
    height: 40px;
    background:linear-gradient(180deg,rgba(255,255,255,1) 0%,rgba(247,247,247,1) 57%,rgba(238,238,238,1) 100%);
    text-align: center;
    line-height: 40px;
    font-size:16px;
    font-weight:400;
    position: relative;
    .title {
      color:#D0AC56;
    }
    img {
      width: 20px;
      height: 20px;
      transform: translateY(5px);
    }
    .check-box {
      width: 12px;
      height: 12px;
      border-radius:2px;
      border: 1px solid #979797;
      transform: translateY(2px);
    }
    .tips {
      font-size: 10px;
      color: #9B9B9B;
    }
    .close {
      position: absolute;
      font-style: normal;
      font-size: 22px;
      cursor: pointer;
      right: 20px;
    }
  }
  .member-body {
    p  {
      text-align: left;
      font-weight: 600;
    }
    background: #F9F9F9;
    .tab-bar {
      ul {
        overflow: hidden;
        height: 40px;
        line-height: 40px;
        background: #EBEBEB;
        display: flex;
        justify-content: space-around;
        li {
          flex-grow: 1;
          text-align: center;
          color: #4A4A4A;
          cursor: pointer;
          &.checked {
            background: #F9F9F9;
          }
        }
      }
    }
    .content {
      color: #4A4A4A;
      padding: 20px 30px;
      background: #F9F9F9;
      ul {
        display: flex;
        justify-content: space-around;
        margin: 30px 0;
        .item {
          width:130px;
          height:127px;
          text-align: center;
          border: 1px solid #D9D9D9;
          background: #fff;
          cursor: pointer;
          &.checked {
            border-color: #D0AC56;
            position: relative;
            transition: all .5s;
            i {
              position: absolute;
              top: 0;
              right: 0;
              border-bottom: 13px solid #fff;
              border-top: 13px solid transparent;
              border-left: 13px solid #fff;
              border-right: 13px solid transparent;
              background: #D0AC56;
              &::after {
                box-sizing: content-box;
                content: "";
                border: 2px solid #fff;
                border-left: 0;
                border-top: 0;
                height: 8px;
                right: -9px;
                top: -10px;
                position: absolute;
                transform: rotate(45deg);
                width: 3px;
                // transform-origin: center;
              }
            }
          }
          .price {
            font-size: 24px;
            margin-top: 30px;
            &.discount {
              margin-top: 10px;
            }
          }
          .time {
            width:98px;
            border-top: 1px dashed #D9D9D9;
            margin: 17px auto 0;
            padding-top: 15px;
            &.discount-time {
              margin-top: 10px;
            }
          }
        }
        .pay-type-item {
          position: relative;
          width:140px;
          height:56px;
          background:#fff;
          text-align: center;
          border-radius:4px;
          border:1px solid rgba(217,217,217,1);
          cursor: pointer;
          &.checked {
            border-color: #D0AC56;
            i {
              position: absolute;
              width:16px;
              height:16px;
              border:1px solid #D0AC56;
              border-radius: 50%;
              right: -8px;
              top: -8px;
              background: #fff;
              &::after {
                box-sizing: content-box;
                content: "";
                border: 2px solid #D0AC56;
                border-left: 0;
                border-top: 0;
                height: 8px;
                right: 50%;
                top: 50%;
                position: absolute;
                transform: rotate(45deg) translate(-50%, -50%);
                width: 3px;
              }
            }
          }
          img {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
        }
      }
    }
  }
  .go-pay {
    width: 100px;
    height: 40px;
    background: #D0AC56;
    margin: 0 auto;
    border: none;
    color: #fff;
    cursor: pointer;
  }
}

</style>
