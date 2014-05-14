Frost.namespace("Frost.Area");

function Area(cfg) {
	this.color = cfg.color;
	this._container = cfg.container;
	this._parent = cfg.parent;
	this.data = cfg.data;
	this.height = cfg.height;
	this.width = cfg.width;
	this._seriesName = cfg.seriesName;
	this.isXLinear = cfg.isXLinear || true;
	this.lineType = cfg.lineType || "linear";
}
Area.prototype.getHeight = function() {
	return this.height;
};

Area.prototype.setHeight = function(data) {
	this.height = data;
};

Area.prototype.getWidth = function() {
	return this.width;
};

Area.prototype.setWidth = function(data) {
	this.Width = data;
};
Area.prototype.getContainer = function() {
	return this._container;
};

Area.prototype.setContainer = function(data) {
	this._container = data;
};
Area.prototype.getParent = function() {
	return this._parent;
};
Area.prototype.getColor = function() {
	return this.color;
};
Area.prototype.getData = function() {
	return this.data;
};
Area.prototype.getGroupContainer = function() {
	return this._groupContainer;
};
Area.prototype.getSeriesName = function() {
	return this._seriesName;
};
Area.prototype.getIsStright = function() {
	return this.isStright;
};
Area.prototype.render = function() {
	var x = this.getParent().getXScale();
	var y = this.getParent().getYScale();
	var height = this.getHeight();
	this._groupContainer = this._container.append("g");
	if(this.isXLinear == true) {
		x = d3.scale.linear().range([0, this.getWidth()])
	    x.domain([0,this.getParent().getNameDomain().length - 1]);
	    this.getParent().setXScale(x);
	    var area = d3.svg.area()
			     .x(function(d, i) { 
			     	return x(i); 
			     })
			     .y0(height)
			     .y1(function(d) { return y(d.value); });
	} else {
		var area = d3.svg.area()
			     .x(function(d, i) { 
			     	return x(d.name) + x.rangeBand() / 2; 
			     })
			     .y0(height)
			     .y1(function(d) { return y(d.value); });
	}
	area.interpolate(this.lineType);
			     // 
    this._groupContainer.append("path")
				        .datum(this.getData())
				        .attr("class", "frost_area")
				        .attr("d", area)
				        .attr("fill", this.getColor());
	return this;
};

Frost.Area = Area;