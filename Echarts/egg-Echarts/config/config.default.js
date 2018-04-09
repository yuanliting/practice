'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_yuan$$$$';

  // add your config here
  config.middleware = [];

   //视图配置
   config.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.nj': 'nunjucks'
    }
  };
  //关闭csrf安全
  config.security = {
    csrf: {
      enable: false,
    },
  };

  return config;
};
