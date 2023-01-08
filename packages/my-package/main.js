'use strict';

module.exports = {
    load () {
      // 当 package 被正确加载的时候执行
    },
  
    unload () {
      // 当 package 被正确卸载的时候执行
    },
  
    messages: {
      'foo' () {
        Editor.log('click foo');
        
      },
      'bar' () {
        Editor.log('click bar');
      },
      'open'(){
            //打开panel
        Editor.Panel.open('my-package');
      },
      'my-package:say-hello'(data){
        Editor.log('say-hello', data)
      }
    },
  };