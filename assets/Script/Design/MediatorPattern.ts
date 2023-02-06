//中介者模式  方便用户同事之间的通信

abstract class Mediator{
    //抽象中介
    m_mapColleagues: Map<number, Colleague>;
    constructor(){
        this.m_mapColleagues = new Map();
    }
    registered(who: number, colleague: Colleague){
        var temp = this.m_mapColleagues.get(who);
        if(!temp){
            this.m_mapColleagues.set(who, colleague);
            colleague.setMediator(this);
        }
    }
    operation(who: number, msg: string){
        var colleague = this.m_mapColleagues.get(who)
        if(colleague){
            colleague.receivemsg(msg);
        }
    }
}
abstract class Colleague{
    //抽象的同事类
    mediator: Mediator;
    setMediator(mediator: Mediator){
        this.mediator = mediator;
    }
    abstract sendmsg(toWho: number, msg: string);
    abstract receivemsg(msg: string):void;
}

class ConcreteMediator extends Mediator {
    //具体中介者
    registered(who: number, colleague: Colleague): void {
        super.registered(who, colleague);
    }
    operation(who: number, msg: string): void {
        super.operation(who, msg);
    }
}

class ConcreteColleagueA extends Colleague {
    sendmsg(toWho: number, msg: string) {
        cc.log('ConcreteColleagueA sendmsg to', toWho, msg);
        this.mediator.operation(toWho, msg);
    }
    receivemsg(msg: string): void {
        cc.log('ConcreteColleagueA receivemsg', msg);

    }
}

class ConcreteColleagueB extends Colleague {
    sendmsg(toWho: number, msg: string) {
        cc.log('ConcreteColleagueB sendmsg to', toWho, msg);
        this.mediator.operation(toWho, msg);
    }
    receivemsg(msg: string): void {
        cc.log('ConcreteColleagueB receivemsg', msg);
        
    }
}

function testMediator(){
    var concreteMediator = new ConcreteMediator();
    var colleagueA = new ConcreteColleagueA();
    colleagueA.setMediator(concreteMediator);
    var colleagueB = new ConcreteColleagueB();
    colleagueB.setMediator(concreteMediator);

    concreteMediator.registered(0, colleagueA);
    concreteMediator.registered(1, colleagueB);
    //A同事给B同事发消息
    colleagueA.sendmsg(1, 'hello colleagueB');
}
export {testMediator}