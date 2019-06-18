<template>
<!-- https://www.rjkf001.com -->
  <el-upload
    class="myupload"
    :data="uploadData"
    :action="uploadUrl + '/aly/aliyun/headImgUpload'"
    :show-file-list="false"
    :on-success="uploadSuccess"
    :phone="phone"
    :before-upload="beforeUpload">
    <img :src="value" v-show="value" style="width: 30px;height: 30px;">
    <i class="el-icon-plus my-icon" v-show="!value"></i>
  </el-upload>
</template>

<script>
export default {
  props: {
    value: {
      type: String
    },
    phone: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      uploadData: {
        phone: ""
      },
      uploadUrl: ''
    };
  },
  created() {
    this.uploadUrl = location.host.includes('localhost') ? location.origin + '/api' : location.origin
  },
  methods: {
    uploadSuccess(file) {
      if (file.data.indexOf('http') !== -1) {
        this.value = file.data + "?" + new Date().getTime();
        this.$emit("success", file);
      } else {
        this.$message.warning(file.msg);
      }
    },
    beforeUpload(file) {
      this.uploadData.phone = this.phone;
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 1;
      if (!isLt2M) {
        this.$message.warning("上传头像图片大小不能超过 1MB!");
      }
      if (!isJPG) {
        this.$message.warning("上传图片格式不正确!");
      }
      return isLt2M && isJPG;
    }
  }
};
</script>

<style lang="scss">
  .myupload {
    position: relative;
    float: left;
    display: block;
    width: 30px;
    height: 30px;
    border-radius: 3px;
    background-color: #fff;
    border: 1px solid #ccc;
  }
  .my-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    color: #ccc;
    font-size:20px;
  }
</style>