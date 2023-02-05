//桥接模式  又称接口模式  抽象和实现的分离

abstract class Implementor{
    //实现类接口
    abstract getDesc():string;
}

abstract class Abstraction{
    //抽象类
    implementor: Implementor;
    constructor(implementor: Implementor){
        this.implementor = implementor;
    }
    abstract operation():void;
}

class RefinedAbstraction extends Abstraction{
    //抽象类的扩充实现类
    constructor(implementor: Implementor){
        super(implementor);
    }
    operation(): void {
        cc.log('RefinedAbstraction--', this.implementor.getDesc());
    }
}

//以后去实现接口类就行
class ConcreteImplementorA extends Implementor{
    //接口实现类
    getDesc(): string {
        return '红色的圆形';
    }
}

export {RefinedAbstraction, ConcreteImplementorA}