/**
 * Created by Administrator on 2017/11/4.
 */
const express = require('express');
const router = express.Router();
const Goods = require('../models/goods');
var db = require('./../models/db');
const multer = require('multer');
//发布处理
var picture = [];
var storage = multer.diskStorage({
//    文件存储的路径
    destination:function (req,file,cb) {
        cb(null,'./public/images')
    },
//    文件的名称设置
    filename:function (req,file,cb) {
        var suffix = file.mimetype.split('/')[1];
        var fileName = file.fieldname+'-'+Date.now()+"."+suffix;
        picture.push(fileName);
        cb(null,fileName);
    }
})
//通过multer处理当前文件的存储
var upload = multer({storage:storage});

router.post("/publish",upload.array("img"),function (req,res,next) {
    console.log(req.body);
    console.log('---------------------------');
    let name = req.body.name;
    let category = req.body.category;
    let price = req.body.price;
    let intro = req.body.intro;
    let discounts = req.body.discounts;
    let promotion = req.body.promotion;
    let author = req.body.author;
    req.body.photo = picture;
    // 生成实例化数据
    let newObj = new Goods(req.body);
    // 存储商品数据
    newObj.save();
    picture = [];
    res.json({error:0,data:req.body});
})

//获取所有商品信息
// router.post("/list",function (req,res,next) {
//     Goods.find().then( (good)=>{
//         console.log(good);
//         res.json({error:0,data:good});
//     }).catch((err)=>{
//         console.log(err);
//     })
// })

//下拉加载
router.get('/good',function (req,res,next) {
    Goods.find().limit(2).skip(req.query.page * 2).exec(function (err,good) {
        if(err){
            return res.end(err);
        }
        res.json({error:0,data:good});
    })
})

//获取相对应的标签的商品
router.post("/cate",function (req,res,next) {
    // console.log(req.body);
    const category = req.body.category;
    Goods.find({category:category}).then( (good)=>{
        res.json({error:0,data:good});
    }).catch((err)=>{
        console.log(err);
    })
})


//获取详情商品信息
router.post("/details",function (req,res,next) {
    console.log(req.body._id);
    Goods.findOne({_id:req.body._id}).then( (data)=>{
        res.json({error:0,data:data});
    }).catch( (err)=>{
        console.log(err);
    })
})


//商品删除
router.post('/remove', function (req,res,next) {
    console.log(req.body._id);
    const _id = req.body._id;
    Goods.findOneAndRemove({_id:_id}).then( (result)=>{
        console.log(result);
        res.json({error:0,message:'删除成功'});
    }).catch( (err)=>{
        console.log(err);
    })
})

//商品编辑
router.post('/edit', function (req,res,next) {
    // console.log(req.body.good);
    const item = req.body.good;
    const _id = item._id;
    Goods.getGoodsById(_id,(err,good)=>{
        if(err){
            return res.end(err);
        }
        good.name = item.name;
        good.category = item.category;
        good.price = item.price;
        good.intro = item.intro;
        good.discounts = item.discounts;
        good.promotion = item.promotion;
        good.photo = item.photo;
        console.log(good);
        good.save();
       res.json({error:0,message:'编辑成功'})
})
})


//搜索
router.post("/search",function (req,res,next) {
    var hunt = req.body.hunt;
    var reg = RegExp(hunt,'i');
    console.log(hunt);
    Goods.find({'name':reg}).exec(function (err,good) {
        if(err){
            return res.end(err);
        }
        console.log(good);
        res.json({error:0,goods:good});
    })
})

//升序
router.post("/sheng",function (req,res,next) {
    var hunt = req.body.hunt;
    var reg = RegExp(hunt,'i');
    Goods.find({'name':reg}).sort({'price':1}).exec(function (err,good) {
        if(err){
            return res.end(err);
        }
        console.log(good);
        res.json({error:0,goods:good});
    })
})

//降序
router.post("/jiang",function (req,res,next) {
    var hunt = req.body.hunt;
    var reg = RegExp(hunt,'i');
    Goods.find({'name':reg}).sort({'price':-1}).exec(function (err,good) {
        if(err){
            return res.end(err);
        }
        console.log(good)
        res.json({error:0,goods:good});
    })
})

//过滤器（找到所有）
router.post('/findall',function (req,res,next) {
    var hunt = req.body.hunt;
    var reg = RegExp(hunt,'i');
    Goods.find({'name':reg}).exec(function (err,good) {
        if(err){
            return res.end(err);
        }
        console.log(good)
        res.json({error:0,goods:good});
    })
})

//点赞
router.post('/zan',function (req,res,next) {
    const good_id = req.body._id;
    Goods.getGoodsById(good_id,(err,good)=>{
        if(err){
            return res.end(err);
        }
        good.be_liked++;
        good.save()
        res.json({error:0,data:good})
    })
})


module.exports = router;
