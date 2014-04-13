YUI.add("column", function(Y) {
	function Column(cfg) {
		Column.superclass.constructor.apply(this, arguments);
	}
	Column.NAME = "column";
	Column.ATTRS = {

	}
	Y.extend(Column, Y.vb.Chart, {
		initializer: function() {
			
		},
		renderUI: function() {
			
		},
		bindUI: function() {

		}
	});

	Y.namespace("vb");
	Y.vb.Column = Column;
}, "1.0.1", {requires:["chart"]});