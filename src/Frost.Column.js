Frost.namespace("Frost.Column");

function Column(cfg) {
	this.x = cfg.x;
	this.y = cfg.y;
	this.height = cfg.height;
	this.width = cfg.width;
	this.color = cfg.color;
	this.name = cfg.name;
	this._container = cfg.container;
}

Column.prototype.getX = function() {
	return this.x;
};

Column.prototype.setX = function(data) {
	this.x = data;
};

Column.prototype.getY = function() {
	return this.y;
};

Column.prototype.setY = function(data) {
	this.y = data;
};

Column.prototype.getHeight = function() {
	return this.height;
};

Column.prototype.setHeight = function(data) {
	this.height = data;
};

Column.prototype.getWidth = function() {
	return this.width;
};

Column.prototype.setWidth = function(data) {
	this.Width = data;
};

Column.prototype.getColor = function() {
	return this.color;
};

Column.prototype.setColor = function(data) {
	this.color = data;
};

Column.prototype.getName = function() {
	return this.name;
};

Column.prototype.setName = function(data) {
	this.name = data;
};

Column.prototype.getContainer = function() {
	return this._container;
};

Column.prototype.setContainer = function(data) {
	this._container = data;
};

Column.prototype.render = function() {
	this._rectNode = this._container.append("rect")
				  					.attr("x", this.getX())
								  	.attr("y", this.getY())
								  	.attr("width", this.getWidth())
								  	.attr("height", this.getHeight())
								  	.attr("fill", this.getColor());
	this._bindUI();
	return this;
};

Column.prototype._bindUI = function() {
	this._rectNode.on("mouseover", function(e) {
		console.log(this.getName());
	}.bind(this));
};
Frost.Column = Column;