Frost.namespace("Frost.Graph");
var ySpaceRate = 20 / 300;
var xSpaceRate = 20 / 500;

function Graph(cfg) {
	this.node = cfg.element || "body";
	this.series = cfg.series;
	this.width = cfg.width;
	this.height = cfg.height;
	this.type = cfg.type || "column";
	this.chartObject = [];
	// this.detail = null;
	this.hasXAxis = cfg.xAxis || false;
	this.hasYAxis = cfg.yAxis || false;
	this.hasLegend = cfg.legend || false;
	this.leftGap = this.width * xSpaceRate;
	this.bottomGap = this.height * ySpaceRate;
	this.rightGap = this.width * xSpaceRate / 2;
	this.topGap = this.height * ySpaceRate / 2;
	this.xScale = null;
	this.yScale = null;
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
Graph.prototype.getXScale = function() {
	return this.xScale;
};
Graph.prototype.getYScale = function() {
	return this.yScale;
};
// Graph.prototype.getDetail = function() {
// 	return this.detail;
// };
Graph.prototype.getContainer = function() {
	return this._container;
};
Graph.prototype.IsHasYAxis = function() {
	return this.hasYAxis;
};
Graph.prototype.IsHasXAxis = function() {
	return this.hasXAxis;
};
Graph.prototype.IsHasLegend = function() {
	return this.hasLegend;
};
Graph.prototype.getLeftGap = function() {
	return this.leftGap;
};
Graph.prototype.getBottomGap = function() {
	return this.bottomGap;
};
Graph.prototype.getTopGap = function() {
	return this.topGap;
};
Graph.prototype.getRightGap = function() {
	return this.rightGap;
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
	var legnedRootNode = rootNode.append("div")
								.attr("class", "frost_legendRootNode");
	var svgNode = rootNode.append("svg")
							.attr("width", this.getWidth())
							.attr("height", this.getHeight());
	this._container = svgNode.append("g")
    						.attr("transform", "translate(" + this.getLeftGap() + "," + this.getTopGap() + ")");
	// this.detail = new Frost.Detail({container: rootNode}).render();
	var colorList = Frost.Util.getColorList(this.getSeries());
	var actaulWidth = this.IsHasXAxis() ? (this.getWidth() - this.getLeftGap() - this.getRightGap()) : this.getWidth();
	var actualHeight = this.IsHasYAxis() ? (this.getHeight() - this.getBottomGap() - this.getTopGap()) : this.getHeight();
	this.xScale = d3.scale.ordinal()
    			 		  .rangeRoundBands([0, actaulWidth], .1);
    this.yScale = d3.scale.linear()
    					  .range([actualHeight, 0]);
    this.xScale.domain(Frost.Util.getNameDomain(this.getSeries()));
    this.yScale.domain([0, Frost.Util.getMaxValue(this.getSeries())]);
    if(this.IsHasXAxis()) {
    	this.xAxis = new Frost.XAxis({
			parent: this, 
			container: this._container, 
			xSpace: 0,
			ySpace: this.getHeight()-this.getBottomGap() - this.topGap,
		}).render();
    }
    if(this.IsHasYAxis()) {
    	this.yAxis = new Frost.YAxis({
			parent: this, 
			container: this._container, 
			xSpace: 0,
			ySpace: 0
		}).render();
    }
    if(this.IsHasLegend()) {
    	this.legend = new Frost.Legend({
    		parent: this, 
			container: legnedRootNode,
			seriesName: Frost.Util.getSeriesName(this.getSeries()),
			colorList: colorList,
			xSpace: this.getWidth()
    	}).render();
    }
	for(var i = 0; i != this.getSeries().length; i++) {
		switch(this.getType().toLowerCase()) {
			case "bar":
				this.chartObject.push(new Frost.SingleBar({
					width: actaulWidth, 
					height: actualHeight, 
					data: this.getSeries()[i].data, 
					container: this._container, 
					parent: this,
					color: colorList[i]
				}).render());
				break;
	// 		case "line":
	// 			this.chartObject.push(new Frost.Lines({
	// 				x: this.getWidth(), 
	// 				y: this.getHeight(), 
	// 				data: this.getSeries()[i].data, 
	// 				container: this.container, 
	// 				parent: this,
	// 				color: this.getSeries()[i].color
	// 			}).render());
	// 			break;
	// 		default: 
	// 			break;
		}
	}
	return this;
};

Frost.Graph = Graph;