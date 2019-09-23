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
        <el-button v-if="!ifRegister" :loading="isLoading" class="apply" @click="handlePrev">上一步</el-button>
        <el-button :loading="isLoading" class="apply" @click="handleNext">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { modifyInfo, saveOrder } from '@/api/apply'
import { creditList } from '@/util/filterData'
const creditOptions = creditList()
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
    },
    ifRegister: {
      type: Boolean,
      default: false
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
        creditStatusKey: '',
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
  },
  methods: {
    modify() {
      modifyInfo(this.form).then(res => {
        if (res.data.status === 200) {
          if (this.ifRegister) {
            this.$message.success('信息完善成功')
            this.$router.push('/')
          } else {
            this.saveOrders()
          }
        } else {
          this.$message.warning(res.data.msg)
          this.isLoading = false
        }
      }).catch(() => {
        this.isLoading = false
      })
    },
    handlePrev() {
      this.$emit('change', {
        step: 1.5
      })
      sessionStorage.setItem('isPrve', true)
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
      }).catch(() => {
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
  width: 140px;
}
</style>
