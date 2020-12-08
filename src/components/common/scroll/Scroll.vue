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
  data(){
    return {
      scroll:null
    }
  },
  mounted(){
    //  vue中尽量少用document.querySelector ，不能明确指定拿到是的谁  用ref
    console.log(this.$refs.wrapper)
    this.scroll = new BScroll(this.$refs.wrapper,{
      click:true
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