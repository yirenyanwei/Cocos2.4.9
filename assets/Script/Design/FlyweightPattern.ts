//享元模式 实现对象的复用
abstract class Flyweight {
    //享元抽象类
    abstract operation():void;
}
class ConcreteFlyweight extends Flyweight{
    //共享享元的实现
    intrinsicState: string;
    constructor(state:string){
        super();
        this.intrinsicState = state;
    }
    operation(): void {
        cc.log('ConcreteFlyweight:', this.intrinsicState);
    }
}
class FlyweightFactory {
    shareds: Map<string, Flyweight>;
    constructor(){
        this.shareds = new Map();
    }
    getFlyWeight(state:string): Flyweight{
        var res = this.shareds.get(state);
        if(!res){
            res = new ConcreteFlyweight(state);
            this.shareds.set(state, res);
        }
        return res;
    }
}

function testFlyWeight(){
    var factory = new FlyweightFactory();
    var fly1 = factory.getFlyWeight('one');
    var fly2 = factory.getFlyWeight('two');
    //复用
    var fly3 = factory.getFlyWeight('one');
    
}