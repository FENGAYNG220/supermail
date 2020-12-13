<template>
  <div class='detail'>
    <h1>我是detail</h1>
  </div>
</template>

<script>
export default {
  data(){
    return {
      id:null
    }
  },
  created(){
    console.log(this.$route)
    console.log(this.$route.params.id)
  }
}
</script>

<style scoped>

</style>