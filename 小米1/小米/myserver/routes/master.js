/**
 * Created by Administrator on 2017/11/4.
 */
var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Master = require('./../models/master');
const Goods = require('./../models/goods');
var db = require('./../models/db');
const validator = require('validator');
const setting = require('../setting');

const multer = require('multer');
//发布处理
var picture = [];
var storage = multer.diskStorage({
//    文件存储的路径
    destination:function (req,file,cb) {
        cb(null,'./public/userimg')
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

router.post("/publish",upload.single("img"),function (req,res,next) {
    console.log(req.body);
    console.log('---------------------------');
    const _id = req.session.master._id;
    Master.getMasterById(_id,(err,master)=> {
        if (err) {
            return res.end(err);
        }
        master.nickname = req.body.nickname;
        master.motto = req.body.motto;
        req.body.avatar = picture;
        master.avatar = picture;
        picture = [];
        master.save();
        req.session.master = master;
        res.json({error: 0, data: req.session.master})
    })
})


// 判断用户是否已经登陆
router.get("/denglu",function (req,res,next) {
    // console.log(req.body);
    // console.log(req.session);
    if(req.session.master){
        res.json({error:0,master:req.session.master})
    }else{
        res.json({error:1,message:'退出成功'})
    }
})


// 注册处理
router.post("/register",function (req,res,next) {
    // console.log(req.body);

//    服务端进行数据验证
    let name = req.body.name;
    let password = req.body.password;
    let tel = req.body.phone;

//    错误数据
    let error = '';

    if( !validator.matches(name,/^[a-zA-Z][a-zA-Z0-9_]{4,11}$/, 'g') ){
        error = '用户名不合法，以字母开头，数字、字母、_';
        // res.json({error:1,message:'用户名不合法，以字母开头，数字、字母、_'})
    }
    if( !validator.matches(password, /(?!^\\d+$)(?!^[a-zA-Z]+$)(?!^[_#@]+$).{5,11}/, 'g') ){
        error = '密码不合法，长度为5-11';
        // res.json({error:1,message:'密码不合法，长度为5-11'})
    }
    if( !validator.matches(tel,/^[0-9][0-9]{10}$/) ){
        error = '手机号码输入有误，请检查后重新输入'
        // res.json({error:1,message:'手机号码输入有误，请检查后重新输入'})
    }
    if(error){
        return res.end(error);
    }

//    判断用户是否存在
    Master.findOne().or([{name:name},{tel:tel}]).then( (master) =>{
        if(master){
            return res.end('用户名已存在');
        }
    //    存储数据
    //    密码加密
        let newPsd = db.encrypt(password, setting.PSDkey);
        req.body.password = newPsd;
        console.log(req.body);
        //用户存储
        db.addOne(Master, req, res, 'success');

    }).catch((error) => {
        // res.end(error);
        console.log(error);
    })
})


// 登录处理
router.post("/login",function (req,res,next) {
    // console.log(req.body);
    let name = req.body.name;
    let password = req.body.password;
    // let getName;
    // let getPhone;
    let error = '';

    if( !validator.matches(name,/^[a-zA-Z][a-zA-Z0-9_]{4,11}$/, 'g') ){
        error = '用户名不合法，以字母开头，数字、字母、_';
        // res.json({error:1,message:'用户名不合法，以字母开头，数字、字母、_'})
    }
    if( !validator.matches(password, /(?!^\\d+$)(?!^[a-zA-Z]+$)(?!^[_#@]+$).{5,11}/, 'g') ){
        error = '密码不合法，长度为5-11';
        // res.json({error:1,message:'密码不合法，长度为5-11'})
    }
    if(error){
        return res.end(error);
    }

//    判断用户是否存在
    Master.getMasterByName(name,(err,master)=>{
        if(err){
            return res.end(err);
        }
        if(!master){
            return res.end('用户不存在，请注册...');
        }
        let newPsd = db.encrypt(password, setting.PSDkey);
        if( newPsd !== master.password ){
            return res.end('密码不相等，请重新输入');
        }
        req.session.master = master;
        res.json({error:0,message:'登陆成功',data:req.session.master});
    })
})

// 退出处理
router.post("/logout",function (req,res,next) {
    // req.session.destroy();
    // res.redirect("/");
    req.session.master = null;
    res.json({error:0,message:'退出成功',data:req.session.master});
})


//加入购物车
router.post("/add",function (req,res,next) {
    console.log(req.body);
    let _id = req.body._id;
    let good_id = req.body.good_id;
    let isHave = false;
    // 加入购物车
    Goods.getGoodsById(good_id,(err,good)=>{
        if(err){
            return res.end(err);
        }
        Master.getMasterById(_id,(err,master)=>{
            if(err){
                return res.end(err);
            }
            // console.log(good);
            // console.log(master);
            master.cartList.forEach(function (item,ins) {
                if( good_id == item._id ){
                    console.log('进来了没');
                    item.num = item.num - 0 + 1;
                    isHave = true;
                }
            })
            if( !isHave ){
                master.cartList.push(good);
                console.log('保存')
            }
            // master.save();
            var masters = new Master(master);
            masters.save().then((res)=>{
                console.log(res);
            }).catch((err)=>{
                console.log(err);
            })
            req.session.master = masters;
            res.json({error:0,message:'添加成功'});
        })
    })

})


//购物车（减）
router.post("/min",function (req,res,next) {
    let _id = req.body._id;
    let good_id = req.body.good_id;

    Master.getMasterById(_id,(err,master)=> {
        if (err) {
            return res.end(err);
        }
        master.cartList.forEach(function (item,ins) {
            console.log(item);
            if( good_id == item._id ) {
                item.num--;
            }
        })
        var masters = new Master(master);
        masters.save().then((res)=>{
            console.log(res);
        }).catch((err)=>{
            console.log(err);
        })
        req.session.master = masters;
        res.json({error:0,data:master})
    })
})

//购物车（加）
router.post("/max",function (req,res,next) {
    let _id = req.body._id;
    let good_id = req.body.good_id;
    Master.getMasterById(_id,(err,master)=> {
        if (err) {
            return res.end(err);
        }
        master.cartList.forEach(function (item,ins) {
            console.log(item);
            if( good_id == item._id ) {
                item.num++;
            }
        })
        var masters = new Master(master);
        masters.save().then((res)=>{
            // console.log(res);
        }).catch((err)=>{
            console.log(err);
        })
        req.session.master = masters;
        res.json({error:0,data:master})
    })
})

//购物车（删）
router.post("/shopRemove",function (req,res,next) {
    let _id = req.body._id;
    let good_id = req.body.good_id;
    Master.getMasterById(_id,(err,master)=> {
        if (err) {
            return res.end(err);
        }
        master.cartList.forEach(function (item,ins) {
            console.log(item);
            if( good_id == item._id ) {
                var index = master.cartList.indexOf(item);
                master.cartList.splice(index,1);
                console.log(item.num);
            }
        })
        var masters = new Master(master);
        masters.save().then((res)=>{
            console.log(res);
        }).catch((err)=>{
            console.log(err);
        })
        req.session.master = masters;
        res.json({error:0,data:master})
    })
})

//添加新地址
router.post("/addRess",function (req,res,next) {
    let _id = req.body._id;
    let addList = req.body.addList;
    console.log(addList);
    Master.getMasterById(_id,(err,master)=>{
        if (err) {
            return res.end(err);
        }
        if( !addList.username ){
            res.json({error:1,message:'收货人填写错误'})
        }
        if( !addList.tel ){
            res.json({error:1,message:'手机号码填写错误'})
        }
        if( !addList.address ){
            res.json({error:1,message:'地区填写错误'})
        }
        if( !addList.streetname ){
            res.json({error:1,message:'详细地址填写错误'})
        }
        master.addressList.push(addList);
        master.addList = master.addressList[0];
        console.log(master);
        var masters = new Master(master);
        masters.save().then((res)=>{
            console.log(res);
        }).catch((err)=>{
            console.log(err);
        })
        req.session.master = masters;
        res.json({error:0,data:master,message:'地址添加成功'})
    })
})

//地址（删除）
router.post("/addRemove",function (req,res,next) {
    let _id = req.body._id;
    let index = req.body.index;
    console.log(index);
    Master.getMasterById(_id,(err,master)=>{
        if(err){
            return res.end(err);
        }
        master.addressList.splice(index,1);
        var masters = new Master(master);
        masters.save().then((res)=>{
            console.log(res);
        }).catch((err)=>{
            console.log(err);
        })
        req.session.master = masters;
        res.json({error:0,data:master})
    })
})

//地址（编辑）
router.post('/addEdit',function (req,res,next) {
    // console.log(req.body);
    let _id = req.body._id;
    console.log(_id);
    let ins = req.body.ins;
    let item = req.body.datas
    Master.getMasterById(_id,(err,master)=>{
        if(err){
            return res.end(err);
        }
        console.log(ins);
        // console.log(master.addressList[index]);
        master.addressList[ins].username = item.username;
        master.addressList[ins].tel = item.tel;
        master.addressList[ins].address = item.address;
        master.addressList[ins].streetname = item.streetname;
        var masters = new Master(master);
        masters.save().then((res)=>{
            console.log(res);
        }).catch((err)=>{
            console.log(err);
        })
        req.session.master = masters;
        res.json({error:0,data:req.session.master})
    })
})

//订单地址
router.post('/choose',function (req,res,next) {
    // console.log(req.body);
    let _id = req.body._id;
    let ins = req.body.ins;
    Master.getMasterById(_id,(err,master)=>{
        if(err){
            return res.end(err);
        }
        master.addList = [];
        master.addList = master.addressList[ins];
        console.log('11111111111111111111111111111111111111111111')
        console.log(master.addList);
        var masters = new Master(master);
        masters.save().then((res)=>{
            console.log(res);
        }).catch((err)=>{
            console.log(err);
        })
        req.session.master = masters;
        res.json({error:0,master:req.session.master})
    })
})

//订单结算
router.post('/payment',function (req,res,next) {
    let _id = req.body._id;
    Master.getMasterById(_id,(err,master)=>{
        if(err){
            return res.end(err);
        }
        master.orderList = master.noreadList;
        master.noreadList = [];
        // console.log(master);
        var masters = new Master(master);
        masters.save().then((res)=>{
            console.log(res);
        }).catch((err)=>{
            console.log(err);
        })
        req.session.master = masters;
        if( req.session.master.addList.length == 0 ){
            res.json({error:1,message:'请添加地址'})
        }else{
            res.json({error:0,data:req.session.master})
        }
    })
})

//取消订单
router.post('/cancel',function (req,res,next) {
    let _id = req.body._id;
    Master.getMasterById(_id,(err,master)=>{
        if(err){
            return res.end(err);
        }
        master.orderList = [];
        var masters = new Master(master);
        masters.save().then((res)=>{
            console.log(res);
        }).catch((err)=>{
            console.log(err);
        })
        req.session.master = masters;
        res.json({error:0,data:master})
    })
})

//付款订单
router.post('/fukuan',function (req,res,next) {
    let _id = req.body._id;
    Master.getMasterById(_id,(err,master)=>{
        if(err){
            return res.end(err);
        }
        master.orderList.forEach(function (data) {
            master.waitList.push(data);
            console.log(master.waitList);
        })
        // master.waitList.push(master.orderList);
        master.orderList = [];
        var masters = new Master(master);
        masters.save().then((res)=>{
            console.log(res);
        }).catch((err)=>{
            console.log(err);
        })
        req.session.master = masters;
        res.json({error:0,data:master})
    })
})

//待收货
router.post('/wait',function (req,res,next) {
    console.log(req.body);
    var ins = req.body.ins;
    var _id = req.session.master._id;
    console.log(_id);
    Master.getMasterById(_id,(err,master)=>{
        if(err){
            return res.end(err);
        }
        console.log(master.waitList[ins]);
        master.allList.push(master.waitList[ins]);
        master.waitList.splice(ins,1);
        var masters = new Master(master);
        masters.save().then((res)=>{
            console.log(res);
        }).catch((err)=>{
            console.log(err);
        })
        req.session.master = masters;
        res.json({error:0,data:master})
    })
})

//收藏
router.post('/shou',function (req,res,next) {
    let good_id = req.body._id;
    let _id = req.session.master._id;
    console.log(_id);
    console.log(good_id);
    var isShou = false;
    Master.getMasterById(_id,(err,master)=>{
        if(err){
            return res.end(err);
        }
        Goods.getGoodsById(good_id,(err,good)=>{
            if(err){
                return res.end(err);
            }
            master.readList.forEach(function (data,index) {
                if( good_id == data._id ){
                    isShou = true;
                    console.log('111111111111111111111111111111')
                    master.readList.splice(index,1);
                    var masterz = new Master(master);
                    masterz.save().then((res)=>{
                        console.log(res);
                    }).catch((err)=>{
                        console.log(err);
                    })
                    req.session.master = masterz;
                    res.json({error:1,message:'取消收藏',data:req.session.master});
                }
            })
            if(!isShou){
                master.readList.push(good);
            }
            var masters = new Master(master);
            masters.save().then((res)=>{
                console.log(res);
            }).catch((err)=>{
                console.log(err);
            })
            req.session.master = masters;
            res.json({error:0,message:'收藏成功',data:req.session.master});
        })
    })
})

//结算
router.post('/jie',function (req,res,next) {
    var arr = req.body.arr;
    console.log(arr);
    Master.getMasterById(req.session.master._id,(err,master)=>{
        if(err){
            return res.end(err);
        }
        arr.forEach(function (data) {
            master.noreadList.push(data);
            master.cartList.forEach(function (cart,ins) {
                if(cart._id == data._id){
                    master.cartList.splice(ins,1);
                }
            })
        })
        arr = [];
        master.save();
        req.session.master = master;
        res.json({error:0,data:master})
    })

    // var masters = new Master(master);
    // masters.save().then((res)=>{
    //     console.log(res);
    // }).catch((err)=>{
    //     console.log(err);
    // })

})


module.exports = router;