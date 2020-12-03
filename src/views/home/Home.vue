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
    <feature-view/>
    <tab-control :titles="['流行','新款','精选']"/>
    <div style="width:100%;height:500px"></div>
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView"
import FeatureView from './childComps/FeatureView'

import NavBar from "components/common/navbar/NavBar"
import TabControl from "components/content/tabControl/TabControl"


import {getHomeMultidata} from "network/home"
// import { Swiper, SwiperItem } from "components/common/swiper";

        
export default {
  components:{
   
    // Swiper,
    // SwiperItem
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl

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
   #home{
    padding-top: 44px;
   }
  .home-nav{
    background-color:var(--color-tint);
    color: #fff;
    position: fixed;
    top:0;
    left: 0;
    right: 0;
    z-index: 9;
  }
</style>