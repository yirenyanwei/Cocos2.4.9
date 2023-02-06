//观察者模式
abstract class Observer{
    //观察者
    abstract update(msg:any);
}
class SubjectObject {
    //具体目标
    m_objs:Array<Observer> = [];
    attach(observer: Observer){
        this.m_objs.push(observer)
    }
    detach(observer: Observer){
        for(let i = 0; i<this.m_objs.length; i++){
            if(this.m_objs[i] == observer){
                this.m_objs.splice(i, 1);
                return;
            }
        }
    }
    notify(msg:any){
        for(let obj of this.m_objs){
            obj.update(msg);
        }
    }
}

class ConcreteObserver extends Observer {
    update(msg: any) {
        cc.log('ConcreteObserver: update', msg);
    }
}

function testObserver(){
    var subject = new SubjectObject();
    var observerA = new ConcreteObserver();
    var observerB = new ConcreteObserver();
    
    subject.attach(observerA);
    subject.attach(observerB);
    subject.notify('hello');
}