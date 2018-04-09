'use strict';

module.exports = app => {
  const config = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = app.name + '_mall$$$';

  config.static = {
    prefix: '/static/',
    dir: app.baseDir + '/static'
  };

  // add your config here
  config.middleware = ['client'];

  config.global = {
    appId:'wx5dedab302d5ac1a5',//微信公众账号ID
    APPSecret:'7d934e6ed6c9dc52d618e70bc28c1090',
    MCH_ID: '1357306702',// '1364452202', // 商户号
		PartnerKey: 'OneGene518OneGeneOKOneGeneTopOne' ,// 微信商户平台API密钥
    accessToken:'', //获取到的凭证
    apiUrl: process.env.APIURL || "http://api.1genehealth.com",
    accountUrl: '',
    staticUrl: process.env.STATIC_URL || '/static',
    staticVersion: new Date().getTime(),
    fileUrl: '',
    reportUrl:'',
  };

  config.oss = {
    accessKeyId: process.env.OSS_ID || 'LTAIv5OAJPh6DQrp',
    accessSecret: process.env.OSS_Secret || 'KaCLUsFQY78KDrFQ0Fujfg3rPHeFH9',
    endpoint: process.env.OSS_endpoint || 'oss-cn-hangzhou.aliyuncs.com ',
    bucket: process.env.OSS_BUCKET || 'bto-dev-private',
  };

  //视图配置
  config.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.html': 'nunjucks',
    },
  };

  //关闭csrf安全
  config.security = {
    csrf: {
      enable: false
    }
  };

  config.mongoose = {
    clients: {
      db1: {
        url: 'mongodb://127.0.0.1:27017/beautyAdmin',
        options: {},
      },
    //  db2: {
        //url: "mongodb://bto:bto100@10.3.232.158:27017/onegene_mall",
     //   options: {},
     // },
    },
  };

  return config;
};
