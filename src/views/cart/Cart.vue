<template>
  <div class="cart">
    <!-- 1.导航 -->
    <nav-bar class="nav-bar">
      <!-- $store.state.cartList.length 太长，用计算属性 购物车({{cartLength}}) -->
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <!-- 2.商品列表 -->
    <cart-list/>
    <!-- 3.底部汇总 -->
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import CartList from './childComps/CartList'



import {mapGetters} from 'vuex'

export default {
  components:{
    NavBar,
    CartList
  },
  computed:{
    /*
    还是太麻烦的，多套了一次的 用新的方法  引入vuex 用mapGetters 
    cartLength(){
      // return this.$store.state.cartList.length
      return this.$strore.getters.cartLength
    }
    */
   // 2种语法 2.1
  //  ...mapGetters(['cartLength','cartList'])
   ...mapGetters(['cartLength'])
  //  ...mapGetters
   //2.1
   /*
    ...mapGetters({
      映射过去可以写 length
      length:cartLength,
      list:cartLi
    })
   */
  }
}
</script>

<style scoped>
  .cart{
    /* height: 100vh; */
  }
  .nav-bar{
    background-color:var(--color-tint);
    color: #fff;
    /* 加粗 */
    /* font-weight: 700; */
  }
</style>