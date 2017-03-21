// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import './assets/css/reset.css'
import VueResource from 'vue-resource'
import store from './store/store'
Vue.config.productionTip = false

Vue.filter('time', function (value) {
           let d = new Date(parseInt(value) * 1000)
      return (d.getFullYear()) + '-' + (d.getMonth() + 1 > 9 ? d.getMonth() + 1 : '0' + (d.getMonth() + 1)) + '-' + (d.getDate() > 9 ? d.getDate() : '0' + d.getDate())
    })

Vue.use(MintUI);
Vue.use(VueResource);



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
