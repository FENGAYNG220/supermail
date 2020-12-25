<template>
  <div id="app">
    <!-- 跳转不同的详情页，不需要缓存 -->
    <keep-alive exclude="/detail">
      <router-view/>
    </keep-alive>
    <main-tabbar/>
  </div>
</template>

<script>

import MainTabbar from 'components/content/MainTabbar/MainTabbar'
export default {
  name: 'App',
  components: {
    MainTabbar
  }
}
</script>
 
<style>
 @import './assets/css/base.css';
</style>