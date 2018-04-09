'use strict';

/**
 * /router/admin/admin.js
 */

module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.admin.admin.loginPage);//登陆
  router.get('/login', controller.admin.admin.login);//登陆接口
  router.get('/admin/index.html', controller.admin.admin.indexPage);//首页
  router.get('/admin/main.html',controller.admin.admin.mainPage);   //首页面板页面
  router.get('/admin/navMenu', controller.admin.admin.navMenu);//左侧导航菜单
};
