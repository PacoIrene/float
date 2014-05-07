Frost.namespace("Frost.BaseChart");

function BaseChart(cfg) {
	this.color = cfg.color;
	this.x = cfg.x;
	this.y = cfg.y;
	this.series = cfg.data;
	this._container = cfg.container;
	this._parent = cfg.parent;
	this.xSpace = 0;
	this.ySpace = 0;
	if(this.getParent().IsHasXAxis()) {
		this.xSpace = this.x * xSpaceRate;
		this.x = this.x - this.xSpace;
	}
	if(this.getParent().IsHasYAxis()) {
		this.ySpace = this.y * ySpaceRate;
		this.y = this.y - this.ySpace;
	}
}

BaseChart.prototype.getX = function() {
	return this.x;
};

BaseChart.prototype.setX = function(data) {
	this.x = data;
};

BaseChart.prototype.getY = function() {
	return this.y;
};

BaseChart.prototype.setY = function(data) {
	this.y = data;
};

BaseChart.prototype.getSeries = function() {
	return this.series;
};
BaseChart.prototype.setSeries = function(data) {
	this.series = data;
};
BaseChart.prototype.getContainer = function() {
	return this._container;
};

BaseChart.prototype.setContainer = function(data) {
	this._container = data;
};
BaseChart.prototype.getParent = function() {
	return this._parent;
};
BaseChart.prototype.getGap = function() {
	return this.getSingleWidth() / 2;
};
BaseChart.prototype.getSingleWidth = function() {
	var number = this.getSeries().length * 3 + 1;
	var singleWidth = this.getX() / number;
	return singleWidth * 2;
};
BaseChart.prototype.getSingleHeight = function(actualHeight) {
	return actualHeight / this.getMaxSerie() * this.getY();
};
BaseChart.prototype.getMaxSerie = function() {
	var max = this.getSeries()[0].y;
	for(var i = 0; i != this.getSeries().length; i++) {
		if(this.getSeries()[i].y > max) {
			max = this.getSeries()[i].y;
		}
	}	
	return max;
};
BaseChart.prototype.getColor = function() {
	return this.color;
};
BaseChart.prototype.getData = function() {
	this._xyData = [];
	for(var i = 0; i != this.getSeries().length; i++) {
		var x = this.getGap() * (i+1) + this.getSingleWidth() * i + this.ySpace;
		var y = this.getY() - this.getSingleHeight(this.getSeries()[i].y);
		var obj = {"x": x, "y": y};
		this._xyData.push(obj);
	}
	return this._xyData;
};

BaseChart.prototype.render = function() {
	if(this.getParent().IsHasXAxis()) {
		this.xAxis = new Frost.XAxis({
			length: this.getSeries().length, 
			width: this.getX(), 
			parent: this, 
			container: this._container, 
			xSpace: this.xSpace,
			ySpace: this.getY(), 
			outerPadding: this.getGap(),
			padding: this.getGap(),
			// valueList: valueList,
			step: this.getSingleWidth() + this.getGap()
		}).render();
	}
	if(this.getParent().IsHasYAxis()) {
		this.yAxis = new Frost.YAxis({
			length: parseInt(this.getSeries().length / 3), 
			height: this.getY(), 
			parent: this, 
			container: this._container, 
			xSpace: this.xSpace,
			ySpace: 0, 
			outerPadding: 0,
			padding: 0,
			step: 0
		}).render();
	}
};

Frost.BaseChart = BaseChart;