// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    // update (dt) {},
    //碰撞相关
    onCollisionEnter(other, self)
    {
        //碰撞开始
        cc.log('collisionEnter-', other.name, self.name)
    },
    onCollisionStay(other, self)
    {
        //碰撞中
        cc.log('collisionStay-', other.name, self.name)
    },
    onCollisionExit(other, self)
    {
        //碰撞结束
        cc.log('collisionExit-', other.name, self.name)
    }
});
