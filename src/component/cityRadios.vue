<template>
  <div class="clearfix a">
    <div class="overflow-no-hidden">
      <label v-for="(item, index) in provinceData" v-if="index < conditions" :key="item.pid" class="radio_wrap fll" @mouseout="outStyle">
        <input
          :ref="'city' + item.pid"
          :value="item.pid"
          :name="item.provincial"
          class="isShow"
        >
        <div :class="{'active': index === activeIndex}" class="radio_label" @click="handleProvince(index, item)">{{ item.provincial }}</div>
        <div v-if="index === nowIndex" class="toggle" @mouseout="outStyle" @mouseover="mouseoverStyle(index)">
          <happy-scroll :min-length-h="20" color="#D8D8D8">
            <ul style="padding-bottom: 20px;">
              <li
                v-for="label in cityData"
                :key="label.cid"
                @click="handleCity(label.cid)"
              >{{ label.city }}</li>
            </ul>
          </happy-scroll>
        </div>
      </label>
    </div>
  </div>
</template>

<script>
import { HappyScroll } from 'vue-happy-scroll'
import 'vue-happy-scroll/docs/happy-scroll.css'
import { fetchProvince, fetchCity } from '@/api/register'
export default {
  name: 'CityRadios',
  components: {
    HappyScroll
  },
  props: {
    i: {
      type: String | undefined,
      default: ''
    },
    conditions: {
      type: Number,
      default: 6
    }
  },
  data() {
    return {
      provinceData: [],
      cityData: [],
      nowIndex: '',
      activeIndex: '',
      pid: ''
    }
  },
  created() {
    this.getProvince()
  },
  methods: {
    handleClickOut(event) {
      this.nowIndex = ''
    },
    outStyle() {
      this.cityData = []
      this.nowIndex = ''
    },
    mouseoverStyle(index) {
      this.nowIndex = index
    },
    handleProvince(index, item) {
      this.activeIndex = index
      this.$emit('selectProvince', {
        pid: item.pid
      })
      this.nowIndex = index
      this.pid = item.pid
      this.cid = ''
      this.getCity(item.pid)
    },
    handleCity(val) {
      this.nowIndex = ''
      this.cid = val
      this.$emit('selectCity', {
        pid: this.pid,
        cid: this.cid
      })
    },
    // 获取省
    getProvince() {
      fetchProvince().then(res => {
        this.provinceData = res.data
      })
    },
    // 获取 市 区
    getCity(val) {
      if (val) {
        fetchCity(val).then(res => {
          this.cityData = res.data
        })
      }
    }
  }
}
</script>
<style>
.happy-scroll-container .happy-scroll-content {
  width: 100%;
}
</style>

<style scoped lang="scss">
.isShow {
  opacity: 0;
  position: absolute;
  top: -1000px;
}
.active {
  color: #A80E0E!important;
}
.radio_wrap {
  position: relative;
  text-align: left;
  margin-right: 40px;
  .radio_label {
    cursor: pointer;
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(155, 155, 155, 1);
    line-height: 40px;
    margin-left: 30px;
    margin-bottom: -5px;
    user-select: none;
  }
  .toggle {
    position: absolute;
    top: 0;
    left: 95%;
    width: 120px;
    list-style: none;
    margin-left: 10px;
    background: #f9f9f9;
    z-index: 999;
    height: 300px;
    box-shadow: 0 0 3px 1px rgba($color: #000000, $alpha: 0.1);
    &::after {
      position: absolute;
      right: 100%;
      top: -30px;
      display: block;
      content: " ";
      width: 0;
      height: 0;
      border-width: 8px 8px 8px 0;
      border-style: solid;
      border-color: transparent #f9f9f9 transparent transparent; /*透明 灰 透明 透明 */
      margin: 40px auto;
    }
    li {
      padding: 10px 10px 10px 20px;
      color: #9b9b9b;
      font-size: 14px;
      cursor: pointer;
      transition: all 0.5s;
      &:hover {
        background: #fdfdfd;
        color: #a80e0e;
      }
    }
  }
}
input:checked + .radio_label {
  border-radius: 3px;
  color: #f10b28;
}
</style>
