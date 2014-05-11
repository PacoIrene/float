Frost.namespace("Frost.Column");

function Column(cfg) {
	this.value = cfg.value;
	this.x = cfg.x;
	this.value = cfg.value;
	this.height = cfg.height;
	this.width = cfg.width;
	this.color = cfg.color || "steelblue";
	this.name = cfg.name || "";
	this._container = cfg.container;
	this._parent = cfg.parent;
	this._isHighLight = false;
}

Column.prototype.getValue = function() {
	return this.value;
};

Column.prototype.setValue = function(data) {
	this.value = data;
};

Column.prototype.getX = function() {
	return this.x;
};

Column.prototype.setX = function(data) {
	this.x = data;
};

Column.prototype.getValue = function() {
	return this.value;
};

Column.prototype.setValue = function(data) {
	this.value = data;
};

Column.prototype.getHeight = function() {
	return this.height;
};

Column.prototype.setHeight = function(data) {
	this.height = data;
};

Column.prototype.getWidth = function() {
	return this.width;
};

Column.prototype.setWidth = function(data) {
	this.Width = data;
};

Column.prototype.getColor = function() {
	return this.color;
};

Column.prototype.setColor = function(data) {
	this.color = data;
};

Column.prototype.getName = function() {
	return this.name;
};

Column.prototype.setName = function(data) {
	this.name = data;
};

Column.prototype.getContainer = function() {
	return this._container;
};

Column.prototype.setContainer = function(data) {
	this._container = data;
};
//return Columns
Column.prototype.getParent = function() {
	return this._parent;
};
Column.prototype.getRectNode = function() {
	return this._rectNode;
};
Column.prototype.isHighLight = function() {
	return this._isHighLight;
}
Column.prototype.setHighLight = function() {
	this._isHighLight = true;
	this.getRectNode().attr("fill", "#0870B4");
};
Column.prototype.deleteHighLight = function() {
	this._isHighLight = false;
	this.getRectNode().attr("fill", this.getColor());
};
Column.prototype.render = function() {
	this._rectNode = this._container.append("rect")
				  					.attr("x", this.getX())
								  	.attr("y", this.getValue())
								  	.attr("width", this.getWidth())
								  	.attr("height", this.getHeight())
								  	.attr("fill", this.getColor());
	this._bindUI();
	return this;
};

Column.prototype._bindUI = function() {
	var that = this;
	var detailNode = that.getParent().getParent().getDetail();
	this._rectNode.on("mouseover", function() {
		var position = d3.mouse(this);
		detailNode.setContent(that.getName() + ":" + that.getValue());
		detailNode.setPosition({x: position[0], y: position[1]});
		detailNode.show();
	});
	this._rectNode.on("mousemove", function() {
		var position = d3.mouse(this);
		detailNode.setPosition({x: position[0] + 8, y: position[1]});
	});
	this._rectNode.on("mouseleave", function() {
		detailNode.hide();
	});
	this._rectNode.on("click", function() {
		d3.event.stopPropagation();
		if(that.isHighLight()) {
			that.deleteHighLight();
		} else {
			that.setHighLight();
		}
	});
};
Frost.Column = Column;