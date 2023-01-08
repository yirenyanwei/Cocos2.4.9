// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        scrollview:cc.ScrollView,
        scrollviewItem: cc.Node,
    },

    start () {
        console.log('sub start')
        //监听消息
        this.listenMain()
    },
    openView(){
        console.log('打开界面--')
        wx.getFriendCloudStorage({
            keyList:['level'],
            success: res => {
              let data = res.data
              data = [{level:1},{level:2},{level:3},{level:4},{level:5}]
              console.log('frienddata', data)
              this.drawRankList(data)
            }
          })
    },

    // update (dt) {},
    listenMain(){
        wx.onMessage(res => {
            console.log('子域收到消息--', res);
            if ((res && res.fromEngine)) {
                switch(res.message) {
                    case 'openview':
                        {
                            this.openView();
                            break
                        }
                }
            }
        });
    },
    drawRankList(data){
        for(let i = 0; i<data.length; i++){
            let itemData = data[i]
            console.log('itemData--', itemData)
            let item = cc.instantiate(this.scrollviewItem)
            item.active = true
            item.parent = this.scrollview.content
            item.getComponent(cc.Label).string = 'item'+i
        }
    }
});
