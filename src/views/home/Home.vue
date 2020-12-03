<template>
  <div id='home'>
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <!-- 重新封装抽取 -->
    <!-- <swiper>
      <swiper-item v-for="item in banners" :key="item.title">
        <a :href="item.link">
          <img :src="item.image" alt="">
        </a>
      </swiper-item>
    </swiper> -->
    <home-swiper :banners='banners'></home-swiper>
    <recommend-view :recommends='recommends'/>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar"
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView"
import {getHomeMultidata} from "network/home"
// import { Swiper, SwiperItem } from "components/common/swiper";

        
export default {
  components:{
    NavBar,
    // Swiper,
    // SwiperItem
    HomeSwiper,
    RecommendView
  },
  data(){
    return {
      banners:[],
      recommends:[]
      
    }
  },
  created(){
    //1.请求多个数据
    getHomeMultidata().then(res=>{
        this.banners=res.data.banner.list
        this.recommends=res.data.recommend.list
        console.log(this.banners,this.recommends)
    })
  }
}
</script>

<style>
  .home-nav{
    background-color:var(--color-tint);
    color: #fff
  }
</style>