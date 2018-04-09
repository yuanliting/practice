'use strict';

const Controller = require('egg').Controller;

class AdminController extends Controller {

  async indexPage(ctx) {
    await this.ctx.render('../view/index.nj',{ title: '首页' });
  }
  
}

module.exports = AdminController;
