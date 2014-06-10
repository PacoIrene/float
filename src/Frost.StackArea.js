Frost.namespace("Frost.StackArea");

function StackArea(cfg) {
	this.height = cfg.height;
	this.width = cfg.width;
	this._container = cfg.container;
	this._parent = cfg.parent;
	this.data = cfg.data;
	this.colorList = cfg.colorList;
	this._seriesName = cfg.seriesName;
	this.isXLinear = cfg.isXLinear || false;
	this.lineType = cfg.lineType || "linear";
	this.detail = cfg.detail;
	this.timeXAxis = cfg.timeXAxis || false;
}
StackArea.prototype.getType = function() {
	return this.type;
};
StackArea.prototype.getHeight = function() {
	return this.height;
};

StackArea.prototype.setHeight = function(data) {
	this.height = data;
};

StackArea.prototype.getWidth = function() {
	return this.width;
};

StackArea.prototype.setWidth = function(data) {
	this.Width = data;
};
StackArea.prototype.getContainer = function() {
	return this._container;
};
StackArea.prototype.setContainer = function(data) {
	this._container = data;
};
StackArea.prototype.getParent = function() {
	return this._parent;
};
StackArea.prototype.getData = function() {
	return this.data;
};
StackArea.prototype.getColorList = function() {
	return this.colorList;
};
StackArea.prototype.getSeriesName = function() {
	return this._seriesName;
};
StackArea.prototype.render = function() {
	var x = this.getParent().getXScale();
	var y = this.getParent().getYScale();
	this._groupContainer = this._container.append("g");
	if(!this.timeXAxis && this.isXLinear == true) {
		x = d3.scale.linear().range([0, this.getWidth()])
	    x.domain([0,this.getParent().getNameDomain().length - 1]);
	    this.getParent().setXScale(x);
	    var area = d3.svg.area()
	    .x(function(d, i) { return x(i); })
	    .y0(function(d) { return y(d.y0); })
	    .y1(function(d) { return y(d.y0 + d.y); });
	} else {
		var area = d3.svg.area()
	    .x(function(d) { return x(d.name) + x.rangeBand() / 2 })
	    .y0(function(d) { return y(d.y0); })
	    .y1(function(d) { return y(d.y0 + d.y); });
	}
	if(this.timeXAxis) {
		var area = d3.svg.area()
	    .x(function(d) { return x(d.name); })
	    .y0(function(d) { return y(d.y0); })
	    .y1(function(d) { return y(d.y0 + d.y); });
	}
	area.interpolate(this.lineType);
	var formatData = Frost.Util.formatDataForStackArea(this.getData());
	var stack = d3.layout.stack()
					    .offset("zero")
					    .values(function(d) { return d.values; })
					    .x(function(d) { return d.name; })
					    .y(function(d) { return d.value; });

	var nest = d3.nest()
	    .key(function(d) { return d.key; });

	var layers = stack(nest.entries(formatData));
	 // x.domain(d3.extent(data, function(d) { return d.date; }));
	y.domain([0, d3.max(formatData, function(d) { return d.y0 + d.y; })]);
	var colorList = Frost.Util.getColorList(this.getData(), layers.length);
	this._groupContainer.selectAll(".frost_stackArea")
				      	.data(layers)
				    	.enter().append("path")
			        	.attr("class", "frost_stackArea")
				        .attr("d", function(d) { return area(d.values); })
				        .style("fill", function(d, i) { return colorList[i]; });
	return this;
};

Frost.StackArea = StackArea;