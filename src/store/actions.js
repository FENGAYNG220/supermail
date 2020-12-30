import {
  ADD_COUNTER,
  ADD_TO_CART
 } from './mutation-types'
export default {
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
     context.commit(ADD_COUNTER,oldProduct)
   }else{
     payload.count=1
     // context.state.cartList.push(payload)
     context.commit(ADD_TO_CART,payload)
   }
 }
  
}