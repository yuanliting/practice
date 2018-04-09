/**
 * Created by Administrator on 2017/11/3.
 */
var mongoose = require('mongoose');
// 优化数据结构的主键，即_id，格式化为短的、不重复的、唯一的、字符串
const shortid = require('shortid');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    //用户的ID
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
    //邮箱
    email:{
        type:String
    },
    //个人简介
    motto:{
        type:String,
        default:'这家伙很懒，什么都没留下..'
    },
    //个人头像
    avatar:{
        type:String,
        default:'/staric/default-avatar.jpg'
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
    //回复数量
    reply_count:{
        type:Number,
        default:0
    },
    // 关注量
    follows:{
        type:Number,
        default:0
    },
    // 积分
    score:{
        type:Number,
        default:0
    },
    // 浏览次数
    count_num:{
        type:Number,
        default:0
    },
    cartList:{
        type:Array,
        ref:'goods'
    },
    addressList:{
        type:Array
    }
});



const User = mongoose.model('User',UserSchema);
module.exports = User;