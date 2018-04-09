/**
 * Created by Administrator on 2017/11/15.
 */
const Message = require('../models/message');
const saveMessage = {
    // 谁给你的文章点赞了
    saveReplyAtMessage:(good_id, author_id, target_id, reply_id) =>{
        let message = new Message();
        message.atType = 'at';
        message.good_id = good_id;
        message.author_id = author_id;
        message.target_id = target_id;
        message.reply_id = reply_id;
        //  保存
        message.save((msg) =>{
            console.log('点赞成功');
        })
    },
    // 评论商品（发送给管理员的消息）
    saveReplyMessage:(good_id, author_id,target_id , reply_id) =>{
        let message = new Message();
        message.atType = 'reply';
        message.good_id = good_id;
        message.author_id = author_id;
        message.target_id = target_id;
        message.reply_id = reply_id;
        //  保存
        message.save((msg) =>{
            console.log('评价成功');
        })
    }
}

module.exports = saveMessage