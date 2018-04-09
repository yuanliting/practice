/**
 * Created by Administrator on 2017/11/13.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shortid = require('shortid');
const setting = require('../setting');
const _ = require('lodash');

const ReplySchema = new Schema({
//    回复的ID
    _id:{
        type:String,
        default:shortid.generate,
        unique:true
    },
    // 回复的内容
    content:{
        type:String,
        require:true
    },
    // 回复时间：
    create_time:{
        type:Date,
        default:Date.now
    },
    // 评价的那个人
    author:{
        type:String,
        ref:'Master'
    },
    // 评价的商品
    good_id:{
        type:String,
        ref:'Goods'
    },
    // 当前回复的点赞量
    likes:{
        type:Number,
        default:0
    },
    // 回复是否被删除
    deleted:{
        type:Boolean,
        default:false
    },
//  回复的图片
    reply_photo:{
        type:Array
    }
})

ReplySchema.statics = {
    //通过商品ID查找该一级回复
    getReplyByGoodsId:(good_id,callback)=>{
        Reply.find({good_id:good_id,deleted:false}).sort({'create_time':-1}).populate('author').populate('good_id').then((replys)=>{
            callback(null, replys);
        }).catch( (err) =>{
            callback(err);
        })
    }
}


const Reply = mongoose.model('Reply', ReplySchema);
module.exports = Reply;