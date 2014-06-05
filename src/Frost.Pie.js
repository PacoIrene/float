Frost.namespace("Frost.Pie");

function Pie(cfg) {
	this.height = cfg.height;
	this.width = cfg.width;
	this._container = cfg.container;
	this._parent = cfg.parent;
	this.data = cfg.data;
	this.colorList = cfg.colorList;
	this._seriesName = cfg.seriesName;
	this.detail = cfg.detail;
	this.hasDetail = cfg.hasDetail || false;
	this.hasContent = cfg.hasContent || false;
}
Pie.prototype.getType = function() {
	return this.type;
};
Pie.prototype.getHeight = function() {
	return this.height;
};

Pie.prototype.setHeight = function(data) {
	this.height = data;
};

Pie.prototype.getWidth = function() {
	return this.width;
};

Pie.prototype.setWidth = function(data) {
	this.Width = data;
};
Pie.prototype.getContainer = function() {
	return this._container;
};
Pie.prototype.setContainer = function(data) {
	this._container = data;
};
Pie.prototype.getParent = function() {
	return this._parent;
};
Pie.prototype.getData = function() {
	return this.data;
};
Pie.prototype.getColorList = function() {
	return this.colorList;
};
Pie.prototype.getSeriesName = function() {
	return this._seriesName;
};
Pie.prototype.render = function() {
	this.getParent().hasXAxis = false;
	this.getParent().hasYAxis = false;
	var that = this;
	var width = this.getWidth();
	var height = this.getHeight();
	var total = Frost.Util.getTotal([{data:this.getData()}]);
	function mousemove(d) {
		var x0 = d3.mouse(this)[0] + width / 2 + (that.getWidth() / 500 -1) * 50;
		var y0 = d3.mouse(this)[1] + height / 2 + (that.getHeight() / 300 -1) * 10;
		that.detail.setContent({position: {x: x0, y: y0},contentValue: d.data.name + ": "+d.data.value + "<br/>" + "    " + ((d.data.value/total)*100).toFixed(2) + "%"});
	}
	var radius = Math.min(width, height) / 2;
	var colorList = this.getColorList();
	this._groupContainer = this._container.append("g")
										  .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
	var arc = d3.svg.arc()
				    .outerRadius(radius - 10)
				    .innerRadius(0);

	var pie = d3.layout.pie()
			    .sort(null)
			    .value(function(d) { return d.value; });
	var g = this._groupContainer.selectAll(".frost_pie")
			      				.data(pie(this.getData()))
			    				.enter().append("g")
			      				.attr("class", "frost_pie");

	var node = g.append("path").attr("d", arc)
	      					.style("fill", function(d, i) { return colorList[i]; });
	if(this.hasDetail) {
		node.on("mouseover", function() {that.detail.show(); })
	        .on("mouseout", function() { that.detail.hide();})
	        .on("mousemove", mousemove);
	}
	if(this.hasContent) {
		g.append("text")
	 .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
	 .attr("dy", ".35em")
	 .style("text-anchor", "middle")
	 .text(function(d) { 
	 	return d.data.name; 
	 });
	}
};

Frost.Pie = Pie;