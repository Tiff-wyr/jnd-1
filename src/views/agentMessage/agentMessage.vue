<template>
  <div>
    <div class="wrappy">
      <div class="w1200">
        <div class="clearfix">
          <div class="fll">
            <div class="main">
              <div class="img-main">
                <div style="width: 76px;height: 76px;margin: 0 auto">
                  <upload-img class="fll" @uploadSuccess="uploadSuccess" @uploadFail="uploadFail" :imgUrl="image"></upload-img>
                </div>
                <div class="clearfix fs" style="width: 120px;text-align: center;margin: 10px auto">
                  <div
                    class="clearfix fs"
                    style="width: 120px;text-align: center;margin: 10px auto 0; padding: 10px 0;"
                  >
                    <span class="text-main">
                      {{ name }}
                      <img
                        v-if="userIdentity > 0"
                        src="../../../static/resource/organMessage/vip.png"
                        alt=""
                        class="vip"
                      >
                    </span>
                  </div>
                </div>
              </div>
              <div
                :class="this.$route.path === `/agentMessage/${userIdn}/agentResource` ? 'my-item clearfix fs active' : 'my-item clearfix fs'"
              >
                <div class="iconfont icon-ziyuanzhongxin-copy-copy icon"></div>
                <router-link :to="{path:`/agentMessage/${userIdn}/agentResource`}">资源中心</router-link>
              </div>
              <div
                :class="this.$route.path === `/agentMessage/${userIdn}/agentMember` ? 'my-item clearfix fs active' : 'my-item clearfix fs' "
              >
                <div class="iconfont icon-huiyuanzhongxin-copy icon"></div>
                <router-link :to="{path:`/agentMessage/${userIdn}/agentMember`}">会员中心</router-link>
              </div>
              <div
                :class="this.$route.path === `/agentMessage/${userIdn}/agentPersonal` ? 'my-item clearfix fs active' : 'my-item clearfix fs' "
                @click="organM"
              >
                <div class="iconfont icon-jingjirengerenzhongxin-copy icon"></div>
                <router-link :to="{path:`/agentMessage/${userIdn}/agentPersonal`}">个人信息</router-link>
              </div>
              <div
                :class="this.$route.path === `/agentMessage/${userIdn}/agentPay` ? 'my-item clearfix fs active' : 'my-item clearfix fs'"
              >
                <div class="iconfont icon-fufeiziyuan-copy-copy icon"></div>
                <router-link :to="{path:`/agentMessage/${userIdn}/agentPay`}">付费资源</router-link>
              </div>
              <div
                :class="this.$route.path === `/agentMessage/${userIdn}/applyRecordAg` ? 'my-item clearfix fs active' : 'my-item clearfix fs'"
              >
                <div class="iconfont icon-shenqingjilu-copy icon"></div>
                <router-link :to="{path:`/agentMessage/${userIdn}/applyRecordAg`}">申请记录</router-link>
              </div>
              <div
                :class="this.$route.path === `/agentMessage/${userIdn}/agentProduct` ? 'my-item clearfix fs active' : 'my-item clearfix fs'"
              >
                <div class="iconfont icon-Group icon"></div>
                <router-link :to="{path:`/agentMessage/${userIdn}/agentProduct`}">产品中心</router-link>
              </div>
              <div
                :class="this.$route.path === `/agentMessage/${userIdn}/agentAccess` ? 'my-item clearfix fs active' : 'my-item clearfix fs'"
              >
                <div class="iconfont icon-fangwenjilu-copy-copy icon" style="margin-left: -4px"></div>
                <router-link
                  :to="{path:`/agentMessage/${userIdn}/agentAccess`}"
                  style="margin-left: 2px"
                >访问记录</router-link>
              </div>
              <div
                :class="this.$route.path === `/agentMessage/${userIdn}/agentMessageCenter` ? 'my-item clearfix fs active' : 'my-item clearfix fs'"
              >
                <div class="iconfont icon-xiaoxizhongxin icon"></div>
                <router-link :to="{path:`/agentMessage/${userIdn}/agentMessageCenter`}">消息中心</router-link>
              </div>
              <div
                :class="this.$route.path === `/agentMessage/${userIdn}/agentEmail` ? 'my-item clearfix fs active' : 'my-item clearfix fs'"
              >
                <div class="iconfont icon-youjianzhongxin-copy-copy icon" style="margin-left: -4px"></div>
                <router-link
                  :to="{path:`/agentMessage/${userIdn}/agentEmail`}"
                  style="margin-left: 6px"
                >邮件中心</router-link>
              </div>
              <div
                :class="this.$route.path === `/agentMessage/${userIdn}/agentSecure` ? 'my-item clearfix fs active' : 'my-item clearfix fs'"
              >
                <div class="iconfont icon-anquanzhongxin-copy-copy icon"></div>
                <router-link :to="{path:`/agentMessage/${userIdn}/agentSecure`}">安全中心</router-link>
              </div>
            </div>
          </div>
          <div class="fll ml30">
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import uploadImg from '@/component/uploadImg'
import { randomWord } from "@/util/util";
export default {
  name: "agentMessage",
  data() {
    return {
      name: "",
      isShowing: true,
      organ: false,
      type: "1",
      userIdn: "",
      image: ""
    };
  },
  components: {
    uploadImg
  },
  computed: {
    ...mapState(["userInfo"]),
    userIdentity() {
      return this.$store.state.userInfo.vip;
    },
    userInfos() {
      return this.userInfo;
    }
  },
  watch: {
    userInfos(val) {
      console.log(val);
      this.name = val.name;
    }
  },
  methods: {
    ...mapMutations(["SET_USER_IMAGE"]),
    organM() {
      this.organ = true;
    },
    uploadFail(val) {
      console.log('上传失败', val)
    },
    uploadSuccess(val, field) {
      console.log('上传成功', val, field)
      let data = new FormData();
      data.append("image", val);
      data.append("borrowerId", this.$store.state.userInfo.id);
      this.$axios.post("/userBorrower/updateLogoById", data).then(res => {
        if (res.status === 200) {
          this.SET_USER_IMAGE(val.jsonData.data)
          this.image = val.jsonData.data;
          this.$message.success("修改头像成功");
        } else {
          this.$message.warning(res.msg);
        }
      });
    }
  },
  created() {
    if (this.$store.state.userInfo !== null) {
      this.name = this.$store.state.userInfo.name;
    }
    let id = this.$route.params.id;
    this.userIdn = id;
    if (this.userInfo && this.userInfo.image) {
      this.image = this.userInfo.image;
    }
  }
};
</script>

<style scoped lang="scss">
.mt10 {
  margin-top: 10px;
}
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
    text-align: center;
    box-sizing: border-box;
    padding: 23px 0 0 0;
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
