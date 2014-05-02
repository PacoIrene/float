Frost.namespace("Frost.Columns");

function Columns(cfg) {
	this.x = cfg.x;
	this.y = cfg.y;
	this.series = cfg.series;
	this._container = cfg.container;
	this.columnList = [];
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
	var number = this.getSeries().length * 2 + 1;
	var singleWidth = this.getX() / number;
	return singleWidth;
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
Columns.prototype.render = function() {
	var groupContainer = this._container.append("g");
	for(var i = 0; i != this.getSeries().length; i++) {
		var column = new Frost.Column({
			x: this.getGap() * (i+1) + this.getSingleWidth() * i,
			y: this.getY() - this.getSingleHeight(this.getSeries()[i].y),
			width: this.getSingleWidth(),
			height: this.getSingleHeight(this.getSeries()[i].y),
			color: this.getSeries()[i].color,
			name: this.getSeries()[i].name,
			container: groupContainer
		});
		this.columnList.push(column.render());
	}
	return this;
};
Frost.Columns = Columns;