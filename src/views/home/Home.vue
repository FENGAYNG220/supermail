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
    <scroll 
      class='content' 
      ref='scroll' 
      :probe-type="3"   
      @scroll="contentScroll"
      :pull-up-load='true'  
      @pullingUp='loadMore'
      > <!-- 不加 ：是字符串，加了是数值类型   bool值-->
      <home-swiper :banners='banners'></home-swiper>
      <recommend-view :recommends='recommends'/>
      <feature-view/>
      <tab-control class="tab-control" :titles="['流行','新款','精选']" @tabClick='tabClick'/>
      <goods-list :goods="showGoods"></goods-list>
     
    </scroll>
    <back-top @click.native='backClick' v-show='isShowBackTop'></back-top>
    <!-- <div style="width:100%;height:1000px;background:pink;"></div> -->
    <!-- 放到scroll 里 -->
      <!-- <home-swiper :banners='banners'></home-swiper>
      <recommend-view :recommends='recommends'/>
      <feature-view/>
      <tab-control class="tab-control" :titles="['流行','新款','精选']" @tabClick='tabClick'/>
      <goods-list :goods="showGoods"></goods-list>
      <div style="width:100%;height:1000px;background:pink;">111</div> -->
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView"
import FeatureView from './childComps/FeatureView'

import NavBar from "components/common/navbar/NavBar"
import TabControl from "components/content/tabControl/TabControl"
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll"
// backTop 返回顶部
import BackTop from 'components/content/backTop/BackTop'

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
    GoodsList,
    // 封装scroll
     Scroll,
    //封装返回顶层组件
     BackTop

  },
  data(){
    return {
      banners:[],
      recommends:[],
      goods:{
        pop:{page:0,list:[{img:'http://img14.360buyimg.com/mobilecms/s372x372_jfs/t1/96908/6/5455/48331/5dedee7bE564464f3/b4d8e15a0a1b2ea8.jpg!q70.dpg.webp'},{img:'http://img14.360buyimg.com/mobilecms/s372x372_jfs/t1/96908/6/5455/48331/5dedee7bE564464f3/b4d8e15a0a1b2ea8.jpg!q70.dpg.webp'},{img:'http://img14.360buyimg.com/mobilecms/s372x372_jfs/t1/96908/6/5455/48331/5dedee7bE564464f3/b4d8e15a0a1b2ea8.jpg!q70.dpg.webp'},{img:'http://img14.360buyimg.com/mobilecms/s372x372_jfs/t1/96908/6/5455/48331/5dedee7bE564464f3/b4d8e15a0a1b2ea8.jpg!q70.dpg.webp'},{img:'http://img14.360buyimg.com/mobilecms/s372x372_jfs/t1/96908/6/5455/48331/5dedee7bE564464f3/b4d8e15a0a1b2ea8.jpg!q70.dpg.webp'},{img:'http://img14.360buyimg.com/mobilecms/s372x372_jfs/t1/96908/6/5455/48331/5dedee7bE564464f3/b4d8e15a0a1b2ea8.jpg!q70.dpg.webp'},{img:'http://img14.360buyimg.com/mobilecms/s372x372_jfs/t1/96908/6/5455/48331/5dedee7bE564464f3/b4d8e15a0a1b2ea8.jpg!q70.dpg.webp'},{img:'http://img14.360buyimg.com/mobilecms/s372x372_jfs/t1/96908/6/5455/48331/5dedee7bE564464f3/b4d8e15a0a1b2ea8.jpg!q70.dpg.webp'},{img:'http://img14.360buyimg.com/mobilecms/s372x372_jfs/t1/96908/6/5455/48331/5dedee7bE564464f3/b4d8e15a0a1b2ea8.jpg!q70.dpg.webp'},{img:'http://img14.360buyimg.com/mobilecms/s372x372_jfs/t1/96908/6/5455/48331/5dedee7bE564464f3/b4d8e15a0a1b2ea8.jpg!q70.dpg.webp'}]},
        news:{page:0,list:[
          {img:'http://img14.360buyimg.com/mobilecms/s372x372_jfs/t1/25993/36/13860/525551/5ca1d4c6E02683b85/e304d51faf23c258.jpg!q70.dpg.webp'},{img:'http://img14.360buyimg.com/mobilecms/s372x372_jfs/t1/25993/36/13860/525551/5ca1d4c6E02683b85/e304d51faf23c258.jpg!q70.dpg.webp'},{img:'http://img14.360buyimg.com/mobilecms/s372x372_jfs/t1/25993/36/13860/525551/5ca1d4c6E02683b85/e304d51faf23c258.jpg!q70.dpg.webp'},{img:'http://img14.360buyimg.com/mobilecms/s372x372_jfs/t1/25993/37/13860/525551/5ca1d4c6E02683b85/e304d51faf23c258.jpg!q70.dpg.webp'},{img:'http://img14.360buyimg.com/mobilecms/s372x372_jfs/t1/25993/36/13860/525551/5ca1d4c6E02683b85/e304d51faf23c258.jpg!q70.dpg.webp'},{img:'http://img14.360buyimg.com/mobilecms/s372x372_jfs/t1/25993/36/13860/525551/5ca1d4c6E02683b85/e304d51faf23c258.jpg!q70.dpg.webp'},{img:'http://img14.360buyimg.com/mobilecms/s372x372_jfs/t1/25993/36/13860/525551/5ca1d4c6E02683b85/e304d51faf23c258.jpg!q70.dpg.webp'},{img:'http://img14.360buyimg.com/mobilecms/s372x372_jfs/t1/25993/36/13860/525551/5ca1d4c6E02683b85/e304d51faf23c258.jpg!q70.dpg.webp'},{img:'http://img14.360buyimg.com/mobilecms/s372x372_jfs/t1/25993/36/13860/525551/5ca1d4c6E02683b85/e304d51faf23c258.jpg!q70.dpg.webp'},{img:'http://img14.360buyimg.com/mobilecms/s372x372_jfs/t1/25993/36/13860/525551/5ca1d4c6E02683b85/e304d51faf23c258.jpg!q70.dpg.webp'},{img:'http://img14.360buyimg.com/mobilecms/s372x372_jfs/t1/25993/36/13860/525551/5ca1d4c6E02683b85/e304d51faf23c258.jpg!q70.dpg.webp'},{img:'http://img14.360buyimg.com/mobilecms/s372x372_jfs/t1/25993/36/13860/525551/5ca1d4c6E02683b85/e304d51faf23c258.jpg!q70.dpg.webp'}
        ]},
        sell:{page:0,list:[
          {img:'http://img13.360buyimg.com/mobilecms/s372x372_jfs/t1/123002/40/13036/140604/5f645fa7Ef8d4bf8f/1064d4f70d59004c.jpg!q70.dpg.webp'},{img:'http://img13.360buyimg.com/mobilecms/s372x372_jfs/t1/123002/40/13036/140604/5f645fa7Ef8d4bf8f/1064d4f70d59004c.jpg!q70.dpg.webp'},{img:'http://img13.360buyimg.com/mobilecms/s372x372_jfs/t1/123002/40/13036/140604/5f645fa7Ef8d4bf8f/1064d4f70d59004c.jpg!q70.dpg.webp'},{img:'http://img13.360buyimg.com/mobilecms/s372x372_jfs/t1/123002/40/13036/140604/5f645fa7Ef8d4bf8f/1064d4f70d59004c.jpg!q70.dpg.webp'},{img:'http://img13.360buyimg.com/mobilecms/s372x372_jfs/t1/123002/40/13036/140604/5f645fa7Ef8d4bf8f/1064d4f70d59004c.jpg!q70.dpg.webp'},{img:'http://img13.360buyimg.com/mobilecms/s372x372_jfs/t1/123002/40/13036/140604/5f645fa7Ef8d4bf8f/1064d4f70d59004c.jpg!q70.dpg.webp'},{img:'http://img13.360buyimg.com/mobilecms/s372x372_jfs/t1/123002/40/13036/140604/5f645fa7Ef8d4bf8f/1064d4f70d59004c.jpg!q70.dpg.webp'},{img:'http://img13.360buyimg.com/mobilecms/s372x372_jfs/t1/123002/40/13036/140604/5f645fa7Ef8d4bf8f/1064d4f70d59004c.jpg!q70.dpg.webp'},{img:'http://img13.360buyimg.com/mobilecms/s372x372_jfs/t1/123002/40/13036/140604/5f645fa7Ef8d4bf8f/1064d4f70d59004c.jpg!q70.dpg.webp'},{img:'http://img13.360buyimg.com/mobilecms/s372x372_jfs/t1/123002/40/13036/140604/5f645fa7Ef8d4bf8f/1064d4f70d59004c.jpg!q70.dpg.webp'},{img:'http://img13.360buyimg.com/mobilecms/s372x372_jfs/t1/123002/40/13036/140604/5f645fa7Ef8d4bf8f/1064d4f70d59004c.jpg!q70.dpg.webp'},{img:'http://img13.360buyimg.com/mobilecms/s372x372_jfs/t1/123002/40/13036/140604/5f645fa7Ef8d4bf8f/1064d4f70d59004c.jpg!q70.dpg.webp'}
        ]},
      },
      currentType:'pop',
      //是否显示返回顶部的按钮
      isShowBackTop:false,
      BackTopList:[{img:'http://img14.360buyimg.com/mobilecms/s372x372_jfs/t1/113454/16/2260/396838/5ea136a8E576566a8/e9fc93e2c32b0891.png.webp'},{img:'http://img14.360buyimg.com/mobilecms/s372x372_jfs/t1/113454/16/2260/396838/5ea136a8E576566a8/e9fc93e2c32b0891.png.webp'},{img:'http://img14.360buyimg.com/mobilecms/s372x372_jfs/t1/113454/16/2260/396838/5ea136a8E576566a8/e9fc93e2c32b0891.png.webp'},{img:'http://img14.360buyimg.com/mobilecms/s372x372_jfs/t1/113454/16/2260/396838/5ea136a8E576566a8/e9fc93e2c32b0891.png.webp'},{img:'http://img14.360buyimg.com/mobilecms/s372x372_jfs/t1/113454/16/2260/396838/5ea136a8E576566a8/e9fc93e2c32b0891.png.webp'},{img:'http://img14.360buyimg.com/mobilecms/s372x372_jfs/t1/113454/16/2260/396838/5ea136a8E576566a8/e9fc93e2c32b0891.png.webp'},{img:'http://img14.360buyimg.com/mobilecms/s372x372_jfs/t1/113454/16/2260/396838/5ea136a8E576566a8/e9fc93e2c32b0891.png.webp'},{img:'http://img14.360buyimg.com/mobilecms/s372x372_jfs/t1/113454/16/2260/396838/5ea136a8E576566a8/e9fc93e2c32b0891.png.webp'},{img:'http://img14.360buyimg.com/mobilecms/s372x372_jfs/t1/113454/16/2260/396838/5ea136a8E576566a8/e9fc93e2c32b0891.png.webp'},{img:'http://img14.360buyimg.com/mobilecms/s372x372_jfs/t1/113454/16/2260/396838/5ea136a8E576566a8/e9fc93e2c32b0891.png.webp'},{img:'http://img14.360buyimg.com/mobilecms/s372x372_jfs/t1/113454/16/2260/396838/5ea136a8E576566a8/e9fc93e2c32b0891.png.webp'}]
      // ['http://img14.360buyimg.com/mobilecms/s372x372_jfs/t1/113454/16/2260/396838/5ea136a8E576566a8/e9fc93e2c32b0891.png.webp']
    }
  },
  // goods[currentType].list   太长了，用计算属性
  computed:{
    showGoods(){
      return this.goods[this.currentType].list
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
    //3.监听item中的图片加载完成
    // this.$bus.$on('itemImageLoad',()=>{
    //   console.log('-----图片加载完了------')
    //   this.$refs.scroll.refresh()
    // })
  },
  mounted(){
     //3.监听item中的图片加载完成   写在created 有时元素拿不到
      this.$bus.$on('itemImageLoad',()=>{
      console.log('-----图片加载完了------')
      this.$refs.scroll.refresh()
    })
  },
  methods:{
    /***事件监听相关的方法***/
    tabClick(index){
      console.log(index);
      switch(index){
        case 0:this.currentType='pop'
        break;
        case 1:this.currentType='news'
        break;
        case 2:this.currentType='sell'
        break;
      }
    },
    /***网络请求先相关的方法**/
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
      // 接口有问题
      this.goods[type].list.push( ...this.BackTopList)
      this.goods[page]+=1
      this.$refs.scroll.finishPullUp()
    })
    },
    backClick(){
      console.log('返回顶部按钮内被点击了')
      // this.$refs.scroll.scroll.scrollTo(0,0,1000)   太长了  
      this.$refs.scroll.scrollTo(0,0)  // 封装scrollTo方法    处理逻辑只是scroll提供的 
    },
    contentScroll(position){
      // console.log(position)
        this.isShowBackTop=-position.y >1000
    },
    //上拉加载更多
    loadMore(){
      console.log('上拉加载更多')
      //针对类型需要加载更多
      this.getHomeGoods(this.currentType)
      // 问题:往下滚动时，异步加载图片，不能在滚动了
      // 可滚动区域 计算好了，图片异步加载还没有过来，异步加载完成，可滚动区域变高,但是不知道，需要去刷新，才能重新计算
      // this.$refs.scroll.scroll.refresh(); //最新可滚动的高度
    }
  }
}
</script>
s
<style scoped>
   #home{
    /* padding-top: 44px; */   /*要注释 要不然影响视口高度*/
    height: 100vh; 
    /* 视口的高度 */
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
  .content{
    /* height: 100%; */
    /* height:calc(100% - 93px);
    overflow: hidden;
    margin-top: 44px; */
    /* 一种方式 */

    /* 另一种定位 */
    position: absolute;
    top:44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>