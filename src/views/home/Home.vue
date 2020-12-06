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
    <tab-control class="tab-control" :titles="['流行','新款','精选']"/>
    <goods-list :goods="goods['pop'].list"></goods-list>
    <div style="width:100%;height:1000px;background:pink;">111</div>
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView"
import FeatureView from './childComps/FeatureView'

import NavBar from "components/common/navbar/NavBar"
import TabControl from "components/content/tabControl/TabControl"
import GoodsList from "components/content/goods/GoodsList";


import {getHomeMultidata,getHomeGoods} from "network/home"
// import { Swiper, SwiperItem } from "components/common/swiper";

        
export default {
  components:{
   
    // Swiper,
    // SwiperItem
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList

  },
  data(){
    return {
      banners:[],
      recommends:[],
      goods:{
        pop:{page:0,list:[{img:'http://img14.360buyimg.com/mobilecms/s372x372_jfs/t1/96908/6/5455/48331/5dedee7bE564464f3/b4d8e15a0a1b2ea8.jpg!q70.dpg.webp'},{img:'http://img14.360buyimg.com/mobilecms/s372x372_jfs/t1/96908/6/5455/48331/5dedee7bE564464f3/b4d8e15a0a1b2ea8.jpg!q70.dpg.webp'},{img:'http://img14.360buyimg.com/mobilecms/s372x372_jfs/t1/96908/6/5455/48331/5dedee7bE564464f3/b4d8e15a0a1b2ea8.jpg!q70.dpg.webp'},{img:'http://img14.360buyimg.com/mobilecms/s372x372_jfs/t1/96908/6/5455/48331/5dedee7bE564464f3/b4d8e15a0a1b2ea8.jpg!q70.dpg.webp'},{img:'http://img14.360buyimg.com/mobilecms/s372x372_jfs/t1/96908/6/5455/48331/5dedee7bE564464f3/b4d8e15a0a1b2ea8.jpg!q70.dpg.webp'},{img:'http://img14.360buyimg.com/mobilecms/s372x372_jfs/t1/96908/6/5455/48331/5dedee7bE564464f3/b4d8e15a0a1b2ea8.jpg!q70.dpg.webp'},{img:'http://img14.360buyimg.com/mobilecms/s372x372_jfs/t1/96908/6/5455/48331/5dedee7bE564464f3/b4d8e15a0a1b2ea8.jpg!q70.dpg.webp'},{img:'http://img14.360buyimg.com/mobilecms/s372x372_jfs/t1/96908/6/5455/48331/5dedee7bE564464f3/b4d8e15a0a1b2ea8.jpg!q70.dpg.webp'},{img:'http://img14.360buyimg.com/mobilecms/s372x372_jfs/t1/96908/6/5455/48331/5dedee7bE564464f3/b4d8e15a0a1b2ea8.jpg!q70.dpg.webp'},{img:'http://img14.360buyimg.com/mobilecms/s372x372_jfs/t1/96908/6/5455/48331/5dedee7bE564464f3/b4d8e15a0a1b2ea8.jpg!q70.dpg.webp'}]},
        news:{page:0,list:[]},
        sell:{page:0,list:[]},
      }
    }
  },
  created(){
    //1.请求多个数据 和这个函数比较特殊的，写主要逻辑  
    // this.getHomeMultidata().then(res=>{
    //     this.banners=res.data.banner.list
    //     this.recommends=res.data.recommend.list
    //     // console.log(this.banners,this.recommends)
    // })
    this.getHomeMultidata()
    //请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('news')
    this.getHomeGoods('sell')
    // getHomeGoods('pop',1).then(res=>{
    //   console.log(res)
    // })
  },
  methods:{
    getHomeMultidata(){
      getHomeMultidata().then(res=>{
        this.banners=res.data.banner.list
        this.recommends=res.data.recommend.list
        // console.log(this.banners,this.recommends)
    })
    },
    getHomeGoods(type){
      const page=this.goods[type].page+1
       getHomeGoods(type,page).then(res=>{
      //  console.log(res)
      this.goods[type].list.push( ...res.data.list)
      this.goods[page]+=1
    })
    }
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
  .tab-control{
    position: sticky;
    top:44px;
    z-index: 9;
  }
</style>