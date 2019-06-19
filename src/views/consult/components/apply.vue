<template>
  <div class="apply-wrap bg-white">
    <h2 class="title slide-bar">贷款申请</h2>
    <div class="loan-main">
      <el-form>
        <el-form-item>
          <el-input class="w160" placeholder="请输入您的姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="请输入贷款金额（万元）"></el-input>
        </el-form-item>
        <el-form-item>
          <el-select class="w130" placeholder="请选择地区"></el-select>
          <el-select class="w130" placeholder="请选择地区" style="margin-left: 3px;"></el-select>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input class="w160" placeholder="请输入验证码"></el-input>
          <span class="btn">发送验证码</span>
        </el-form-item>
        <el-form-item class="apply-now">
          <span class="btn apply">立即申请</span>
          <p>
            <el-checkbox v-model="checked"></el-checkbox>
            <a href="#/agreement?loanOfficerRegister" target="_blank">阅读并同意9能贷相关注册协议</a>
          </p>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: 'apply',
  data() {
    return {
      checked: true
    }
  }
}
</script>
<style lang="scss" scoped>
@import './common.scss';
.apply-wrap {
  margin-bottom: 30px;
}
.loan-main {
  padding: 16px 16px 1px;
  .w160 {
    width: 160px;
  }
  .w130 {
    width: 130px;
  }
  .apply-now {
    text-align: center;
  }
  .btn {
    display: inline-block;
    width: 100px;
    border-radius: 4px;
    border: 1px solid #D9D9D9;
    text-align: center;
    height: 40px;
    box-sizing: border-box;
    cursor: pointer;
    &.apply {
      width: 240px;
      height: 56px;
      line-height: 56px;
      background: #A80E0E;
      border: none;
      color: #fff;
    }
  }
  p {
    text-align: left;
    margin-left: 14px;
    a {
      color: #9B9B9B;
      font-size: 12px;
    }
  }
}
</style>
