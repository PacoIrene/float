Frost.namespace("Frost.Lines");

function Lines (cfg) {
	Lines.superclass.constructor.apply(this, arguments);
}
Frost.extend(Lines, Frost.BaseChart);
Lines.prototype.getData = function() {
	var lineData = [];
	for(var i = 0; i != this.getSeries().length; i++) {
		var x = this.getGap() * (i+1) + this.getSingleWidth() * i + this.ySpace;
		var y = this.getY() - this.getSingleHeight(this.getSeries()[i].y);
		var obj = {"x": x, "y": y};
		lineData.push(obj);
	}
	return lineData;
}

Lines.prototype.render = function() {
	this._groupContainer = this._container.append("g");
	var lineData = this.getData();
	var lineFunction = d3.svg.line()
	                        .x(function(d) { return d.x; })
	                        .y(function(d) { return d.y; })
	                        .interpolate("linear");

	var lineGraph = this._groupContainer.append("path")
			                            .attr("d", lineFunction(lineData))
			                            .attr("stroke", "steelblue")
			                            .attr("stroke-width", 2)
			                            .attr("fill", "none");

    if(this.getParent().IsHasXAxis()) {
		this.xAxis = new Frost.XAxis({
			length: this.getSeries().length, 
			width: this.getX(), 
			parent: this, 
			container: this._container, 
			xSpace: this.xSpace,
			ySpace: this.getY(), 
			outerPadding: this.getGap(),
			padding: this.getGap(),
			// valueList: valueList,
			step: this.getSingleWidth() + this.getGap()
		}).render();
	}
	if(this.getParent().IsHasYAxis()) {
		this.yAxis = new Frost.YAxis({
			length: parseInt(this.getSeries().length / 3), 
			height: this.getY(), 
			parent: this, 
			container: this._container, 
			xSpace: this.xSpace,
			ySpace: 0, 
			outerPadding: 0,
			padding: 0,
			step: 0
		}).render();
	}
};

Frost.Lines = Lines;