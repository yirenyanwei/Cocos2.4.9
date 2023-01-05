// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
var encrypt = require('encryptjs')
var secretkey = 'open_sesame' //秘钥
cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.testStorage()
    },

    // update (dt) {},
    testStorage()
    {
        var obj = {name:'yanwei', age:18}
        //存储
        // cc.sys.localStorage.setItem('userData', JSON.stringify(obj))
        //获取
        var userData = cc.sys.localStorage.getItem('userData')
        userData = JSON.parse(userData)
        cc.log('userData--', userData)

        //移除键值对
        // cc.sys.localStorage.removeItem('myKey')
        //清空数据
        // cc.sys.localStorage.clear()

        //加密、解密
        var dataString = 'yanwei'
        var encryptedStr = encrypt.encrypt(dataString, secretkey, 256)
        cc.log('encrypted--', encryptedStr) 
        var decryptedStr = encrypt.decrypt(encryptedStr, secretkey, 256)
        cc.log('decrypted--', decryptedStr)
    }
});
