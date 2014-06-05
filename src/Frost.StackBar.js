Frost.namespace("Frost.StackBar");

function StackBar(cfg) {
	this.height = cfg.height;
	this.width = cfg.width;
	this._container = cfg.container;
	this._parent = cfg.parent;
	this.data = cfg.data;
	this.colorList = cfg.colorList;
	this._seriesName = cfg.seriesName;
	this.type = cfg.type || 1;
	this.detail = cfg.detail;
	this.hasDetail = cfg.hasDetail || false;
}
StackBar.prototype.getType = function() {
	return this.type;
};
StackBar.prototype.getHeight = function() {
	return this.height;
};

StackBar.prototype.setHeight = function(data) {
	this.height = data;
};

StackBar.prototype.getWidth = function() {
	return this.width;
};

StackBar.prototype.setWidth = function(data) {
	this.Width = data;
};
StackBar.prototype.getContainer = function() {
	return this._container;
};
StackBar.prototype.setContainer = function(data) {
	this._container = data;
};
StackBar.prototype.getParent = function() {
	return this._parent;
};
StackBar.prototype.getData = function() {
	return this.data;
};
StackBar.prototype.getColorList = function() {
	return this.colorList;
};
StackBar.prototype.getSeriesName = function() {
	return this._seriesName;
};
StackBar.prototype.render = function() {
	var that = this;
	function mousemove(d) {
		var x0 = x(d.name) + d3.mouse(this)[0] +  (that.getWidth() / 500 -1) * 50;
		var y0 = d3.mouse(this)[1] + (that.getHeight() / 300 -1) * 10;
		var content = d.name + ": " +d.total +"<br><br>";
		for(var i = 0; i != d.data.length; i++) {
			content += d.data[i].name+ ": " + (d.data[i].y1 - d.data[i].y0) + "<br>";
		}
		that.detail.setContent({position: {x: x0, y:y0},contentValue: content});
	}
	var groupNodeMouseX = 0;
	var x = this.getParent().getXScale();
	var y = this.getParent().getYScale();
	var colorList = this.getColorList();
	if(this.getType() == 1) {
		this.data = Frost.Util.formatDataForStackBar(this.getData(), 1);
		// x.domain(this.getParent().getSeriesName());
		colorList = Frost.Util.getColorList(this.getData(), this.getParent().getNameDomain().length);
		this.getParent().setColorList(colorList);
		this.getParent().setLegendName(this.getParent().getNameDomain());
		x.domain(this.getSeriesName());
	} else if(this.getType() == 2) {	
		this.data = Frost.Util.formatDataForStackBar(this.getData(), 2);
		// colorList = Frost.Util.getColorList(this.getData(), this.getSeriesName().length);
		this.getParent().setColorList(colorList);
		this.getParent().setLegendName(this.getSeriesName());
		x.domain(this.getParent().getNameDomain());
	}
	var data = this.data;
	y.domain([0, d3.max(this.data, function(d) { return d.total; })]);
	this._groupContainer = this._container.append("g");
	var groupNode = this._groupContainer.selectAll(".frost_stackBar")
      									.data(data)
   										.enter().append("g")
									    .attr("class", "frost_stackBar")
									    .attr("transform", function(d) { return "translate(" + x(d.name) + ",0)"; });
  	var node = groupNode.selectAll("rect")
					     .data(function(d) { return d.data; })
					     .enter().append("rect")
					     .attr("width", x.rangeBand())
					     .attr("y", function(d) { return y(d.y1); })
					     .attr("height", function(d) { return y(d.y0) - y(d.y1); })
					     .style("fill", function(d, i) { return colorList[i]; });
	if(this.hasDetail) {
		groupNode.on("mouseover", function() {that.detail.show(); })
	        .on("mouseout", function() { that.detail.hide();})
	        .on("mousemove", mousemove);
	}
	return this;
};

Frost.StackBar = StackBar;