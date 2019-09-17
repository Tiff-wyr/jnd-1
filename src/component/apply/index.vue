<template>
  <div class="apply-wrap">
    <step :active="active" class="step"/>

    <phone-form v-if="active === 1" :options="options" :if-register="ifRegister" @change="handleChange"/>
    <main-form v-if="active === 1.5" :phone="form.phone" :if-register="ifRegister" :code="form.password" @change="handleChange" @register="handleRegister"/>
    <property-con v-if="active === 2" :phone="form.phone" :options="options" :if-register="ifRegister" @change="handleChange"/>
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
      default: function() {
        return {}
      }
    },
    ifRegister: {
      type: Boolean,
      default: false
    },
    steps: {
      type: [String, Number],
      default: 0
    }
  },
  data() {
    return {
      active: 1,
      form: {}
    }
  },
  watch: {
    steps(val) {
      console.log('监听到变化了', val)
      this.active = val
      console.log(this.active)
    }
  },
  methods: {
    handleChange(val) {
      console.log(val)
      for (const i in val.form) {
        this.form[i] = val.form[i]
      }
      console.log(this.form)
      this.active = val.step
    },
    handleConfirm() {
      this.active = 1
    },
    handleRegister() {
      this.$emit('register')
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
