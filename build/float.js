YUI({modules: {
	"float": {
		fullpath: "../src/Float.js"
	}}}).use("float", function(Y){
	Float = Y.vb.Float;
	var graph = new Float({element:"#node"});
});
YUI.add("float", function(Y) {
	function Float(cfg) {
		Float.superclass.constructor.apply(this, arguments);
	}
	Float.NAME = "float";
	Float.ATTRS = {

	};
	Y.extend(Float, Y.Base, {
		initializer: function(cfg) {
			var element = Y.one(cfg.element);
			element.setContent("First try!");
		}
	});

	Y.namespace("vb");
	Y.vb.Float = Float;
}, "1.0.0", {requires: ['node', 'base']});