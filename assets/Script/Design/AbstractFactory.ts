//抽象工厂模式 每个工厂可以生产多个商品

abstract class AbsProductXYJ{
    name:string;
    //洗衣服
    abstract wash():void;
}
abstract class AbsProductBX{
    //冰箱
    name:string;
    //冷冻
    abstract freeze():void;
}

class HaierXYJ extends AbsProductXYJ {
    constructor(){
        super();
        this.name = '海尔洗衣机';
    }
    wash(): void {
        cc.log(this.name, '洗衣服');
    }
}

class HaierBX extends AbsProductBX {
    constructor(){
        super();
        this.name = '海尔冰箱';
    }
    freeze(): void {
        cc.log(this.name, '冷冻');
    }
}

abstract class Factory {
    //洗衣机
    abstract createXYJ():AbsProductXYJ;
    //冰箱
    abstract createBX():AbsProductBX;
}

class HaierFactory extends Factory {
    createBX(): AbsProductBX {
        return new HaierBX();
    }
    createXYJ(): AbsProductXYJ {
        return new HaierXYJ();
    }
}

export {AbsProductBX, AbsProductXYJ, HaierFactory}