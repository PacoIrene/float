Frost.namespace("Frost.XAxis");

function XAxis(cfg) {
	this.domainRange = cfg.length;
	this.width = cfg.width;
	this._parent = cfg.parent;
	this._container = cfg.container;
}

XAxis.prototype.getDomainRange = function() {
	return this.domainRange;
};

XAxis.prototype.getWidth = function() {
	return this.width;
};

XAxis.prototype.getParent = function() {
	return this._parent;
};

XAxis.prototype.getContainer = function() {
	return this._container;
};

XAxis.prototype.render = function() {
	var x = d3.scale.ordinal()
	    .domain(d3.range(this.getDomainRange()))
	    .rangeRoundBands([0, this.getWidth()], .38);
	var xAxis = d3.svg.axis()
	    .scale(x)
	    .tickSize(1)
	    .tickPadding(10)
	    .orient("bottom");
	this._container.call(xAxis);
	return this;
};

Frost.XAxis = XAxis;