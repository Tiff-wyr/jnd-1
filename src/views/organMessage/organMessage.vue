<template>
  <div>
    <div class="wrappy">
      <div class="w1200">
        <div class="clearfix">
          <div class="fll">
            <div class="main">
              <div class="img-main">
                <div class="clearfix" style="width: 76px;height: 76px;margin: 0 auto">
                  <upload-img :img-url="image" class="fll" @uploadSuccess="uploadSuccess" @uploadFail="uploadFail"/>
                </div>
                <div
                  class="clearfix fs"
                  style="width: 120px;text-align: center;margin: 10px auto 0"
                >
                  <span class="text-main">{{ name }} <img v-if="userIdentity > 0" src="../../../static/resource/organMessage/vip.png" alt="" class="vip"></span>
                </div>
              </div>
              <div
                :class="this.$route.path === `/organMessage/${userIdn}/resourceCen` ? 'my-item clearfix fs active' : 'my-item clearfix fs'"
              >
                <div class="iconfont icon-ziyuanzhongxin-copy-copy icon"/>
                <router-link :to="{path:`/organMessage/${userIdn}/resourceCen`}">资源中心</router-link>
              </div>
              <div
                :class="this.$route.path === `/organMessage/${userIdn}/memberCen` ? 'my-item clearfix fs active' : 'my-item clearfix fs' "
              >
                <div class="iconfont icon-huiyuanzhongxin-copy icon"/>
                <router-link :to="{path:`/organMessage/${userIdn}/memberCen`}">会员中心</router-link>
              </div>
              <div
                :class="this.$route.path ===`/organMessage/${userIdn}/organMess` ? 'my-item clearfix fs active' : 'my-item clearfix fs' "
              >
                <div class="iconfont icon-jigougerenzhongxin-copy icon"/>
                <router-link :to="{path:`/organMessage/${userIdn}/organMess`}">机构信息</router-link>
              </div>
              <div
                :class="this.$route.path === `/organMessage/${userIdn}/payRes` ? 'my-item clearfix fs active' : 'my-item clearfix fs'"
              >
                <div class="iconfont icon-fufeiziyuan-copy-copy icon"/>
                <router-link :to="{path:`/organMessage/${userIdn}/payRes`}">付费资源</router-link>
              </div>
              <div
                :class="this.$route.path === `/organMessage/${userIdn}/applyRecord` ? 'my-item clearfix fs active' : 'my-item clearfix fs'"
              >
                <div class="iconfont icon-shenqingjilu-copy icon"/>
                <router-link :to="{path:`/organMessage/${userIdn}/applyRecord`}">申请记录</router-link>
              </div>
              <div
                :class="this.$route.path ===`/organMessage/${userIdn}/productCen` ? 'my-item clearfix fs active' : 'my-item clearfix fs'"
              >
                <div class="iconfont icon-Group icon"/>
                <router-link :to="{path:`/organMessage/${userIdn}/productCen`}">产品中心</router-link>
              </div>
              <div
                :class="this.$route.path === `/organMessage/${userIdn}/accessRec` ? 'my-item clearfix fs active' : 'my-item clearfix fs'"
              >
                <div class="iconfont icon-fangwenjilu-copy-copy icon" style="margin-left: -4px"/>
                <router-link
                  :to="{path:`/organMessage/${userIdn}/accessRec`}"
                  style="margin-left: 2px"
                >访问记录</router-link>
              </div>
              <div
                :class="this.$route.path ===`/organMessage/${userIdn}/messCen` ? 'my-item clearfix fs active' : 'my-item clearfix fs'"
              >
                <div class="iconfont icon-xiaoxizhongxin icon"/>
                <router-link :to="{path:`/organMessage/${userIdn}/messCen`}">消息中心</router-link>
              </div>
              <div
                :class="this.$route.path ===`/organMessage/${userIdn}/emailCen` ? 'my-item clearfix fs active' : 'my-item clearfix fs'"
              >
                <div class="iconfont icon-youjianzhongxin-copy-copy icon" style="margin-left: -4px"/>
                <router-link
                  :to="{path:`/organMessage/${userIdn}/emailCen`}"
                  style="margin-left: 6px"
                >邮件中心</router-link>
              </div>
              <div
                :class="this.$route.path === `/organMessage/${userIdn}/secuCen` ? 'my-item clearfix fs active' : 'my-item clearfix fs'"
              >
                <div class="iconfont icon-anquanzhongxin-copy-copy icon"/>
                <router-link :to="{path:`/organMessage/${userIdn}/secuCen`}">安全中心</router-link>
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
import { mapMutations, mapState } from 'vuex'
import uploadImg from '@/component/uploadImg'
export default {
  name: 'OrganMessage',
  components: {
    uploadImg
  },
  data() {
    return {
      userIdn: '',
      type: '1',
      image: '',
      name: ''
    }
  },
  computed: {
    ...mapState(['userInfo']),
    userIdentity() {
      return this.$store.state.userInfo.vip
    },
    userInfos() {
      return this.userInfo
    }
  },
  watch: {
    userInfos(val) {
      this.name = val.name
    }
  },
  created() {
    if (this.$store.state.userInfo !== null) {
      this.name = this.$store.state.userInfo.name
    }
    const id = this.$route.params.id
    this.userIdn = id
    if (this.userInfo && this.userInfo.image) {
      this.image = this.userInfo.image
    }
  },
  methods: {
    ...mapMutations(['SET_USER_IMAGE']),
    uploadFail(val) {
      console.log('上传失败', val)
    },
    uploadSuccess(val, field) {
      console.log('上传成功', val, field)
      const data = new FormData()
      data.append('image', val.jsonData.data)
      data.append('agencyId', this.$store.state.userInfo.id)
      this.$axios.post('/userAgency/updateLogoById', data).then(res => {
        if (res.status === 200) {
          this.SET_USER_IMAGE(val.jsonData.data)
          this.image = val.jsonData.data
          this.$message.success('修改头像成功')
        } else {
          this.$message.warning(res.msg)
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.mt4 {
  margin-top: 4px;
}
.ml30 {
  margin-left: 30px;
}
.main {
  width: 226px;
  height: 803px;
  background: rgba(255, 255, 255, 1);
  .img-main {
    height: 150px;
    padding: 23px 0 0 0;
    box-sizing: border-box;
    border-bottom: 1px solid #f0f0f0;
    text-align: center;
    .text-main {
      height: 16px;
      font-size: 16px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(81, 81, 81, 1);
      line-height: 16px;
    }
    .vip {
      width: 11px;
      height: 10px;
      margin-left: 3px;
      margin-top: 3px;
    }
  }
  .my-item {
    height: 66px;
    padding: 24px 62px;
    box-sizing: border-box;
    border-bottom: 1px solid #f0f0f0;
    color: #999;

    a {
      display: block;
      float: left;
      height: 20px;
      font-size: 16px;
      font-family: PingFangSC-Medium;
      font-weight: 400;
      color: rgba(81, 81, 81, 1);
      margin-left: 10px;
    }
    .router-link-active {
      color: rgba(168, 14, 14, 1);
    }
    img {
      float: left;
      cursor: pointer;
    }
  }
  .active {
    color: rgba(168, 14, 14, 1);
  }
}
</style>
