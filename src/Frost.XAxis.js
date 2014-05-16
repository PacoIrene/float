Frost.namespace("Frost.XAxis");

function XAxis(cfg) {
	// this.domainRange = cfg.length;
	this.width = cfg.width;
	this._parent = cfg.parent;
	this.xSpace = cfg.xSpace || 0;
	this.ySpace = cfg.ySpace || 0;
	this._container = cfg.container;
}
XAxis.prototype.getWidth = function() {
	return this.width;
}
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
	this.xAxisNode = this._container.append("g")
							  .attr("class", "frost_axis frost_xAxis")
							  .attr("transform", "translate("+ this.getxSpace() + ","+ this.getySpace() +")");
	var xAxis = d3.svg.axis()
	    .scale(this.getParent().getXScale())
	    .tickSize(1)
	    .tickPadding(4)
	    .orient("bottom");
	this.xAxisNode.call(xAxis)
	.append("text")
      .attr("class", "label")
      .attr("x", this.getWidth())
      .attr("y", -6)
      .style("text-anchor", "end")
      .text("");
	return this;
};

Frost.XAxis = XAxis;