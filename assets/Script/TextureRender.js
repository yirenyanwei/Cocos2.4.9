
cc.Class({
    extends: cc.Component,

    properties: {
        tiledLayer:{
            type:cc.TiledLayer,
            default:null,
        },
        spriteFrame:{
            default: null,
            type: cc.SpriteFrame
        },
        spine: {
            type: sp.Skeleton,
            default:null,
        },
        videoPlayer: cc.VideoPlayer,
        webview: cc.WebView,
        graphics: cc.Graphics,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
    },
    onEnable(){
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this)
        //播放视频
        this.videoPlayer.node.on('ready-to-play', this.videoReadyToPlay, this)
        //webview
        this.webview.node.on('loaded', this.onWebViewLoaded, this)
    },
    onDisable(){
        this.node.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this)
        this.videoPlayer.node.off('ready-to-play', this.videoReadyToPlay, this)
        this.webview.node.off('loaded', this.onWebViewLoaded, this)
    },
    ctor(){
        this.motionStreak = null
    },

    start () {
        //摄像机的测试
        // this.testCamera()
        //动态合图
        // this.testLabel()

        this.motionStreak = cc.find('MotionStreak', this.node)
        // this.testTiled()
        this.testSpine()

        this.videoPlayer.play()

        // this.testWebView()

        this.testGraphics()
    },
    testCamera(){
        var camera = cc.Camera.findCamera(this.node)
        this.camera = camera
        cc.log('camera--', camera, cc.Camera.main)
        //pos
        cc.log('position--', this.node.position)
        var screenPos = cc.v2(0, 0)
        camera.getWorldToScreenPoint(this.node.position, screenPos)
        cc.log('screen--', screenPos)
    },
    onTouchStart(event){
        //屏幕坐标
        var location = event.getLocation()
        cc.log('location--', location.x, location.y)
        /*
        //世界坐标
        // 将一个屏幕坐标系下的点转换到世界坐标系下
        var worldPos = cc.v2(0, 0)
        this.camera.getScreenToWorldPoint(location, worldPos);
        cc.log('worldPos--', worldPos.x, worldPos.y)
        */
        //拖尾
        this.motionStreak.position = this.node.convertToNodeSpaceAR(location)

    },
    testLabel(){
        for(let i = 1; i<=2; i++){
            let lbl = this.node.getChildByName('LabelChild'+i).getComponent(cc.Label);
            lbl.string = 'testLabel'+i;
        }
        // 开启调试
        // cc.dynamicAtlasManager.showDebug(true);
    },
    testTiled(){
        var node = new cc.Node()
        var spr = node.addComponent(cc.Sprite)
        spr.spriteFrame = this.spriteFrame
        //根据坐标实现遮挡
        this.tiledLayer.addUserNode(node);

    },
    testSpine(){
        this._jitterEffect = new sp.VertexEffectDelegate();
         // 设置好抖动参数。
         this._jitterEffect.initJitter(20, 20);
         // 调用 Spine 组件的 setVertexEffectDelegate 方法设置效果。
         this.spine.setVertexEffectDelegate(this._jitterEffect);


        var node = new cc.Node()
        var spr = node.addComponent(cc.Sprite)
        spr.spriteFrame = this.spriteFrame
         // 取得挂点工具
         let attachUtil = this.spine.attachUtil;
         attachUtil.generateAllAttachedNodes();
         // 因为同名骨骼可能不止一个，所以需要返回数组
         let boneNodes = attachUtil.getAttachedNodes("yun1");
         // 取第一个骨骼作为挂点
         let boneNode = boneNodes[0];
         boneNode.addChild(node);
    },
    testWebView(){
        //调用WebView全局方法
        this.webview.evaluateJS('Test()');


    },
    testGraphics(){
        this.graphics.moveTo(0,0)
        //划线
        this.graphics.lineTo(100, 100)
        //画圆
        this.graphics.circle(0,0, 100)
        //绘制
        this.graphics.stroke();
    },
    videoReadyToPlay(videoplayer){
        cc.log('videoReadyToPlay--')
    },
    onWebViewLoaded(event){
        cc.log('webviewLoaded--')
    }

    // update (dt) {},
});
