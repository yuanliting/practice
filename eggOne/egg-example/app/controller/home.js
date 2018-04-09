'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    await this.ctx.render('news/index.tpl');
  };
//   注册
  async add(){
    try {
        let query = this.ctx.request.body;
        let name = query.params.name;
        let pwd = query.params.pwd;
        let admin = await this.ctx.model.Admin.findOne({name:name});
      if(!admin){
          console.log('不存在');
       let people = {
           name:name,
           pwd:pwd
       }
        let newAdmin = await this.ctx.model.Admin.create(people);
        let error;
        let message = '';
        let success = {
            error:0,
            message:'注册成功',
        }
        this.ctx.body = success;
    //    this.ctx.redirect('/login');
      }else{
        // 请去登陆
        console.log('存在');
        let successed = {
            error:1,
            message:'已注册，请登陆'
        }
        this.ctx.body = successed;
      }
     
    } catch (error) {
        throw error;
    }
  };

  async login(){
      await this.ctx.render('news/login.tpl');
  };
//   登陆
  async loginS(){
      try{
        let getUserInfo = this.ctx.request.body.params;
        let nameL = getUserInfo.name;
        let pwdL = getUserInfo.pwd;
        let error;
        let message = '';
        let fail;
        let adminL = await this.ctx.model.Admin.findOne({name:nameL});
        if(adminL){
        //    验证用户
                 console.log('有该用户');
                 console.log(pwdL);
            if(adminL.pwd != pwdL){
              let  success = {
                    error:1,
                    message:'密码错误'
                }
                this.ctx.body = success;
            }else{
              let  successed = {
                    error:0,
                    message:'登陆成功'
                }
                let adminName = `${nameL}$$$$`;
                this.ctx.cookies.set('adminName',adminName);
                  console.log(this.ctx.cookies);
                this.ctx.body = successed;
             }
           }else{
        //     //   提醒用户你未注册，请去登陆 
            console.log('没有');
            let without = {
                fail:1,
                message:'未注册'
            }
            this.ctx.body = without;
           }
    } catch (error) {
        throw error;
    }
  };
  
  async user(){
    await this.ctx.render('news/user.tpl');
  };
// 首页
  async find(){ 
    try {
        let users = await this.ctx.model.User.find({});
        let error;
        let message = ''; 
        if(users.length == 0){
            console.log('没有用户');
            let userO = {
                error:1,
                message:'没有用户，请去添加'
            }
            this.ctx.body = userO; 
        }else{
            console.log(users.length);
            let userN = {
                error: 0,
                message:users
            }
            this.ctx.body = userN; 
        }
    } catch (error) {
        throw error;
    }
  };

  async addUser(){
    await this.ctx.render('news/adduser.tpl');   
  };

  async addUserInfo(){
      try {
        let getUserInfo = this.ctx.request.body.params;
        let name = getUserInfo.name;
        let phoneNumber = `${getUserInfo.phoneNumber}.0`;
        let error;
        let message = '';
        let user =  await this.ctx.model.User.find({name:name,phoneNumber:phoneNumber});
        console.log(user);
        if( user.length > 0 ){
            let successed = {
                error:1,
                message:'已经添加过该用户'
            }
            this.ctx.body = successed;
        }else{
            let newUser = await this.ctx.model.User.create(getUserInfo);
            let success = {
                error:0,
                message:'添加用户信息成功'
            }
            this.ctx.body = success;
        }
      } catch (error) {
        throw error;   
      }
  };
  
  async removeUser(){
      try {
        let id = this.ctx.request.body.params.id;
       await this.ctx.model.User.remove({_id:id});
       this.ctx.body = '删除成功';
      } catch (error) {
          throw error;
      }
  };

  async edit(){
    await this.ctx.render('news/editUser.tpl'); 
  };

  async editUser(){
    try {
      let id = this.ctx.request.body.params.id;
      let user = await this.ctx.model.User.findOne({_id:id});    
      this.ctx.body = user;
    } catch (error) {
        throw error;
    }
};

    async editSend(){
        try {
            let param = this.ctx.request.body.params;
            let id = param.id;
            let user = await this.ctx.model.User.findOne({_id:id}); 
            let name = param.name;  
            let age = param.age;
            let phoneNumber = param.phoneNumber;
            let userN = {
                name:name,
                age:age,
                phoneNumber:phoneNumber
            }
            await this.ctx.model.User.update(user,userN); 
            this.ctx.body = '编辑成功';  
        } catch (error) {
            throw error; 
        }
    };

    async logout(){
        this.ctx.cookies.set(this.ctx.cookies.adminName,null);
        this.ctx.body = '退出成功';
    };

    async search(){
       try {
        let param = this.ctx.request.body.params;
        let name = param.name;
        let error;
        let message = '';
        let users = await this.ctx.model.User.find(); 
        let user = await this.ctx.model.User.find({name:{$regex:name}});
           if(user){
            let success = {
                error:0,
                message:user
            }
            this.ctx.body = success;
           }else{
             let fail = {
                 error:1,
                 message:'没有与之相关的用户'   
                 }
           this.ctx.body = fail; 
           }
       } catch (error) {
        throw error;   
       }
       
    }

}

module.exports = HomeController;
