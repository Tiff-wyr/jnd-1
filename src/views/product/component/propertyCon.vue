<template>
  <div class="main-form">
    <el-form ref="form" :rules="formRules" :model="form" label-position="right" label-width="130px">
      <el-form-item label="有无本地社保" prop="sheBaoKey">
        <el-radio v-model="form.sheBaoKey" :label="1">无</el-radio>
        <el-radio v-model="form.sheBaoKey" :label="2">有</el-radio>
      </el-form-item>
      <el-form-item label="有无本地公积金" prop="gongJiJinKey">
        <el-radio v-model="form.gongJiJinKey" :label="1">无</el-radio>
        <el-radio v-model="form.gongJiJinKey" :label="2">有</el-radio>
      </el-form-item>
      <el-form-item label="名下车辆情况" prop="carStatusKey">
        <el-radio v-model="form.carStatusKey" :label="1">无车准备买车</el-radio>
        <el-radio v-model="form.carStatusKey" :label="2">按揭车</el-radio>
        <el-radio v-model="form.carStatusKey" :label="3">全款车</el-radio>
      </el-form-item>
      <el-form-item label="名下房产情况" prop="houseInfoKey">
        <el-radio v-model="form.houseInfoKey" :label="1">无房</el-radio>
        <el-radio v-model="form.houseInfoKey" :label="2">按揭房</el-radio>
        <el-radio v-model="form.houseInfoKey" :label="3">全款房</el-radio>
      </el-form-item>
      <el-form-item label="信用情况" prop="creditStatusKey">
        <el-select v-model="form.creditStatusKey" style="width: 260px;">
          <el-option v-for="item in creditOptions" :key="item.id" :label="item.label" :value="item.id"/>
        </el-select>
      </el-form-item>
      <el-form-item label="有无芝麻信用" prop="zhiMaCreditKey">
        <el-radio v-model="form.zhiMaCreditKey" :label="1">无</el-radio>
        <el-radio v-model="form.zhiMaCreditKey" :label="2">有</el-radio>
      </el-form-item>

      <el-form-item label="">
        <el-button :loading="isLoading" class="apply" @click="handleNext">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { modifyInfo, saveOrder } from '@/api/apply'
const creditOptions = [
  { id: 1, label: '无信用卡或贷款' },
  { id: 2, label: '信用良好无逾期' },
  { id: 3, label: '少量逾期' },
  { id: 4, label: '多次逾期' },
  { id: 5, label: '当前逾期' },
  { id: 6, label: '超过90天逾期' }
]
export default {
  name: 'PropertyCon',
  props: {
    phone: {
      type: String,
      required: true
    },
    options: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isLoading: false,
      creditOptions,
      formRules: {
        sheBaoKey: [{ required: true, trigger: 'change', message: '请选择社保情况' }],
        gongJiJinKey: [{ required: true, trigger: 'change', message: '请选择公积金情况' }],
        carStatusKey: [{ required: true, trigger: 'change', message: '请选择名下车辆情况' }],
        creditStatusKey: [{ required: true, trigger: 'change', message: '请选择信用情况' }],
        houseInfoKey: [{ required: true, trigger: 'change', message: '请选择名下房产信息' }],
        zhiMaCreditKey: [{ required: true, trigger: 'change', message: '请选择芝麻信用情况' }]
      },
      form: {
        sheBaoKey: 1,
        gongJiJinKey: 1,
        carStatusKey: 1,
        houseInfoKey: 1,
        creditStatusKey: 1,
        zhiMaCreditKey: 1
      },
      saveOrderForm: {
        phone: ''
      }
    }
  },
  created() {
    this.form.phone = this.phone
    this.saveOrderForm.phone = this.phone
    this.saveOrderForm[this.options.key] = this.options.value
    // phone、brokerId、agencyId、productId
  },
  methods: {
    modify() {
      modifyInfo(this.form).then(res => {
        if (res.data.status === 200) {
          console.log('success', res)
          this.saveOrders()
        } else {
          this.$message.warning(res.data.msg)
          this.isLoading = false
        }
      })
    },
    saveOrders() {
      saveOrder(this.saveOrderForm).then(res => {
        if (res.data.status === 200) {
          this.$emit('change', {
            form: this.form,
            step: 3
          })
        } else {
          this.$message.warning(res.data.msg)
        }
        this.isLoading = false
      })
    },
    handleNext() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.isLoading = true
          this.modify()
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>

.apply {
  background:$jnd-bg-color-theme;
  color: #fff;
  border-color: $jnd-border-color-theme;
  width: 280px;
}
</style>
