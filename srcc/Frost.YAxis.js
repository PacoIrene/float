Frost.namespace("Frost.YAxis");

function YAxis(cfg) {
	this._parent = cfg.parent;
	this._container = cfg.container;
	this.xSpace = cfg.xSpace || 0;
	this.ySpace = cfg.ySpace || 0;
}


YAxis.prototype.getParent = function() {
	return this._parent;
};

YAxis.prototype.getContainer = function() {
	return this._container;
};

YAxis.prototype.getySpace = function() {
	return this.ySpace;
};

YAxis.prototype.getxSpace = function() {
	return this.xSpace;
};

YAxis.prototype.render = function() {
	this.yAxisNode = this._container.append("g")
							  .attr("class", "frost_axis frost_yAxis")
							  .attr("transform", "translate("+ this.getxSpace() +", "+this.getySpace()+")");    
	var yAxis = d3.svg.axis()
	    .scale(this.getParent().getYScale())
	    .tickSize(1)
	    .tickPadding(4)
	    .orient("left");
	this.yAxisNode.call(yAxis);
	return this;
}

Frost.YAxis = YAxis;