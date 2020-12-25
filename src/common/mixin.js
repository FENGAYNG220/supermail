import {debuonce} from './utils'
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