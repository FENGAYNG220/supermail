<template>
  <div class="goods-item" @click='itemClick'>
    <img :src="goodsItem.img" alt="" @load="imageLoad">
    <div class="goods-info">
      <p>宫崎骏,Hayao Miyazaki, 宫崎小时候就擅长绘画,非常喜欢手塚治虫和浦茂的漫画作品。宫崎小时候就擅长绘画</p>
      <span class='price'>99.99</span>
      <span class="collect">7690</span>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    goodsItem:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  data(){
   return {
      lid:2
   }
  },
  methods:{
    imageLoad(){
      this.$bus.$emit('itemImageLoad')
      // console.log(this.$bus)
    },
    itemClick(){
      console.log('跳转到我们详情页')
      //goodsItem.lid
      this.$router.push('/detail/'+this.lid)
    }
  }
}
</script>

<style>
  .goods-item{
    margin-top:4px;
    padding-bottom: 40px;
    position: relative;
    width: 48%;
  }
  .goods-item img{
    width:100%;
    border-radius: 5px;
  }
  .goods-info{
    width: 100%;
    font-size: 12px;
    position: absolute;
    bottom: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }
  .goods-info p{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }
  .goods-info .price{
    color: var(--color-higt-text);  
    margin-right: 20px;
  }
  .goods-info .collect{
    position: relative;
  }
  .goods-info .collect::before{
    content: '';
    position: absolute;
    left: -15px;
    top:-1px;
    width: 14px;
    height: 14px;
    background:url('~assets/img/common/collect.svg') 0  0/14px 14px; 
  }
</style>