/**
 * Created by Administrator on 2017/11/13.
 */
var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Reply = require('./../models/reply');
const Goods = require('./../models/goods');
const Master = require('./../models/master');
const saveMessage = require('./../routes/message');
const Message = require('./../models/message');
var db = require('./../models/db');
const validator = require('validator');
const setting = require('../setting');
const multer = require('multer');

// //回复的图片
// var picture = [];
// var storage = multer.diskStorage({
// //    文件存储的路径
//     destination:function (req,file,cb) {
//         cb(null,'./public/replyimg')
//     },
// //    文件的名称设置
//     filename:function (req,file,cb) {
//         var suffix = file.mimetype.split('/')[1];
//         var fileName = file.fieldname+'-'+Date.now()+"."+suffix;
//         picture.push(fileName);
//         cb(null,fileName);
//     }
// })
// //通过multer处理当前文件的存储
// var upload = multer({storage:storage});
//
// router.post("/evaluate",upload.array("img"),function (req,res,next) {
//     console.log(req.body);
//     console.log('---------------------------');
//     let content = req.body.content;
//     let _id = req.body.good_id;
//     let author = req.body.author;
//     req.body.reply_photo = picture;
//     Goods.getGoodsById(_id,(err,good)=>{
//         if(err){
//             return res.end(err);
//         }
//         let reply = new Reply();
//         reply.content = content;
//         reply.good_id = id;
//         reply.author = author;
//         // 存储商品数据
//         Reply.save().then( (reply)=>{
//             return reply;
//         }).then( (reply)=>{
//             //当前用户的积分+2  已评价变为未评价
//             Master.getMasterById(req.session.master._id,(err,master)=>{
//                 if(err){
//                     return res.end(err);
//                 }
//                 master.score += 2;
//                 master.allList.forEach(function (data) {
//                     if( data._id = _id ){
//                         data.has_read = true;
//                         console.log(master);
//                     }
//                 })
//                 var masters = new Master(master);
//                 masters.save().then((res)=>{
//                     console.log(res);
//                 }).catch((err)=>{
//                     console.log(err);
//                 })
//                 picture = [];
//                 req.session.master = masters;
//                 res.json({error:0,master:master});
//             })
//             res.json({error:0,data:req.body});
//         }).catch((err)=>{
//             console.log(err);
//         })
//     })
//
// })



router.post('/evaluate',function (req,res,next) {
    // console.log(req.body);
    const content = req.body.content;
    const id = req.body.good_id;
    Goods.getGoodsById(id,(err,good)=>{
        if(err){
            return res.end(err);
        }
        let reply = new Reply();
        reply.content = content;
        reply.good_id = id;
        reply.author = req.session.master._id;
        reply.save().then( (reply)=>{
            console.log(reply);
            return reply;
        }).then( (reply)=>{
        //当前用户的积分+2  已评价变为未评价
            Master.getMasterById(req.session.master._id,(err,master)=>{
                if(err){
                    return res.end(err);
                }
                master.score += 2;
                master.allList.forEach(function (data) {
                    if( data._id == id ){
                        // console.log(data._id);
                        // console.log(id);
                        data.has_read = true;
                        // console.log(master);
                    }
                })
                var masters = new Master(master);
                masters.save().then((res)=>{
                    // console.log(res);
                }).catch((err)=>{
                    console.log(err);
                })
                req.session.master = masters;
                res.json({error:0,master:master});
            })
            return reply;
        }).then((reply)=>{
        // 在回复的同时给商家发送消息，通知商家 卖家评价了商品
            console.log('--------------消息通知---------------------')
            console.log(req.session.master.name.toString());
            console.log(good.author);
            if(req.session.master.name.toString() != good.author){
                console.log('--------------进来了---------------------')
                saveMessage.saveReplyMessage(good._id,req.session.master._id,good.author, reply._id);
            }
            return reply;
        }).catch((err)=>{
            console.log(err);
        })
    })
})

//获取回复内容
router.post("/revert",function (req,res,next) {
    // console.log(req.body);
    const good_id = req.body._id;
    // console.log(good_id);
    Reply.getReplyByGoodsId(good_id,(err,replys)=>{
        if(err){
            return res.end(err);
        }
        res.json({error:0,data:replys});
    })
})

//通知消息
router.post('/message',function (req,res,next) {
    let id  = req.body.target_id;
    console.log(id);
    Message.getMessagesByName(id,(err,meaasges)=>{
        if(err){
            return res.end(err);
        }
        console.log(meaasges);
        res.json({error:0,data:meaasges})
    })
})

//更新一条未读为已读
router.post('/update',function (req,res,next) {
    let _id = req.body.msg_id;
    Message.getMessageById(_id,(err,message)=>{
        if(err){
            return res.end(err);
        }
        // console.log(message);
        message.has_read = true;
        message.save();
        req.session.message = message;
        res.json({error:0,data:message});
    })
})

//更新所有消息
router.post('/updateAll',function (req,res,next) {
    console.log(req.body);
    let target_id = req.body.target_id;
    Message.getMessagesByName(target_id,(err,noReads)=>{
        if(err){
            return res.end(err);
        }
        noReads.forEach( (message,index)=>{
            message.has_read = true;
            message.save();
        })
        // noReads.save();
        req.session.message = noReads;
        res.json({error:0,data:noReads});
    })
})



//未读消息个数
router.post('/noread',function (req,res,next) {
    console.log(req.body);
    let target_id = req.body.target_id;
    Message.getNoReadCounts(target_id,(err,count)=>{
        if(err){
            return res.end(err);
        }
        console.log(count);
        req.session.count = count;
        res.json({error:0,data:count});
    })
})

module.exports = router;




