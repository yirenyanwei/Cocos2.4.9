// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
//导入测试
import testA1, {testA2 as TestA2, testA3, testB1, testB2, testB3} from "./ExportTest";
import "./DecorateTest"
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
        // this.testTs()
        this.testTs2()
    }

    // update (dt) {}
    testTs() {
        //ts基础类型
        //1、基本类型 string number boolean any
        let aStr:string = 'Hello,world'
        let aBool:boolean = true
        let aNum:number = 123
        let aAny:any = 'hello'
        //2、数组类型[] 或泛型  类型相同
        let aArr1:number[] = [1,2,3]
        let aArr2:Array<string> = ['hello', 'world']
        //3、元组 数据类型可以不同 [any, any]对应位置类型需要相同
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
        
        //10、二维数组
        let erArr:number[][] = [[1,2],[3,4,5]];
        cc.log('erArr--', erArr);

        //11、Map
        let map = new Map()
        map.set('hello', 1)
        let mapValues = map.values()
        for(let i = 0; i<map.size; i++){
            let item = mapValues.next().value
        }
        cc.log("map--", map.get('world'))

        //12、联合 Type1|Type2|Type3 只能赋值给定的类型
        let aUnion:string|number|boolean = 123
        aUnion = 'hello'

        //13、接口 接口是一系列抽象方法的声明，是一些方法特征的集合，这些方法都应该是抽象的，需要由具体的类去实现，
        interface IPerson{
            firstName:string,
            lastName:string,
            sayHi:()=>string,//返回string
            //联合类型
            commandLine:string|string[]|(()=>string)
        }
        let customer:IPerson = {
            firstName:'yanwei',
            lastName:'hao',
            sayHi:():string=>'haoyanwei',
            commandLine: 'hello',
        }
        cc.log('customer--', customer)
        //接口和数组
        interface InameList{
            //键number 值string
            [index:number]:string,
        }
        let nameList:InameList = ['hello', 'world']
        interface IAges{
            [key:string]:number,
        }
        let ages:IAges = {'hello':123}
        //接口继承 支持多继承
        interface ITest1{
            age:number,
        }
        interface ITest2{
            name:string,
        }
        interface ITest extends ITest1,ITest2 {
            id:string,
        }
        let myTest:ITest = {
            id:'123',
            name:'yanwei',
            age:18,
        }
        cc.log('myTest--', myTest)

        //14、类 extends 不支持继承多个父类，但支持多重继承 实现接口用implements
        class Car {
            //字段
            engine:string;
            //构造方法
            constructor(engine:string){
                this.engine = engine
            }
            //普通方法
            disp():void{
                cc.log('发动机为：', this.engine)
            }
        }
        let car = new Car('hondar')
        car.disp()
        //继承
        class Shape{
            Area:Number;
            constructor(a:number){
                this.Area = a
            }
            dprint():void{
                cc.log('father--shape')
            }
        }
        class Circle extends Shape{
            display(): void{
                cc.log('area--', this.Area);
            }
            //方法重写
            dprint(): void {
                //调用父类方法
                super.dprint();
                cc.log('child--Circle');
            }
            //静态属性、方法
            static index:number;
            static getIndex():number{
                return Circle.index;
            }
            //访问修饰符
            private priPrint():void{
                cc.log('priPrint')
            }
        }
        let circle = new Circle(100);
        circle.display();
        circle.dprint();
        Circle.getIndex();
        //instanceof 运算符用于判断对象是否是指定的类型
        cc.log('instanceof--', circle instanceof Circle)
        //类和接口
        interface IStudent{
            id:string;
            print:()=>void;
        }
        class Student implements IStudent{
            id: string;
            print():void{
                cc.log('this is Student')
            }
        }

        //15、命名空间 namespace

        //16、模块
        cc.log('import--', testA1, TestA2, testA3, testB1, testB2);
        testB3()
        
    }
    testTs2():void{
        //1、TS中接口的声明
        interface SqureConfig{
            //可选属性
            color?:string;
            //只读属性 必须在声明或构造函数里初始化
            readonly x:number;
            //额外属性检查
            [propName:string]:any;
        }
        let squreConfig:SqureConfig = {
            color:'red',
            x: 100,
        }
        //函数类型
        interface SearchFunc{
            (source:string, subString:string):boolean;
        }
        let searchFunc:SearchFunc = function(source:string, subString:string)
        {
            return true;
        }
        //可索引类型
        interface NameList {
            [index:number]:string
        }
        let nameList:NameList = ['hao', 'yanwei']
        //类类型
        interface ICounter {
            interval:number;
            setTime(d:Date):void;
        }
        class Counter implements ICounter {
            constructor(start:number){

            }
            interval: number;
            setTime(d: Date):void{

            }
        }

        //2、存储器
        class Employee {
            private _fullName:string;
            get FullName():string{
                return this._fullName
            }
            set FullName(name:string) {
                this._fullName = name;
            }
        }
        let emploryee = new Employee()
        emploryee.FullName = 'yanwei'
        cc.log('FullName--', emploryee.FullName)

        //3、抽象类 必须用子类继承去实现再能创建对象
        abstract class Animal{
            abstract makeVoice():void;
            move():void{
                cc.log('animal move')
            }
        }
        class Dog extends Animal{
            makeVoice(): void {
                cc.log('Dog make voice')
            }
        }

        //4、使用泛型
        function identify<T>(args:T):T {
            return args;
        }
        let num = identify<number>(100);
        class GeneraticNum<T> {
            id:T;
            constructor(_id:T){
                this.id = _id;
            }
        }
        let generaticNum = new GeneraticNum<number>(100);

        //5、type和interface的区别
        /**
         * 在ts中，定义类型由两种方式：接口（interface）和类型别名（type alias）
        interface只能定义对象类型，type声明的方式可以定义组合类型，交叉类型和原始类型
         */
        type MyType = {
            name:string,
            id:number,
        }
        let mytype:MyType = {
            name:'yanwei',
            id:123,
        }
    }
}
