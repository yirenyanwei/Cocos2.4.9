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
        // this.testRef()
        // this.testDownLoaderCfg()
        // this.testCacheManager()

        this.testAssetManager()
    },

    // update (dt) {},
    testRef(){
        cc.resources.load('images/nianyefan_build', cc.Texture2D, (err, texture)=>{
            this.texture = texture
            this.texture.addRef()
            var spriteFrame = new cc.SpriteFrame(texture)
            this.spriteFrame = spriteFrame
            this.sprite = this.node.getChildByName('Sprite').getComponent(cc.Sprite)
            this.sprite.spriteFrame = spriteFrame
            this.sprite.node.size = cc.size(100, 100)
        })
    },
    testDownLoaderCfg()
    {
        //下载的设置
        //重试次数
        cc.assetManager.downloader.maxRetryCount = 3;
        //重试的事件间隔 毫秒
        cc.assetManager.downloader.retryInterval = 2000;

        //最大并发连接数
        cc.assetManager.downloader.maxConcurrency = 10;
        //每帧发起的最大请求数
        cc.assetManager.downloader.maxRequestsPerFrame = 6;
    },
    testCacheManager()
    {
        //缓存
        cc.resources.load('images/nianyefan_build', cc.Texture2D, (err, texture)=>{
            if(cc.assetManager.cacheManager){
                var cachePath = cc.assetManager.cacheManager.getCache(texture.nativeUrl)
                cc.log('cachePath--', cachePath)
            }
        })
        cc.assetManager.loadRemote('https://img.alicdn.com/tfs/TB1R5fsgyDsXe8jSZR0XXXK6FXa-281-80.jpg', function (err, texture) {
            if(cc.assetManager.cacheManager){
                //临时文件夹 小游戏
                var tempPath = cc.assetManager.cacheManager.getTemp(texture.nativeUrl);
                //缓存中
                var cachePath = cc.assetManager.cacheManager.getCache(texture.nativeUrl)
                console.log('getTemp--', tempPath, cachePath);
            }
        });

    },
    testAssetManager()
    {
        cc.assetManager.loadAny({'dir': 'images/nianyefan_build', type: cc.SpriteFrame, bundle: 'resources'}, (err, spriteFrame)=>{
            cc.log(spriteFrame)
        });

    },
    onClickDestroy()
    {
        // this.sprite.node.destroy()
        cc.log('onClickDestroy--', this.texture.refCount)
        //自动释放
        this.texture.decRef()
        cc.log('onClickDestroy--', this.texture.refCount, this.spriteFrame.refCount)
        //手动释放
        // cc.assetManager.releaseAsset(this.texture)

        this.texture = null
    }
});
