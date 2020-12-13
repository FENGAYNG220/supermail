<template>
  <swiper>
      <swiper-item v-for="item in banners" :key="item.title">
        <a :href="item.link">
          <img :src="item.image" alt="" @load="imageLoad">
        </a>
      </swiper-item>
    </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper"
export default {
  props:{
    banners:{
      type:Array,
      defualt(){
        return []
      }
    }
  },
  data(){
    return {
      isLoad:false
    }
  },
  components:{
    Swiper,
    SwiperItem
  },
  methods:{
    imageLoad(){
      // console.log('轮播图片加载完了')
      // this.$emit('swiperImageLoad')
      //发出事件太多了
      //改进
      if (!this.isLoad){
        this.$emit('swiperImageLoad')
        console.log('轮播图片加载完了')
        this.isLoad=true
      }
    }
  }

}
</script>

<style>

</style>