export default {
  /*   addCart(state,payload){
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
      */
 
      addCounter(state,payload){
       payload.count++
      },
      addToCart(state,payload){
       state.cartList.push(payload)
      }
   }