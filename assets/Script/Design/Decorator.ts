//装饰器模式 动态给对象添加职责

abstract class Component {
    //抽象构件
    abstract operator():void;
}

class ConcreteComponent extends Component {
    //基础构件
    operator(): void {
        cc.log('Component base');
    }
}

abstract class Decorator extends Component {
    //抽象装饰器类
    component:Component;
    constructor(component: Component){
        super();
        this.component = component;
    }
    operator(): void {
        this.component.operator();
        this.addBehaviour();
    }
    abstract addBehaviour():void;
}

class ConcreteDecoratorA extends Decorator {
    //装饰器实现类
    addBehaviour(): void {
        cc.log('Add A Decorator');
    }
}

class ConcreteDecoratorB extends Decorator {
    addBehaviour(): void {
        cc.log('Add B Decorator');
    }
}

function testDecorator(){
    var concreteComponent = new ConcreteComponent();
    var cda = new ConcreteDecoratorA(concreteComponent);
    var cdb = new ConcreteDecoratorB(cda);
    cdb.operator();
}

export { testDecorator}