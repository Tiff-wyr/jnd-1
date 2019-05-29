<template>
  <div class="container">
    <div class="content">
      <div class="title" v-html="data.title"></div>
      <div v-for="(item, index) in data.container" :key="index">
        <div class="sub-title" v-html="item.title"></div>
        <p v-for="(i, idx) in item.content" :key="idx" v-html="i.text"></p>
      </div>
    </div>
    <!-- <bottomTap></bottomTap> -->
  </div>
</template>
<script>
import bottomTap from "../component/bottomTap";
import { getData } from '@/util/agreement'
export default {
  name: "agreement",
  components: {
    bottomTap
  },
  data() {
    return {
      data: ''
    }
  },
  created() {
    const type = location.href.split('?')[1]
    this.data = getData(type)
    console.log(this.data)
  }
}
</script>
<style lang="scss" scoped>
.container {
  background: #F2F2F2;
  .content {
    width: 1200px;
    padding: 30px 100px;
    box-sizing: border-box;
    margin:0 auto;
    background: #fff;
    color: #515151;
    font-size: 14px;
    .title {
      text-align: center;
    }
    .sub-title {
      margin: 20px 0;
    }
    p {
      margin: 10px 0;
    }
  }
}
</style>
