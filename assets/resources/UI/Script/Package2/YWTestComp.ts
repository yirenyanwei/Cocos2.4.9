/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class YWTestComp extends fgui.GComponent {

	public m_c1:fgui.Controller;
	public m_c2:fgui.Controller;
	public m_t0:fgui.Transition;
	public static URL:string = "ui://60pk7zrmvx1s3";

	public static createInstance():YWTestComp {
		return <YWTestComp>(fgui.UIPackage.createObject("Package2", "TestComp"));
	}

	protected onConstruct():void {
		this.m_c1 = this.getControllerAt(0);
		this.m_c2 = this.getControllerAt(1);
		this.m_t0 = this.getTransitionAt(0);
	}
}