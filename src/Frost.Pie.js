Frost.namespace("Frost.Pie");

function Pie(cfg) {
	this.height = cfg.height;
	this.width = cfg.width;
	this._container = cfg.container;
	this._parent = cfg.parent;
	this.data = cfg.data;
	this.colorList = cfg.colorList;
	this._seriesName = cfg.seriesName;
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
	var width = this.getWidth();
	var height = this.getHeight();
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

	g.append("path").attr("d", arc)
	      			.style("fill", function(d, i) { return colorList[i]; });

	g.append("text")
	 .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
	 .attr("dy", ".35em")
	 .style("text-anchor", "middle")
	 .text(function(d) { 
	 	return d.data.name; 
	 });
};

Frost.Pie = Pie;