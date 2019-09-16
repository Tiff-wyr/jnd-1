<template>
  <div class="step-wrap">
    <div class="step-bar">
      <div class="item">
        <span :style="{backgroundColor: active >= 1 ? '#A80E0E' : ''}" class="main">
          <span class="title">填写基本信息</span>
        </span>
      </div>
      <div class="item">
        <span :style="{backgroundColor: active >= 2 ? '#A80E0E' : ''}" class="main">
          <span class="title">完善贷款信息</span>
        </span>
      </div>
      <div class="item">
        <span :style="{backgroundColor: active > 2 ? '#A80E0E' : ''}" class="main">
          <span class="title">申请完成</span>
        </span>
      </div>
      <div :style="styleComputed" class="status"/>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Step',
  props: {
    active: {
      type: [Number, String],
      default: 1
    }
  },
  computed: {
    styleComputed() {
      var styleObj = {}
      if (this.active >= 1 && this.active < 2) {
        styleObj = {
          width: '0'
        }
      } else if (this.active >= 2 && this.active < 3) {
        styleObj = {
          width: '50%'
        }
      } else {
        styleObj = {
          width: '100%'
        }
      }
      console.log(styleObj)
      return styleObj
    }
  }
}
</script>
<style lang="scss" scoped>
.step-wrap {
  display: flex;
  align-items: center;
  height: 100px;
  .step-bar {
    position: relative;
    height: 100px;
    background: #fff;
    width: 100%;
    height: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .status {
      width: 0;
      height: 100%;
      transition: all 1s;
      background: #A80E0E;
    }
  }
  .item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: $jnd-font-color-base;
    position: absolute;

    &:first-of-type {
      left: 0;
    }
     &:nth-of-type(2) {
       left: 50%;
       transform: translateX(-50%);
     }
     &:nth-of-type(3) {
       right: 0;
     }
    &:first-of-type .main, &:nth-of-type(2) .main {
      background-image: url('../../../assets/list.png');
      background-position: center center;
      background-repeat: no-repeat;
    }
    &:nth-of-type(3) .main {
      background-image: url('../../../assets/yes.png');
      background-position: center center;
      background-repeat: no-repeat;
    }
    .main {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: #d9d9d9;
      position: relative;
      text-align: center;
      img {
        vertical-align: middle;
      }
      .title {
        position: absolute;
        left: 0;
        bottom: calc(100% + 4px);
        width: 96px;
      }
    }
    &:nth-of-type(2) .main .title {
      left: -30px;
    }
    &:nth-of-type(3) .main .title {
      left: -40px;
    }
  }
}
</style>

