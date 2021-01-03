import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


import toast from './components/common/toast'

Vue.use(toast)  //安装插件  自动执行下面得install 方法

Vue.config.productionTip = false
Vue.prototype.$bus=new Vue()
new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
