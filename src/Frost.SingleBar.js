Frost.namespace("Frost.SingleBar");
function SingleBar (cfg) {
	this.color = cfg.color;
	this._container = cfg.container;
	this._parent = cfg.parent;
	this.data = cfg.data;
	this.height = cfg.height;
	this.width = cfg.width;
	this.detail = cfg.detail;
	this.hasDetail = cfg.hasDetail || false;
}

SingleBar.prototype.getHeight = function() {
	return this.height;
};

SingleBar.prototype.setHeight = function(data) {
	this.height = data;
};

SingleBar.prototype.getWidth = function() {
	return this.width;
};

SingleBar.prototype.setWidth = function(data) {
	this.Width = data;
};
SingleBar.prototype.getContainer = function() {
	return this._container;
};

SingleBar.prototype.setContainer = function(data) {
	this._container = data;
};
SingleBar.prototype.getParent = function() {
	return this._parent;
};
SingleBar.prototype.getColor = function() {
	return this.color;
};
SingleBar.prototype.getData = function() {
	return this.data;
};
SingleBar.prototype.getGroupContainer = function() {
	return this._groupContainer;
};
SingleBar.prototype.render = function() {
	var that = this;
	function mousemove(d) {
		var x0 = d3.mouse(this)[0] + (that.getWidth() / 500 -1) * 50;
		var y0 = d3.mouse(this)[1] + (that.getHeight() / 300 -1) * 10;
		that.detail.setContent({position: {x: x0, y:y0},contentValue: d.name + ": "+d.value});
	}
	var x = this.getParent().getXScale();
	var y = this.getParent().getYScale();
	var height = this.getHeight();
	this._groupContainer = this._container.append("g");
	var node = this._groupContainer.selectAll(".frost_bar")
		      					.data(this.getData())
		    					.enter().append("rect")
		      					.attr("class", "frost_bar")
		      					.attr("x", function(d) {return x(d.name); })
		      					.attr("y", function(d) { return y(d.value); })
		      					.attr("height", function(d) { return height - y(d.value); })
		      					.attr("width", x.rangeBand())
		      					.attr("fill", this.getColor());
    if(this.hasDetail) {
		node.on("mouseover", function() {that.detail.show(); })
	        .on("mouseout", function() { that.detail.hide();})
	        .on("mousemove", mousemove);
	}
    return this;

};
Frost.SingleBar = SingleBar;