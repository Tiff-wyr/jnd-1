<template>
  <div class="jnd-wrap" v-if="visible">
    <div class="jnd-dialog" :style="{top: top, width: width}">
      <div class="jnd-title">
        <img v-if="msgType === 'warning'" :src="warning" alt="" class="jnd-msg-type">
        <span>{{ title }}</span>
      </div>
      <div class="jnd-container">
        <slot></slot>
      </div>
      <div class="jnd-footer" v-if="$slots.footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>
<script>
import warning from '../assets/warning.png'
export default {
  name: "jndDialog",
  props: {
    visible: {
      type: Boolean,
      default: false,
      required: true
    },
    top: {
      type: Number | String,
      default: '15vh'
    },
    width: {
      type: Number | String,
      default: '50%'
    },
    msgType: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      warning
    };
  },
  created() {},
  watch: {
    visible: function(val, oldVal) {
      if (val) {
        this.stop();
      } else {
        this.move();
      }
    }
  },
  mounted() {
    console.log('mounted', this.visible)
  },
  methods: {
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
    }
  },
  destroyed() {
    this.move()
  },
};
</script>
<style lang="scss" scoped>
.jnd-wrap {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba($color: #000000, $alpha: 0.5);
  overflow: hidden;
  .jnd-dialog {
    position: absolute;
    padding: 30px;
    background: #fff;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 8px;
  }
  .jnd-title {
    overflow: hidden;
    .jnd-msg-type {
      width: 36px;
      height: 36px;
      vertical-align: middle;
    }
    span {
      display: inline-block;
      height: 100%;
      vertical-align: middle;
      font-weight: 600;
      margin-left: 20px;
      color: #333;
    }
  }
  .jnd-container {
    padding-left: 56px;
    margin: 20px 0;
    color: #999;
  }
  .jnd-footer {
    text-align: right;
  }
}
</style>
