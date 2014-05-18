Frost.namespace("Frost.Line");

function Line(cfg) {
	this.color = cfg.color;
	this._container = cfg.container;
	this._parent = cfg.parent;
	this.data = cfg.data;
	this.height = cfg.height;
	this.width = cfg.width;
	this._seriesName = cfg.seriesName;
	this.isXLinear = cfg.isXLinear || false;
	this.lineType = cfg.lineType || "linear";
	this.detail = cfg.detail;
}
Line.prototype.getHeight = function() {
	return this.height;
};

Line.prototype.setHeight = function(data) {
	this.height = data;
};

Line.prototype.getWidth = function() {
	return this.width;
};

Line.prototype.setWidth = function(data) {
	this.Width = data;
};
Line.prototype.getContainer = function() {
	return this._container;
};

Line.prototype.setContainer = function(data) {
	this._container = data;
};
Line.prototype.getParent = function() {
	return this._parent;
};
Line.prototype.getColor = function() {
	return this.color;
};
Line.prototype.getData = function() {
	return this.data;
};
Line.prototype.getGroupContainer = function() {
	return this._groupContainer;
};
Line.prototype.getSeriesName = function() {
	return this._seriesName;
};

Line.prototype.render = function() {
	var x = this.getParent().getParent().getXScale();
	var y = this.getParent().getParent().getYScale();
	if(this.isXLinear == true) {
		x = d3.scale.linear().range([0, this.getWidth()])
	    x.domain([0,this.getParent().getParent().getNameDomain().length - 1]);
	    this.getParent().getParent().setXScale(x);
	    var line = d3.svg.line()
				    	 .x(function(d, i) { return x(i); })
				    	 .y(function(d) { return y(d.value); });
	} else {
		var line = d3.svg.line()
			     .x(function(d, i) { 
			     	console.log(x(d.name) + x.rangeBand() / 2);
			     	return x(d.name) + x.rangeBand() / 2; })
			     .y(function(d) { return y(d.value); });
	}
	line.interpolate(this.lineType);
	this._groupContainer = this._container.append("g");
    this._groupContainer.append("path")
					    .datum(this.getData())
					    .attr("class", "frost_line")
					    .attr("d", line)
					    .style("stroke", this.getColor());
};

Frost.Line = Line;