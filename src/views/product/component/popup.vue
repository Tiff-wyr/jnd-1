<template>
  <div v-if="visible" class="popup-wrap">
    <el-dialog :visible.sync="dialogVisible" width="770px">
      <div class="dialog-title">
        <step :active="active"/>
      </div>
      <div class="main">
        <div class="left">
          <phonform v-if="active === 1" :options="options" :phone="phone" @change="handleChange"/>
          <main-form v-if="active === 1.5" :phone="form.phone" :code="form.password" @change="handleChange"/>
          <property-con v-if="active === 2" :options="options" :phone="form.phone" @change="handleChange"/>
          <finish v-if="active === 3" :phone="form.phone" :code="form.password" @confirm="handleConfirm"/>
        </div>
        <div class="right">
          <h3>特别声明:</h3>
          <p>您的信息将只作为产品推荐，贷款过程中遇到的任何预先收费行为均为诈骗，请您时刻保持警惕避免损失。</p>
          <p>平台不会查询您的征信，所有信息仅供申请参考。</p>
          <p>填写虚假信息将对您办理贷款带来不利影响，建议您不要这么做。</p>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import step from './step'
import phonform from './phoneForm'
import mainForm from './mainForm'
import propertyCon from './propertyCon'
import finish from './finish'
export default {
  name: 'JndPopup',
  components: {
    step,
    phonform,
    mainForm,
    propertyCon,
    finish
  },
  props: {
    visible: {
      type: Boolean,
      default: true
    },
    width: {
      type: [String, Number],
      default: '770px'
    },
    top: {
      type: [String, Number],
      default: '15vh'
    },
    options: {
      type: Object,
      required: true
    },
    phone: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      dialogVisible: false,
      active: 1,
      form: {}
    }
  },
  watch: {
    visible(val) {
      this.dialogVisible = val
    },
    dialogVisible(val) {
      this.$emit('close', val)
    }
  },
  methods: {
    handleChange(val) {
      for (const i in val.form) {
        this.form[i] = val.form[i]
      }
      this.active = val.step
    },
    handleConfirm() {
      this.$emit('confirm')
    }
  }
}
</script>
<style lang="scss" scoped>
.dialog-title {
  height: 100px;
  background: #F0F0F0;
  padding: 0 50px;
  margin-bottom: 30px;
}
.main {
  overflow: hidden;
  .left,
  .right {
    float: left;
  }
  .left {
    width: 450px;
    .input-item {
      width: 240px;
      &.code {
        width: 120px;
        margin-right: 4px;
      }
      &.confirm-btn {
        background: #d0ac56;
        color: #fff;
        border-color: #d0ac56;
      }
    }
    .select-item {
      width: 110px;
      &.address2 {
        margin-left: 15px;
      }
    }
    .check-box {
      margin-right: 16px;
    }
  }
  .right {
    width: 270px;
    font-size: 12px;
    border-left: 1px solid #d9d9d9;
    padding: 60px 20px 40px 40px;
    box-sizing: border-box;
    h3 {
      color: #515151;
    }
    p {
      margin: 10px 0;
      color: #9b9b9b;
    }
  }
}
</style>
