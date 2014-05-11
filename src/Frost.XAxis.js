Frost.namespace("Frost.XAxis");

function XAxis(cfg) {
	this.domainRange = cfg.length;
	this.width = cfg.width;
	this._parent = cfg.parent;
	this.xSpace = cfg.xSpace || 0;
	this.ySpace = cfg.ySpace || 0;
	this.valueList = cfg.valueList;
	this.outerPadding = cfg.outerPadding;
	this.padding = cfg.padding;
	this.step = cfg.step;
	this._container = cfg.container;
}

XAxis.prototype.getDomainRange = function() {
	return this.domainRange;
};

XAxis.prototype.getValueList = function() {
	return this.valueList;
};

XAxis.prototype.getOuterPadding = function() {
	return this.outerPadding;
};

XAxis.prototype.getStep = function() {
	return this.step;
};

XAxis.prototype.getPadding = function() {
	return this.padding;
};

XAxis.prototype.getWidth = function() {
	return this.width;
};

XAxis.prototype.getySpace = function() {
	return this.ySpace;
};

XAxis.prototype.getxSpace = function() {
	return this.xSpace;
};

XAxis.prototype.getParent = function() {
	return this._parent;
};

XAxis.prototype.getContainer = function() {
	return this._container;
};

XAxis.prototype.render = function() {
	var step = this.getStep();
	var paddingRate = this.getPadding() / step;
	var outerPaddingRate = this.getOuterPadding() / step;
	this.xAxisNode = this._container.append("g")
							  .attr("class", "frost_xAxis")
							  .attr("transform", "translate("+ this.getxSpace() + ","+ this.getySpace() +")");
	var x = d3.scale.ordinal()
	    .domain(["A","B","C","D","E"])
	    .rangeBands([0, this.getWidth()], paddingRate, outerPaddingRate);
	var xAxis = d3.svg.axis()
	    .scale(x)
	    .tickSize(1)
	    .tickPadding(4)
	    .orient("bottom");
	this.xAxisNode.call(xAxis);
	return this;
};

Frost.XAxis = XAxis;