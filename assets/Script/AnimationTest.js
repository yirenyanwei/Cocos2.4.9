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

    onLoad () {
        this.animation = this.getComponent(cc.Animation)
    },
    onEnable(){
        this.animation.on('finished', this.onFinished, this)
    },
    onDisable(){
        this.animation.off('finished', this.onFinished, this)
    },

    start () {
        this.animationTest()
    },

    // update (dt) {},
    animationTest(){
        //获取AnimationState
        var animationState = this.animation.play('TestAnimationClip')
        // 或者直接获取
        var animState = this.animation.getAnimationState('TestAnimationClip');
        
        // 获取动画关联的 clip
        var clip = animState.clip;

        // 获取动画的名字
        var name = animState.name;

        // 获取动画的播放速度
        var speed = animState.speed;

        // 获取动画的播放总时长
        var duration = animState.duration;

        // 获取动画的重复次数
        var repeatCount = animState.repeatCount;

        //是否正在播放
        var isPlaying = animState.isPlaying
        cc.log('animationState--', name, speed, duration, repeatCount, isPlaying)

        //动态创建animation Clip
        

    },
    onAnimationEvt(arg1)
    {
        cc.log('onAnimationEvt--', arg1)
    },
    onFinished(){
        cc.log('onFinished--')
    }
});
