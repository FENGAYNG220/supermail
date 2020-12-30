<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <!-- $store.state.cartList.length 太长，用计算属性 购物车({{cartLength}}) -->
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
export default {
  components:{
    NavBar
  },
  computed:{
    cartLength(){
      return this.$store.state.cartList.length
    }
  }
}
</script>

<style scoped>
  .nav-bar{
    background-color:var(--color-tint);
    color: #fff;
    /* 加粗 */
    /* font-weight: 700; */
  }
</style>