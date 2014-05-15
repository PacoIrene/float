Frost.namespace("Frost.Lines");

function Lines(cfg) {
	this.height = cfg.height;
	this.width = cfg.width;
	this._container = cfg.container;
	this._parent = cfg.parent;
	this.data = cfg.data;
	this.colorList = cfg.colorList;
	this._seriesName = cfg.seriesName;
	this.isXLinear = cfg.isXLinear || false;
	this.lineType = cfg.lineType || "linear";
	this._lineList = [];
	this.detail = cfg.detail;
}
Lines.prototype.getType = function() {
	return this.type;
};
Lines.prototype.getHeight = function() {
	return this.height;
};

Lines.prototype.setHeight = function(data) {
	this.height = data;
};

Lines.prototype.getWidth = function() {
	return this.width;
};

Lines.prototype.setWidth = function(data) {
	this.Width = data;
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
Lines.prototype.getData = function() {
	return this.data;
};
Lines.prototype.getColorList = function() {
	return this.colorList;
};
Lines.prototype.getSeriesName = function() {
	return this._seriesName;
};
Lines.prototype.getLineList = function() {
	return this._lineList;
};
Lines.prototype.getChildrenContainer = function() {
	return this.childrenContainer;
};
Lines.prototype.render = function() {
	this.childrenContainer = this._container.append("g")
											.attr("class", "forst_linesContainer");
	for(var i = 0; i != this.getData().length; i++) {
		this._lineList.push(new Frost.Line({
					width: this.getWidth(), 
					height: this.getHeight(), 
					data: this.getData()[i].data, 
					container: this.childrenContainer, 
					parent: this,
					color: this.getColorList()[i],
					seriesName: this.getSeriesName(),
					isXLinear: this.isXLinear,
					lineType: this.lineType
				}).render());
	}
	return this;
};

Frost.Lines = Lines;