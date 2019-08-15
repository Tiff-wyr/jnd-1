<template>
  <div class="wrap">
    <heade :style-options="styleOptions" />
    <swiper id="swiperBox" ref="mySwiper" :options="swiperOption">
      <swiper-slide :style="{background: 'url(' + bg0 + ') center center / cover no-repeat'}">
        <div class="page page1">
          <div class="info">
            <div class="top">
              <div class="title">
                <img src="../../assets/download/logo.png" class="logo" alt="">
                9能贷——APP全新上线
              </div>
              <p class="subtitle">专业大型一站式金融服务平台</p>
              <p class="subtitle">万款产品汇聚 100%下载</p>
            </div>
            <div class="download-info">
              <img class="code" src="../../assets/download/code.png" alt="">
              <div class="download-action"><img src="../../assets/download/andriod.png">Android版下载</div>
            </div>
          </div>
          <img class="phone" src="../../assets/download/0.png" alt="">
        </div>
      </swiper-slide>
      <swiper-slide v-for="(item, index) in list" :key="index" :style="sty(item)" class="swiper-slide">
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
      </swiper-slide>
    </swiper>
  </div>
</template>
<script>
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
    heade
  },
  data() {
    return {
      bg0,
      list: listOptions,
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
      }
    }
  },
  created() {
    console.log(window.innerHeight)
  },
  methods: {
    sty(item) {
      return {
        background: `url(${item.url}) center center / cover no-repeat`,
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
      }
    },
    lSty(item) {
      console.log(item.lInfo)
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
@font-face {
  font-family: 'a';
  src: url('../../assets/fonts/STXingkaiTC-Bold.ttf?t=1546944470368') format('truetype');
}
.wrap {
  padding-top: 92px;
  box-sizing: border-box;
  .page{
    @include box-center;
    position: relative;
    padding-top: 80px;
    height: 100%;
    box-sizing: border-box;
    .code {
      width: 200px;
    }
    .info {
      float: left;
      color: $jnd-font-color-white;
      .logo {
        width: 96px;
      }
      .title {
        display: flex;
        align-items: center;
        font-size: 40px;
        text-shadow:0px 2px 10px rgba(50,50,50,0.25);
      }
      .subtitle {
        font-size: 32px;
        margin: 10px 0;
        font-family: 'a';
      }
      .download-info {
        display: flex;
        flex-direction: column;
        position: absolute;
        bottom: 10vh;
        width:260px;
        align-items: center;
        .download-action {
          width:260px;
          height:68px;
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
      height: 80%;
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
