<template>
  <div>
    <h1>分类</h1>
    <div class="warpper" ref='aaaa'>
       <ul class="content">
         <button @click='btn'>按钮</button>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
        <li>6</li>
        <li>7</li>
        <li>8</li>
        <li>9</li>
        <li>10</li>
        <li>11</li>
        <li>12</li>
        <li>13</li>
        <li>14</li>
        <li>15</li>
        <li>16</li>
        <li>17</li>
        <li>18</li>
        <li>19</li>
        <li>20</li>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
        <li>6</li>
        <li>7</li>
        <li>8</li>
        <li>9</li>
        <li>10</li>
        <li>11</li>
        <li>12</li>
        <li>13</li>
        <li>14</li>
        <li>15</li>
        <li>16</li>
        <li>17</li>
        <li>18</li>
        <li>19</li>
        <li>20</li>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
        <li>6</li>
        <li>7</li>
        <li>8</li>
        <li>9</li>
        <li>10</li>
        <li>11</li>
        <li>12</li>
        <li>13</li>
        <li>14</li>
        <li>15</li>
        <li>16</li>
        <li>17</li>
        <li>18</li>
        <li>19</li>
        <li>20</li>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
        <li>6</li>
        <li>7</li>
        <li>8</li>
        <li>9</li>
        <li>10</li>
        <li>11</li>
        <li>12</li>
        <li>13</li>
        <li>14</li>
        <li>15</li>
        <li>16</li>
        <li>17</li>
        <li>18</li>
        <li>19</li>
        <li>20</li>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
        <li>6</li>
        <li>7</li>
        <li>8</li>
        <li>9</li>
        <li>10</li>
        <li>11</li>
        <li>12</li>
        <li>13</li>
        <li>14</li>
        <li>15</li>
        <li>16</li>
        <li>17</li>
        <li>18</li>
        <li>19</li>
        <li>20</li>
    </ul>
    </div>
  </div>
</template>

<script>
import BSscroll from 'better-scroll'
// console.log(BSscroll)
export default {
  data(){
    return {
      scroll:null
    }
  },
  //created 生命周期 组件创建完后 调用的生命周期
  mounted(){
    console.log(this.$refs.aaaa)
   this.scroll = new BSscroll(document.querySelector('.warpper'),{
     probeType:3,
     pullUpLoad:true,
     click:false // 已经不起作用了 ，最新的已经生效了
    })
    this.scroll.on('scroll',(position)=>{
      // console.log(position)
    })
    this.scroll.on('pullingUp',()=>{
      console.log('上拉加载更多')
      setTimeout(() => {
        this.scroll.finishPullUp()
      }, 2000);
    })
  },
  methods:{
    btn(){
      console.log('按钮点击了')
    }
  }
}
</script>

<style>
  .warpper{
    height: 150px;
    background-color:pink;
    overflow: hidden;
     /* 移动端用这个很卡的 */
    /* overflow-y: scroll;  */
  }
</style>