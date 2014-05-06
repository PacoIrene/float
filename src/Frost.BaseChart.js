Frost.namespace("Frost.BaseChart");

function BaseChart(cfg) {
	this.x = cfg.x;
	this.y = cfg.y;
	this.series = cfg.series;
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

BaseChart.prototype.getData = function() {
	var lineData = [];
	for(var i = 0; i != this.getSeries().length; i++) {
		var x = this.getGap() * (i+1) + this.getSingleWidth() * i + this.ySpace;
		var y = this.getY() - this.getSingleHeight(this.getSeries()[i].y);
		var obj = {"x": x, "y": y};
		lineData.push(obj);
	}
	return lineData;
};

Frost.BaseChart = BaseChart;