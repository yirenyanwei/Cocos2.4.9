// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
let Global = require('Global')
cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        id: '123',
        loaded: false,
        height: 100,
        tar: null,
        target: cc.Node,
        pos: new cc.Vec2(0,0),
        ints: [cc.Integer],
        score: {
            default: 0,
            displayName: 'Score(player)',
            tooltip: 'the score of player'
        },
        _myWidth:0,
        myWidth: {
            get(){
                return this._myWidth
            },
            set(value){
                this._myWidth = value
            }
        },
        sprite:{
            default:null,
            type: cc.SpriteFrame
        },
        prefab:{
            default: null,
            type: cc.Prefab
        }
    },
    ctor(){
        cc.log('this is ctor')
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.log('onLoad')
    },

    start () {
        cc.log('start')
        /*
        console.log('test script')
        cc.log(this.node.x, this.node.angle, this.node.scale)
        cc.log('child---')
        cc.log(this.node.getChildByName('child1'))
        cc.log(cc.find('child1', this.node))

        this.node.active = true
        cc.log(this.node.activeInHierarchy)
        //位置
        this.node.x = 100;
        this.node.setPosition(100, 100)
        this.node.setPosition(cc.v2(100, 100))
        this.node.position = cc.v2(100, 100)

        //旋转
        this.node.rotation = 90
        this.node.setRotation(90)

        //颜色
        this.node.color = cc.color(255, 0, 0)
        */
       /*
       //创建节点
        let node = new cc.Node()
        node.parent = this.node
        let spr = node.addComponent(cc.Sprite)
        spr.spriteFrame = this.sprite
        //prefab
        node = cc.instantiate(this.prefab)
        node.parent = this.node
        node.position = cc.v2(100, 100)
        */

        //加载资源
        cc.resource
    },
    onEnable(){
        cc.log('onEnable')
    },

    // update (dt) {},

    onClickChangeScene(){
        let node = new cc.Node()
        let spr = node.addComponent(cc.Sprite)
        spr.spriteFrame = this.sprite
        cc.game.addPersistRootNode(node)
        Global.persistRootNode = node

        cc.director.loadScene('helloworld', ()=>{
            cc.log(cc.director.getScene())
        })
    }
});
