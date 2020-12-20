<template>
  <div id='detail'>
    <!-- 导航栏 -->
    <detail-nav-bar/>
    <scroll class='content' ref='scroll'>
      <detail-swiper :top-images='topImages'></detail-swiper>
      <detail-base-info :goods='goods'></detail-base-info>
      <detail-shop-info :shop='shop'/>
      <detail-goods-info :detail-info='detailInfo' @imageLoad='imageLoad'/>
      <detail-param-info :param-info='paramInfo'/>
      <detail-comment-info :comment-info='commentInfo'/>
      <goods-list :goods="recommends"></goods-list>
    </scroll>
    
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'

import Scroll from 'components/common/scroll/Scroll'


//直接用封装好的组件
import GoodsList from 'components/content/goods/GoodsList'

import {getDetail,Goods,Shop,GoodsParams,getRecommend} from 'network/detail'

export default {
  components:{
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,

    GoodsList,

    Scroll

  },
  data(){
    return {
      id:null,
      topImages:[],
      goods:{},
      shop:{},
      detailInfo:{},
      paramInfo:{},
      //评论模块
      commentInfo:{},
      //保存推荐数据
      recommends:[]

    }
  },
  created(){
    // console.log(this.$route)
    //1.保存传入的id
    this.id=this.$route.params.id
    //2.根据id查找数据
    getDetail(this.id).then(res=>{
      // console.log(res)
    //3.数据分离
        //3.1  获取顶部的图片轮播数据
        this.topImages=['http://m.360buyimg.com/mobilecms/s750x750_jfs/t1/151834/25/9796/403675/5fd4f374Eb9fad594/4297001b640c88c1.jpg!q80.dpg.webp','http://m.360buyimg.com/mobilecms/s843x843_jfs/t1/118469/24/16485/241226/5f4c96b2E4cc8741c/b3f4daffb3f875f6.jpg!q70.dpg.webp','http://m.360buyimg.com/mobilecms/s843x843_jfs/t1/87355/8/19357/155360/5f4c96b2Efc9da9ec/9c9f77451f8c9ee6.jpg!q70.dpg.webp','http://m.360buyimg.com/mobilecms/s843x843_jfs/t1/134697/15/8731/135406/5f4c96b3Ebe5e4e97/5fc90ae42b7a6b57.jpg!q70.dpg.webp','http://m.360buyimg.com/mobilecms/s843x843_jfs/t1/130415/19/8693/129113/5f4c96b2E087314c6/26211ae3d487d28e.jpg!q70.dpg.webp','http://m.360buyimg.com/mobilecms/s843x843_jfs/t1/120344/21/11459/230133/5f4c96b4Ee75c5dfc/9bfa09c187db3b47.jpg!q70.dpg.webp']
        //3.2获取我们的商品信息
        this.goods=new Goods()
        //3.3 创建店铺信息的对象
        this.shop=new Shop()
        //3.4 保存商品的详情数据
        this.detailInfo={desc:'新品上市',detailImage:[{anchor:'model_img',desc:'',key:'穿着效果',list:[
          'http://img30.360buyimg.com/popWareDetail/jfs/t1/146293/29/7157/161921/5f4c9975Ed6effd77/11d3a2b480e12839.jpg!q70.dpg.webp',
          'http://img30.360buyimg.com/popWareDetail/jfs/t1/118239/35/16793/262818/5f4c99c6E9b957c8a/00e8ad839f0a681a.jpg!q70.dpg.webp',
          'http://img30.360buyimg.com/popWareDetail/jfs/t1/114789/36/16542/106013/5f4c9975Ec95ece72/621e205cc5d49f27.jpg!q70.dpg.webp',
          'http://img30.360buyimg.com/popWareDetail/jfs/t1/128517/32/11233/158858/5f4c9975E674febc0/e2fa99eddb5895bf.jpg!q70.dpg.webp',
          'http://img30.360buyimg.com/popWareDetail/jfs/t1/144435/40/7175/276525/5f4c9976Ea5b38888/1cca21530ddc5eef.jpg!q70.dpg.webp',
          'http://img30.360buyimg.com/popWareDetail/jfs/t1/128218/7/11289/182976/5f4c9976E59a25bd0/63ce067e055a64e5.jpg!q70.dpg.webp',
          'http://img30.360buyimg.com/popWareDetail/jfs/t1/115546/37/16606/176927/5f4c9976E9a411b3b/e07e368820060806.jpg!q70.dpg.webp',
          'http://img30.360buyimg.com/popWareDetail/jfs/t1/135694/30/8786/162097/5f4c9977E0580f04a/2720c55aa49e01ff.jpg!q70.dpg.webp',
          'http://img30.360buyimg.com/popWareDetail/jfs/t1/137677/40/7122/169546/5f4c9977E00e00a46/3b21500b82650c9c.jpg!q70.dpg.webp',
          'http://img30.360buyimg.com/popWareDetail/jfs/t1/141807/36/7182/312409/5f4c9977E494abab5/a6f7d399f4302dd3.jpg!q70.dpg.webp',
          'http://img30.360buyimg.com/popWareDetail/jfs/t1/129186/8/11421/104684/5f4c9978E74fb8d4c/5443978175054602.jpg!q70.dpg.webp',
          'http://img30.360buyimg.com/popWareDetail/jfs/t1/127310/1/11378/188575/5f4c9978E8630c3a5/3406b338ad4d8c87.jpg!q70.dpg.webp',
          'http://img30.360buyimg.com/popWareDetail/jfs/t1/140733/37/7179/224302/5f4c9978E9c0ada00/db3bf33448f6bd15.jpg!q70.dpg.webp',
          'http://img30.360buyimg.com/popWareDetail/jfs/t1/117635/33/16912/136177/5f4c9978E4aa51ae5/b60df537f93341f0.jpg!q70.dpg.webp',
          'http://img30.360buyimg.com/popWareDetail/jfs/t1/135496/40/8731/235941/5f4c9979E30130cdf/ed608391159d8101.jpg!q70.dpg.webp',
          'http://img30.360buyimg.com/popWareDetail/jfs/t1/124522/7/11452/223503/5f4c997aE566f47ba/bbacc65f106d7fb3.jpg!q70.dpg.webp',
          'http://img30.360buyimg.com/popWareDetail/jfs/t1/126835/28/11301/253305/5f4c997aEb091b770/f62903d80467a489.jpg!q70.dpg.webp',
          'http://img30.360buyimg.com/popWareDetail/jfs/t1/116405/22/16645/165965/5f4c997aEfd2e9279/81a6576400355cdf.jpg!q70.dpg.webp',
          'http://img30.360buyimg.com/popWareDetail/jfs/t1/124381/39/11283/202866/5f4c997aE685a4a97/d683ec63dcc85815.jpg!q70.dpg.webp',
          'http://img30.360buyimg.com/popWareDetail/jfs/t1/137233/15/8925/177205/5f4c997aE1b536d4b/44a1e09b1cc22642.jpg!q70.dpg.webp'
        ]}]},
        this.paramInfo=new  GoodsParams()
        //3.5取出评论信息
        // 做个判断  是否有信息
        // 假数据写死的
        if(res){
          this.commentInfo={
              user:{avatar:'http://storage.360buyimg.com/i.imageUpload/6a645f3666623763313366633331333731343838303232383935363033_sma.jpg',name:'棒棒糖闯江湖'},
              content:'手表质量很好，做工精致，工艺精良，细节处理的很好，防水性能好，走时精准，外观美观大方，客服服务态度好，耐心解答问题，很满意。',
              created:'1535694719',
              style:'颜色:上衣+裤子 尺码:M',
              images:['http://img30.360buyimg.com/shaidan/s128x96_jfs/t1/142783/3/9532/53857/5f72919fEad944a94/7567a780f83e51c2.jpg!cc_100x100!q70.dpg.webp','http://img30.360buyimg.com/shaidan/s128x96_jfs/t1/111083/29/19096/65655/5f7291a0E4ac5d08c/8983307cfbf07973.jpg!cc_100x100!q70.dpg.webp','http://img30.360buyimg.com/shaidan/s128x96_jfs/t1/152099/22/1113/80816/5f7291a0Eca44fab1/1a77776bf306aa3d.jpg!cc_100x100!q70.dpg.webp']
          }
        }
    }),
    // 3. 请求推荐数据
    getRecommend().then(res=>{
      console.log('请求推荐数据')
      this.recommends=[{img:'http://img14.360buyimg.com/mobilecms/s270x270_jfs/t1/150391/23/11687/380579/5fdc0547Ed5e64af2/3d4dac92f79ed95b.jpg!q70.dpg.webp'},{img:'http://img14.360buyimg.com/mobilecms/s270x270_jfs/t1/154891/21/10382/264279/5fdbba45Eaa4fff99/3e412ce1cb271e7f.jpg!q70.dpg.webp'},{img:'http://img14.360buyimg.com/mobilecms/s270x270_jfs/t18325/65/199693094/405715/6f845190/5a61d111N0e4f0567.jpg!q70.dpg.webp'},{img:'http://img14.360buyimg.com/mobilecms/s270x270_jfs/t1/145306/32/15357/233157/5fb9eb5eEec1062c3/1a0ee25bcd66c544.jpg!q70.dpg.webp'},{img:'http://img14.360buyimg.com/mobilecms/s270x270_jfs/t1/147240/26/1802/246082/5efbfe75E8e81f7bd/dad511fa9851f79f.jpg!q70.dpg.webp'},{img:'http://img14.360buyimg.com/mobilecms/s270x270_jfs/t1/143293/37/18645/335700/5fdbba4dE0c7af7e1/02bcd50f8c4ec0e9.jpg!q70.dpg.webp'},{img:'http://img14.360buyimg.com/mobilecms/s270x270_jfs/t1/150021/34/18241/548309/5fd5f516E387c882c/61a3cbbab69d2152.jpg!q70.dpg.webp'},{img:'http://img14.360buyimg.com/mobilecms/s270x270_jfs/t1/51806/31/10868/174560/5d7dfc6fE02965d93/c4a5bc481635f8d0.jpg!q70.dpg.webp'},{img:'http://img14.360buyimg.com/mobilecms/s270x270_jfs/t1/148181/32/7160/170489/5f4ca31cE63655fb2/4af1676de5627cbd.jpg!q70.dpg.webp'},{img:'http://img14.360buyimg.com/mobilecms/s270x270_jfs/t1/120632/9/4127/126488/5ed9c291Ecd68f259/92d589ca97daf47a.jpg!q70.dpg.webp'}]
    })
  },
  methods:{
    imageLoad(){
      console.log('图片加载完了')
      this.$refs.scroll.refresh()
    }
  }
}
</script>

<style scoped>
  #detail{
    position: relative;
    z-index:101;
    background-color: #ffffff;
    height: 100vh;
  }
  .content{
    /* 用better-scroll必须给定高度 */
    /* 1.父亲要 height: 100vh;   height: calc(100% - 44px);  */
    /* 2.定位 */
    height: calc(100% - 44px);
    overflow: hidden;
  }
</style>