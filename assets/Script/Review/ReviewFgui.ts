// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    // LIFE-CYCLE CALLBACKS:
    private _view:fgui.GComponent;

    // onLoad () {}

    start () {
        this.testFGUI();
    }

    // update (dt) {}

    testFGUI(){
        fgui.GRoot.create()
        fgui.UIPackage.loadPackage('UI/Package1', (error, pkg:fgui.UIPackage)=>{
            this.showUI()
        })
    }

    showUI(){
        this._view = fgui.UIPackage.createObject('Package1', 'Component2').asCom;
        this._view.makeFullScreen();
        // fgui.GRoot.inst.addChild(this._view);
        this.node.addChild(this._view.node)
        //两种设置图片方式都可以
        // this._view.getChild('icon').asLoader.icon = 'images/nianyefan_build'
        this._view.getChild('icon').asLoader.url = 'ui://Package1/cai11'
    }
}
