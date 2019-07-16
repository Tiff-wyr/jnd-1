<template>
  <div class="cropper-container">
    <a v-if="isShow && !imgDataUrl" class="btn" @click="toggleShow">
      <i class="el-icon-plus micon"/>
    </a>
    <img v-if="!isShow || imgUrl || imgDataUrl" :src="imgDataUrl" style="width: 80px; height: 80px;" @click="toggleShow">
    <my-upload
      v-model="show"
      :width="80"
      :height="80"
      :params="params"
      :headers="headers"
      field="file"
      url="https://www.9nengdai.com/api/aly/aliyun/headImgUpload"
      img-format="png"
      @crop-success="cropSuccess"
      @crop-upload-success="cropUploadSuccess"
      @crop-upload-fail="cropUploadFail"
    />
  </div>
</template>
<script>
import 'babel-polyfill' // es6 shim
import myUpload from 'vue-image-crop-upload'
import { randomWord } from '@/util/util'
export default {
  components: {
    'my-upload': myUpload
  },
  props: {
    // eslint-disable-next-line vue/require-default-prop
    imgUrl: {
      type: String
    }
  },
  data() {
    return {
      isShow: true,
      show: false,
      params: {
        phone: ''
      },
      headers: {
        smail: '*_~'
      },
      imgDataUrl: '' // the datebase64 url of created image
    }
  },
  created() {
    this.imgDataUrl = ''
    if (this.imgUrl) {
      this.imgDataUrl = this.imgUrl
    }
    this.params.phone = new Date().getTime() + randomWord(false, 10)
  },
  methods: {
    toggleShow() {
      this.show = !this.show
    },
    /**
     * crop success
     * [param] imgDataUrl
     * [param] field
     */
    cropSuccess(imgDataUrl, field) {
      console.log(imgDataUrl, field)
      this.imgDataUrl = imgDataUrl
    },
    /**
     * upload success
     *
     * [param] jsonData   服务器返回数据，已进行json转码
     * [param] field
     */
    cropUploadSuccess(jsonData, field) {
      this.isShow = false
      this.show = false
      console.log(jsonData, field)
      this.$emit('uploadSuccess', { jsonData, field })
    },
    cropUploadFail(status, field) {
      console.log(status, field)
      this.$emit('uploadFail', { status, field })
    }
  }
}
</script>
<style lang="scss" scoped>
.cropper-container > .btn {
  position: relative;
  display: inline-block;
  width: 80px;
  height: 80px;
  background: #ccc;
}
.cropper-content {
  display: flex;
  display: -webkit-flex;
  justify-content: flex-end;
  -webkit-justify-content: flex-end;
  .cropper {
    width: 350px;
    height: 300px;
  }
  .show-preview {
    flex: 1;
    -webkit-flex: 1;
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    -webkit-justify-content: center;
    .preview {
      overflow: hidden;
      border-radius: 50%;
      border: 1px solid #cccccc;
      background: #cccccc;
      margin-left: 40px;
    }
  }
}
.footer-btn {
  margin-top: 30px;
  display: flex;
  display: -webkit-flex;
  justify-content: flex-end;
  -webkit-justify-content: flex-end;
  .scope-btn {
    width: 350px;
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
    -webkit-justify-content: space-between;
  }
  .upload-btn {
    flex: 1;
    -webkit-flex: 1;
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    -webkit-justify-content: center;
  }
  .btn {
    outline: none;
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    -webkit-appearance: none;
    text-align: center;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    outline: 0;
    margin: 0;
    -webkit-transition: 0.1s;
    transition: 0.1s;
    font-weight: 500;
    padding: 8px 15px;
    font-size: 12px;
    border-radius: 3px;
    color: #fff;
    background-color: #67c23a;
    border-color: #67c23a;
  }
}
</style>
