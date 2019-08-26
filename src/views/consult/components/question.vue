<template>
  <div class="question-wrap bg-white">
    <h2 class="title slide-bar">常见问题</h2>
    <div class="question-main">
      <ul>
        <li @click="handleComputed"><span>贷款计算器</span></li>
        <li v-for="item in guideList" :key="item.vlaue" @click="handleLook(item.value, 'guide')"><span>{{ item.label }}</span></li>
        <li v-for="item in matterList" :key="item.vlaue" @click="handleLook(item.value, 'matter')"><span>{{ item.label }}</span></li>
        <li v-for="item in questionList" :key="item.vlaue" @click="handleLook(item.value, 'question')"><span>{{ item.label }}</span></li>
      </ul>
    </div>
  </div>
</template>
<script>
const guideList = [
  { value: 1, label: '怎么办贷款?' },
  { value: 2, label: '为什么选择9能贷?' },
  { value: 3, label: '贷款流程是怎样的?' },
  { value: 4, label: '办贷款，我需要准备哪些资料?' },
  { value: 5, label: '办理贷款，金额多久可以到账？' }
]
const matterList = [
  { value: 1, label: '我能贷多少?' },
  { value: 2, label: '什么是个人征信?' },
  { value: 3, label: '征信差会怎么样?' },
  { value: 4, label: '我的资质一般，怎么才能贷到更多的钱?' },
  { value: 5, label: '办理贷款，金额多久可以到账?' }
]
const questionList = [
  { value: 1, label: '哪些情况不能办理贷款?' },
  { value: 2, label: '哪些情况会导致贷款失败?' }
]
export default {
  name: 'Question',
  data() {
    return {
      guideList,
      matterList,
      questionList
    }
  },
  methods: {
    handleComputed() {
      this.$router.push({
        path: '/counter/index'
      })
    },
    handleLook(val, type) {
      this.$router.push({
        path: '/' + type,
        query: {
          id: val
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import './common.scss';
.question-main {
  padding: 24px 16px;
  ul {
    padding: 0 16px;
    li {
      list-style-type: disc;
      color: #A80E0E;
      padding-top: 6px;
      padding-bottom: 6px;
      cursor: pointer;
      span {
        color: #515151;
      }
    }
  }
}
</style>
