// app/router/index.js
module.exports = app => {
    const { router, controller } = app;
    router.get('/',                 controller.admin.index.indexPage                );   //首页页面
};