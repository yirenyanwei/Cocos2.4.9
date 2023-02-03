/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class YWComponent1 extends fgui.GComponent {

	public m_myn0:fgui.GButton;
	public static URL:string = "ui://60pk7zrmfgnw0";

	public static createInstance():YWComponent1 {
		return <YWComponent1>(fgui.UIPackage.createObject("Package2", "Component1"));
	}

	protected onConstruct():void {
		this.m_myn0 = <fgui.GButton>(this.getChildAt(0));
	}
}