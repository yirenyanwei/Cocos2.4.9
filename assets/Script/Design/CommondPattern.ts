//命令模式
abstract class Command{
    //抽象命令类
    receiver: Receirver;
    constructor(receiver:Receirver){
        this.receiver = receiver;
    }
    abstract execute():void;
}
class Receirver{
    //接收者
    action(){
        cc.log('Receiver do action');
    }
}
class Invoker{
    //调用者
    command: Command;
    constructor(command:Command){
        this.command = command;
    }
    call(){
        this.command.execute();
    }
}

class ConcreteCommandA extends Command {
    //具体的命令
    execute(): void {
        cc.log('ConcreteCommandA execute')
        this.receiver.action();
    }
}

function testCommand(){
    var receiver = new Receirver();
    var command = new ConcreteCommandA(receiver);
    var invoker = new Invoker(command);
    invoker.call();
}