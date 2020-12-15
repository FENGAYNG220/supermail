import {request} from './request'
export function getDetail(id){
  return request({
    url:'/detail',
    params:{
      id
    }
  })
}
export class Goods{
  //没有数据 我就不写了的
  constructor(){
    this.title='瑞士欧品客（OUPINKE）手表男机械表全自动镂空飞轮多功能男士手表夜光防水男表钨钢商务高档镶钻腕表 欧品客-3186-钢带间蓝'
    this.desc='新款上市'
    this.newPrice='￥38.50'
    this.oldPrice='￥69.00'
    this.discount='活动价'
    this.columns=['销量 1580','收藏33人','默认快递']
    this.services='72小时发货'
    this.realPrice='￥38.50'
    this.services1=[{name:'退货补运费'},{name:'全国包邮'},{name:'7天无理由退货'}]
  }
}

export class Shop{
  constructor(){
    this.logo='https://img30.360buyimg.com/popshop/jfs/t1/89293/15/15442/12452/5e6f13b6Ede99e117/80f9da6d7144f313.jpg!q70.dpg.webp'
    this.name='欧品客宝玥专卖店'
    this.fans=17145
    this.sells=57876
    this.score=[{isBetter:false,name:'描述相符',score:4.64},{isBetter:true,name:'价格合理',score:5},{isBetter:false,name:'质量满意',score:4.62}]
    this.goodsCount=99
  }
}

//参数数据
export class GoodsParams {
  constructor(){
    this.image=[]
    this.infos=[{key:'图案',value:'宫廷复古图/民族复古图/字母/文字/数字...'},
                {key:'厂名',value:'瑞士欧品客'},
                {key:'颜色',value:'黑白拼接'},
                {key:'袖型',value:'常规款'},
                {key:'上衣厚度',value:'适中'},
                {key:'尺码',value:'XL,L,M,XXL'},
                {key:'衣长',value:'常规款（51-65cm）'},
                {key:'版型',value:'宽松'},
                {key:'季节',value:'春秋'},
                {key:'厂址',value:'浙江省杭州市西湖区火炬大厦3号楼8楼'},
                {key:'厂址',value:'棉'},
                {key:'领型',value:'圆领'},
                {key:'元素',value:'面料拼接,平绣'},
                {key:'袖长',value:'长袖'},
                {key:'风格',value:'原宿'},
                {key:'潮流',value:'韩系'}
               
              ]
    this.sizes=[
                [
                ['尺码','M','L','XL','XXL'],
                ['衣长','61.5','63','64.6','66'],
                ['胸围','98','104','110','116'],
                ['袖长','63','66','68.5','70.5'],
                ]
               ]
  }
}