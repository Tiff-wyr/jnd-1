<template>
  <div class="wrap">
    <heade :style-options="styleOptions" />
    <div :style="scrollBoxSty" class="scroll-box">
      <div class="page">
        <ul :style="{top: top}">
          <li :style="{background: 'url(' + bg0 + ') center center / cover no-repeat'}">
            <div class="page page1">
              <div class="info">
                <div class="top">
                  <div class="title">
                    <img src="../../assets/download/logo.png" class="logo" alt="">
                    9能贷——APP全新上线
                  </div>
                  <p class="subtitle">专业大型一站式金融服务平台</p>
                  <p class="subtitle">万款产品汇聚 100%下款</p>
                </div>
                <div class="download-info">
                  <img class="code" src="../../assets/download/code.png" alt="">
                  <div class="download-action"><img src="../../assets/download/andriod.png">Android版下载</div>
                </div>
              </div>
              <img class="phone" src="../../assets/download/0.png" alt="">
            </div>
          </li>
          <li v-for="(item, index) in list" :key="index" :style="sty(item)">
            <div class="page">
              <div :style="lSty(item)" class="page-info">
                <h2 v-if="item.lInfo.title"> {{ item.lInfo.title }}</h2>
                <p class="id">{{ item.lInfo.type }}</p>
                <p v-for="(p, index) in item.lInfo.p" :key="index">{{ p }}</p>
                <div :style="sunLSty(item)" class="download-info">
                  <img class="code" src="../../assets/download/code.png" alt="">
                  <p>扫码直接下载</p>
                </div>
              </div>
              <img :style="rSty(item)" :src="item.rInfo.url" class="phone" alt="">
            </div>
          </li>
        </ul>
      </div>
      <footerSame/>
      <bottomTap/>
    </div>
  </div>
</template>
<script>
import footerSame from '@/component/footerSame'
import bottomTap from '@/component/bottomTap'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import heade from '@/component/header'
import bg0 from '@/assets/download/bg0.png'
import bg1 from '@/assets/download/bg1.png'
import bg2 from '@/assets/download/bg2.png'
import bg3 from '@/assets/download/bg3.png'
import bg4 from '@/assets/download/bg4.png'
import bg5 from '@/assets/download/bg5.png'
import phone1 from '@/assets/download/1.png'
import phone2 from '@/assets/download/2.png'
import phone3 from '@/assets/download/3.png'
import phone4 from '@/assets/download/4.png'
import phone5 from '@/assets/download/5.png'

const listOptions = [
  { id: 0,
    url: bg1,
    lInfo: {
      title: '我是贷款用户',
      type: '专业经纪人',
      p: ['10年从业经验，沟通无障碍', '安全便捷的贷款服务'],
      left: 0,
      textAlign: 'left'
    },
    rInfo: {
      url: phone1,
      right: 0
    }
  },
  { id: 1,
    url: bg2,
    lInfo: {
      type: '权威机构',
      p: ['100%贷款合作机构，随你选择', '利率低至0.26%', '对虚假机构0容忍'],
      right: 0,
      textAlign: 'right'
    },
    rInfo: {
      url: phone2,
      left: 0
    }
  },
  { id: 2,
    url: bg3,
    lInfo: {
      type: '在线直聊',
      p: ['24*7小时在线服务', '随时随地，直接开聊'],
      left: 0,
      textAlign: 'left'
    },
    rInfo: {
      url: phone3,
      right: 0
    }
  },
  { id: 3,
    url: bg4,
    lInfo: {
      type: '精选产品',
      p: ['精准推荐，根据您提供的资料', '精准挑选出最适合您的贷款方案'],
      left: 0,
      textAlign: 'left'
    },
    rInfo: {
      url: phone4,
      right: 0
    }
  },
  { id: 4,
    url: bg5,
    lInfo: {
      title: '我是经纪人',
      type: '会员',
      p: ['专注贷款领域，每日驾到海量用户', '93%用户已申请贷款'],
      right: 0,
      textAlign: 'right'
    },
    rInfo: {
      url: phone5,
      left: 0
    }
  }
]
export default {
  components: {
    swiper,
    swiperSlide,
    heade,
    footerSame,
    bottomTap
  },
  data() {
    return {
      bg0,
      list: [],
      swiperOption: {
        notNextTick: true,
        direction: 'vertical',
        autoHeight: true,
        slidesPerView: 1,
        mousewheel: true,
        mousewheelControl: true,
        height: window.innerHeight - 92,
        resistanceRatio: 0,
        observeParents: true
      },
      styleOptions: {
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: 9999
      },
      flag: true,
      count: 0,
      top: 0,
      htmlStr: '',
      scrollBoxSty: {
        top: '92px'
      },
      scrollFlag: true
    }
  },
  mounted() {
    this.list.push(listOptions[this.count])
    window.addEventListener('mousewheel', this.handleScroll, false)
    // // firefox
    window.addEventListener('DOMMouseScroll', this.handleScroll, false)
    this.stop()
  },
  beforeDestroy() {
    this.move()
  },
  methods: {
    stop() {
      var mo = function(e) { e.preventDefault() }
      document.body.style.overflow = 'hidden'
      document.addEventListener('touchmove', mo, false)// 禁止页面滑动
    },
    move() {
      var mo = function(e) { e.preventDefault() }
      document.body.style.overflow = 'auto'// 出现滚动条
      document.removeEventListener('touchmove', mo, false)
    },
    // 判断浏览器类型, 只判断是否是火狐
    checkBorrowerType() {
      const userAgent = navigator.userAgent // 取得浏览器的userAgent字符串\
      if (userAgent.indexOf('Firefox') > -1) {
        return 'firefox'
      } else {
        return 'other'
      }
    },
    scrollDownPage(viewHeight) {
      if (this.count < 5) {
        if (this.flag) {
          this.count++
          if (this.count >= this.list.length && this.count < listOptions.length) {
            this.list.push(listOptions[this.count])
          }
          this.flag = false
          let num = parseInt(this.top)
          const timer = setInterval(() => {
            num -= 30
            this.top = num + 'px'
            if (num <= -viewHeight * this.count) {
              this.top = -viewHeight * this.count + 'px'
              clearInterval(timer)
              this.flag = true
            }
          }, 10)
        }
      } else {
        if (this.scrollBoxSty.bottom >= 0) {
          return
        }
        if (this.scrollFlag) {
          this.scrollFlag = false
          this.scrollBoxSty = {
            bottom: '-528px'
          }
          let num = -528
          const timer = setInterval(() => {
            num += 30
            this.scrollBoxSty.bottom = num + 'px'
            if (num >= 0) {
              this.scrollBoxSty.bottom = 0
              clearInterval(timer)
              this.scrollFlag = true
            }
          }, 10)
        }
      }
    },
    scrollTopPage(viewHeight) {
      if (this.scrollBoxSty.bottom === 0) {
        this.flag = false
        let num = 0
        const timer = setInterval(() => {
          num -= 30
          this.scrollBoxSty.bottom = num + 'px'
          if (num <= -528) {
            this.scrollBoxSty.bottom = '-528px'
            clearInterval(timer)
            setTimeout(() => {
              this.flag = true
            }, 100)
          }
        }, 10)
        return
      } else {
        if (this.count > 0) {
          if (this.flag) {
            this.count--
            this.flag = false
            let num = parseInt(this.top)
            const timer = setInterval(() => {
              num += 30
              this.top = num + 'px'
              if (num >= -viewHeight * this.count) {
                this.top = -viewHeight * this.count + 'px'
                clearInterval(timer)
                this.flag = true
                this.stop()
              }
            }, 10)
          }
        }
      }
    },
    handleScroll(e) {
      const windowHeight = document.documentElement.clientHeight || document.body.clientHeight
      const viewHeight = windowHeight - 92
      var scrollTop = 0
      if (document.documentElement && document.documentElement.scrollTop) {
        scrollTop = document.documentElement.scrollTop
      } else if (document.body) {
        scrollTop = document.body.scrollTop
      }
      // 滑轮向上滚为正  向下为负
      if (this.checkBorrowerType() === 'firefox') {
        if (e.detail > 0) { // 滚轮向下滚
          this.scrollDownPage(viewHeight)
        } else { // 滚轮向上滚
          if (scrollTop <= 0) {
            this.scrollTopPage(viewHeight)
          }
        }
      } else {
        if (e.wheelDeltaY > 0) { // 滚轮向上滚
          if (scrollTop <= 0) {
            this.scrollTopPage(viewHeight)
          }
        } else { // 滚轮向下滚
          this.scrollDownPage(viewHeight)
        }
      }
    },
    sty(item) {
      return {
        background: `url(${item.url}) center center / cover no-repeat`,
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
      }
    },
    lSty(item) {
      if (item.lInfo.textAlign === 'left') {
        return {
          left: 0
        }
      } else {
        return {
          right: 0,
          textAlign: 'right'
        }
      }
    },
    sunLSty(item) {
      if (item.lInfo.textAlign === 'left') {
        return {
          float: 'left'
        }
      } else {
        return {
          float: 'right'
        }
      }
    },
    rSty(item) {
      if (item.lInfo.textAlign === 'left') {
        return {
          right: 0,
          bottom: 0
        }
      } else {
        return {
          left: 0,
          bottom: 0
        }
      }
    }
  }
}
</script>
<style>

</style>

<style lang="scss" scoped>
.wrap {
  position: relative;
  padding-top: 92px;
  box-sizing: border-box;
  height: 100vh;
  .scroll-box {
    position: absolute;
    width: 100%;
  }
  .page{
    position: relative;
    height: calc(100vh - 92px);
    min-height: 500px;
    box-sizing: border-box;
    overflow: hidden;
    .info {
      padding: 40px 0;
    }
    .page {
      @include box-center;
      height: 100%;
    }
    ul {
      position: absolute;
      width: 100%;
      list-style: none;
      li {
        height: calc(100vh - 92px);
        box-sizing: border-box;
        overflow: hidden;
      }
    }
    .code {
      width: 160px;
      border: 10px solid #fff;
    }
    .info {
      float: left;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
      color: $jnd-font-color-white;
      box-sizing: border-box;
      // position: absolute;
      // bottom: 10vh;
      .logo {
        width: 72px;
      }
      .title {
        display: flex;
        align-items: center;
        font-size: 36px;
        text-shadow:0px 2px 10px rgba(50,50,50,0.25);
      }
      .subtitle {
        font-size: 28px;
        margin: 10px 0;
      }
      .download-info {
        display: flex;
        flex-direction: column;
        // position: absolute;
        // bottom: 10vh;
        justify-content: space-between;
        width:260px;
        align-items: center;
        .download-action {
          width:240px;
          height:60px;
          border:2px solid #ffffff;
          border-radius: 50px;
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
          margin-top: 20px;
        }
      }
    }
    .phone {
      height: 75%;
      position: absolute;
      right: 0;
    }
    &.page1 {
      .phone {
        top: 50%;
        transform: translateY(-50%);
      }
    }
    .page-info {
      position: absolute;
      bottom: 15vh;
      color: $jnd-font-color-white;
      h2 {
        font-size: 40px;
        margin-bottom: 40px;
      }
      .id {
        margin-bottom: 20px;
      }
      p {
        font-size: 28px;
      }
      .download-info {
        margin-top: 20px;
        width: 200px;
        p {
          text-align: center;
        }
      }
    }
  }
}
</style>
