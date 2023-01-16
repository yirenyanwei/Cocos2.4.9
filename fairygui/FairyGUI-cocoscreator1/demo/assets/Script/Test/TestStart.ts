

const {ccclass, property} = cc._decorator;

@ccclass
export default class TestStart extends cc.Component {
    private _view:fgui.GComponent;
    private _bagWindow:fgui.Window;
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        //创建UI根节点
        fgui.GRoot.create();

        //加载包
        fgui.UIPackage.loadPackage('UI/Bag', (err, pkg:fgui.UIPackage)=>{
            this.showUI()
        })
    }
    showUI() {
        this._view = fgui.UIPackage.createObject('Bag', 'Main').asCom;
        this._view.makeFullScreen()
        fgui.GRoot.inst.addChild(this._view)

        this._view.getChild('bagBtn').onClick(this.onClickBag, this)
    }

    start () {

    }

    // update (dt) {}

    onClickBag(){
        if(!this._bagWindow){
            this._bagWindow = new MyBagWindow();
        }
        this._bagWindow.show();
    }
}

class MyBagWindow extends fgui.Window{
    private _list: fgui.GList;
    public constructor(){
        super()
    }

    protected onInit():void {
        this.contentPane = fgui.UIPackage.createObject('Bag', 'BagWin').asCom;
        this.center();

        let frame: fgui.GComponent = this.contentPane.getChild('frame').asCom;
        frame.getChild('closeButton').asButton.onClick(this.onClickClose, this)

        let list: fgui.GList = this.contentPane.getChild('list').asList;
        //监听点击
        list.on(fgui.Event.CLICK_ITEM, this.onClickItem, this);
        //刷新cell的方法
        list.itemRenderer = this.renderListItem.bind(this)
        //设置复用
        list.setVirtual();
        this._list = list
    }
    protected onShown(): void {
        //设置cell个数
        this._list.numItems = 45;
    }

    private renderListItem(index:number, obj: fgui.GObject): void {
        obj.icon = "Icons/i"+Math.floor(Math.random()*10);
        obj.text = ""+Math.floor(Math.random()*100);
    }

    //默认成员修饰符 public
    private onClickItem(item:fgui.GObject): void {
        this.contentPane.getChild('n11').asLoader.url = item.icon;
        this.contentPane.getChild('n13').asLabel.text = item.text;
    }

    private onClickClose(): void {
        cc.log('onClickClose--')
        this.hide()
    }
}
