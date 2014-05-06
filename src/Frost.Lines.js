Frost.namespace("Frost.Lines");

function Lines () {
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
Lines.prototype.getX = function() {
	return this.x;
};

Lines.prototype.setX = function(data) {
	this.x = data;
};

Lines.prototype.getY = function() {
	return this.y;
};

Lines.prototype.setY = function(data) {
	this.y = data;
};

Lines.prototype.getSeries = function() {
	return this.series;
};
Lines.prototype.setSeries = function(data) {
	this.series = data;
};
Lines.prototype.getContainer = function() {
	return this._container;
};

Lines.prototype.setContainer = function(data) {
	this._container = data;
};
Lines.prototype.getParent = function() {
	return this._parent;
};
Lines.prototype.render = function() {

};

Frost.Lines = Lines;