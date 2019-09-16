<template>
  <div class="apply-wrap">
    <step :active="active" class="step"/>

    <phone-form v-if="active === 1" :options="options" @change="handleChange"/>
    <main-form v-if="active === 1.5" :phone="form.phone" :code="form.password" @change="handleChange"/>
    <property-con v-if="active === 2" :phone="form.phone" :options="options" @change="handleChange"/>
    <finish v-if="active === 3" :phone="form.phone" @confirm="handleConfirm"/>
  </div>
</template>
<script>
import step from './component/step'
import phoneForm from '@/views/product/component/phoneForm'
import mainForm from '@/views/product/component/mainForm'
import propertyCon from '@/views/product/component/propertyCon'
import finish from '@/views/product/component/finish'
export default {
  name: 'Apply',
  components: {
    step,
    phoneForm,
    mainForm,
    propertyCon,
    finish
  },
  props: {
    options: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      active: 1,
      form: {}
    }
  },
  created() {
    console.log(this.options)
  },
  methods: {
    handleChange(val) {
      for (const i in val.form) {
        this.form[i] = val.form[i]
      }
      this.active = val.step
    },
    handleConfirm() {
      this.active = 1
    }
  }
}
</script>
<style lang="scss" scoped>
.apply-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  .step {
    margin-bottom: 40px;
  }
}
</style>
