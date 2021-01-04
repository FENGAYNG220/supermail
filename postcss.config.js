module.exports={
  plugins:{
    autoprefixer:{
      'postcss-px-to-viewport':{
        viewportWidth:375, // 视口的宽度，对应的是我们设计稿的宽度
        viewportHeight:667,//视口的高度，对应的是我们设计稿的高度（可以不配置）
        unitPrecision:5,//指定`px`转化为视口单位的小数位数，（很多时候无法整除）
        viewportUnit:'vw',//指定需要转化成的视口单位，建议 用vw
        selectorBlackList:['ignore','tab-bar','tab-bar-item'],// 指定不需要转化的类
        minPixelValue:1,// 小于或等于`1px`不转化为视口单位
        mediaQuery:false,// 允许在媒体查询中转化为`px`
        exclude:[/TabBar/] //必须是正则表达式，按照排除的文件写对应的正则
      }
    }
  }
}