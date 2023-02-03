// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class MyFGUIComp extends fgui.GComponent {
    desc:fgui.GTextField = null;
    public constructor() {
        super();
    }

    protected onConstruct(): void {
        cc.log('MyFGUIComp Construct')
        this.desc = this.getChildAt(0).asTextField;
    }
}
