/**
 * 装饰器测试
 */
//1、类装饰器
/**
类装饰器表达式会在运行时当作函数被调用，类的构造函数作为其唯一的参数。
如果类装饰器返回一个值，它会使用提供的构造函数来替换类的声明。
 */
@myclass
class Greater{
    static id:number = 0;
    message:string;
    constructor(message:string){
        this.message = message
    }
    @mymethod(false)
    showMessage(){
        cc.log('message--', '调用showMessage')
    }
    @myproperty('property')
    myid:number;
}

function myclass(constructor:any){
    cc.log('myclass--')
    constructor.id++;
}

cc.log('id--', Greater.id);

//2、方法装饰器
/**
方法装饰器表达式会在运行时当作函数被调用，传入下列3个参数：
对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
成员的名字。
成员的属性描述符。
 */
let greater = new Greater('default')
function mymethod(value:boolean){
    return function(target:any, name:string, descriptor:PropertyDescriptor){
        cc.log('mymethod--', name)
        descriptor.enumerable = value
    };
}
greater.showMessage()

//3、属性装饰器
/**
属性装饰器表达式会在运行时当作函数被调用，传入下列2个参数：
对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
成员的名字。
 */
function myproperty(value:string){
    return function(targer:any, name:string){
        cc.log('myproperty--', name)
    }
}