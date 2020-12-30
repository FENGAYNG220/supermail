import Vue from 'vue'
import Vuex from  'vuex'
import mutations from './mutations'
import actions from './actions'
//1.安装插件
Vue.use(Vuex)

//2.创建Store对象 
const state = {
  cartList:[]
}
const store =new Vuex.Store({
  state,
  // mutations 唯一的目的就是修改state中的状态
  // mutations 中的每个方法尽可能完成的事件比较单一一点  做了很多事情不是很好的
  // 处理逻辑要放在actions中
  mutations,
  actions,
  getters:{

  },
  modules:{
    
  }
})

// 3.挂载Vue实例上
export default store