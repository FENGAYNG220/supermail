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
      probeType:this.probeType   //多个组件都要用的话，需求不一样的，只能去封装方法
    })
    //2 .监听滚动位置
    this.scroll.on('scroll',(position)=>{
      // console.log(position)  不应该在这打印，谁需要谁打印
      this.$emit('scroll',position)
    })
  },
  methods:{
    scrollTo(x,y,time=300){
      this.scroll.scrollTo(x,y,time)
    }
  }
}
</script>

<style>

</style>