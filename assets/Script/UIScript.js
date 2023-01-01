// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        button: cc.Button,
        toggleContainer: cc.ToggleContainer,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        // this.schedule(this.testWidget, 0,1)
        //button
        this.testButton()
    },

    // update (dt) {},
    testWidget(){
        var node = this.node.getChildByName('WidgetNode')
        // node.getComponent(cc.Widget).updateAlignment()
        node.x = -500
        cc.log('nodepos--', node.x, node.y)
    },
    testButton(){
        //添加事件
        var clickEventHandler = new cc.Component.EventHandler()
        clickEventHandler.target = this.node//挂在脚本的节点
        clickEventHandler.component = 'UIScript'//脚本的文件名
        clickEventHandler.handler = 'onClickButton';//事件名
        clickEventHandler.customEventData = 'yanwei';//传递的数据
        this.button.clickEvents.push(clickEventHandler)
    },
    onClickButton(evt, data){
        cc.log('onClickButton--', data)
    },
    onEditDidEnded(edit, data){
        cc.log('edit--', edit.string, data)
    },
    clickImg(){
        cc.log('clickImg--')
    },
    onScrollViewEvt(scrollview, evtType)
    {
        cc.log('onScrollView--', evtType)
    },
    onClickToggle(toggle, data)
    {
        cc.log('onClickToggle--', toggle.isChecked)
    },
    onClickToggleContainer(toggle, data){
        var toggles = this.toggleContainer.toggleItems;
        var str = ''
        for(let i = 0; i<toggles.length; i++){
            str += toggles[i].isChecked+'-'
        }
        cc.log('onClickToggleContainer--', str)
    },
    onSliderCall(slider, data)
    {
        cc.log('onSlidercall--', slider.progress)
    },
    onPageViewCall(pageView, evtType, data)
    {
        cc.log('onPageViewCall--', evtType, pageView.getCurrentPageIndex())
        if(pageView.getCurrentPageIndex() == pageView.getPages().length-1){
            pageView.scrollToPage(0,0)
            pageView.setCurrentPageIndex(0)
        }
    },
});
