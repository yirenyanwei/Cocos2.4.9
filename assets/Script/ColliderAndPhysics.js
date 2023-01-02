// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        boxCollider: cc.BoxCollider,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
    onEnable(){
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this)
    },
    onDisable(){
        this.node.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this)
    },

    start () {
        this.collisionManager = cc.director.getCollisionManager();
        //打开检测系统
        this.collisionManager.enabled = true;
        //开启debug绘制
        this.collisionManager.enabledDebugDraw = true;
        //碰撞包围盒
        // this.collisionManager.enabledDrawBoundingBox = true;

    },

    // update (dt) {},
    onTouchStart(touch, event)
    {
        //世界坐标
        var touchLoc = touch.getLocation();
        if(cc.Intersection.pointInPolygon(touchLoc, this.boxCollider.world.points)){
            cc.log('hit boxCollider')
        }

        var nodePos = cc.v2(0, 0)
        this.node.convertToNodeSpaceAR(touchLoc, nodePos)
        this.boxCollider.node.position = nodePos
    }
});
