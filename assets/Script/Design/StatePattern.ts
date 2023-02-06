//状态模式
abstract class State {
    //抽象状态类
    abstract handle(c:Context);
}
class Context{
    //环境类
    m_state: State;
    constructor(state: State){
        this.m_state = state;
    }
    changeState(state: State){
        this.m_state = state;
    }
    request(){
        this.m_state.handle(this);
    }
}

class ConcreteStateA extends State {
    //状态实现类
    handle(c: Context) {
        cc.log('ConcreteStateA handle')
    }
}
class ConcreteStateB extends State {
    //状态实现类
    handle(c: Context) {
        cc.log('ConcreteStateB handle')
    }
}
function testState(){
    var stateA = new ConcreteStateA();
    var stateB = new ConcreteStateB();

    var context = new Context(stateA);
    context.request();
    context.changeState(stateB);
    context.request();
}