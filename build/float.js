/*
 * The main use in float
 */
YUI.GlobalConfig = {
    modules: {
        float: '/Float.js'
        // module2: '/path/to/my/module2.js',
        // module3: {
        //     fullpath: '/path/to/my/module3.js',
        //     requires: [ 'node', 'event', 'dd', 'yql']
        // }
    }
};
YUI().use("float", function(Y){
	Float = Y.vb.Float;
	var graph = new Float({element:"#node"});
});
/*
 * The outer float.js
 */

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