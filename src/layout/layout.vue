<template>
  <div>
    <heade />
    <router-view/>
    <backToTop/>
  </div>
</template>

<script>
import heade from '@/component/header'
import backToTop from '@/component/backToTop'
export default {
  name: 'Layout',
  components: {
    backToTop,
    heade
  }
}
</script>
