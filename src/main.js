import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

import toast from 'components/common/toast'



Vue.config.productionTip = false
//添加事件总线
Vue.prototype.$bus=new Vue()
Vue.use(toast)  //安装插件  自动执行下面得install 方法
//解决移动端的200ms延迟问题
FastClick.attach(document.body)

//使用加载插件
Vue.use(VueLazyLoad,{
  loading:require('./assets/img/common/placeholder.png')
})
new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
