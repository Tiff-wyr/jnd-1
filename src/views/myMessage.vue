<template>
  <div>
    <div class="wrappy">
      <div class="w1200">
        <div class="clearfix">
          <div class="fll">
            <div class="main">
              <div class="img-main">
                <div style="width: 76px;height: 76px;margin: 0 auto">
                  <upload-img :img-url="image" class="fll" @uploadSuccess="uploadSuccess" @uploadFail="uploadFail"/>
                </div>
                <div class="court-num">{{ userInfo ? userInfo.name : '' }}</div>
              </div>
              <div
                :class="this.$route.path === `/myMessage/${userIdn}/personMessage` ? 'my-item clearfix fs active' : 'my-item clearfix fs'"
              >
                <div class="iconfont icon-daikuanrengerenxinxi-copy icon"/>
                <router-link :to="{path:`/myMessage/${userIdn}/personMessage`}">个人信息</router-link>
              </div>
              <div
                :class="this.$route.path === `/myMessage/${userIdn}/myCollect` ? 'my-item clearfix fs active' : 'my-item clearfix fs'"
              >
                <div class="iconfont icon-shoucangzhongxin-copy icon"/>
                <router-link :to="{path:`/myMessage/${userIdn}/myCollect`}">我的收藏</router-link>
              </div>
              <div
                :class="this.$route.path === '/myMessage/accessRecord' ? 'my-item clearfix fs active' : 'my-item clearfix fs'"
              >
                <div class="iconfont icon-fangwenjilu-copy-copy icon" style="margin-left: -4px"/>
                <router-link
                  :to="{path:`/myMessage/${userIdn}/accessRecord`}"
                  style="margin-left: 12px"
                >浏览记录</router-link>
              </div>
              <div
                :class="this.$route.path === `/myMessage/${userIdn}/applyRecordMy` ? 'my-item clearfix fs active' : 'my-item clearfix fs'"
              >
                <div class="iconfont icon-shenqingjilu-copy icon"/>
                <router-link :to="{path:`/myMessage/${userIdn}/applyRecordMy`}">申请记录</router-link>
              </div>
              <div
                :class="this.$route.path === `/myMessage/${userIdn}/messageCenter` ? 'my-item clearfix fs active' : 'my-item clearfix fs'"
              >
                <div class="iconfont icon-xiaoxizhongxin icon"/>
                <router-link :to="{path:`/myMessage/${userIdn}/messageCenter`}">消息中心</router-link>
              </div>
              <div
                :class="this.$route.path === `/myMessage/${userIdn}/emailCenter` ? 'my-item clearfix fs active' : 'my-item clearfix fs'"
              >
                <div class="iconfont icon-youjianzhongxin-copy-copy icon" style="margin-left: -4px"/>
                <router-link :to="{path:`/myMessage/${userIdn}/emailCenter`}">邮件中心</router-link>
              </div>
              <div
                :class="this.$route.path === `/myMessage/${userIdn}/secureCenter` ? 'my-item clearfix fs active' : 'my-item clearfix fs'"
              >
                <div class="iconfont icon-anquanzhongxin-copy-copy icon"/>
                <router-link :to="{path:`/myMessage/${userIdn}/secureCenter`}">安全中心</router-link>
              </div>
            </div>
          </div>
          <div class="fll ml30">
            <router-view/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import uploadImg from '@/component/uploadImg'
export default {
  name: 'MyMessage',
  components: {
    uploadImg
  },
  data() {
    return {
      userIdn: '',
      image: ''
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  created() {
    if (this.$store.state.userInfo) {
      console.log(this.$route)
      const id = this.$route.params.id
      this.userIdn = id
      if (this.userInfo.image) {
        this.image = this.userInfo.image
      }
    }
  },
  methods: {
    ...mapMutations(['SET_USER_IMAGE']),
    uploadFail(val, field) {
      console.log('上传失败', val, field)
    },
    uploadSuccess(val, field) {
      console.log(val, field)
      const data = new FormData()
      data.append('image', val.jsonData.data)
      data.append('borrowerId', this.$store.state.userInfo.id)
      this.$axios.post(`userBorrower/updateLogoById`, data).then(res => {
        if (res.status === 200) {
          this.$message.success('修改头像成功')
          this.SET_USER_IMAGE(val.jsonData.data)
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.active {
  color: rgba(168, 14, 14, 1);
}
.mt4 {
  margin-top: 4px;
}
.ml30 {
  margin-left: 30px;
}
.main {
  width: 226px;
  height: 624px;
  background: rgba(255, 255, 255, 1);
  .img-main {
    height: 150px;
    padding: 23px 0 0 0;
    box-sizing: border-box;
    border-bottom: 1px solid #f0f0f0;
    text-align: center;
    .court-num {
      height: 16px;
      font-size: 16px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(81, 81, 81, 1);
      line-height: 16px;
      margin-top: 10px;
    }
  }
  .my-item {
    height: 66px;
    padding: 24px 60px;
    box-sizing: border-box;
    border-bottom: 1px solid #f0f0f0;
    a {
      display: block;
      float: right;
      height: 20px;
      font-size: 16px;
      font-family: PingFangSC-Medium;
      font-weight: 400;
      color: rgba(81, 81, 81, 1);
      line-height: 20px;
      margin-left: 18px;
    }
    .router-link-active {
      color: rgba(168, 14, 14, 1);
    }
    .active {
      color: rgba(168, 14, 14, 1);
    }
  }
}
</style>
