<template>
  <div id="app"/>
</template>
<script>
import { param2Obj } from '../../util/util'
import { aliPay } from '@/api/pay.alipay'
export default {
  name: 'AliPay',
  data() {
    return {}
  },
  created() {
    const params = param2Obj(window.location.href)
    aliPay(params).then(res => {
      document.write(res.data)
    })
  }
}
</script>
