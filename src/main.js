// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import 'babel-polyfill'
import App from './App'
import router from './router'
import './style/init.css'
import axios from './util/axios'
import store from './store/index'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './style/iconfont/iconfont.css'
import scroll from 'vue-seamless-scroll'
Vue.config.productionTip = false
Vue.prototype.$isPay = false
Vue.prototype.$axios = axios
import MetaInfo from 'vue-meta-info'
Vue.use(ElementUI)
Vue.use(scroll)
Vue.use(MetaInfo)
import './icons' // icon

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  mounted() {
    document.dispatchEvent(new Event('render-event'))
  },
  template: '<App/>',
  render: h => h(App)
})
