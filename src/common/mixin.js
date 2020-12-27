import {debuonce} from './utils'
import BackTop from 'components/content/backTop/BackTop'


export const itemListenerMixin ={
  data(){
    return {
      homeImgListener:null
    }
  },  
  mounted(){
    console.log('我是mixin混入的数据')
    const refresh=debuonce(this.$refs.scroll.refresh,500)
    this.homeImgListener=()=>{
     
      refresh()
   }
   this.$bus.$on('itemImgLoad', this.homeImgListener)
   
  }
}

export const backTopMixin={
  components:{
    BackTop
  },
  data(){
    return {
      isShowBackTop:false
    }
  },
  // methods 中的方法可以抽取  里面的具体东西不能再抽了
  methods:{
    backClick(){
      console.log('返回顶部按钮内被点击了')
      this.$refs.scroll.scrollTo(0,0) 
    }
  }
}