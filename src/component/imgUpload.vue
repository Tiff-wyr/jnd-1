<template>
  <el-upload
    :data="uploadData"
    :action="'https://www.9nengdai.com/api/aly/aliyun/headImgUpload'"
    :show-file-list="false"
    :on-success="uploadSuccess"
    :phone="phone"
    :before-upload="beforeUpload"
    class="my-upload">
    <img v-show="currentValue" :src="currentValue" style="width: 80px;height: 80px;">
    <i v-show="!currentValue" class="el-icon-plus micon"/>
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
      currentValue: this.value
    }
  },
  methods: {
    uploadSuccess(file) {
      if (file.data.indexOf('http') !== -1) {
        this.currentValue = file.data + '?' + new Date().getTime()
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

<style>
.my-upload {
  position: relative;
  float: left;
  display: block;
  width: 80px;
  height: 80px;
  border-radius: 3px;
  background-color: #ccc;
}
.micon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  font-size: 45px;
}
</style>
