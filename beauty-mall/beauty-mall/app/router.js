'use strict';
const proxy = require('koa-proxy');
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
   if(app.config.env == 'front') {
     app.get('/api/*', proxy({
       host: process.env.PORT || 3000,
       requestOptions: function(request, opt){
         return opt;
       }
     }));
 
   } else {
 
     app.get('/api/beauty-mall/index.html','home.index');//首页需要的接口
 
   }
 };
