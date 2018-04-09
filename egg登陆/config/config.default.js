'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_yuan$$$$';
  
  // add your config here
  config.middleware = [];

   //关闭csrf安全
   exports.security = {
    csrf: {
      enable: false,
    },
  };
  
  //视图配置
  config.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.nj': 'nunjucks',
    },
  }

  //数据库配置
  config.mongoose = {
     url: 'mongodb://127.0.0.1/beauty-store',
    //url:process.env.MONGODB || "mongodb://bto:bto100@10.3.232.158:27017/onegene_mall" ,
    options: {}
  };

   //后台管理左侧导航菜单
   config.navMenu = {
    menus:[
     
    ]
  };

  return config;
};
