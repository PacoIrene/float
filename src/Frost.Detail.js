Frost.namespace("Frost.Detail");

function Detail(cfg) {
	this._container = cfg.container;
	this.detailNode = null;
	contentValue = cfg.contentValue || "name: value";
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
Detail.prototype.setPosition = function(cfg) {
	this.setX(cfg.x);
	this.setY(cfg.y);
}
Detail.prototype.show = function() {
	this.detailNode.style("display", "block");
}; 
Detail.prototype.hide = function() {
	this.detailNode.style("display", "none");
};
Detail.prototype.getContentValue = function() {
	return this.contentValue;
};
Detail.prototype.setContentValue = function(data) {
	this.contentValue = data;
};
Detail.prototype.render = function() {
	this.detailNode = this._container.append("div")
									 .attr("class", "frost_detail");
 	this.detailWrapper = this.detailNode.append("div")
 							.attr("class", "frost_detail_wrapper")
 							.html(this.getContentValue());
	return this;
};
Detail.prototype.setContent = function(obj) {
	this.setContentValue(obj.contentValue);
	this.detailWrapper.html(obj.contentValue);
	var boundingRect = document.querySelector(".frost_detail").getBoundingClientRect();
	var position = {x: obj.position.x, y: obj.position.y};
	position.x += 50;
	position.y += 20;
	this.setPosition(position);
}

Frost.Detail = Detail;