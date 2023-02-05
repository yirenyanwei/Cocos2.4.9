//代理模式 中介作用

abstract class Subject{
    //抽象主题角色，需要实现的方法放到这里
    abstract request():void;
}

class RealSubject extends Subject {
    //真实主题角色
    request(): void {
        cc.log('realSubject:', 'request')
    }
}

class ProxyPattern extends Subject{
    //代理主题角色
    realSubject: RealSubject;
    constructor(){
        super();
        this.realSubject = new RealSubject();
    }
    request(): void {
        this.realSubject.request();
    }
    preRequest(): void {
        cc.log('ProxyPattern:' , 'prerequest');
    }
}

function testProxy() {
    var proxy = new ProxyPattern();
    proxy.request();
}