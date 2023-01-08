/*
* @Author: elex
* @Date:   2023-01-08 15:48:30
* @Last Modified by:   elex
* @Last Modified time: 2023-01-08 16:31:24
*/
'use strict';
var path = require('path');
var fs = require('fs');

function onBeforeBuildFinish (options, callback) {
    Editor.log('Building ' + options.platform + ' to ' + options.dest); // 你可以在控制台输出点什么

    var mainJsPath = path.join(options.dest, 'main.js');  // 获取发布目录下的 main.js 所在路径
    var script = fs.readFileSync(mainJsPath, 'utf8');     // 读取构建好的 main.js
    // script += '\n' + 'window.myID = "01234567";';         // 添加一点脚本到
    // fs.writeFileSync(mainJsPath, script);                 // 保存 main.js

    callback();
}
module.exports = {
  load () {
    // 当 package 被正确加载的时候执行
    Editor.Builder.on('before-change-files', onBeforeBuildFinish);
  },

  unload () {
    // 当 package 被正确卸载的时候执行
  },

  messages: {
    'say-hello' () {
      Editor.log('Hello World!');
    }
  },
};