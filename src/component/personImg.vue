<template>
<!-- action="https://www.rjkf001.com/aly/aliyun/headImgUpload" 
action="http://localhost:8080/api/aly/aliyun/headImgUpload"-->
  <el-upload
    class="person-upload"
    :data="uploadData"
    :action="uploadUrl + '/aly/aliyun/headImgUpload'"
    :show-file-list="false"
    :on-success="uploadSuccess"
    :phone="phone"
    :before-upload="beforeUpload"
  >
    <img
      :src="currentValue"
      v-if="currentValue"
      style="width: 76px;height: 76px;border-radius: 50%"
    >
    <img class="el-icon-plus d-icon" src="../../static/resource/personal.png" v-if="!currentValue">
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
      currentValue: this.value,
      uploadUrl: ''
    };
  },
  created() {
    this.uploadUrl = location.host.includes('localhost') ? location.origin + '/api' : location.origin
  },
  methods: {
    uploadSuccess(file) {
      if (file.indexOf("http") !== -1) {
        this.currentValue = file + "?" + new Date().getTime();
        this.$emit("success", file);
      } else {
        this.$message.warning(file);
      }
    },
    beforeUpload(file) {
      this.uploadData.phone = this.phone;
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.warning("上传头像图片大小不能超过 2MB!");
      }
      if (!isJPG) {
        this.$message.warning("上传图片格式不正确!");
      }
      return isLt2M && isJPG;
    }
  }
};
</script>

<style>
.person-upload {
  position: relative;
  float: left;
  display: block;
  width: 76px;
  height: 76px;
  border-radius: 50%;
  background-color: #ccc;
}

.d-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  font-size: 35px;
}
</style>
