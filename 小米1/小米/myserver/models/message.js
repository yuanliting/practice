/**
 * Created by Administrator on 2017/11/15.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shortid = require('shortid');
const MessageSchema = new Schema({
    _id:{
        type:String,
        default:shortid.generate,
        unique:true
    },
//    登陆的人
    author_id:{
        type:String,
        ref:'Master'
    },
//    当前的商品
    good_id:{
        type:String,
        ref:'Goods'
    },
//    被@的人
    target_id:{
        type:String,
        ref:'Master'
    },
//    创建时间
    create_time:{
        type:Date,
        default:Date.now
    },
//    消息通知类型
    atType:{
        type:String
    },
//    回复的id
    reply_id:{
        type:String,
        ref:'Reply'
    },
//    是否已读
    has_read:{
        type:Boolean,
        default:false
    }
})

MessageSchema.statics = {
    // 获取未读消息的个数
    getNoReadCounts:(id, callback) =>{
        Message.find({'target_id':id, has_read:false}).count( (err, count) =>{
            if(err){
                callback(err);
            }else {
                callback(null, count);
            }
        })
    },
//  通过被@的人的id找到其通知消息
    getMessagesByName:(id,callback)=>{
        console.log(id);
        Message.find({'target_id':id}).populate('target_id author_id good_id').then((messages)=>{
            callback(null, messages);
        }).catch( (err) =>{
            callback(err);
        })
    },
//    更新一条已读
    getMessageById:(id,callback)=>{
        Message.findOne({'_id':id}).then((message)=>{
            callback(null, message);
        }).catch( (err) =>{
            callback(err);
        })
    }

}


const Message = mongoose.model('Message',MessageSchema);
module.exports = Message