/**
 * Created by Administrator on 2017/11/3.
 */
var mongoose = require('mongoose');
// 优化数据结构的主键，即_id，格式化为短的、不重复的、唯一的、字符串
const shortid = require('shortid');
const Schema = mongoose.Schema;

const MasterSchema = new Schema({
    //管理员的ID
    _id:{
        type:String,
        default:shortid.generate,
        unique:true
    },
    //用户名
    name:{
        type:String,
        require:true
    },
    //密码
    password:{
        type:String,
        require:true
    },
    // 手机号
    tel:{
      type:String
    },
    // 用户昵称
    nickname:{
        type:String,
        default:'快来设置你的昵称吧'
    },
    //个人简介
    motto:{
        type:String,
        default:'这家伙很懒，什么都没留下..'
    },
    //个人头像
    avatar:{
        type:[]
    },
    //创建时间
    create_time:{
        type:Date,
        default:Date.now
    },
    //更新时间
    update_time:{
        type:Date,
        default:Date.now
    },
    //订单
    orderList:{
        type:Array
    },
    // 购物车
    cartList:{
        type:Array,
        ref:'goods'
    },
    //待收货
    waitList:{
        type:Array
    },
    //全部订单
    allList:{
        type:Array
    },
    //收藏列表
    readList:{
        type:Array
    },
    //选中的商品
    noreadList:{
      type:Array
    },
    //选中的地址
    addList:{
      type:Array
    },
    // 地址
    addressList:{
        type:Array
    },
    // 积分
    score:{
        type:Number,
        default:0
    },
})

MasterSchema.statics = {
//    通过name查找用户
    getMasterByName:(name,callback)=>{
        Master.findOne({'name':name}).then((master)=>{
            callback(null,master);
        }).catch((err)=>{
            callback(err);
        })
    },
    getMasterById:(id,callback)=>{
        Master.findOne({'_id':id}).then((master)=>{
            console.log(master);
            callback(null,master);
        }).catch((err)=>{
            callback(err);
        })
    }
}



const Master = mongoose.model('Master',MasterSchema);
module.exports = Master;


