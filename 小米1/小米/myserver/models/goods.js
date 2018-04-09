/**
 * Created by Administrator on 2017/11/3.
 */
var mongoose = require('mongoose');
// 优化数据结构的主键，即_id，格式化为短的、不重复的、唯一的、字符串
const shortid = require('shortid');
const Schema = mongoose.Schema;

const GoodsSchema = new Schema({
    //商品ID
    _id:{
        type:String,
        default:shortid.generate,
        unique:true
    },
    //商品分类
    category:{
      type:String
    },
    //商品价格
    price:{
      type:Number
    },
    //商品名称
    name:{
        type:String,
        require:true
    },
    // 商品简介
    intro:{
        type:String,
        default:'宝贝还没有评价'
    },
    //优惠活动
    discounts:{
        type:String,
        default:'还没有优惠活动哦'
    },
    // 发布人
    author:{
        type:String,
        ref:'Master'
    },
    // 促销活动
    promotion:{
      type:String
    },
    // 商品图片
    photo:{
        type:Array
    },
    // 创建时间
    create_time:{
        type:Date,
        default:Date.now
    },
    // 更新时间
    update_time:{
        type:Date,
        default:Date.now
    },
    // 被关注量(被收藏量)
    be_followed:{
        type:Number,
        default:0
    },
     //点赞量
    be_liked:{
      type:Number,
        default:0
    },
     //商品数量
    num:{
        type:Number,
        default:1
    },
     // 删除功能
    deleted:{
        type:Boolean,
        default:false
    },
//   是否评价
    has_read:{
        type:Boolean,
        default:false
    }
})

GoodsSchema.statics = {
//    通过商品ID查找商品
    getGoodsById:(id,callback)=>{
        Goods.findOne({'_id':id,deleted:false}).then((good)=>{
            console.log(good);
            if(!good){
                return callback(null,'该商品已经删除')
            }
            callback(null,good);
        }).catch( (err)=>{
            callback(err);
        })
    }
}


const Goods = mongoose.model('Goods',GoodsSchema);
module.exports = Goods;