Frost.namespace("Frost.Legend");
function Legend (cfg) {
	this._parent = cfg.parent;
	this._container = cfg.container;
	this._seriesName = cfg.seriesName;
	this._colorList = cfg.colorList;
	this.xSpace = cfg.xSpace;
	this._isShow = true;
	this.detail = cfg.detail;
	this._focus = false;
}

Legend.prototype.getParent = function() {
	return this._parent;
};

Legend.prototype.getContainer = function() {
	return this._container;
};

Legend.prototype.getSeriesName = function() {
	return this._seriesName;
};
Legend.prototype.getColorList = function() {
	return this._colorList;
};
Legend.prototype.getXSpace = function() {
	return this.xSpace;
};
Legend.prototype.hasFocus = function() {
	return this._focus;
};
Legend.prototype.show = function() {
	this._isShow = true;
	this._container.style("display", "block");
};
Legend.prototype.hide = function() {
	this._isShow = false;
	this._container.style("display", "none");
};
Legend.prototype.render = function() {
	var color = d3.scale.ordinal()
    					.range(this.getColorList());
    this._containerSVGNode = this._container.append("svg");
    var maxHeight = 0;
    var containerNode = this._containerSVGNode.append("g")
    								   .attr("class", "frost_legend");
	this._legend = containerNode.selectAll(".frost_legend_single")
			      				.data(this.getSeriesName())
			    				.enter().append("g")
			      				.attr("class", "frost_legend_single")
			      				.attr("transform", function(d, i) { maxHeight= i*20;return "translate(0," + i * 20 + ")"; });

	this._legend.append("rect")
	      .attr("x", 100 - 18)
	      .attr("width", 18)
	      .attr("height", 18)
	      .style("fill", color);

  	this._legend.append("text")
	      .attr("x", 100 - 24)
	      .attr("y", 9)
	      .attr("dy", ".35em")
	      .style("text-anchor", "end")
	      .text(function(d) { return d; });
	var boundingRect = document.querySelector(".frost_legend").getBoundingClientRect();
	this._containerSVGNode.attr("width", 120)
				   		.attr("height", maxHeight+20);
	this._container.style("top",20 + "px")
					.style("left",(this.getXSpace() - 100 )+ "px")
					.style("width", "120px")
					.style("height", maxHeight+25 + "px");
	
	this._bindUI();
	return this;
};
Legend.prototype._bindUI = function() {
	// this._container.on("mousemove", function() {
	// 	this.show();
	// }.bind(this));
	// this._container.on("mouseleave", function() {
	// 	this.hide();
	// }.bind(this));
	this._container.on("click", function() {
		if(!this.hasFocus()) {
			this._focus = true;
			this._container.attr("class", "frost_legendRootNode frost_legendRootNode_focus");
		} else {
			this._focus = false;
			this._container.attr("class", "frost_legendRootNode");
		}
		
	}.bind(this));
};
Legend.prototype.setPosition = function(x, y) {
	if(this.hasFocus()) {
		this._container.style("top",y + "px")
					.style("left",(x -60) + "px");
		this._focus = false;
		this._container.attr("class", "frost_legendRootNode");
	}
}
Frost.Legend = Legend;