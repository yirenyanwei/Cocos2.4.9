//外观模式 必须经过一个统一的外观对象

class SystemA {
    //子系统
    operationA(){
        cc.log('operatorA');
    }
}
class SystemB {
    operationB(){
        cc.log('operatorB');
    }
}
class SystemC {
    operationC(){
        cc.log('operatorC');
    }
}

class Facade {
    systemA: SystemA;
    systemB: SystemB;
    systemC: SystemC;
    wrapOperation(){
        cc.log('外观模式');
        this.systemA.operationA();
        this.systemB.operationB();
        this.systemC.operationC();
    }
}