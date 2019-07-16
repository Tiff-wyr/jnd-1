<template>
  <!-- https://www.rjkf001.com -->
  <el-upload
    :data="uploadData"
    :action="'https://www.9nengdai.com/api/aly/aliyun/headImgUpload'"
    :show-file-list="false"
    :on-success="uploadSuccess"
    :phone="phone"
    :before-upload="beforeUpload"
    class="myupload">
    <img v-show="value" :src="value" style="width: 30px;height: 30px;">
    <i v-show="!value" class="el-icon-plus my-icon"/>
  </el-upload>
</template>

<script>
export default {
  props: {
    // eslint-disable-next-line vue/require-default-prop
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
        phone: ''
      },
      uploadUrl: ''
    }
  },
  created() {
    this.uploadUrl = location.host.includes('localhost') ? location.origin + '/api' : location.origin
  },
  methods: {
    uploadSuccess(file) {
      if (file.data.indexOf('http') !== -1) {
        this.value = file.data + '?' + new Date().getTime()
        this.$emit('success', file)
      } else {
        this.$message.warning(file.msg)
      }
    },
    beforeUpload(file) {
      this.uploadData.phone = this.phone
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 1
      if (!isLt2M) {
        this.$message.warning('上传头像图片大小不能超过 1MB!')
      }
      if (!isJPG) {
        this.$message.warning('上传图片格式不正确!')
      }
      return isLt2M && isJPG
    }
  }
}
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
