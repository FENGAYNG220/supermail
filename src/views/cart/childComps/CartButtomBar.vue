<template>
  <div class="buttom-bar">
    <div class="check-content">
      <check-button :is-checked='isSelectAll' class="check-button"/>
      <span>全选</span>
    </div>


    <div class="price">
      合计:{{totalPrice}}
    </div>

    <div class="calculate">
      去计算({{checkedLength}})
    </div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'
export default {
  components:{
    CheckButton
  },
  computed:{
    totalPrice(){
      return  '￥' + this.$store.state.cartList.filter(item=>{
        return item.checked
      }).reduce((preValue,item)=>{
        return preValue + item.price.slice(1) * item.count
      },0).toFixed(2)
    },
    checkedLength(){
      return this.$store.state.cartList.filter(item=>item.checked).length
    },
    // 看是否全选中
    isSelectAll(){
      //方式一  性能不高
    //  return !(this.$store.state.cartList.filter(item=>!item.checked).length)
      //方式二  find  去找没有被选中的元素。
      if(this.$store.state.cartList== 0) return false
        return !this.$store.state.cartList.find(item=>!item.checked)
      //方式三 for of  遍历
    }
  }
}
</script>

<style scoped>
  .buttom-bar{
    position: relative;
    /* bottom: 40px; */  
    display: flex;


    height: 40px;
    line-height: 40px;  
    background-color:#eee;   
    font-size: 14px;
  }
  .check-content{
   display: flex;
   align-items: center;
   margin-left: 10px;
   width: 60px;
  }
  .check-button{
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-right:5px;
  }
  .price{
    margin-left:30px;
    flex: 1;
  }
  .calculate{
    width: 90px;
    background-color:red;
    color: #fff;
    font-weight: bold;
    text-align: center
  }
</style>