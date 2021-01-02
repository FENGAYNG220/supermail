// 常量抽离有问题
import {
 ADD_COUNTER,
 ADD_TO_CART
} from './mutation-types'
export default {
  //  addCart(state,payload){
  //     console.log(payload);
  //     // payload 新添加的商品
  //     let oldProduct=null
  //     for(var key of state.cartList){
  //       if(key.id===payload.id){
  //         oldProduct=key
  //       }
  //     }
  //     // indexOf 也是可以的 比较麻烦的
  //     // let oldProduct =state.cartList.find(item=> item.id===payload.id)
  //     if(oldProduct){
  //       oldProduct.count +=1
  //     }else{
  //       payload.count=1
  //       state.cartList.push(payload)
  //     }
  //   },
    

     [ADD_COUNTER](state,payload){
      payload.count++
     },
     [ADD_TO_CART](state,payload){
       payload.checked=true
      state.cartList.push(payload)
     }
  }