<template>
<!-- 

  ref 如果是绑定在 组件上的  通过this.$refs  获取的是一个组件对象
  ref 如果是绑定在 元素上的  通过this.$refs  获取的是一个元素对象
 -->
  <div class="wrapper" ref='wrapper'>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  props:{
    probeType:{
      type:Number,
      defalut:0
    },
    pullUpLoad:{
      type:Boolean,
      defalut:false
    }
  },
  data(){
    return {
      scroll:null
    }
  },
  mounted(){
    //1 .创建better-scroll
    //  vue中尽量少用document.querySelector ，不能明确指定拿到是的谁  用ref
    console.log(this.$refs.wrapper)
    this.scroll = new BScroll(this.$refs.wrapper,{
      click:true,
      probeType:this.probeType,   //多个组件都要用的话，需求不一样的，只能去封装方法
      // pullUpLoad:true        最好不要写，给个固定的，不合适，因为有些不需要用监听的组件
      pullUpLoad:this.pullUpLoad
    })
    //2 .监听滚动位置
    this.scroll.on('scroll',(position)=>{
      // console.log(position)  不应该在这打印，谁需要谁打印
      this.$emit('scroll',position)
    })
    //3.监听上拉事件

    this.scroll.on('pullingUp',()=>{
      // console.log('需要上拉加载更多')
      // 业务逻辑能不能在这里处理的，需要传出去的，你需要加载更多
      this.$emit('pullingUp')
    })
    // console.log(this.scroll)
  },
  methods:{
    scrollTo(x,y,time=300){
      this.scroll && this.scroll.scrollTo(x,y,time)
     // this.scroll.scrollTo(x,y,time) 不严谨
    },
    finishPullUp(){
      this.scroll.finishPullUp()
    },
    refresh(){
      console.log('----------')
      this.scroll && this.scroll.refresh()
      // this.scroll.refresh()  不严谨
    },
    getScrollY(){
      return this.scroll ?this.scroll.y : 0
    }


    /*
      解决首页中Better-Scroll可滚动区域问题   
        Better-Scroll再决定有多少区域可以滚动时，是根据scrollHeight属性决定的
        scrollHeight属性是根据放Better-Scroll的content 中的子组件的高度
        但是我们的首页中，刚开始在计算scrollHeight属性时，是没有将图片计算在内的
        所以，计算出来的告诉是错误的
        后来图片加载进来之后有了新的高度，但是scrollHeight属性并没有进行更新
        所以滚动出来问题
        如何解决这个问题？
        监听每一张图片是否加载完成，只要有一张图片没有加载完成了，执行一次refresh（）
        如何监听图片加载完成了？
          原生的js监听图片  :img.onload=funciton（）{}
          Vue中监听： @load='方法'
        调用scroll 的refresh()
    */
  }
}
</script>

<style>

</style>