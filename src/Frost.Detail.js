Frost.namespace("Frost.Detail");

function Detail(cfg) {
	this._container = cfg.container;
	this.detailNode = null;
}
Detail.prototype.getContainer = function() {
	return this._container;
};
Detail.prototype.setX = function(x) {
	this.detailNode.style("left", x + "px");
};
Detail.prototype.setY = function(y) {
	this.detailNode.style("top", y + "px");
};
Detail.prototype.setContent = function(content) {
	this.detailNode.html(content);
};
Detail.prototype.show = function() {
	this.detailNode.style("display", "block");
}; 
Detail.prototype.hide = function() {
	this.detailNode.style("display", "node");
};
Detail.prototype.render = function() {
	this.detailNode = this._container.append("div")
									 .attr("class", "frost_detail");
	return this;
};

Frost.Detail = Detail;