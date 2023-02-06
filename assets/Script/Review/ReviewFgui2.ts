// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;
import { DesignFactory, ProductType, Product } from "../Design/SimpleFactory";
import { Product as ProductPattern, Factory as FactoryPattern ,FactoryA } from "../Design/FactoryPattern";
import { AbsProductBX, AbsProductXYJ, HaierFactory } from "../Design/AbstractFactory";
import { Adaptee, Target, Adapter } from "../Design/AdapterPattern";
import { RefinedAbstraction, ConcreteImplementorA } from "../Design/BridgePattern";
import { testDecorator } from "../Design/Decorator";
import { testMediator } from "../Design/MediatorPattern";

@ccclass
export default class NewClass extends cc.Component {

    private _view:fgui.GComponent;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        fgui.GRoot.create()
        //加载多语言
        cc.resources.load('UI/en', cc.TextAsset, (error, asset: cc.TextAsset)=>{
            fgui.UIPackage.setStringsSource(asset.text);
            fgui.UIPackage.loadPackage('UI/Package1', (error, pkg:fgui.UIPackage)=>{
                this.showPackage1()
            })
        })

        //test 设计模式
        this.testDesignModel();
        
    }
    showPackage1(){
        this._view = fgui.UIPackage.createObject('Package1', 'Component4').asCom;
        //全屏适配
        this._view.makeFullScreen();
        fgui.GRoot.inst.addChild(this._view);
    }

    // update (dt) {}
    testDesignModel(){
        //简单工厂模式
        var factory = DesignFactory.getInstance();
        var productA: Product = factory.createProduct(ProductType.ProductA, '食品');
        cc.log('factory--', productA.use());

        //工厂模式
        var factoryP:FactoryPattern = new FactoryA();
        var productAP:ProductPattern = factoryP.createProduct('汽车');
        productAP.use();

        //抽象工厂模式
        var haier: HaierFactory = new HaierFactory();
        var productBX:AbsProductBX = haier.createBX();
        var productXYJ:AbsProductXYJ = haier.createXYJ();
        productBX.freeze();
        productXYJ.wash();

        //适配器模式
        var adaptee = new Adaptee();
        var target = new Adapter(adaptee);
        target.request();

        //桥接模式 或接口模式
        var obstration = new RefinedAbstraction(new ConcreteImplementorA());
        obstration.operation();

        //装饰器模式
        testDecorator();

        //中介者模式
        testMediator();
    }
}
