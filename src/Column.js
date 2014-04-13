YUI.add("column", function(Y) {
	function Column(cfg) {
		Column.superclass.constructor.apply(this, arguments);
	}
	Column.NAME = "column";
	Column.ATTRS = {
		columnsList: {
			value: []
		}
	}
	Y.extend(Column, Y.vb.Chart, {
		initializer: function() {
		},
		renderUI: function() {
			var columnsGroupNode = Y.Node.create("<g></g>");
			Y.each(this.getSeries(), function(v,k) {
				this.getColumnsList().push(
					new SingleColumn({
						parentChart: this, 
						width: 20, 
						height: v.y, 
						x: v.x*20 + 10, 
						y: 300, 
						color: v.color,
						boundingBox: this.getContentNode(),
						contentBox: this.getContentNode()
					}).render());
			}, this);
			// this.getContentNode().append(columnsGroupNode);
		},
		bindUI: function() {
			
		},
		getColumnsList: function(){
			return this.get("columnsList");
		}
	});

	function SingleColumn(cfg) {
		SingleColumn.superclass.constructor.apply(this, arguments);
	}
	SingleColumn.NAME = "singleColumn";
	SingleColumn.ATTRS = {
		parentChart: {
			value: null
		},
		width: {
			value: 0
		},
		height: {
			value: 0
		},
		x: {
			value: 0
		},
		y: {
			value: 0
		},
		color: {
			value: ""
		}
	}
	Y.extend(SingleColumn, Y.Widget, {
		initializer: function() {
			this._rectNode = Y.Node.create("<rect></rect>");
			this.get("contentBox").append(this._rectNode);
		},
		renderUI: function() {
			this._rectNode.setAttribute("x", 50);
			this._rectNode.setAttribute("y", 50);
			this._rectNode.setAttribute("width", 20);
			this._rectNode.setAttribute("height", 50);
			this._rectNode.setAttribute("fill", "green");
		},
		bindUI: function() {

		},
		getParentChart: function() {
			return this.get("parentChart");
		},
		getWidth: function() {
			return this.get("width");
		},
		getHeight: function() {
			return this.get("height");
		},
		getX: function() {
			return this.get("x");
		},
		getY: function() {
			return this.get("y");
		},
		getColor: function() {
			return this.get("color");
		}
	});

	Y.namespace("vb");
	Y.vb.Column = Column;
}, "1.0.1", {requires:["chart"]});