//工厂模式
abstract class Product {
    name: string;
    abstract use():void;
}

class ProductA extends Product {
    constructor(name: string){
        super();
        this.name = name;
    }
    use(): void {
        cc.log('Factory Pattern ProductA:', this.name);
    }
}

abstract class Factory{
    abstract createProduct(name:string):Product;
}

class FactoryA extends Factory {
    createProduct(name:string): Product {
        var product = new ProductA(name);
        return product;
    }
}
export {Factory, Product, FactoryA}