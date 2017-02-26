package frameTypes;

import frameComponents.FrameComponent;

public class AnObjectFrame extends AFrame {
	
	private FrameComponent object; 
	
	public AnObjectFrame() {
		this.setFrameType(FrameType.OBJECT);
	}
	
	public FrameComponent getObject() {
		return object;
	}
	
	public void setObject(FrameComponent newObject) {
		object = newObject;
	}

}
