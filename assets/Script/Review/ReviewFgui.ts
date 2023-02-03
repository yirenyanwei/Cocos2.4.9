// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;
import Package2Binder from "../../resources/UI/Script/Package2/Package2Binder";
import YWComponent1 from "../../resources/UI/Script/Package2/YWComponent1";
import MyFGUIComp from "./MyFGUIComp";
import MyWindow from "./MyWindow";
@ccclass
export default class NewClass extends cc.Component {
    private _view2: fgui.GComponent;
    // LIFE-CYCLE CALLBACKS:
    private _view:fgui.GComponent;
    //popup组件
    private _popupComp:fgui.GComponent;
    //popupMenu
    private _popupMenu:fgui.PopupMenu;
    //window
    private _popupWindow:MyWindow;
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

        //资源相关的属性 url地址、在资源库中的名称、所在包的名称
        cc.log('this._view', this._view.resourceURL, this._view.packageItem.name, this._view.packageItem.owner.name);
        //根据URL获取资源名称
        cc.log(fgui.UIPackage.getItemByURL(this._view.resourceURL).name);

        //切换分支
        fgui.UIPackage.branch = 'main';

        //设置tip
        fgui.UIConfig.tooltipsWin = 'ui://Package1/tips'

        //加载package2
        var pkg:fgui.UIPackage = fgui.UIPackage.getByName('Package2');
        cc.log('Package2:', pkg)
        //注册自定义组件
        fgui.UIObjectFactory.setExtension("ui://Package2/TestComp", MyFGUIComp);
        fgui.UIPackage.loadPackage('UI/Package2', (err, pkg)=>{
            this.showPackage2()
        })
    }
    showPackage2(){
        var pkg:fgui.UIPackage = fgui.UIPackage.getByName('Package2');
        cc.log('load Package2 done:', pkg)
        //自己加载组件形式
        // var view = fgui.UIPackage.createObject('Package2', 'Component1').asCom;
        //绑定代码形式
        Package2Binder.bindAll()
        var view = YWComponent1.createInstance();
        this._view2 = view;

       fgui.GRoot.inst.addChild(view)
        // view.setPosition(-480, -300)
        //data
        var data:string = view.getChild('myn0').data;
        cc.log('data--', data)

        //image
        var image:fgui.GImage = view.getChild('n1').asImage;
        image.fillMethod = fgui.FillMethod.Horizontal;
        image.fillOrigin = fgui.FillOrigin.Left;
        image.fillAmount = 1;
        //创建Image
        image = fgui.UIPackage.createObject('Package1', 'cai08').asImage;
        view.addChild(image);

        //动画GMovieClip
        var clip = view.getChild('n2').asMovieClip;
        clip.frame = 0;
        clip.playing = true;

        //GGraph
        var graph:fgui.GGraph = view.getChild('n3').asGraph;
        graph.drawRect(2, cc.Color.GREEN, cc.Color.RED);

        //GLoader
        var loader = view.getChild('n4').asLoader;
        loader.url = 'ui://Package1/cai04'// 也可以设置resource下的或远程资源

        //GTextField
        var text = view.getChild('n5').asTextField;
        text.fontSize = 20;
        text.autoSize = fgui.AutoSizeType.Both;
        text.text = '我的元宝:{jin=100}金';
        text.templateVars = {'jin':'20'};//设置文本模板
        //关闭模板
        // text.templateVars = null;

        //GRichTextField
        var richText = view.getChild('n6').asRichTextField;
        //监听点击
        view.getChild('n6').on(fgui.Event.LINK, this.onClickRich, this);
        richText.fontSize = 16;
        //必须要有Groot才有监听事件
        richText.text = "[url=event:xx]I am link, click me[/url]<color=#00ff00>Rich</color>"

       //GTextInput
        var textInput = view.getChild('n7').asTextInput;
        textInput.fontSize = 20;
        textInput.font = 'Sansation_Light'
        textInput.promptText = '[color=#CCCCCC]please input[/color]';
        textInput.on(fgui.Event.TEXT_CHANGE, this.onInputChange)

        //GGroup
        var group = view.getChild('n11').asGroup;
        group.layout = 1;
        group.setSize(100, 20)

        //GComponent
        var comp = view.getChild('n12') as MyFGUIComp;
        //设置点击 默认接受点击
        // comp.touchable = false;
        //设置点击不穿透
        // comp.opaque = false;
        cc.log("component--", comp.numChildren)
        //渲染顺序默认是按照从上到下
        //特殊改顺序 越大越靠后
        // comp.sortingOrder = 1;
        //对象的排序方式  升序、降序、拱形
        // comp.childrenRenderOrder = fgui.ChildrenRenderOrder.Descent;
        comp.desc.text = 'haha';

        //滚动fgui.ScrollPane
        var _comp = view.getChild('n14').asCom;
        var scrollPane = _comp.scrollPane;
        //滚动10像素
        scrollPane.posX = 10;
        //视口宽度、内容宽度
        cc.log('scrollPane--', scrollPane.viewWidth, scrollPane.contentWidth);
        //监听滚动事件
        _comp.on(fgui.Event.SCROLL, this.onPaneScroll, this);

        // fgui.Controller
        var control:fgui.Controller = comp.getController('c1');
        //改变事件
        control.on(fgui.Event.STATUS_CHANGED, this.onControlChange, this);
        //切换索引
        control.selectedIndex = 1;
        //代码取对象的控制
        var controlObj = comp.getChild('n5').asCom;
        var gearXY:fgui.GearXY = controlObj.getGear(1) as fgui.GearXY;
        cc.log('gearXY-', gearXY.tweenConfig.duration);

        // 关联 Relation
        var relObj = view.getChild('n18');
        var relTarget = view.getChild('n17');
        //设置关联
        relObj.addRelation(relTarget, fgui.RelationType.Size);
        relTarget.setSize(80, 80);

        //标签GLabel
        var label = view.getChild('n19').asLabel;
        label.title = 'yanwei';
        label.icon = 'ui://Package1/cai03';

        //按钮GButton
        var btn = view.getChild('n20').asButton;
        btn.title = '你好'
        //设置不可点击
        // btn.touchable = false;
        // btn.getController('button').selectedIndex = 1;
        //设置点击事件
        btn.onClick(this.onClickBtn, this);
        //触发点击事件
        // btn.fireClick();
        //单选和多选状态改变
        btn.on(fgui.Event.STATUS_CHANGED, this.onBtnChanged, this);

        //下拉框 GComboBox
        var comboBox = view.getChild('n21').asComboBox;
        //title
        comboBox.items = ['red', 'yellow', 'green', 'white', 'black', 'gold'];
        //values
        comboBox.values = ['value1', 'value2', 'value3', 'value4', 'value5', 'value6'];
        //设置选中项，通过索引
        // comboBox.selectedIndex = 2;
        //通过value设置选中项
        comboBox.value = 'value2';
        //改变的回调
        comboBox.on(fgui.Event.STATUS_CHANGED, this.onComboChange, this);

        //进度条GProgressBar
        var progressBar:fgui.GProgressBar = view.getChild('n22').asProgress;
        progressBar.value = 80;
        //动态过程
        progressBar.tweenValue(20, 1);

        //滑动条 GSlider
        var slider = view.getChild('n23').asSlider;
        slider.on(fgui.Event.STATUS_CHANGED, this.onSliderChange, this)

        //滚动条 GScrollBar
        var scrollBar = view.getChild('n24') as fgui.GScrollBar;

        //列表 GList
        var list = view.getChild('n25').asList;
        //设置创建cell的回调
        list.itemProvider = this.createListItem.bind(this);
        //设置刷新cell的回调
        list.itemRenderer = this.renderListIten.bind(this)
        //设置虚拟列表
        list.setVirtual();
        //设置循环
        // list.setVirtualAndLoop();
        //设置数量
        list.numItems = 10;//自动使用缓存池
        //点击事件
        list.on(fgui.Event.CLICK_ITEM, this.onClickListItem, this);
        //获取某一个item
        var item = list.getChildAt(0).asButton;
        cc.log('item0--', item.title, list.numChildren);

        //Popup 点击空白关闭
        var graphNode = view.getChild('n27')
        graphNode.on(fgui.Event.CLICK, this.onClickPopup, this);
        this._popupComp = fgui.UIPackage.createObject('Package2', 'TestPopup').asCom;
        //关闭注册
        this._popupComp .on(fgui.Event.UNDISPLAY, this.onPopupDisplay, this);
        //PopupMenu
        fgui.UIConfig.popupMenu = 'ui://Package2/TestPopupMenu';
        this._popupMenu = new fgui.PopupMenu();
        //修改宽度，高自适应
        // this._popupMenu.contentPane.width = 100;
        this._popupMenu.addItem('menu1', this.onClickMenuItem)
        this._popupMenu.addItem('menu2', this.onClickMenuItem)
        this._popupMenu.addItem('menu3', this.onClickMenuItem)
        //菜单置灰
        // this._popupMenu.list.getChildAt(0).asButton.grayed = true;

        //Drag&Drop
        var dragComp = view.getChild('n29').asCom;
        //打开drag
        dragComp.draggable = true;
        //dragBounds
        // dragComp.dragBounds = new cc.Rect(0, 450, 800, 800)
        //拖动事件
        dragComp.on(fgui.Event.DRAG_START, this.onDragStart, this);
        dragComp.on(fgui.Event.DRAG_MOVE, this.onDragMove, this);
        dragComp.on(fgui.Event.DRAG_END, this.onDragEnd, this);
        //监听替身拖动
        fgui.DragDropManager.inst.dragAgent.on(fgui.Event.DRAG_END, this.onDragEndReplace, this);
        //监听谁拖放进来
        dragComp.on(fgui.Event.DROP, this.onDrop, this);

        //窗口Window
        //设置modalWait
        fgui.UIConfig.windowModalWaiting = 'ui://Package2/TestWait';
    }
    onClickRich(link:string){
        cc.log('onClickRich', link)
    }
    onInputChange(value){
        cc.log('input--', value)
    }
    onPaneScroll(){
        cc.log('scrollPane--')
    }
    onControlChange(){
        cc.log('onControlChange--');
    }
    onClickBtn(){
        cc.log('clickBtn--');
    }
    onBtnChanged(btn: fgui.GButton){
        cc.log('btn state change', btn.getController('button').selectedIndex)
    }
    onComboChange(combo: fgui.GComboBox){
        cc.log('onComboChange--', combo.selectedIndex, combo.value);
    }
    onSliderChange(slider:fgui.GSlider){
        cc.log('onSliderChange--', slider.value);
    }
    createListItem(idx:number){
        return 'ui://Package2/TestListItem'
    }
    renderListIten(idx:number, item:fgui.GButton){
        item.title = 'test_'+idx;
    }
    onClickListItem(item: fgui.GButton){
        cc.log('onclick--', item.title, item.selected);
    }
    onClickPopup(){
        fgui.GRoot.inst.hidePopup()
        //popup
        // fgui.GRoot.inst.showPopup(this._popupComp );
        //popupMenu
        // this._popupMenu.show();
        //popupWindow
        if(!this._popupWindow) {
            this._popupWindow = new MyWindow();
            //定义模态窗口
            this._popupWindow.modal = true;
        }
        this._popupWindow.show();
    }
    onPopupDisplay(){
        cc.log('display popup');
    }
    onClickMenuItem(item:fgui.GObject, event:fgui.Event){
        cc.log('clickItem--', item.asButton.title)
    }
    onDragStart(evt: fgui.Event){
        cc.log('onDragStart--');
        var obj =  fgui.GObject.cast(evt.currentTarget).asCom;
        //转换拖动目标 替换成标题移动
        // obj.stopDrag();
        // obj.getChild('n1').startDrag();

        //替身拖动
        obj.stopDrag()
        fgui.DragDropManager.inst.startDrag(null, 'ui://Package1/cai01', 'yanwei', evt.touchId);
    }
    onDragMove(evt: fgui.Event){
        cc.log('onDragMove--');
    }
    onDragEnd(evt: fgui.Event){
        cc.log('onDragEnd--');
    }
    onDragEndReplace(evt: fgui.Event){
        cc.log('onDragEndReplace--');
    }
    onDrop(dropTarget:fgui.GObject, userData:any){
        cc.log('onDrop--', userData)
    }
}
