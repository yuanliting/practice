'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    await this.ctx.render('../view/index.html',{ title: '首页' });
  }
}

module.exports = HomeController;
