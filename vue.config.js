module.exports={
  configureWebpack:{
    resolve:{
      // extensions:['.js','.json','.vue'], 配置后缀可以省略
      alias:{
        'assets':'@/assets',
        'common':'@/common',
        'components':'@/components',
        'network':'@/network',
        'views':'@/views'

      }
    }
  }
}