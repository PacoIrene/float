Frost.namespace("Frost.YAxis");

function YAxis(cfg) {
	this.domainRange = cfg.length;
	this.height = cfg.height;
	this._parent = cfg.parent;
	this._container = cfg.container;
	this.outerPadding = cfg.outerPadding || 0;
	this.padding = cfg.padding || 0;
	this.step = cfg.step || 0; 
	this.xSpace = cfg.xSpace || 0;
	this.ySpace = cfg.ySpace || 0;
}

YAxis.prototype.getOuterPadding = function() {
	return this.outerPadding;
};

YAxis.prototype.getStep = function() {
	return this.step;
};

YAxis.prototype.getPadding = function() {
	return this.padding;
};

YAxis.prototype.getDomainRange = function() {
	return this.domainRange;
};

YAxis.prototype.getHeight = function() {
	return this.height;
};

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
	var step = this.getStep() == 0?1:this.getStep();
	var paddingRate = this.getPadding() / step;
	var outerPaddingRate = this.getOuterPadding() / step;
	this.yAxisNode = this._container.append("g")
							  .attr("class", "frost_yAxis")
							  .attr("transform", "translate("+ this.getxSpace() +", "+this.getySpace()+")");
	var y = d3.scale.ordinal()
	    .domain(d3.range(this.getDomainRange()))
	    .rangeBands([this.getHeight(), 0]);
	var yAxis = d3.svg.axis()
	    .scale(y)
	    .tickSize(1)
	    .tickPadding(4)
	    .orient("left");
	this.yAxisNode.call(yAxis);
	return this;
}

Frost.YAxis = YAxis;