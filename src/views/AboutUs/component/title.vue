<template>
  <div class="title-wrap">
    <h3>{{ title }}</h3>
  </div>
</template>
<script>
export default {
  name: 'Title',
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>
<style lang="scss" scoped>
.title-wrap {
  margin: 0 auto 30px;
}
h3 {
  text-align: center;
}
h3::before{
  display: inline-block;
  content: ' ';
  width:212px;
  height:2px;
  margin-right: 20px;
  vertical-align: middle;
  background:linear-gradient(90deg,rgba(241,215,153,0) 0%,rgba(229,197,125,1) 59%,rgba(206,162,72,1) 100%);
}
 h3::after {
  display: inline-block;
  content: ' ';
  width:212px;
  height:2px;
  margin-left: 20px;
  vertical-align: middle;
  background:linear-gradient(90deg,rgba(241,215,153,0) 0%,rgba(229,197,125,1) 59%,rgba(206,162,72,1) 100%);
  transform: rotate(180deg);
}
</style>
