<template>
  <div>
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class='title'>
        <div v-for="(item,index) in titles" 
        v-bind:key="index" 
        class="title-item"
        :class="{ative: index===currentIndex}"
        @click="titleClick(index)"
        >{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
export default {
  components:{
    NavBar
  },
  data(){
    return {
      titles:['商品','参数','评论','推荐'],
      currentIndex:0
    }
  },
  methods:{
    titleClick(index){
      this.currentIndex=index
      //将事件发出去
      this.$emit('titleClick',index)
    },
    backClick(){
      console.log('详情页点击返回')
      this.$router.go(-1);
      // this.$router.back()  同理  =go(-1)
    }
  }
}
</script>

<style scoped>
  .title{
    display: flex;
    font-size: 13px;
  }
  .title-item{
    flex: 1;
  }
  .ative{
    color:var(--color-high-text);
  }
  .back{
    margin-top:6px;
  }
</style>