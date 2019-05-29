<template>
    <div class="step-wrap clearfix">
        <div class="step-item fll clearfix" v-for="(item, index) in list" :key="index">
          <div class="step-content fll">
            <div :class="index <= active-1 ? 'step step_active': 'step'">{{index + 1}}</div>
            <div class="content">{{item}}</div>
          </div>
          <div :class="index < active-1 ? 'line line-arrive fll': (index === active-1 ? 'line line-active fll' : 'line fll')"
               v-if="index < list.length-1"></div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'step',
  props: {
    list: Array,
    active: {
      type: Number,
      default: 1
    }
  }
}
</script>

<style scoped lang="scss">
  .step-wrap {
    display: inline-block;
    margin-top: 16px;
    .step-item {
      box-sizing: border-box;

      .step-content {
        text-align: center;
        .step {
          margin: auto;
          width:32px;
          height:32px;
          line-height: 32px;
          border-radius: 50%;
          border:1px solid rgba(217,217,217,1);
          color: rgba(217,217,217,1);
        }
        .step_active {
          color: #fff;
          background:rgba(208,172,86,1);
        }

        .content {
          margin-top: 4px;
          height:14px;
          font-size:14px;
          font-family:PingFangSC-Regular;
          font-weight:400;
          color:rgba(155,155,155,1);
          line-height:14px;
        }

      }

      .line {
        width:100px;
        height:2px;
        margin: 15px 18px;
        background: rgba(217,217,217,1);
      }
      .line-active {
        background:linear-gradient(90deg,rgba(208,172,86,1) 0%,rgba(255,255,255,1) 100%);
      }
      .line-arrive {
        background: rgba(208,172,86,1)
      }
    }
  }
</style>
