<template>
  <div class="clearfix">
    <label class="radio_wrap fll" v-for="(item, index) in provinceData" :key="item.pid"  @mouseout="outStyle">
      <input
        class="isShow"
        :ref="'city' + item.pid"
        :value="item.pid"
        :name="item.provincial"
      >
      <div class="radio_label" :class="{'active': index === activeIndex}" @click="handleProvince(index, item.pid)">{{item.provincial}}</div>
      <div class="toggle" v-if="index === nowIndex" @mouseout="outStyle" @mouseover="mouseoverStyle(index)">
        <happy-scroll color="#D8D8D8" :min-length-h="20">
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
</template>

<script>
import { HappyScroll } from "vue-happy-scroll";
import "vue-happy-scroll/docs/happy-scroll.css";
import { fetchProvince, fetchCity } from "@/api/register";
export default {
  name: "cityRadios",
  components: {
    HappyScroll
  },
  props: {
    name: String,
    radios: Array,
    i: {
      type: String | undefined,
      default: ""
    }
  },
  data() {
    return {
      provinceData: [],
      cityData: [],
      nowIndex: "",
      activeIndex: '',
      pid: ""
    };
  },
  created() {
    this.getProvince();
  },
  methods: {
    handleClickOut(event) {
      this.nowIndex = "";
    },
    outStyle() {
      this.nowIndex = ''
    },
    mouseoverStyle(index) {
      this.nowIndex = index;
    },
    handleProvince(index, value) {
      this.activeIndex = index
      this.$emit("selectProvince", {
        pid: this.pid
      });
      this.nowIndex = index;
      this.pid = value;
      this.cid = "";
      this.getCity(value);
    },
    handleCity(val) {
      this.nowIndex = "";
      this.cid = val;
      this.$emit("selectCity", {
        pid: this.pid,
        cid: this.cid
      });
    },
    //获取省
    getProvince() {
      fetchProvince().then(res => {
        this.provinceData = res.data;
      });
    },
    //获取 市 区
    getCity(val) {
      if (val) {
        fetchCity(val).then(res => {
          this.cityData = res.data;
        });
      }
    }
  }
};
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
