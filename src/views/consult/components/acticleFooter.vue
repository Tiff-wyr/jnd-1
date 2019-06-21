<template>
  <p class="acticle-footer">
    <span class="tips time">{{ time | parseTimeFilter }}</span>
    <span class="tips source">来源：{{ source }}</span>
    <span class="tips num">浏览量：{{ num }}</span>
  </p>
</template>
<script>
import { parseTime } from '@/util/util'
export default {
  name: 'acticleFooter',
  filters: {
    parseTimeFilter(val) {
      return parseTime(val)
    }
  },
  props: {
    time: {
      type: String | Number,
      default: parseTime(new Date(), '{y}-{m}-{d}')
    },
    source: {
      type: String
    },
    num: {
      type: String | Number
    }
  }
}
</script>
<style lang="scss" scoped>
.acticle-footer {
  font-size: 12px;
  span {
    margin-right: 34px;
    padding-left: 16px;
    position: relative;
    &::after {
      display: block;
      content: ' ';
      position: absolute;
      left: 0;
      top: 50%;
      margin-top: -6px;
      width: 12px;
      height: 12px;
      background: red;
    }
    &.time::after {
      background: url('../../../../static/consult/time.png') center center no-repeat;
    }
    &.source::after {
      background: url('../../../../static/consult/source.png') center center no-repeat;
    }
    &.num::after {
      background: url('../../../../static/consult/eye.png') center center no-repeat;
    }
  }
}
</style>
