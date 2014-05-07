Frost.namespace("Frost.Graph");

function Graph(cfg) {
	this.node = cfg.element || "body";
	this.series = cfg.series;
	this.width = cfg.width;
	this.height = cfg.height;
	this.type = cfg.type || "column";
	this.chartObject = [];
	this.detail = null;
	this.hasXAxis = cfg.xAxis || false;
	this.hasYAxis = cfg.yAxis || false;
}

Graph.prototype.getNode = function() {
	return this.node;
};
Graph.prototype.setNode = function(data) {
	this.node = data;
};

Graph.prototype.getType = function() {
	return this.type;
};
Graph.prototype.getSeries = function() {
	return this.series;
};
Graph.prototype.setSeries = function(data) {
	this.series = data;
};

Graph.prototype.getWidth = function() {
	return this.width;
};
Graph.prototype.setWidth = function(data) {
	this.width = data;
};

Graph.prototype.getHeight = function() {
	return this.height;
};
Graph.prototype.setHeight = function(data) {
	this.height = data;
};

Graph.prototype.getChartObject = function() {
	return this.chartObject;
};
Graph.prototype.setChartObject = function(data) {
	this.chartObject = data;
};

Graph.prototype.getDetail = function() {
	return this.detail;
};
Graph.prototype.getContainer = function() {
	return this.container;
};
Graph.prototype.IsHasYAxis = function() {
	return this.hasYAxis;
};
Graph.prototype.IsHasXAxis = function() {
	return this.hasXAxis;
};
/**
 * Render the Chart.
 * @method Frost.Graph.render
 */
Graph.prototype.render = function() {
	var rootNode = d3.select(this.node).append("div")
									   .attr("class", "frost_rootNode")
									   .style("height", this.getHeight() + "px")
									   .style("width", this.getWidth() + "px");
	this.container = rootNode.append("svg")
							.attr("width", this.getWidth())
							.attr("height", this.getHeight());
	this.detail = new Frost.Detail({container: rootNode}).render();
	for(var i = 0; i != this.getSeries().length; i++) {
		switch(this.getType().toLowerCase()) {
			case "column":
				this.chartObject.push(new Frost.Columns({
					x: this.getWidth(), 
					y: this.getHeight(), 
					data: this.getSeries()[i].data, 
					container: this.container, 
					parent: this,
					color: this.getSeries()[i].color
				}).render());
				break;
			case "line":
				this.chartObject.push(new Frost.Lines({
					x: this.getWidth(), 
					y: this.getHeight(), 
					data: this.getSeries()[i].data, 
					container: this.container, 
					parent: this,
					color: this.getSeries()[i].color
				}).render());
				break;
			default: 
				break;
		}
	}
	return this;
};

Frost.Graph = Graph;