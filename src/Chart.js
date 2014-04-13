YUI.add("chart", function(Y) {
	function Chart(cfg) {
		Chart.superclass.constructor.apply(this, arguments);
	}
	Chart.NAME = "chart";
	Chart.ATTRS = {
		title: {
			value: ""
		},
		width: {
			value: 0
		},
		height: {
			value: 0
		},
		type: {
			value: 0
		},
		parentNode: {
			value: null
		},
		series: {
			value: []
		}
	};
	Y.extend(Chart, Y.Widget, {
		/* Chart initial function
		 * this._contentNode: The Node that contains all the chart details
		 * this._titleNode:   The Node that contains the chart title
		 * 
		 */
		initializer: function() {
			this._contentNode = Y.Node.create("<svg></svg>");
			this._contentNode.addClass("float_content");
			this._titleNode = Y.Node.create("<div></div>");
			this._titleNode.setContent(this.getTitle());
			this._titleNode.addClass("float_title");
			this.getParentNode().append(this._contentNode);
			this.getParentNode().append(this._titleNode);
		},
		renderUI: function() {

		},
		bindUI: function() {

		},
		getTitle: function() {
			return this.get("title");
		},
		getWidth: function() {
			return this.get("width");
		},
		getHeight: function() {
			return this.get("height");
		},
		getType: function() {
			return this.get("type");
		},
		getParentNode: function() {
			return this.get("parentNode");
		},
		getSeries: function() {
			return thid.get("series");
		}
	});

	Y.namespace("vb");
	Y.vb.Chart = Chart;
}, "1.0.1", {requires: ["node", "widget"]});