
  'use strict';

const Controller = require('egg').Controller;

class AdminController extends Controller {
  async loginPage() {
    await this.ctx.render('../view/login.nj',{title:'登录'});
   }
  async indexPage() {
    await this.ctx.render('../view/index.nj',{title:'首页'});
   }
  async mainPage() {
    await this.ctx.render('../view/parts/main.nj',{ title: '主面板' });
  }
  //获取左侧导航菜单列表
  async navMenu() {
    this.ctx.body = { code: 200,msg: 'success',data: this.config.navMenu }
  }
   //管理员登陆
   async login() {
    let data = this.ctx.query;
    let userName =data.userName;
    let password = data.password;
    let admin = await this.ctx.model.Admin.findOne({'userName':userName});
    if(!admin){
      this.ctx.body = { code: 200,msg: '该账号不存在',rel:false};
    }else{
      if(password == admin.password){
        this.ctx.body = { code: 200,msg: 'success',rel:true};
      }else{
        this.ctx.body = { code: 200,msg: '密码错误',rel:false};
      }
    }
  }
}

module.exports = AdminController;
