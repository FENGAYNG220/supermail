import Vue from 'vue'
import Vuex from  'vuex'

//1.安装插件
Vue.use(Vuex)

//2.创建Store对象 
const store =new Vuex.Store({
  state:{
    cartList:[]
  },
  // mutations 唯一的目的就是修改state中的状态
  // mutations 中的每个方法尽可能完成的事件比较单一一点  做了很多事情不是很好的
  // 处理逻辑要放在actions中
  mutations:{
   addCart(state,payload){
      console.log(payload);
      // payload 新添加的商品
      let oldProduct=null
      for(var key of state.cartList){
        if(key.id===payload.id){
          oldProduct=key
        }
      }
      // indexOf 也是可以的 比较麻烦的
      // let oldProduct =state.cartList.find(item=> item.id===payload.id)
      if(oldProduct){
        oldProduct.count +=1
      }else{
        payload.count=1
        state.cartList.push(payload)
      }
    }
    

    //  addCounter(state,payload){
    //   payload.count++
    //  },
    //  addToCart(state,payload){
    //   state.cartList.push(payload)
    //  }
  },
  actions:{
     addCart(context,payload){
      console.log(payload);
      // payload 新添加的商品
      let oldProduct=null
      for(var key of context.state.cartList){
        if(key.id===payload.id){
          oldProduct=key
        }
      }
      // indexOf 也是可以的 比较麻烦的
      // let oldProduct =context.state.cartList.find(item=> item.id===payload.id)
      if(oldProduct){
        // oldProduct.count +=1
        context.commit('addCounter',oldProduct)
      }else{
        payload.count=1
        // context.state.cartList.push(payload)
        context.commit('addToCart',payload)
      }
    }
     
  },
  getters:{

  },
  modules:{
    
  }
})

// 3.挂载Vue实例上
export default store