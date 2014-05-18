Frost.namespace("Frost.Areas");

function Areas(cfg) {
	this.height = cfg.height;
	this.width = cfg.width;
	this._container = cfg.container;
	this._parent = cfg.parent;
	this.data = cfg.data;
	this.colorList = cfg.colorList;
	this._seriesName = cfg.seriesName;
	this.isXLinear = cfg.isXLinear || false;
	this.lineType = cfg.lineType || "linear";
	this._areaList = [];
	this.detail = cfg.detail;
}
Areas.prototype.getType = function() {
	return this.type;
};
Areas.prototype.getHeight = function() {
	return this.height;
};

Areas.prototype.setHeight = function(data) {
	this.height = data;
};

Areas.prototype.getWidth = function() {
	return this.width;
};

Areas.prototype.setWidth = function(data) {
	this.Width = data;
};
Areas.prototype.getContainer = function() {
	return this._container;
};
Areas.prototype.setContainer = function(data) {
	this._container = data;
};
Areas.prototype.getParent = function() {
	return this._parent;
};
Areas.prototype.getData = function() {
	return this.data;
};
Areas.prototype.getColorList = function() {
	return this.colorList;
};
Areas.prototype.getSeriesName = function() {
	return this._seriesName;
};
Areas.prototype.getAreaList = function() {
	return this._areaList;
};
Areas.prototype.getChildrenContainer = function() {
	return this.childrenContainer;
};
Areas.prototype.render = function() {
	this.childrenContainer = this._container.append("g")
											.attr("class", "forst_AreasContainer");
	for(var i = 0; i != this.getData().length; i++) {
		this._areaList.push(new Frost.Area({
					width: this.getWidth(), 
					height: this.getHeight(), 
					data: this.getData()[i].data, 
					container: this.childrenContainer, 
					parent: this,
					color: this.getColorList()[i],
					seriesName: this.getSeriesName(),
					isXLinear: this.isXLinear,
					lineType: this.lineType,
					detail: this.detail
				}).render());
	}
	return this;
};

Frost.Areas = Areas;