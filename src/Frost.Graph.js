Frost.namespace("Frost.Graph");
var ySpaceRate = 20 / 300;
var xSpaceRate = 40 / 500;

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
	this.hasStack = cfg.stack || false;
	this.leftGap = this.width * xSpaceRate;
	this.bottomGap = this.height * ySpaceRate;
	this.rightGap = this.width * xSpaceRate / 2;
	this.topGap = this.height * ySpaceRate / 2;
	this.xScale = null;
	this.yScale = null;
	this.cfg = cfg;
}
Graph.prototype.getCfg = function() {
	return this.cfg;
};
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
Graph.prototype.setXScale = function(data) {
	this.xScale = data;
};
Graph.prototype.setYScale = function(data) {
	this.yScale = data;
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
Graph.prototype.IsStack = function() {
	return this.hasStack;
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
Graph.prototype.getXAxis = function() {
	return this.xAxis;
};
Graph.prototype.getYAxis = function() {
	return this.yAxis;
};
Graph.prototype.setXAxis = function(data) {
	this.xAxis = data;
};
Graph.prototype.setYAxis = function(data) {
	this.yAxis = data;
};
Graph.prototype.getLegend = function() {
	return this.legend;
};
Graph.prototype.setNameDomain = function(data) {
	this.nameDomain = data;
};
Graph.prototype.getNameDomain = function() {
	return this.nameDomain;
};
Graph.prototype.setColorList = function(data) {
	this.colorList = data;
};
Graph.prototype.getColorList = function() {
	return this.colorList;
};
Graph.prototype.setYScaleMaxValue = function(data) {
	this.yScaleMaxValue = data;
};
Graph.prototype.getYScaleMaxValue = function(data) {
	return this.yScaleMaxValue;
};
Graph.prototype.setLegendName = function(data) {
	this.legendName = data;
};
/**
 * Render the Chart.
 * @method Frost.Graph.render
 */
Graph.prototype.render = function() {
	if(!Frost.testSVG()) {
		var node = document.getElementById(this.node.slice(1));
		node.innerHTML = "Your Browser doesn't support SVG<br>Please Use Chrome or Firfox!";
		return;
	}
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
	this.detail = new Frost.Detail({container: rootNode}).render();
	this.colorList = Frost.Util.getColorList(this.getSeries(), this.getSeries().length);
	var actaulWidth = this.IsHasXAxis() ? (this.getWidth() - this.getLeftGap() - this.getRightGap()) : this.getWidth();
	var actualHeight = this.IsHasYAxis() ? (this.getHeight() - this.getBottomGap() - this.getTopGap()) : this.getHeight();
	var seriesName = Frost.Util.getSeriesName(this.getSeries());
	this.legendName = seriesName;
	this.xScale = d3.scale.ordinal()
    			 		  .rangeRoundBands([0, actaulWidth], .1);
    this.yScale = d3.scale.linear()
    					  .range([actualHeight, 0]);
    this.nameDomain = Frost.Util.getNameDomain(this.getSeries());
    this.yScaleMaxValue = Frost.Util.getMaxValue(this.getSeries());
    this.xScale.domain(this.nameDomain);
    this.yScale.domain([0, this.yScaleMaxValue]);
	switch(this.getType().toLowerCase()) {
		case "bar":
			if(this.getSeries().length == 1) {
				this.chartObject.push(new Frost.SingleBar({
					width: actaulWidth, 
					height: actualHeight, 
					data: this.getSeries()[0].data, 
					container: this._container, 
					parent: this,
					color: this.getColorList()[0],
					detail: this.detail,
					hasDetail: this.getCfg().hasDetail
				}).render());
			} else if (this.getSeries().length > 1) {
				if(!this.IsStack()) {
					this.chartObject.push(new Frost.GroupBar({
						width: actaulWidth, 
						height: actualHeight,
						data: this.getSeries(), 
						container: this._container, 
						parent: this,
						seriesName: seriesName,
						colorList: this.getColorList(),
						type: this.getCfg().barType,
						detail: this.detail,
						hasDetail: this.getCfg().hasDetail
					}).render());
				} else {
					this.chartObject.push(new Frost.StackBar({
						width: actaulWidth, 
						height: actualHeight,
						data: this.getSeries(), 
						container: this._container, 
						parent: this,
						seriesName: seriesName,
						colorList: this.getColorList(),
						type: this.getCfg().barType,
						detail: this.detail,
						hasDetail: this.getCfg().hasDetail
					}).render());
				}
			}
			
			break;
		case "area":
			if(!this.IsStack()) {
				this.chartObject.push(new Frost.Areas({
					width: actaulWidth, 
					height: actualHeight, 
					data: this.getSeries(), 
					container: this._container, 
					parent: this,
					colorList: this.getColorList(),
					seriesName: seriesName,
					isXLinear: this.getCfg().isXLinear,
					lineType: this.getCfg().lineType,
					detail: this.detail
				}).render());
			} else {
				this.chartObject.push(new Frost.StackArea({
						width: actaulWidth, 
						height: actualHeight,
						data: this.getSeries(), 
						container: this._container, 
						parent: this,
						seriesName: seriesName,
						colorList: this.getColorList(),
						isXLinear: this.getCfg().isXLinear,
						lineType: this.getCfg().lineType,
						detail: this.detail
					}).render());
			}
			break;
		case "line":
			this.chartObject.push(new Frost.Lines({
				width: actaulWidth, 
				height: actualHeight, 
				data: this.getSeries(), 
				container: this._container, 
				parent: this,
				colorList: this.getColorList(),
				seriesName: seriesName,
				isXLinear: this.getCfg().isXLinear,
				lineType: this.getCfg().lineType,
				detail: this.detail
			}).render());
			break;
		case "pie":
			if(this.getSeries().length == 1) {
				this.colorList = Frost.Util.getColorList(this.getSeries(), this.getSeries()[0].data.length);
				this.setLegendName(this.getNameDomain());
				this.chartObject.push(new Frost.Pie({
					width: actaulWidth, 
					height: actualHeight,
					data: this.getSeries()[0].data, 
					container: this._container, 
					parent: this,
					seriesName: seriesName,
					colorList: this.getColorList(),
					detail: this.detail,
					hasDetail: this.getCfg().hasDetail
				}).render());
			} else {

			}
			break;
		case "arc":
			if(this.getSeries().length == 1) {
				this.colorList = Frost.Util.getColorList(this.getSeries(), this.getSeries()[0].data.length);
				this.setLegendName(this.getNameDomain());
				this.chartObject.push(new Frost.Arc({
					width: actaulWidth, 
					height: actualHeight,
					data: this.getSeries()[0].data, 
					container: this._container, 
					parent: this,
					seriesName: seriesName,
					colorList: this.getColorList(),
					detail: this.detail,
					hasDetail: this.getCfg().hasDetail
				}).render());
			} else {

			}
			break;
		case "bubble":
			this.colorList = Frost.Util.getColorList(this.getSeries(), this.getSeries().length);
			this.setLegendName(seriesName);
			this.chartObject.push(new Frost.Bubble({
				width: actaulWidth, 
				height: actualHeight,
				data: this.getSeries(), 
				container: this._container, 
				parent: this,
				seriesName: seriesName,
				colorList: this.getColorList(),
				detail: this.detail,
				hasDetail: this.getCfg().hasDetail
			}).render());
			break;
		case "force":
			this.colorList = Frost.Util.getColorList(this.getSeries(), this.getSeries().length);
			this.setLegendName(seriesName);
			this.chartObject.push(new Frost.Force({
				width: actaulWidth, 
				height: actualHeight,
				data: this.getSeries(), 
				container: this._container, 
				parent: this,
				seriesName: seriesName,
				colorList: this.getColorList(),
				detail: this.detail,
				hasDetail: this.getCfg().hasDetail
			}).render());
			break;
		case "scatter":
			this.colorList = Frost.Util.getColorList(this.getSeries(), this.getSeries().length);
			this.setLegendName(seriesName);
			this.chartObject.push(new Frost.Scatter({
				width: actaulWidth, 
				height: actualHeight,
				data: this.getSeries(), 
				container: this._container, 
				parent: this,
				seriesName: seriesName,
				colorList: this.getColorList(),
				detail: this.detail,
				hasDetail: this.getCfg().hasDetail
			}).render());
			break;
		default: 
			break;
	}
	if(this.IsHasXAxis()) {
    	this.xAxisRender({
			parent: this, 
			container: this._container, 
			xSpace: 0,
			width: actaulWidth,
			ySpace: this.getHeight()-this.getBottomGap() - this.topGap
		});
    }
    if(this.IsHasYAxis()) {
    	this.yAxisRender({
			parent: this, 
			container: this._container, 
			xSpace: 0,
			ySpace: 0,
			width: actaulWidth,
			hasStandard: this.getCfg().hasStandard
		});
    }
    if(this.IsHasLegend()) {
    	this.legendRender({
    		parent: this, 
			container: legnedRootNode,
			seriesName: this.legendName,
			colorList: this.getColorList(),
			xSpace: this.getWidth()
    	});
    }
    this._bindUI();
	return this;
};
Graph.prototype._bindUI = function() {
	if(this.legend) {
		var legend = this.legend;
	}
	d3.select(".frost_rootNode").on("click", function() {
		if(legend) {
			legend.setPosition(d3.mouse(this)[0], d3.mouse(this)[1]);
		}
	}, true);
};
Graph.prototype.xAxisRender = function(cfg) {
	this.xAxis = new Frost.XAxis({
		parent: cfg.parent, 
		container: cfg.container, 
		xSpace: cfg.xSpace,
		ySpace: cfg.ySpace,
		width: cfg.width
	}).render();
};
Graph.prototype.yAxisRender = function(cfg) {
	this.yAxis = new Frost.YAxis({
		parent: cfg.parent, 
		container: cfg.container, 
		xSpace: cfg.xSpace,
		ySpace: cfg.ySpace,
		width: cfg.width,
		hasStandard: cfg.hasStandard
	}).render();
};
Graph.prototype.legendRender = function(cfg) {
	this.legend = new Frost.Legend({
		parent: cfg.parent, 
		container: cfg.container,
		seriesName: cfg.seriesName,
		colorList: cfg.colorList,
		xSpace: cfg.xSpace
	}).render();
};
Frost.Graph = Graph;