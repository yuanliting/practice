'use strict';

// had enabled by egg
// exports.static = true;
exports.static = {
    enable: true,
  };
  
//开启视图插件
    exports.nunjucks = {
        enable: true,
        package: 'egg-view-nunjucks'
    };
//开启数据库插件
  exports.mongoose = {
        enable: true,
        package: 'egg-mongoose',
  };

//开启跨域插件
    exports.cors = {
        enable: true,
        package: 'egg-cors',
    };