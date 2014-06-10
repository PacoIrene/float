Frost.namespace("Frost.Area");

function Area(cfg) {
	this.color = cfg.color;
	this._container = cfg.container;
	this._parent = cfg.parent;
	this.data = cfg.data;
	this.height = cfg.height;
	this.width = cfg.width;
	this._seriesName = cfg.seriesName;
	this.isXLinear = cfg.isXLinear || false;
	this.lineType = cfg.lineType || "linear";
	this.detail = cfg.detail;
	this.timeXAxis = cfg.timeXAxis || false;
}
Area.prototype.getHeight = function() {
	return this.height;
};

Area.prototype.setHeight = function(data) {
	this.height = data;
};

Area.prototype.getWidth = function() {
	return this.width;
};

Area.prototype.setWidth = function(data) {
	this.Width = data;
};
Area.prototype.getContainer = function() {
	return this._container;
};

Area.prototype.setContainer = function(data) {
	this._container = data;
};
Area.prototype.getParent = function() {
	return this._parent;
};
Area.prototype.getColor = function() {
	return this.color;
};
Area.prototype.getData = function() {
	return this.data;
};
Area.prototype.getGroupContainer = function() {
	return this._groupContainer;
};
Area.prototype.getSeriesName = function() {
	return this._seriesName;
};
Area.prototype.render = function() {
	var x = this.getParent().getParent().getXScale();
	var y = this.getParent().getParent().getYScale();
	var height = this.getHeight();
	this._groupContainer = this._container.append("g");
	if(!this.timeXAxis && this.isXLinear == true) {
		x = d3.scale.linear().range([0, this.getWidth()])
	    x.domain([0,this.getParent().getParent().getNameDomain().length - 1]);
	    this.getParent().getParent().setXScale(x);
	    var area = d3.svg.area()
			     .x(function(d, i) {return x(i);  })
			     .y0(height)
			     .y1(function(d) { return y(d.value); });
	} else {
		// x = d3.scale.ordinal()
  //   			 		  .rangeRoundBands([0, this.getWidth()], .1, 0);
  //   	x.domain[this.getParent().getNameDomain()];
	 //    this.getParent().setXScale(x);
		var area = d3.svg.area()
			     .x(function(d, i) { return x(d.name) + x.rangeBand() / 2;})
			     .y0(height)
			     .y1(function(d) { return y(d.value); });
	}
	if(this.timeXAxis) {
		var area = d3.svg.area()
			     .x(function(d, i) { return x(d.name);})
			     .y0(height)
			     .y1(function(d) { return y(d.value); });
	}
	area.interpolate(this.lineType);
			     // 
    this._groupContainer.append("path")
				        .datum(this.getData())
				        .attr("class", "frost_area")
				        .attr("d", area)
				        .attr("fill", this.getColor());
	// this._bindUI();
	return this;
};
Area.prototype._bindUI = function() {
	var that = this;
	var x = this.getParent().getParent().getXScale();
	var y = this.getParent().getParent().getYScale();
	var width = this.getWidth();
	var height = this.getHeight();
	var nameDomain = this.getParent().getParent().getNameDomain();
	var data = this.getData();
	this._groupContainer.append("rect")
       .attr("class", "frost_overlay")
       .attr("width", width)
       .attr("height", height)
       // .on("mouseover", function() {that.detail.show(); })
       // .on("mouseout", function() { that.detail.hide();})
       .on("mousemove", mousemove);
    function mousemove() {
    	var x0 = d3.mouse(this)[0] / x.rangeBand();
    	var name = "";
    	var value = "";
		// console.log(x0);
		if(x0.toString().length == 1) {
			console.log(x0);
			name = nameDomain[x0 - 1];
			value = Frost.Util.getValue(name, data);
		}
	    // var x0 = x.invert(d3.mouse(this)[0]),
	    //     i = bisectDate(data, x0, 1),
	    //     d0 = data[i - 1],
	    //     d1 = data[i],
	    //     d = x0 - d0.date > d1.date - x0 ? d1 : d0;
	    // focus.attr("transform", "translate(" + x(d.date) + "," + y(d.close) + ")");
	    // focus.select("text").text(formatCurrency(d.close));
	    // that.detail.setContent({position: {x: 200, y:100},name: "",value: ""})
    }
};

Frost.Area = Area;