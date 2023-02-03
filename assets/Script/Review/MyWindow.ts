
export default class MyWindow extends fgui.Window {
    constructor(){
        super();
    }
    protected onInit(): void {
        //初始化完成
        this.contentPane = fgui.UIPackage.createObject('Package2', 'TestWindow').asCom;
        this.center();
        this.setPivot(0.5, 0.5)

        //显示锁定提示
        this.showModalWait();
    }
    protected onShown(): void {
        //加载完成
    }
    protected doShowAnimation(): void {
        //打开动画
        fgui.GTween.to(0, 1, 0.5).setTarget(this, this.setScale).setEase(fgui.EaseType.BackOut).onComplete(()=>{
            this.onShown();
        });
    }

    protected doHideAnimation(): void {
        //关闭动画
        fgui.GTween.to(1, 0, 0.5).setTarget(this, this.setScale).setEase(fgui.EaseType.BackIn).onComplete(()=>{
            this.hideImmediately();
        });
    }
}