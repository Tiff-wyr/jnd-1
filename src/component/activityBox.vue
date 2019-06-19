<template>
<div class="jnd-member-box" v-if="visible">
  <div class="box" :class="{ bg: isSucess }">
    <img :src="src" alt="" class="text" v-if="!isSucess">
    <img :src="getBtn" alt="" class="btn" v-if="!isSucess" @click="getMember">
    <img :src="useBtn" alt="" class="btn" v-else @click="useMember">
    <i @click.self="closeDialog"></i>
  </div>
</div>
</template>
<script>
import { getGift } from '@/views/api/activity'
const src = '../../../../static/resource/activity/text.png'
const getBtn = '../../../../static/resource/activity/get.png'
const useBtn = '../../../../static/resource/activity/use.png'
export default {
  name: 'memberBox',
  props: {
    visible: {
      type: Boolean,
      required: true
    }, 
    phone: {
      type: String | Number,
      required: true
    }
  },
  data() {
    return {
      src,
      useBtn,
      getBtn,
      isSucess: false
    }
  },
  watch: {
    visible: function(val, oldVal) {
      if (val) {
        this.stop();
      } else {
        this.move();
        this.nowIndex = 0;
        this.nowInd = ''
        this.payTypeIndex = ''
        this.level = ''
      }
    }
  },
  methods: {
    closeDialog() {
      this.$emit('close')
    },
    stop() {
      var mo = function(e) {
        e.preventDefault();
      };
      document.body.style.overflow = "hidden";
      document.addEventListener("touchmove", mo, false); //禁止页面滑动
    },
    move() {
      var mo = function(e) {
        e.preventDefault();
      };
      document.body.style.overflow = ""; //出现滚动条
      document.removeEventListener("touchmove", mo, false);
    },
    getMember() { // 领取会员
      getGift(this.phone).then(res => {
        if (res.status === 200) { // 领取成功
          this.isSucess = true
        } else {
          this.$message.warning(res.data.msg)
        }
      })
    },
    useMember() {
      this.$emit('useMember')
    }
  },
  destroyed() {
    this.move()
  }
};
</script>
<style lang="scss" scoped>
.jnd-member-box {
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba($color: #000000, $alpha: 0.5);
  overflow: hidden;
  text-align: center;
  .box {
    width: 577px;
    height: 538px;
    margin: 10vh auto;
    background: url('~/static/resource/activity/activity1.png');
    position: relative;
    &.bg {
      background: url('~/static/resource/activity/activity2.png');
    }
    img {
      position: absolute;
      left: 50%;
      bottom: 150px;
      transform: translate(-50%, 0);
    }
    .btn {
      bottom: -35px;
      cursor: pointer;
    }
    i {
      position: absolute;
      width: 33px;
      height: 33px;
      background: url('~/static/resource/activity/close.png');
      right: -60px;
      cursor: pointer;
    }
  }
}

</style>
