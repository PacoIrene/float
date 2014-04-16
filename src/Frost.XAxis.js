Frost.namespace("Frost.XAxis");

function XAxis(obj) {
	this.width = obj.width;
	this.numberArray = obj.numberArray;
}
XAxis.prototype.getWidth = function() {
	return this.width;
};
XAxis.prototype.setWidth = function(data) {
	this.width = data;
};
XAxis.prototype.getBase = function() {
	return this.width / this.numberArray.length;
};
XAxis.prototype.getMin = function() {
	return d3.min(this.numberArray);
};
XAxis.prototype.getMax = function() {
	return d3.max(this.numberArray);
};
XAxis.prototype.render = function(element) {
	var XAxisContainer = d3.select(element).append("div")
					  					   .attr("class", "frost_xAxis")
					  					   .append("svg")
					  					   .attr("width", this.getWidth())
					  					   .attr("height", 100)
					  					   .append("circle")
					  					   .attr("cx", 30)
					  					   .attr("cy", 30)
					  					   .attr("r", 20);
};

Frost.XAxis = XAxis;