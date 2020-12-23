import {debuonce} from './utils'
export const itemListenerMixin ={
  data(){
    return {
      homeImgListener:null
    }
  },  
  mounted(){
    const refresh=debuonce(this.$refs.scroll.refresh,500)
    this.homeImgListener=()=>{
     
      refresh()
   }
   this.$bus.$on('itemImgLoad', this.homeImgListener)
  }
}