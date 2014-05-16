Frost.namespace("Frost.YAxis");

function YAxis(cfg) {
	this._parent = cfg.parent;
	this._container = cfg.container;
	this.xSpace = cfg.xSpace || 0;
	this.ySpace = cfg.ySpace || 0;
	this.width = cfg.width;
	this.hasStandard = cfg.hasStandard || false;
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
YAxis.prototype.getWidth = function() {
	return this.width;
};

YAxis.prototype.render = function() {
	this.yAxisNode = this._container.append("g")
							  .attr("class", "frost_axis frost_yAxis")
							  .attr("transform", "translate("+ this.getxSpace() +", "+this.getySpace()+")");    
	var yAxis = d3.svg.axis()
	    .scale(this.getParent().getYScale())
	    .tickPadding(4)
	    .orient("left");
	if(this.hasStandard) {
		yAxis.tickSize(-this.getWidth());
		this.yAxisNode.attr("class", "frost_axis frost_yAxis frost_yAxis_withStandard");
	} else {
		yAxis.tickSize(-4);
	}
	this.yAxisNode.call(yAxis)
	.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("");
	return this;
}

Frost.YAxis = YAxis;