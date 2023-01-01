/**
 * 网络相关
 */
cc.Class({
    extends:cc.Component,
    properties:{
        nodePoolPrefab:{
            default: null,
            type: cc.Prefab
        },
        _poolManager:null,
        mypos:{
            default:function(){
                return [1,2,3]
            },
            type:[cc.Integer]
        },
        _myId:{
            default:0,
            type:cc.Integer,
            visible:true
        },
        myName:{
            default:{},
            type:cc.String,
            multiline:true,//多行显示
            readonly:true,//只读
        },
        myAge: {
            default:0,
            type:cc.Integer,
            range:[0,10, 2],//最小值，最大值，步长
            slide:true,//滑动条
            //当属性被赋值时触发
            notify: function(oldValue){
                cc.log(oldValue)
            }
        }
    },
    ctor(){
        this._itemIdx = 0
    },
    onLoad(){
        this._poolManager = new cc.NodePool('NodePoolItem')

        // this.doWebHttp()
        // this.doNodePool()

        //插件脚本
        cc.log('chajian--', Chajian.name)
    },
    doWebHttp(){
        //短连接
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4 && xhr.status>=200 && xhr.status<400){
                var response = xhr.responseText
                console.log(response)
            }
        }
        var url = 'http://127.0.0.1:8088'
        xhr.open("GET", url, true)
        xhr.send();
    },
    doNodePool(){
        for(let i = 0; i<5; i++){
            let node = cc.instantiate(this.nodePoolPrefab)
            this._poolManager.put(node)
        }
    },
    onClickNodePool(){
        if (this._poolManager.size()>0) {
            let node = this._poolManager.get('haha')
            node.parent = this.node
            node.y = 100*this._itemIdx
            this._itemIdx++
        }
    },
    onDestroy(){
        this._poolManager.clear()
    }
})