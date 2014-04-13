/*
 * The outer float.js
 */

YUI.add("float", function(Y) {
	var Column = Y.vb.Column;
	function Float(cfg) {
		Float.superclass.constructor.apply(this, arguments);
	}
	Float.NAME = "float";
	Float.ATTRS = {

	};
	Y.extend(Float, Y.Widget, {
		initializer: function(cfg) {
			this._parent = Y.one(cfg.element);
			this._title = cfg.title;
		},
		renderUI: function() {
			new Column({parentNode: this._parent, title: this._title}).render();
		},
		bindUI: function() {

		}
	});

	Y.namespace("vb");
	Y.vb.Float = Float;
}, "1.0.0", {requires: ['node', 'widget', 'column']});