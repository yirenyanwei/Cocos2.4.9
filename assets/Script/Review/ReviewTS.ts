// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';
    @property({
        type: cc.Sprite,
        tooltip: '精灵'
    })
    sprite: cc.Sprite = null;
    @property({
        type: cc.Integer,
    })
    myIdx: number = 0;
    
    _width: number = 0;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        cc.log('width:', this._width)
        this.testTS();
    }

    // update (dt) {}

    testTS(){
        var aArr: Array<number> = [1];
        //元组
        var aTube: [string, number] = ['a', 1];
        //枚举 默认从0开始
        enum MyColor {
            Red, Green, Yellow
        }
        var aMyColor: MyColor = MyColor.Red;
        //联合类型
        var aUnion: string|number = 'a'
        aUnion = 123;
        //接口
        interface IPerson{
            firstName:string,
            sayHi:(value:string)=>string
        }
        var aPerson: IPerson = {
            firstName: 'yanwei',
            sayHi(value:string){
                return value;
            }
        }
        //接口继承
        interface IPerson2 extends IPerson{
            myId: number,
        }
        //类实现
        class Person1{
            name:string = 'yanwei';
            myPrint(){
                cc.log(this.name);
            }
        }
        class Person2 extends Person1 implements IPerson2{
            firstName: string;
            myId: number;
            sayHi(value:string){
                return value;
            }
        }
        var myPerson: Person2 = new Person2();
        myPerson.myPrint();

        //特殊接口
        interface IConfig{
            color?: string,
            [key: string]: any,
            x: number,
        }
        var aConfig: IConfig = {
            x:10,
            y:10,
            color: 'RED',
        }

        //存储器
        class Employee{
            private _fullName:string;
            get FullName(): string{
                return this._fullName;
            }
            set FullName(val:string){
                this._fullName = val;
            }
        }

        //抽象类
        abstract class Animal{
            abstract makeVoice(): void;
        }
        class Dog extends Animal {
            makeVoice(): void{
                cc.log('dog wang wang')
            }
        }

        //泛型
        function myFunc<T>(args: T): T {
            return args;
        }
        myFunc<number>(10);

        //type(类型别名)和interface
        

    }
}
