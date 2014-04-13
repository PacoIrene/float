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
	Y.extend(Float, Y.Base, {
		initializer: function(cfg) {
			this._parent = Y.one(cfg.element);
			this._title = cfg.title;
			this._width = cfg.width;
			this._height = cfg.height;
			this._series = cfg.series;
			this._content = Y.Node.create("<div></div>");
			this._parent.append(this._content);
		},
		render: function() {
			new Column({
				parentNode: this._parent, 
				title: this._title, 
				width: this._width, 
				height: this._height, 
				boundingBox: this._parent, 
				contentBox: this._content,
				series: this._series
			}).render();
		},
		_bindUI: function() {

		}
	});

	Y.namespace("vb");
	Y.vb.Float = Float;
}, "1.0.0", {requires: ['node', 'base', 'column']});