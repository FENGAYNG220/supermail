<template>
 <div class='back-top'>    <!-- @click='topClick' -->
    <img src="~assets/img/common/top.png" alt="">
  </div>
</template>

<script>
export default {
  methods:{
    topClick(){
      // console.log('回到顶部')
      //需要操作  home的scroll 组件  this.scroll.scrollTo(0,0)回到顶点  兄弟组件间传参
      // this.$emit('backClick')  直接监听组件的点击
      // <back-top @Click.native='backClick'></back-top>  去监听组件
    }
  }
}
</script>

<style>
  .back-top{
    position:fixed;
    right: 8px;
    bottom: 55px;
  }
  .back-top img{
    width: 43px;
    height: 43px;
  }
</style>