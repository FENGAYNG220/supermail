<template>
  <div id='home'>
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control ref='tabControl1' 
                   class="tab-control" 
                  :titles="['流行','新款','精选']" 
                  @tabClick='tabClick'
                  v-show="isTabFixed"
                  />
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
      <home-swiper :banners='banners'   @swiperImageLoad='swiperImageLoad'></home-swiper>
      <recommend-view :recommends='recommends'/>
      <feature-view/>
      <!-- 复制一份 -->
      <tab-control ref='tabControl2' 
                  :titles="['流行','新款','精选']" 
                  @tabClick='tabClick'
                  
                  />
                  <!-- :class='{fixed:isTabFixed}'  写在tab-control 里有问题-->
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
import {debuonce} from 'common/utils'
import {itemListenerMixin} from 'common/mixin'
        
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
  mixins:[itemListenerMixin],
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
      BackTopList:[{img:'http://img14.360buyimg.com/mobilecms/s372x372_jfs/t1/113454/16/2260/396838/5ea136a8E576566a8/e9fc93e2c32b0891.png.webp',},{img:'http://img14.360buyimg.com/mobilecms/s372x372_jfs/t1/113454/16/2260/396838/5ea136a8E576566a8/e9fc93e2c32b0891.png.webp'},{img:'http://img14.360buyimg.com/mobilecms/s372x372_jfs/t1/113454/16/2260/396838/5ea136a8E576566a8/e9fc93e2c32b0891.png.webp'},{img:'http://img14.360buyimg.com/mobilecms/s372x372_jfs/t1/113454/16/2260/396838/5ea136a8E576566a8/e9fc93e2c32b0891.png.webp'},{img:'http://img14.360buyimg.com/mobilecms/s372x372_jfs/t1/113454/16/2260/396838/5ea136a8E576566a8/e9fc93e2c32b0891.png.webp'},{img:'http://img14.360buyimg.com/mobilecms/s372x372_jfs/t1/113454/16/2260/396838/5ea136a8E576566a8/e9fc93e2c32b0891.png.webp'},{img:'http://img14.360buyimg.com/mobilecms/s372x372_jfs/t1/113454/16/2260/396838/5ea136a8E576566a8/e9fc93e2c32b0891.png.webp'},{img:'http://img14.360buyimg.com/mobilecms/s372x372_jfs/t1/113454/16/2260/396838/5ea136a8E576566a8/e9fc93e2c32b0891.png.webp'},{img:'http://img14.360buyimg.com/mobilecms/s372x372_jfs/t1/113454/16/2260/396838/5ea136a8E576566a8/e9fc93e2c32b0891.png.webp'},{img:'http://img14.360buyimg.com/mobilecms/s372x372_jfs/t1/113454/16/2260/396838/5ea136a8E576566a8/e9fc93e2c32b0891.png.webp'},{img:'http://img14.360buyimg.com/mobilecms/s372x372_jfs/t1/113454/16/2260/396838/5ea136a8E576566a8/e9fc93e2c32b0891.png.webp'}],
      // ['http://img14.360buyimg.com/mobilecms/s372x372_jfs/t1/113454/16/2260/396838/5ea136a8E576566a8/e9fc93e2c32b0891.png.webp']

      TabOffsetTop:0,
      //距离顶部的距离
      isTabFixed:false,
      //保存离开时的距离
      saveY:0
      //全局事件  抽离
      // homeImgListener:null
    }
    
  },
  // goods[currentType].list   太长了，用计算属性
  computed:{
    showGoods(){
      return this.goods[this.currentType].list
    }
  },
  destroyed(){
    //路由有keep-alive 组件不能销毁
    console.log('HomeComponents destroyed')
  },
  activated(){
    console.log('Home 进入')  //设置位置
    
   this.$refs.scroll.scrollTo(0,this.saveY,0)
   this.$refs.scroll.refresh()
  },
  deactivated(){
     console.log('Home 离开')   // 离开记录位置
  //封装一下
  //  this.saveY=this.$refs.scroll.scroll.y;
  // 保存Y值
      this.saveY=this.$refs.scroll.getScrollY()
  // 取消全局事件
    this.$bus.$off('itemImageLoad',this. homeImgListener)      
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

   
    //4.2 防抖包装
      const refresh=debuonce(this.$refs.scroll.refresh,500)
        //对监听的函数进行保存 
      this. homeImgListener=()=>{
      // console.log('-----图片加载完了------')
      //4.操作太频繁了，服务器压力太大了  要优化
     //4.3  调用返回值的函数
      // this.$refs.scroll.refresh()
      refresh()
    }

     //3.监听item中的图片加载完成   写在created 有时元素拿不到
      this.$bus.$on('itemImageLoad',this. homeImgListener)
    // 5 获取tabOffsetTop的offsetTop
    //所有组件都有一个属性$el ：获取组件中的元素
    //this.$refs.tabControl.$el.offsetTop  不准，图片还没有加载完
    // 监听图片是加载完
    // this.TabOffsetTop=this.$refs.tabControl
    // console.log(this.$refs.tabControl.$el.offsetTop)
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
      this.$refs.tabControl1.currentIndex=index
      this.$refs.tabControl2.currentIndex=index
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
      
      //1.判断BackTop是否显示
        this.isShowBackTop=-position.y >1000
      //吸顶效果逻辑实现
      //2.决定tabControl是否吸顶（position:fixed）  
      this.isTabFixed=(-position.y) > this.TabOffsetTop
    },
    //上拉加载更多
    loadMore(){
      // console.log('上拉加载更多')
      //针对类型需要加载更多
      this.getHomeGoods(this.currentType)
      // 问题:往下滚动时，异步加载图片，不能在滚动了
      // 可滚动区域 计算好了，图片异步加载还没有过来，异步加载完成，可滚动区域变高,但是不知道，需要去刷新，才能重新计算
      // this.$refs.scroll.scroll.refresh(); //最新可滚动的高度
    },
    // 4.1 封装防抖函数  放到了 common下的utils.js下
    // debuonce(func,delay){
    //   let timer=null
    //   return function(...args){
    //     if(timer) clearTimeout(timer)
    //     timer=setTimeout(() => {
    //       func.apply(this,args)
    //     }, delay);
    //   }
    // }
    swiperImageLoad(){
      this.TabOffsetTop=this.$refs.tabControl2.$el.offsetTop
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
    /* 在使用原生滚动时，为了让导航不跟随一起滚动 */
    /* position: fixed;
    top:0;
    left: 0;
    right: 0;
    z-index: 9; */
  }
  /* .tab-control{
    position: sticky;    用better-scroll已经不起作用了 
    top:44px;
    z-index: 9;
  } */
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
    overflow: hidden;
  }
  /* 吸顶的样式 */
  .tab-control{
    position: relative;
    z-index: 9;
  }
  /* 有问题，better-scroll 内容问题，也会随着translate往上滚动 */
  /* .fixed{
    position:fixed;
    top: 44px;
    right: 0;
    left: 0;
    z-index:100;
  } */
</style>