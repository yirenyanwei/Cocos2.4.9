// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
let Global = require('Global')
cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        id: '123',
        loaded: false,
        height: 100,
        tar: null,
        target: cc.Node,
        pos: new cc.Vec2(0,0),
        ints: [cc.Integer],
        score: {
            default: 0,
            displayName: 'Score(player)',
            tooltip: 'the score of player'
        },
        _myWidth:0,
        myWidth: {
            get(){
                return this._myWidth
            },
            set(value){
                this._myWidth = value
            }
        },
        sprite:{
            default:null,
            type: cc.SpriteFrame
        },
        prefab:{
            default: null,
            type: cc.Prefab
        },
        _dt: 0,
    },
    ctor(){
        cc.log('this is ctor')
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.log('onLoad')
    },

    start () {
        cc.log('start')
        /*
        console.log('test script')
        cc.log(this.node.x, this.node.angle, this.node.scale)
        cc.log('child---')
        cc.log(this.node.getChildByName('child1'))
        cc.log(cc.find('child1', this.node))

        this.node.active = true
        cc.log(this.node.activeInHierarchy)
        //位置
        this.node.x = 100;
        this.node.setPosition(100, 100)
        this.node.setPosition(cc.v2(100, 100))
        this.node.position = cc.v2(100, 100)

        //旋转
        this.node.rotation = 90
        this.node.setRotation(90)

        //颜色
        this.node.color = cc.color(255, 0, 0)
        */


       /*
       //创建节点
        let node = new cc.Node()
        node.parent = this.node
        let spr = node.addComponent(cc.Sprite)
        spr.spriteFrame = this.sprite
        //prefab
        node = cc.instantiate(this.prefab)
        node.parent = this.node
        node.position = cc.v2(100, 100)
        */
        /*
        //加载资源
        cc.resources.load('prefabs/nianyefan', (err, prefab)=>{
            var node = cc.instantiate(prefab)
            this.node.addChild(node)
            node.position = cc.v2(-200, 200)
        })
        cc.resources.load('images/nianyefan_build', cc.SpriteFrame, (err, spriteFrame)=>{
            cc.log(spriteFrame)
            this.node.getChildByName('childSpr').getComponent(cc.Sprite).spriteFrame = spriteFrame
            //释放
            // cc.assetManager.releaseAsset(spriteFrame)
        })
        //加载图集
        cc.resources.load('images/equipmentNewUI', cc.SpriteAtlas, (err, atlas)=>{
            let spr = this.node.getChildByName('childSpr').getComponent(cc.Sprite)
            spr.spriteFrame = atlas.getSpriteFrame('equipNew_bg_01')
        })
        //批量加载
        cc.resources.loadDir('images', (err, assets)=>{
            console.log(assets)
        })
        //加载远程资源
        var remoteUrl = 'http://127.0.0.1:8088/nianyefan_build.png'
        cc.assetManager.loadRemote(remoteUrl, (err, texture)=>{
            cc.log('refCount--', texture.refCount)
            let spr = this.node.getChildByName('childSpr').getComponent(cc.Sprite)
            let spriteFrame = new cc.SpriteFrame(texture)
            spr.spriteFrame = spriteFrame
        })
        //本地资源
        // var absolutePath = '/Users/yanwei/Desktop/nianyefan_build.png'
        // cc.assetManager.loadRemote(absolutePath, (err, texture)=>{
        //     cc.log('absolute--', texture)
        // })
        //bundle
        cc.assetManager.loadBundle('testBundle', (err, bundle)=>{
            console.log('bundle--', bundle)
            bundle.load('bp_57678', cc.SpriteFrame, (err, spriteFrame)=>{
                console.log('bundleSprite--', spriteFrame)
                //销毁
                bundle.release('bp_57678', cc.SpriteFrame)
                cc.assetManager.removeBundle(bundle)
            })
        })
        */

        /**
        //缓动系统
        var obj = {scale:1, position:cc.v2(0,1), angle:0}
        cc.tween(obj)
            //内置easing函数
            .to(1, {scale:2}, {easing: 'backInOut'})
            //自定义函数
            .to(1, {position:cc.v2(100, 100)}, {easing:t=>t*t})
            //// 只对单个属性使用 easing 函数
            .to(1, {angle: {value: 90, easing:'sineOutIn'}})
            .start()
        //progress
        cc.tween(obj)
            .to(1, {scale:2}, {progress:(start, end, current, radio)=>{
                return start+(end-start)*radio
            }})
            //单个属性
            .to(1, {position:{value:cc.v2(100, 100), progress:(start, end, current, t)=>{
                //差值计算 (out: Out, a: Out, b: Out, t: number)
                return start.lerp(end, t)
            }}})
            .start()
        //插入其它缓动
        var tween_scale = cc.tween().to(1, {scale:2})
        var tween_move = cc.tween().to(1, {position:cc.v2(100, 100)})
        cc.tween(obj).then(tween_scale).then(tween_move).start()
        //并行
        cc.tween(obj)
            .parallel(
                cc.tween().to(1, {scale:2}),
                cc.tween().to(1, {position:cc.v2(100, 100)})
            )
            .call(()=>{
                cc.log('执行完毕')
            })
            .start()
        //重复执行
        cc.tween(obj)
            .repeat(3, 
                cc.tween().by(1, {scale:1})
                )
            .start()
        //延迟执行
        cc.tween(this.node)
            .delay(1)
            .to(1, {scale:2})
            .start()
         */

        /*
        //定时器
        this.schedule(this.scheduleCall, 1)
        */

    },
    onEnable(){
        cc.log('onEnable')
        this.node.on('testEvent', this.testEvent, this)
        //鼠标
        this.node.on(cc.Node.EventType.MOUSE_DOWN, this.onMouseDown, this)
        //触摸
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this)
        //键盘
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this)
    },
    onDisable(){
        this.node.off('testEvent', this.testEvent, this)
        this.node.off(cc.Node.EventType.MOUSE_DOWN, this.onMouseDown, this)
        this.node.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this)
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this)
    },
    testEvent(arg){
        cc.log('this is a event', arg)
    },
    onMouseDown(event){
        cc.log('mouseDown', event.getLocation(), event.getButton())
    },
    onTouchStart(event){
        cc.log('onTouchStart', event)
    },
    onKeyDown(event){
        cc.log('onKeyDown', event.keyCode)
    },
    // update (dt) {},

    onClickChangeScene(){
        let node = new cc.Node()
        let spr = node.addComponent(cc.Sprite)
        spr.spriteFrame = this.sprite
        cc.game.addPersistRootNode(node)
        Global.persistRootNode = node

        cc.director.loadScene('helloworld', ()=>{
            cc.log(cc.director.getScene())
        })
    },
    onClickEvent(){
        this.node.emit('testEvent', 123)
    },

    scheduleCall(dt){
        this._dt+=dt
        cc.log('dt', this._dt)
        if(this._dt>=10){
            this.unschedule(this.scheduleCall)
        }
    },
});
