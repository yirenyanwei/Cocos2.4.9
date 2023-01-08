// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';
    @property(cc.Sprite)
    sprite: cc.Sprite = null;
    @property(cc.SubContextView)
    contextView: cc.SubContextView = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        this.label.string = this.text;
        this.testLoadBundle();

    }

    // update (dt) {}
    testLoadBundle():void{
        cc.assetManager.loadBundle('testBundle', (err, bundle:cc.AssetManager.Bundle)=>{
            bundle.load('bp_57678', cc.SpriteFrame, (err, spriteFrame:cc.SpriteFrame)=>{
                this.sprite.spriteFrame = spriteFrame;
            })
        })
    }
    onClickSubMessage(){
        let wx = window['wx']
        let openDataContext = wx.getOpenDataContext()
        openDataContext.postMessage({
            message: 'openview',
            type: '0',
            fromEngine: true,
        })
    }
    
}
