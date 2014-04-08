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
			console.log(element);
		}
	});

	Y.namespace("vb");
	Y.vb.Float = Float;
}, "1.0.0", {requires: ['node', 'Base']});