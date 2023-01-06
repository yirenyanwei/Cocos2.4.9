// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class TestTs extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        this.label.string = 'TsTest'
        this.testTs()
    }

    // update (dt) {}
    testTs() {
        //ts基础类型
        //1、基本类型 string number boolean any
        let aStr:string = 'Hello,world'
        let aBool:boolean = true
        let aNum:number = 123
        let aAny:any = 'hello'
        //2、数组类型[] 或泛型
        let aArr1:number[] = [1,2,3]
        let aArr2:Array<string> = ['hello', 'world']
        //3、元组 [any, any]对应位置类型需要相同
        let aTube:[string, number];
        aTube = ['hello', 123];
        //4、枚举 enum 默认从0开始
        enum MyColor {MyRed=1, MyBlue, MyGreen};
        let aMyColor = MyColor.MyRed;//1
        cc.log("enum MyColor", aMyColor)
        //5、void 用于标识方法或返回值类型，表示该方法没有返回值
        function aFunc():void
        {
            
        }
        //6、null 表示对象之缺失，表示一个空对象的引用
        let aArr3:string[] = null;
        //7、undefined 用于初始化变量为一个未定义的值
        let aArray4:string[] = undefined;
        //never 表示从不出现的值
        // let aNever:never = (()=>{throw new Error('exception')})();
        //8、switch
        let expression:string = 'A';
        switch(expression){
            case 'A':{
                cc.log('switch A')
                break;
            }
            case 'B':{
                cc.log('switch B')
                break;
            }
            default:{
                cc.log('default')
            }
        }
        //9、for
        for(let i = 0; i<aArr1.length; i++){}
        for(let key in aArr1){}
        for(let item of aArr1){}
        aArr1.forEach((item,idx,arr)=>{})
        //10、可选参数、默认参数、剩余参数
        function fun1(arg1:string, arg2?:number):void{

        }
        function fun2(arg1:string, arg2:number = 123):void{

        }
        //剩余参数语法允许我们将一个不确定数量的参数作为一个数组传入。
        function fun3(arg1:string, ...rest:any[]){
            cc.log('fun3--', rest)
        }
        fun3('hello', 1, 2, 3)
        
    }
}
