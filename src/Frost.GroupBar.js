Frost.namespace("Frost.GroupBar");

function GroupBar (cfg) {
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
GroupBar.prototype.getType = function() {
	return this.type;
};
GroupBar.prototype.getHeight = function() {
	return this.height;
};

GroupBar.prototype.setHeight = function(data) {
	this.height = data;
};

GroupBar.prototype.getWidth = function() {
	return this.width;
};

GroupBar.prototype.setWidth = function(data) {
	this.Width = data;
};
GroupBar.prototype.getContainer = function() {
	return this._container;
};
GroupBar.prototype.setContainer = function(data) {
	this._container = data;
};
GroupBar.prototype.getParent = function() {
	return this._parent;
};
GroupBar.prototype.getData = function() {
	return this.data;
};
GroupBar.prototype.getColorList = function() {
	return this.colorList;
};
GroupBar.prototype.getSeriesName = function() {
	return this._seriesName;
};
GroupBar.prototype.render = function() {
	var that = this;
	function mousemove(d) {
		var x0 = d3.mouse(this)[0]+groupNodeMouseX;
		var y0 = d3.mouse(this)[1];
		that.detail.setContent({position: {x: x0, y:y0},contentValue: d.name + ": "+d.value});
	}
	var groupNodeMouseX = 0;
	var x = this.getParent().getXScale();
	var y = this.getParent().getYScale();
	var x1 = d3.scale.ordinal();
	var height = this.getHeight();
	var colorList = this.getColorList();
	var formatData = Frost.Util.formatDataForGroupBar(this.getData());
	this._groupContainer = this._container.append("g");
	x1.domain(this.getSeriesName()).rangeRoundBands([0, x.rangeBand()]);
	if(this.getType() == 1) {
		x.domain(this.getSeriesName());
		formatData = this.getData();
		this.getParent().setLegendName(this.getParent().getNameDomain());
		colorList = Frost.Util.getColorList(this.getData(), this.getParent().getNameDomain().length);
		this.getParent().setColorList(colorList);
		x1.domain(this.getParent().getNameDomain()).rangeRoundBands([0, x.rangeBand()]);
	}
	var groupNode = this._groupContainer.selectAll(".frost_groupBar")
									    .data(formatData)
									    .enter().append("g")
									    .attr("class", "frost_groupBar_single")
									    .attr("transform", function(d,i) {
									    	return "translate(" + x(d.name) + ",0)"; 
									    });
	groupNode.on("mousemove", function(d) {groupNodeMouseX = x(d.name);});
	var node = groupNode.selectAll("rect")
				     .data(function(d) { return d.data; })
				     .enter().append("rect")
				     .attr("width", x1.rangeBand())
				     .attr("x", function(d) { return x1(d.name); })
				     .attr("y", function(d) { return y(d.value); })
				     .attr("height", function(d) { return height - y(d.value); })
				     .style("fill", function(d,i) { return colorList[i]; });
	if(this.hasDetail) {
		node.on("mouseover", function() {that.detail.show(); })
	        .on("mouseout", function() { that.detail.hide();})
	        .on("mousemove", mousemove);
	}
	return this;
}

Frost.GroupBar = GroupBar;