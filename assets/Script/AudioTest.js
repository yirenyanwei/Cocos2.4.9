// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        audioClip: cc.AudioClip
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.audioSource = this.node.getChildByName('AudioSource').getComponent(cc.AudioSource)

    },

    start () {

    },
    onClickAudioSource(){
        // this.testAudioSource()
        this.testAudioEngine()
    },
    testAudioSource(){
        this.audioSource.play()
        this.audioSource.pause()
    },
    testAudioEngine(){
        var musicId = cc.audioEngine.play(this.audioClip, false, 1)// clip loop voice
        cc.audioEngine.stop(this.musicId);
    }

    // update (dt) {},
});
