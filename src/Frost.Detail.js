Frost.namespace("Frost.Detail");

function Detail(cfg) {
	this._container = cfg.container;
	this.detailNode = null;
	this.name = cfg.name || "name";
	this.value = cfg.value || "value";
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
Detail.prototype.getName = function() {
	return this.name;
};
Detail.prototype.setName = function(data) {
	this.name = data;
};
Detail.prototype.getValue = function() {
	return this.value;
};
Detail.prototype.setValue = function(data) {
	this.value = data;
};
Detail.prototype.render = function() {
	this.detailNode = this._container.append("div")
									 .attr("class", "frost_detail");
	var svg = this.detailNode.append("svg")
						.attr("width", 100)
						.attr("height", 20);
	var rect = svg.append("rect")
				  .attr("fill", "#FAFAFA")
				  .attr("width", 100)
			      .attr("height", 20);
	this._content = svg.append("text")
		.attr("transform", "translate(10,15)")
	   	.text(this.getName() + ": " + this.getValue());
	return this;
};
Detail.prototype.setContent = function(obj) {
	this.setName(obj.name);
	this.setValue(obj.value);
	this._content.text(this.getName() + ": " + this.getValue());
	this.setPosition(obj.position)
}

Frost.Detail = Detail;