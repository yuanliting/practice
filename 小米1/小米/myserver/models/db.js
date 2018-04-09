/**
 * Created by Administrator on 2017/11/3.
 */
const mongoose = require('mongoose');
const crypto = require('crypto');
const setting = require('../setting');
mongoose.Promise = global.Promise;
//连接数据库
mongoose.connect(`mongodb://${setting.host}/${setting.db}`);
//判断数据库是否连接成功
var db = mongoose.connection;
db.on('error',function () {
    console.log('数据库连接失败');
})
db.on('open',function () {
    console.log('数据库连接成功');
})

db = {
    // 增加一条新数据
    addOne:function(obj, req, res , msg){
        console.log('进入123');
        let newObj = new obj(req.body);
        newObj.save().then( (user) =>{
            // res.end(msg);
            res.json({error:0,message:'注册成功，2s后跳转到登陆',master:user});
        }).catch((err)=>{
            res.end(err);
        })
    },
    // 封装加密代码
    //加密
    encrypt : function(data,key){ // 密码加密
        let cipher = crypto.createCipher("bf",key);
        let newPsd = "";
        newPsd += cipher.update(data,"utf8","hex");
        newPsd += cipher.final("hex");
        return newPsd;
    }
}


module.exports = db;