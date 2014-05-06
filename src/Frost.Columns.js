Frost.namespace("Frost.Columns");
var ySpaceRate = 20 / 300;
var xSpaceRate = 20 / 500;

function Columns(cfg) {
	this.x = cfg.x;
	this.y = cfg.y;
	this.series = cfg.series;
	this._container = cfg.container;
	this.columnList = [];
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
Columns.prototype.getX = function() {
	return this.x;
};

Columns.prototype.setX = function(data) {
	this.x = data;
};

Columns.prototype.getY = function() {
	return this.y;
};

Columns.prototype.setY = function(data) {
	this.y = data;
};

Columns.prototype.getSeries = function() {
	return this.series;
};
Columns.prototype.setSeries = function(data) {
	this.series = data;
};
Columns.prototype.getContainer = function() {
	return this._container;
};

Columns.prototype.setContainer = function(data) {
	this._container = data;
};

Columns.prototype.getGap = function() {
	return this.getSingleWidth() / 2;
};
Columns.prototype.getSingleWidth = function() {
	var number = this.getSeries().length * 3 + 1;
	var singleWidth = this.getX() / number;
	return singleWidth * 2;
};
Columns.prototype.getSingleHeight = function(actualHeight) {
	return actualHeight / this.getMaxSerie() * this.getY();
};
Columns.prototype.getMaxSerie = function() {
	var max = this.getSeries()[0].y;
	for(var i = 0; i != this.getSeries().length; i++) {
		if(this.getSeries()[i].y > max) {
			max = this.getSeries()[i].y;
		}
	}	
	return max;
};

//return Graph
Columns.prototype.getParent = function() {
	return this._parent;
};
Columns.prototype.render = function() {
	var valueList = [];
	this._groupContainer = this._container.append("g");
	for(var i = 0; i != this.getSeries().length; i++) {
		valueList.push(this.getSeries()[i].name);
		var column = new Frost.Column({
			value: this.getSeries()[i].y,
			x: this.getGap() * (i+1) + this.getSingleWidth() * i + this.ySpace,
			y: this.getY() - this.getSingleHeight(this.getSeries()[i].y),
			width: this.getSingleWidth(),
			height: this.getSingleHeight(this.getSeries()[i].y),
			color: this.getSeries()[i].color,
			name: this.getSeries()[i].name,
			container: this._groupContainer,
			parent: this
		});
		this.columnList.push(column.render());
	}
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
			valueList: valueList,
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
	this.bindUI();
	return this;
};
Columns.prototype.bindUI = function() {
	var columnList = this.columnList;
	this.getParent().getContainer().on("click", function() {
		for(var i = 0; i != columnList.length; i++) {
			if(columnList[i].isHighLight()) {
				columnList[i].deleteHighLight();
			}
		}
	});
};
Frost.Columns = Columns;