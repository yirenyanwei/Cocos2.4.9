// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Animation)
    animation: cc.Animation = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        this.testAnimation();
    }
    testAnimation() {
        this.animation.play();
        
    }

    // update (dt) {}
}
