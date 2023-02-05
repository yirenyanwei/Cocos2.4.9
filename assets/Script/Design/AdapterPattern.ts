//适配器模式
abstract class Target{
    //目标抽象类 适配器继承的类
    abstract request():void;
}
class Adaptee{
    //适配者类，要适配的类
    specificRequest():void {
        cc.log('specificRequest--');
    }
}
class Adapter extends Target {
    //适配器类  转换接口类
    adaptee: Adaptee;
    constructor(adaptee: Adaptee){
        super();
        this.adaptee = adaptee;
    }
    request(): void {
        this.adaptee.specificRequest();
    }
}

export {Target, Adaptee, Adapter}