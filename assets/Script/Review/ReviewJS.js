// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

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
        _width: 100,
        myWidth: {
            type: cc.Integer,
            get(){
                return this._width;
            },
            set(val){
                this._width = val;
            }
        },
        sprite: cc.Sprite,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.log('ReviewJS onLoad')
    },

    start () {
        // this.testJS(1,2,3)
        this.testCocos()
    },

    // update (dt) {},
    testJS(){
        cc.log('string-------')
        let str = 'abc123';
        cc.log('123查找--', str.indexOf('123'));
        str.slice(0, str.length);
        str.substring(0, str.length);
        str.substr(0);

        cc.log('array---------')
        let arr = [1,2,3,'a', 'b', 'c', 'A']
        var newArr = arr.map((value, index)=>{
            return value.toString().charCodeAt(0)
        })
        cc.log(newArr)
        newArr.sort((a, b)=>{
            return a-b
        })
        cc.log(newArr)
        newArr.splice(0, 1, 1)
        cc.log(newArr)

        cc.log('typeof--', typeof true, (typeof '123')=='string', typeof (()=>{}))

        cc.log('function---')
        cc.log(arguments)
        let fun = ()=>{
            //this指向函数外部的this, 没有arguments
            cc.log(arguments)
        }
        fun(4,5,6)
        
        function getName(a = 100){
            return a;
        }
        cc.log('getName', getName(1))

        //解构赋值
        let [arr1, arr2] = [10, 20];
        let {obj1: myObj, obj2} = {obj1: 'hello', obj2: 'world'}
        cc.log(arr1, arr2, myObj, obj2);
        //字符串模板
        let strTemp = `hello,
world!, ${obj2}`
        cc.log(strTemp)

        //展开运算符...
        let arr01 = [1,2,3]
        let arr02 = [4,5,6];
        let arr03 = [...arr01, ...arr02];
        let obj01 = {name:'nike', age: 18};
        let obj02 = {
            id:'123',
            ...obj01
        };
        cc.log(arr03, obj02);

        //class
        class MyClass {
            //成员
            m_id = '123';
            m_name = 'haoyanwei';
            //静态
            static m_num = 0;
            constructor(_name){
                this.m_name = _name;
                MyClass.m_num++;
            }
            output(){
                cc.log('MyClass',this.m_id, this.m_name, MyClass.m_num);
            }
            static getMyNumber(){
                return MyClass.m_num;
            }   
        }
        var myClass = new MyClass('haoyanwei')
        myClass.output();
        cc.log(MyClass.getMyNumber())

        //数据劫持
        var tempObj = {}
        var defineObj = {}
        Object.defineProperty(defineObj, 'username', {
            get(){
                return tempObj.username.toUpperCase();
            },
            set(val){
                tempObj.username = val
            }
        })
        defineObj.username = 'haoyanwei'
        cc.log(defineObj.username)

        //promise
        var p = new Promise(function(resolve, reject){
            // setTimeout(function(){
            //     cc.log('resolve1')
            //     resolve()
            // }, 1000);
            // setTimeout(function(){
            //     cc.log('reject1')
            //     reject()
            // }, 2000);
        })
        p.then(()=>{
            cc.log('resolve2')
        }, ()=>{
            cc.log('reject2')
        });
        p.catch(()=>{
            cc.log('reject3')
        })
        p.then(()=>{
            cc.log('resolve3')
            //返回resolve的参数
            return 'haha'
        }).then((para)=>{
            cc.log('resolve4', para)
            //返回promise
            return new Promise(function(resolve, reject){
                resolve()
            })
        })

        //async wait 不支持
        async function asyFunc(){
            return '1';
        }

        //generator
        // function *geneFunc(){
        //     let _arr = [1,2,3]
        //     for(let value of _arr){
        //         yield value;
        //     }
        // }
        // const geneRst = geneFunc()
        // let res = geneRst.next()
        // while(!res.done){
        //     cc.log('generate--', res.value)
        //     res = res.next();
        // }

        //闭包
        function bibao(params){
            var num = 10;
            return function(){
                num+=10;
                return num;
            }
        }
        let bibaoFunc = bibao()
        cc.log(bibaoFunc(), bibaoFunc())

        //for

        //bind
        this._testName = 'yanwei'
        function bindFunc(){
            //默认this是Window
            cc.log(this._testName);
        }
        bindFunc.bind(this)()

        //in  hasOwnProperty instanceof

        //Map
        var map = new Map()
        map.set(123, '1')
        cc.log('map--', map.get(123), map.get(456))
    },
    testCocos(){
        this.sprite.node.setPosition(cc.v2(10, 10))
        var node = cc.instantiate(this.sprite.node);
        node.parent = this.node;
        node.x = 100;
        node.destroy()
        
    }
});
