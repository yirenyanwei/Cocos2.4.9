// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    private _view:fgui.GComponent;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        fgui.GRoot.create()
        //加载多语言
        cc.resources.load('UI/en', cc.TextAsset, (error, asset: cc.TextAsset)=>{
            fgui.UIPackage.setStringsSource(asset.text);
            fgui.UIPackage.loadPackage('UI/Package1', (error, pkg:fgui.UIPackage)=>{
                this.showPackage1()
            })
        })
        
    }
    showPackage1(){
        this._view = fgui.UIPackage.createObject('Package1', 'Component4').asCom;
        //全屏适配
        this._view.makeFullScreen();
        fgui.GRoot.inst.addChild(this._view);
    }

    // update (dt) {}
}
