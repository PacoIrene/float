Frost.namespace("Frost.Lines");

function Lines (cfg) {
	Lines.superclass.constructor.apply(this, arguments);
	this.type = cfg.lineType;
}
Frost.extend(Lines, Frost.BaseChart);
Lines.prototype.getLineType = function() {
	return this.lineType;
};
Lines.prototype.render = function() {
	Lines.superclass.render.apply(this, arguments);
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

};

Frost.Lines = Lines;