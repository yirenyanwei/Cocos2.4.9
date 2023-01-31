//导出测试
var testA1:number = 100;
export default testA1;

export var testA2:string = 'yanwei';
export var testA3:string = 'hao';
export function testA4():void {

}

var testB1:boolean = true;
var testB2:boolean = false;
function testB3():void {
    cc.log('this is testB3')
}
export {testB1, testB2, testB3}