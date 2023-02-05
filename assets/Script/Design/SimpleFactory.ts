//简单的工厂设计模式
enum ProductType{
    ProductA,
    ProductB
}

abstract class Product{
    productName: string;
    productId: string;
    abstract use():string;
}

class ProductA extends Product{
    constructor(name:string){
        super();
        this.productName = name;
    }
    use(): string {
        return 'ProductA:'+this.productName;
    }
}

class ProductB extends Product{
    constructor(name:string){
        super();
        this.productName = name;
    }
    use(): string {
        return 'ProductB:'+this.productName;
    }
}

class DesignFactory {
    private static _inst: DesignFactory;
    constructor(){

    }
    static getInstance(){
        if(!DesignFactory._inst){
            DesignFactory._inst = new DesignFactory();
        }
        return DesignFactory._inst;
    }
    createProduct(type: ProductType, name:string): Product{
        var product: Product;
        switch(type){
            case ProductType.ProductA:
            {
                product = new ProductA(name);
                break;
            }
            case ProductType.ProductB:
            {
                product = new ProductB(name);
                break;
            }    
        }
        return product;
    }
}

export {DesignFactory, ProductType, Product}