Frost.namespace("Frost.Graph");

function Graph(cfg) {
	this.node = cfg.element || "body";
	this.series = cfg.series;
	this.type = cfg.type;
	this.width = cfg.width;
	this.height = cfg.height;
	this.chartObject = null;
}

Graph.prototype.getNode = function() {
	return this.node;
};
Graph.prototype.setNode = function(data) {
	this.node = data;
};

Graph.prototype.getSeries = function() {
	return this.series;
};
Graph.prototype.setSeries = function(data) {
	this.series = data;
};

Graph.prototype.getType = function() {
	return this.type;
};
Graph.prototype.setType = function(data) {
	this.type = data;
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

/**
 * Render the Chart.
 * @method Frost.Graph.render
 */
Graph.prototype.render = function() {
	var container = d3.select(this.node).append("svg")
								   .attr("width", this.getWidth())
								   .attr("height", this.getHeight());
	switch(this.getType().toLowerCase()) {
		case "column":
			this.chartObject = new Frost.Columns({x: this.getWidth(), y: this.getHeight(), series: this.getSeries(), container: container});
			this.chartObject.render();
			return this;
			break;
		default: 
			break;
	}
};

Frost.Graph = Graph;