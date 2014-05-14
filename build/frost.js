/**
 * The Frost Object is the Parent Object of all the sub Object
 * There are three main functions in Frost
 * function namespace is used to split namespace to make modules 
 * function clone is used to do a deep clone
 * function extend is used to extend a superclass
 * 
 * Author: Chu Zhenyang
 * Date:   2014-4-16 00:19
 */ 
var Frost = {
	/**
     * Namespace a module.
     * @method Frost.namespace
     * @param {Array} name The String of a module split by ".".
     */
	namespace: function(name) {
		var nameArray = [];
		var o = Frost;
		if(name.indexOf(".") >= 0) {
			nameArray = name.split(".");
			for(var i = 1; i != nameArray.length; i++) {
				o[nameArray[i]] = o[nameArray[i]] || {};
				o = o[nameArray[i]];
			}
		} 
		return Frost;
	},
	/**
     * Do a deep clone.
     * @method Frost.clone
     * @param {Object} obj The Object for clone.
     */
	clone: function(obj) {
		var cloneObj = {},
			that = this;
		if(that.isString(obj) || that.isNumber(obj) || that.isBoolean(obj)) {
			return obj;
		}
		for(var i in obj) {
			if(Array.isArray(obj[i])) {
				cloneObj[i] = [];
				for(var j = 0; j != obj[i].length; j++) {
					cloneObj[i].push(that.clone(obj[i][j]));
				}
			} else if(typeof obj[i] != "object") {
				cloneObj[i] = obj[i];
			} else {
				cloneObj[i] = that.clone(obj[i]);
			}
		}
		return cloneObj;
	},
	/**
     * Do a extend.
     * @method Frost.extend
     * @param {Object} SubClass The Object to extend.
     * @param {Object} SuperClass The Object for extend.
     */
	extend: function(subClz,superClz){
	    var subClzPrototype = subClz.prototype;

        // add the superclass prototype to the subclass definition
        subClz.superclass = superClz.prototype;

        // copy prototype
        var F = function() {
        };
        F.prototype = superClz.prototype;

        subClz.prototype = new F();
        for(var prop in subClzPrototype) {
            if(subClzPrototype.hasOwnProperty(prop)) {
                subClz.prototype[prop] = subClzPrototype[prop];
            }
        }
        subClz.prototype.constructor = subClz;
        if(superClz.prototype.constructor == Object.prototype.constructor) {
            superClz.prototype.constructor = superClz;
        }
        return subClz;
	},
	/**
     * Guide is obj a String.
     * @method Frost.isString
     * @param {Object} obj The Object to guide.
     */
	isString: function(obj) {
		return typeof obj == "string";
	},
	/**
     * Guide is obj a Number.
     * @method Frost.isNumber
     * @param {Object} obj The Object to guide.
     */
	isNumber: function(obj) {
		return typeof obj == "number"
	},
	/**
     * Guide is obj a Boolean.
     * @method Frost.isBoolean
     * @param {Object} obj The Object to guide.
     */
	isBoolean: function(obj) {
		return typeof obj == "boolean";
	},
	/**
     * Guide is obj a Array.
     * @method Frost.isArray
     * @param {Object} obj The Object to guide.
     */
	isArray: function(obj) {
		return Array.isArray(obj);
	}
};
Frost.namespace("Frost.ColorConst");

Frost.ColorConst = function(n) {
	var constColor = [
		'#ecb796',
		'#dc8f70',
		'#b2a470',
		'#92875a',
		'#716c49',
		'#d2ed82',
		'#bbe468',
		'#a1d05d',
		'#e7cbe6',
		'#d8aad6',
		'#a888c2',
		'#9dc2d3',
		'#649eb9',
		'#387aa3'
	];
	var returnColor = [];
	for(var i = 0; i != n; i++) {
		returnColor.push(constColor[i%n]);
	}
	return returnColor;
	// if(n >= constColor.length) {
	// 	return constColor;
	// } else {
	// 	var returnColor = [];
	// 	for(var i = 0; i != n; i++) {
	// 		var index = Math.floor(Math.random() * constColor.length);
	// 		returnColor.push(constColor.splice(index, 1)[0]);
	// 	}
	// 	return returnColor;
	// }
};
Frost.namespace("Frost.SingleBar");
function SingleBar (cfg) {
	this.color = cfg.color;
	this._container = cfg.container;
	this._parent = cfg.parent;
	this.data = cfg.data;
	this.height = cfg.height;
	this.width = cfg.width;
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
	var x = this.getParent().getXScale();
	var y = this.getParent().getYScale();
	var height = this.getHeight();
	this._groupContainer = this._container.append("g");
	this._groupContainer.selectAll(".frost_bar")
      					.data(this.getData())
    					.enter().append("rect")
      					.attr("class", "frost_bar")
      					.attr("x", function(d) {return x(d.name); })
      					.attr("y", function(d) { return y(d.value); })
      					.attr("height", function(d) { return height - y(d.value); })
      					.attr("width", x.rangeBand())
      					.attr("fill", this.getColor());
};

Frost.SingleBar = SingleBar;
Frost.namespace("Frost.GroupBar");

function GroupBar (cfg) {
	this.height = cfg.height;
	this.width = cfg.width;
	this._container = cfg.container;
	this._parent = cfg.parent;
	this.data = cfg.data;
	this.colorList = cfg.colorList;
	this._seriesName = cfg.seriesName;
	this.type = cfg.type || 1;
}
GroupBar.prototype.getType = function() {
	return this.type;
};
GroupBar.prototype.getHeight = function() {
	return this.height;
};

GroupBar.prototype.setHeight = function(data) {
	this.height = data;
};

GroupBar.prototype.getWidth = function() {
	return this.width;
};

GroupBar.prototype.setWidth = function(data) {
	this.Width = data;
};
GroupBar.prototype.getContainer = function() {
	return this._container;
};
GroupBar.prototype.setContainer = function(data) {
	this._container = data;
};
GroupBar.prototype.getParent = function() {
	return this._parent;
};
GroupBar.prototype.getData = function() {
	return this.data;
};
GroupBar.prototype.getColorList = function() {
	return this.colorList;
};
GroupBar.prototype.getSeriesName = function() {
	return this._seriesName;
};
GroupBar.prototype.render = function() {
	var x = this.getParent().getXScale();
	var y = this.getParent().getYScale();
	var x1 = d3.scale.ordinal();
	var height = this.getHeight();
	var colorList = this.getColorList();
	var formatData = Frost.Util.formatDataForGroupBar(this.getData());
	this._groupContainer = this._container.append("g");
	x1.domain(this.getSeriesName()).rangeRoundBands([0, x.rangeBand()]);
	if(this.getType() == 1) {
		x.domain(this.getSeriesName());
		formatData = this.getData();
		this.getParent().setLegendName(this.getParent().getNameDomain());
		colorList = Frost.Util.getColorList(this.getData(), this.getParent().getNameDomain().length);
		this.getParent().setColorList(colorList);
		x1.domain(this.getParent().getNameDomain()).rangeRoundBands([0, x.rangeBand()]);
	}
	var groupNode = this._groupContainer.selectAll(".frost_groupBar")
									    .data(formatData)
									    .enter().append("g")
									    .attr("class", "frost_groupBar_single")
									    .attr("transform", function(d,i) {
									    	return "translate(" + x(d.name) + ",0)"; 
									    });

	groupNode.selectAll("rect")
	     .data(function(d) { return d.data; })
	     .enter().append("rect")
	     .attr("width", x1.rangeBand())
	     .attr("x", function(d) { return x1(d.name); })
	     .attr("y", function(d) { return y(d.value); })
	     .attr("height", function(d) { return height - y(d.value); })
	     .style("fill", function(d,i) { return colorList[i]; });
	return this;
}

Frost.GroupBar = GroupBar;
Frost.namespace("Frost.Legend");
function Legend (cfg) {
	this._parent = cfg.parent;
	this._container = cfg.container;
	this._seriesName = cfg.seriesName;
	this._colorList = cfg.colorList;
	this.xSpace = cfg.xSpace;
	this._isShow = true;
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
Legend.prototype.show = function() {
	this._isShow = true;
	this._containerSVGNode.style("display", "block");
};
Legend.prototype.hide = function() {
	this._isShow = false;
	this._containerSVGNode.style("display", "none");
};
Legend.prototype.render = function() {
	var color = d3.scale.ordinal()
    					.range(this.getColorList());
    this._containerSVGNode = this._container.append("svg");
    var containerNode = this._containerSVGNode.append("g")
    								   .attr("class", "frost_legend");
	this._legend = containerNode.selectAll(".frost_legend_single")
			      				.data(this.getSeriesName())
			    				.enter().append("g")
			      				.attr("class", "frost_legend_single")
			      				.attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

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
	this._containerSVGNode.attr("width", 100)
				   		.attr("height", boundingRect.height);
	this._container.style("top",20 + "px")
					.style("left",(this.getXSpace() - 100 )+ "px")
					.style("width", "100px")
					.style("height", boundingRect.height + "px");
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
		if(this._isShow) {
			this.hide();
		} else {
			this.show();
		}
	}.bind(this));
};

Frost.Legend = Legend;
Frost.namespace("Frost.StackBar");

function StackBar(cfg) {
	this.height = cfg.height;
	this.width = cfg.width;
	this._container = cfg.container;
	this._parent = cfg.parent;
	this.data = cfg.data;
	this.colorList = cfg.colorList;
	this._seriesName = cfg.seriesName;
	this.type = cfg.type || 1;
}
StackBar.prototype.getType = function() {
	return this.type;
};
StackBar.prototype.getHeight = function() {
	return this.height;
};

StackBar.prototype.setHeight = function(data) {
	this.height = data;
};

StackBar.prototype.getWidth = function() {
	return this.width;
};

StackBar.prototype.setWidth = function(data) {
	this.Width = data;
};
StackBar.prototype.getContainer = function() {
	return this._container;
};
StackBar.prototype.setContainer = function(data) {
	this._container = data;
};
StackBar.prototype.getParent = function() {
	return this._parent;
};
StackBar.prototype.getData = function() {
	return this.data;
};
StackBar.prototype.getColorList = function() {
	return this.colorList;
};
StackBar.prototype.getSeriesName = function() {
	return this._seriesName;
};
StackBar.prototype.render = function() {
	var x = this.getParent().getXScale();
	var y = this.getParent().getYScale();
	var colorList = this.getColorList();
	if(this.getType() == 1) {
		this.data = Frost.Util.formatDataForStackBar(this.getData(), 1);
		// x.domain(this.getParent().getSeriesName());
		colorList = Frost.Util.getColorList(this.getData(), this.getParent().getNameDomain().length);
		this.getParent().setColorList(colorList);
		this.getParent().setLegendName(this.getParent().getNameDomain());
		x.domain(this.getSeriesName());
	} else if(this.getType() == 2) {	
		this.data = Frost.Util.formatDataForStackBar(this.getData(), 2);
		colorList = Frost.Util.getColorList(this.getData(), this.getSeriesName().length);
		this.getParent().setColorList(colorList);
		this.getParent().setLegendName(this.getSeriesName());
		x.domain(this.getParent().getNameDomain());
	}
	var data = this.data;
	y.domain([0, d3.max(this.data, function(d) { return d.total; })]);
	this._groupContainer = this._container.append("g");
	var groupNode = this._groupContainer.selectAll(".frost_stackBar")
      									.data(data)
   										.enter().append("g")
									    .attr("class", "frost_stackBar")
									    .attr("transform", function(d) { return "translate(" + x(d.name) + ",0)"; });

  	groupNode.selectAll("rect")
		     .data(function(d) { return d.data; })
		     .enter().append("rect")
		     .attr("width", x.rangeBand())
		     .attr("y", function(d) { return y(d.y1); })
		     .attr("height", function(d) { return y(d.y0) - y(d.y1); })
		     .style("fill", function(d, i) { return colorList[i]; });
	return this;
};

Frost.StackBar = StackBar;
Frost.namespace("Frost.Area");

function Area(cfg) {
	this.color = cfg.color;
	this._container = cfg.container;
	this._parent = cfg.parent;
	this.data = cfg.data;
	this.height = cfg.height;
	this.width = cfg.width;
	this._seriesName = cfg.seriesName;
	this.isXLinear = cfg.isXLinear || true;
	this.lineType = cfg.lineType || "linear";
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
Area.prototype.getIsStright = function() {
	return this.isStright;
};
Area.prototype.render = function() {
	var x = this.getParent().getXScale();
	var y = this.getParent().getYScale();
	var height = this.getHeight();
	this._groupContainer = this._container.append("g");
	if(this.isXLinear == true) {
		x = d3.scale.linear().range([0, this.getWidth()])
	    x.domain([0,this.getParent().getNameDomain().length - 1]);
	    this.getParent().setXScale(x);
	    var area = d3.svg.area()
			     .x(function(d, i) { 
			     	return x(i); 
			     })
			     .y0(height)
			     .y1(function(d) { return y(d.value); });
	} else {
		var area = d3.svg.area()
			     .x(function(d, i) { 
			     	return x(d.name) + x.rangeBand() / 2; 
			     })
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
	return this;
};

Frost.Area = Area;
Frost.namespace("Frost.StackArea");

function StackArea(cfg) {
	this.height = cfg.height;
	this.width = cfg.width;
	this._container = cfg.container;
	this._parent = cfg.parent;
	this.data = cfg.data;
	this.colorList = cfg.colorList;
	this._seriesName = cfg.seriesName;
	this.isXLinear = cfg.isXLinear || false;
	this.lineType = cfg.lineType || "linear";
}
StackArea.prototype.getType = function() {
	return this.type;
};
StackArea.prototype.getHeight = function() {
	return this.height;
};

StackArea.prototype.setHeight = function(data) {
	this.height = data;
};

StackArea.prototype.getWidth = function() {
	return this.width;
};

StackArea.prototype.setWidth = function(data) {
	this.Width = data;
};
StackArea.prototype.getContainer = function() {
	return this._container;
};
StackArea.prototype.setContainer = function(data) {
	this._container = data;
};
StackArea.prototype.getParent = function() {
	return this._parent;
};
StackArea.prototype.getData = function() {
	return this.data;
};
StackArea.prototype.getColorList = function() {
	return this.colorList;
};
StackArea.prototype.getSeriesName = function() {
	return this._seriesName;
};
StackArea.prototype.render = function() {
	var x = this.getParent().getXScale();
	var y = this.getParent().getYScale();
	this._groupContainer = this._container.append("g");
	if(this.isXLinear == true) {
		x = d3.scale.linear().range([0, this.getWidth()])
	    x.domain([0,this.getParent().getNameDomain().length - 1]);
	    this.getParent().setXScale(x);
	    var area = d3.svg.area()
	    .x(function(d, i) { return x(i); })
	    .y0(function(d) { return y(d.y0); })
	    .y1(function(d) { return y(d.y0 + d.y); });
	} else {
		var area = d3.svg.area()
	    .x(function(d) { return x(d.name) + x.rangeBand() / 2 })
	    .y0(function(d) { return y(d.y0); })
	    .y1(function(d) { return y(d.y0 + d.y); });
	}
	area.interpolate(this.lineType);
	var formatData = Frost.Util.formatDataForStackArea(this.getData());
	var stack = d3.layout.stack()
					    .offset("zero")
					    .values(function(d) { return d.values; })
					    .x(function(d) { return d.name; })
					    .y(function(d) { return d.value; });

	var nest = d3.nest()
	    .key(function(d) { return d.key; });

	var layers = stack(nest.entries(formatData));
	 // x.domain(d3.extent(data, function(d) { return d.date; }));
	y.domain([0, d3.max(formatData, function(d) { return d.y0 + d.y; })]);
	var colorList = Frost.Util.getColorList(this.getData(), layers.length);
	this._groupContainer.selectAll(".frost_stackArea")
				      	.data(layers)
				    	.enter().append("path")
			        	.attr("class", "frost_stackArea")
				        .attr("d", function(d) { return area(d.values); })
				        .style("fill", function(d, i) { return colorList[i]; });
	return this;
};

Frost.StackArea = StackArea;
Frost.namespace("Frost.Line");

function Line(cfg) {
	this.color = cfg.color;
	this._container = cfg.container;
	this._parent = cfg.parent;
	this.data = cfg.data;
	this.height = cfg.height;
	this.width = cfg.width;
	this._seriesName = cfg.seriesName;
	this.isXLinear = cfg.isXLinear || false;
	this.lineType = cfg.lineType || "linear";
}
Line.prototype.getHeight = function() {
	return this.height;
};

Line.prototype.setHeight = function(data) {
	this.height = data;
};

Line.prototype.getWidth = function() {
	return this.width;
};

Line.prototype.setWidth = function(data) {
	this.Width = data;
};
Line.prototype.getContainer = function() {
	return this._container;
};

Line.prototype.setContainer = function(data) {
	this._container = data;
};
Line.prototype.getParent = function() {
	return this._parent;
};
Line.prototype.getColor = function() {
	return this.color;
};
Line.prototype.getData = function() {
	return this.data;
};
Line.prototype.getGroupContainer = function() {
	return this._groupContainer;
};
Line.prototype.getSeriesName = function() {
	return this._seriesName;
};

Line.prototype.render = function() {
	var x = this.getParent().getXScale();
	var y = this.getParent().getYScale();
	if(this.isXLinear == true) {
		x = d3.scale.linear().range([0, this.getWidth()])
	    x.domain([0,this.getParent().getNameDomain().length - 1]);
	    this.getParent().setXScale(x);
	    var line = d3.svg.line()
				    	 .x(function(d, i) { return x(i); })
				    	 .y(function(d) { return y(d.value); });
	} else {
		var line = d3.svg.line()
			     .x(function(d, i) { 
			     	console.log(x(d.name) + x.rangeBand() / 2);
			     	return x(d.name) + x.rangeBand() / 2; })
			     .y(function(d) { return y(d.value); });
	}
	line.interpolate(this.lineType);
	this._groupContainer = this._container.append("g");
    this._groupContainer.append("path")
					    .datum(this.getData())
					    .attr("class", "frost_line")
					    .attr("d", line)
					    .style("stroke", this.getColor());
};

Frost.Line = Line;
Frost.namespace("Frost.XAxis");

function XAxis(cfg) {
	// this.domainRange = cfg.length;
	// this.width = cfg.width;
	this._parent = cfg.parent;
	this.xSpace = cfg.xSpace || 0;
	this.ySpace = cfg.ySpace || 0;
	this._container = cfg.container;
}

XAxis.prototype.getySpace = function() {
	return this.ySpace;
};

XAxis.prototype.getxSpace = function() {
	return this.xSpace;
};

XAxis.prototype.getParent = function() {
	return this._parent;
};

XAxis.prototype.getContainer = function() {
	return this._container;
};

XAxis.prototype.render = function() {
	this.xAxisNode = this._container.append("g")
							  .attr("class", "frost_axis frost_xAxis")
							  .attr("transform", "translate("+ this.getxSpace() + ","+ this.getySpace() +")");
	var xAxis = d3.svg.axis()
	    .scale(this.getParent().getXScale())
	    .tickSize(1)
	    .tickPadding(4)
	    .orient("bottom");
	this.xAxisNode.call(xAxis);
	return this;
};

Frost.XAxis = XAxis;
Frost.namespace("Frost.Util");
var Util = {};

Util.getNameDomain = function(series) {
	var list = [];
	for(var i = 0; i != series.length; i++) {
		var data = series[i].data;
		for(var j = 0; j != data.length; j++) {
			if(list.indexOf(data[j].name) < 0) {
				list.push(data[j].name);
			}
		}
	}
	return list;
};

Util.getMaxValue = function(series) {
	var max = d3.max(series[0].data, function(d) { return Number(d.value); })
	for(var i = 0; i != series.length; i++) {
		var tempMax = d3.max(series[i].data, function(d) { return Number(d.value); });
		if(tempMax >= max) {
			max = tempMax;
		}
	}
	return max;
};
Util.getSeriesName = function(series) {
	var list = [];
	for(var i = 0; i != series.length; i++) {
		list.push(series[i].name);
	}
	return list;
};

Util.getColorList = function(series, length) {
	if(series[0].color) {
		var list = [];
		for(var i = 0; i != series.length; i++) {
			list.push(series[i].color);
		}
		return list;
	} else {
		return Frost.ColorConst(length);
	}
};
Util.getValue = function(name, data) {
	var result = 0;
	for(var k = 0; k != data.length; k++) {
		if(data[k].name == name) {
			result = data[k].value;
			return result;
		}
	}
	return result;
};
Util.formatDataForGroupBar = function(series) {
	var objList = [];
	var seriesName = this.getNameDomain(series);
	for(var i = 0; i != seriesName.length; i++) {
		var obj = {};
		obj["name"] = seriesName[i];
		obj["data"] = [];
		for(var j = 0; j != series.length; j++) {
			var tempObj = {};
			tempObj["name"] = series[j].name;
			tempObj["value"] = this.getValue(obj["name"], series[j].data);
			obj["data"].push(tempObj);
		}
		objList.push(obj);
	}
	return objList;
};

Util.formatDataForStackBar = function(series, type) {
	var objList = [];
	if(type == 1) {
		for(var i = 0; i != series.length; i++) {
			var obj = {};
			obj["name"] = series[i].name;
			obj["data"] = [];
			var start = 0;
			for(var j = 0; j != series[i].data.length; j++) {
				var tempObj = {};
				tempObj["name"] = series[i].data[j].name;
				tempObj["y0"] = start;
				start = start + series[i].data[j].value;
				tempObj["y1"] = start;
				obj["data"].push(tempObj);
			}
			obj["total"] = start;
			objList.push(obj);
		}
	} else if(type == 2) {
		var seriesName = this.getNameDomain(series);
		for(var i = 0; i != seriesName.length; i++) {
			var obj = {};
			obj["name"] = seriesName[i];
			obj["data"] = [];
			var start = 0;
			for(var j = 0; j != series.length; j++) {
				var tempObj = {};
				var value = this.getValue(obj["name"], series[j].data);
				tempObj["name"] = series[j].name;
				tempObj["y0"] = start;
				start = start + value;
				tempObj["y1"] = start;
				obj["data"].push(tempObj);
			}
			obj["total"] = start;
			objList.push(obj);
		}
	}
	return objList;
};

Util.formatDataForStackArea = function(series) {
	var objList = [];
	for(var i = 0; i != series.length; i++) {
		for(var j = 0; j != series[i].data.length; j++) {
			var obj = {};
			obj["key"] = series[i].name;
			obj["name"] = series[i].data[j].name;
			obj["value"] = series[i].data[j].value;
			objList.push(obj);
		}
	}
	return objList;
};

Frost.Util = Util;
Frost.namespace("Frost.YAxis");

function YAxis(cfg) {
	this._parent = cfg.parent;
	this._container = cfg.container;
	this.xSpace = cfg.xSpace || 0;
	this.ySpace = cfg.ySpace || 0;
	this.width = cfg.width;
}


YAxis.prototype.getParent = function() {
	return this._parent;
};

YAxis.prototype.getContainer = function() {
	return this._container;
};

YAxis.prototype.getySpace = function() {
	return this.ySpace;
};

YAxis.prototype.getxSpace = function() {
	return this.xSpace;
};
YAxis.prototype.getWidth = function() {
	return this.width;
};

YAxis.prototype.render = function() {
	this.yAxisNode = this._container.append("g")
							  .attr("class", "frost_axis frost_yAxis")
							  .attr("transform", "translate("+ this.getxSpace() +", "+this.getySpace()+")");    
	var yAxis = d3.svg.axis()
	    .scale(this.getParent().getYScale())
	    // .tickSize(-this.getWidth())
	    .tickSize(-4)
	    .tickPadding(4)
	    .orient("left");
	this.yAxisNode.call(yAxis)
	.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("");
	return this;
}

Frost.YAxis = YAxis;
Frost.namespace("Frost.Graph");
var ySpaceRate = 20 / 300;
var xSpaceRate = 40 / 500;

function Graph(cfg) {
	this.node = cfg.element || "body";
	this.series = cfg.series;
	this.width = cfg.width;
	this.height = cfg.height;
	this.type = cfg.type || "column";
	this.chartObject = [];
	// this.detail = null;
	this.hasXAxis = cfg.xAxis || false;
	this.hasYAxis = cfg.yAxis || false;
	this.hasLegend = cfg.legend || false;
	this.hasStack = cfg.stack || false;
	this.leftGap = this.width * xSpaceRate;
	this.bottomGap = this.height * ySpaceRate;
	this.rightGap = this.width * xSpaceRate / 2;
	this.topGap = this.height * ySpaceRate / 2;
	this.xScale = null;
	this.yScale = null;
	this.cfg = cfg;
}
Graph.prototype.getCfg = function() {
	return this.cfg;
};
Graph.prototype.getNode = function() {
	return this.node;
};
Graph.prototype.setNode = function(data) {
	this.node = data;
};

Graph.prototype.getType = function() {
	return this.type;
};
Graph.prototype.getSeries = function() {
	return this.series;
};
Graph.prototype.setSeries = function(data) {
	this.series = data;
};

Graph.prototype.getWidth = function() {
	return this.width;
};
Graph.prototype.setWidth = function(data) {
	this.width = data;
};

Graph.prototype.getHeight = function() {
	return this.height;
};
Graph.prototype.setHeight = function(data) {
	this.height = data;
};

Graph.prototype.getChartObject = function() {
	return this.chartObject;
};
Graph.prototype.setChartObject = function(data) {
	this.chartObject = data;
};
Graph.prototype.getXScale = function() {
	return this.xScale;
};
Graph.prototype.getYScale = function() {
	return this.yScale;
};
Graph.prototype.setXScale = function(data) {
	this.xScale = data;
};
Graph.prototype.setYScale = function(data) {
	this.yScale = data;
};
// Graph.prototype.getDetail = function() {
// 	return this.detail;
// };
Graph.prototype.getContainer = function() {
	return this._container;
};
Graph.prototype.IsHasYAxis = function() {
	return this.hasYAxis;
};
Graph.prototype.IsHasXAxis = function() {
	return this.hasXAxis;
};
Graph.prototype.IsHasLegend = function() {
	return this.hasLegend;
};
Graph.prototype.IsStack = function() {
	return this.hasStack;
};
Graph.prototype.getLeftGap = function() {
	return this.leftGap;
};
Graph.prototype.getBottomGap = function() {
	return this.bottomGap;
};
Graph.prototype.getTopGap = function() {
	return this.topGap;
};
Graph.prototype.getRightGap = function() {
	return this.rightGap;
};
Graph.prototype.getXAxis = function() {
	return this.xAxis;
};
Graph.prototype.getYAxis = function() {
	return this.yAxis;
};
Graph.prototype.setXAxis = function(data) {
	this.xAxis = data;
};
Graph.prototype.setYAxis = function(data) {
	this.yAxis = data;
};
Graph.prototype.getLegend = function() {
	return this.legend;
};
Graph.prototype.setNameDomain = function(data) {
	this.nameDomain = data;
};
Graph.prototype.getNameDomain = function() {
	return this.nameDomain;
};
Graph.prototype.setColorList = function(data) {
	this.colorList = data;
};
Graph.prototype.getColorList = function() {
	return this.colorList;
};
Graph.prototype.setYScaleMaxValue = function(data) {
	this.yScaleMaxValue = data;
};
Graph.prototype.setLegendName = function(data) {
	this.legendName = data;
};
/**
 * Render the Chart.
 * @method Frost.Graph.render
 */
Graph.prototype.render = function() {
	var rootNode = d3.select(this.node).append("div")
									   .attr("class", "frost_rootNode")
									   .style("height", this.getHeight() + "px")
									   .style("width", this.getWidth() + "px");
	var legnedRootNode = rootNode.append("div")
								.attr("class", "frost_legendRootNode");
	var svgNode = rootNode.append("svg")
							.attr("width", this.getWidth())
							.attr("height", this.getHeight());
	this._container = svgNode.append("g")
    						.attr("transform", "translate(" + this.getLeftGap() + "," + this.getTopGap() + ")");
	// this.detail = new Frost.Detail({container: rootNode}).render();
	this.colorList = Frost.Util.getColorList(this.getSeries(), this.getSeries().length);
	var actaulWidth = this.IsHasXAxis() ? (this.getWidth() - this.getLeftGap() - this.getRightGap()) : this.getWidth();
	var actualHeight = this.IsHasYAxis() ? (this.getHeight() - this.getBottomGap() - this.getTopGap()) : this.getHeight();
	var seriesName = Frost.Util.getSeriesName(this.getSeries());
	this.legendName = seriesName;
	this.xScale = d3.scale.ordinal()
    			 		  .rangeRoundBands([0, actaulWidth], .1);
    this.yScale = d3.scale.linear()
    					  .range([actualHeight, 0]);
    this.nameDomain = Frost.Util.getNameDomain(this.getSeries());
    this.yScaleMaxValue = Frost.Util.getMaxValue(this.getSeries());
    this.xScale.domain(this.nameDomain);
    this.yScale.domain([0, this.yScaleMaxValue]);
	switch(this.getType().toLowerCase()) {
		case "bar":
			if(this.getSeries().length == 1) {
				this.chartObject.push(new Frost.SingleBar({
					width: actaulWidth, 
					height: actualHeight, 
					data: this.getSeries()[0].data, 
					container: this._container, 
					parent: this,
					color: this.getColorList()[0]
				}).render());
			} else if (this.getSeries().length > 1) {
				if(!this.IsStack()) {
					this.chartObject.push(new Frost.GroupBar({
						width: actaulWidth, 
						height: actualHeight,
						data: this.getSeries(), 
						container: this._container, 
						parent: this,
						seriesName: seriesName,
						colorList: this.getColorList(),
						type: this.getCfg().barType
					}).render());
				} else {
					this.chartObject.push(new Frost.StackBar({
						width: actaulWidth, 
						height: actualHeight,
						data: this.getSeries(), 
						container: this._container, 
						parent: this,
						seriesName: seriesName,
						colorList: this.getColorList(),
						type: this.getCfg().barType
					}).render());
				}
			}
			
			break;
		case "area":
		// this.xScale = d3.scale.ordinal()
  //   			 		  .rangeRoundBands([0, actaulWidth],.001);
			if(this.getSeries().length == 1) {
				this.chartObject.push(new Frost.Area({
					width: actaulWidth, 
					height: actualHeight, 
					data: this.getSeries()[0].data, 
					container: this._container, 
					parent: this,
					color: this.getColorList()[0],
					seriesName: seriesName,
					isXLinear: this.getCfg().isXLinear,
					lineType: this.getCfg().lineType
				}).render());
			} else if (this.getSeries().length > 1) {
				this.chartObject.push(new Frost.StackArea({
						width: actaulWidth, 
						height: actualHeight,
						data: this.getSeries(), 
						container: this._container, 
						parent: this,
						seriesName: seriesName,
						colorList: this.getColorList(),
						isXLinear: this.getCfg().isXLinear,
						lineType: this.getCfg().lineType
					}).render());
			}
			break;
		case "line":
			if(this.getSeries().length == 1) {
				this.chartObject.push(new Frost.Line({
					width: actaulWidth, 
					height: actualHeight, 
					data: this.getSeries()[0].data, 
					container: this._container, 
					parent: this,
					color: this.getColorList()[0],
					seriesName: seriesName,
					isXLinear: this.getCfg().isXLinear,
					lineType: this.getCfg().lineType
				}).render());
			} else if (this.getSeries().length > 1) {

			}
			break;
		default: 
			break;
	}
	if(this.IsHasXAxis()) {
    	this.xAxisRender({
			parent: this, 
			container: this._container, 
			xSpace: 0,
			ySpace: this.getHeight()-this.getBottomGap() - this.topGap,
		});
    }
    if(this.IsHasYAxis()) {
    	this.yAxisRender({
			parent: this, 
			container: this._container, 
			xSpace: 0,
			ySpace: 0,
			width: actaulWidth
		});
    }
    if(this.IsHasLegend()) {
    	this.legendRender({
    		parent: this, 
			container: legnedRootNode,
			seriesName: this.legendName,
			colorList: this.getColorList(),
			xSpace: this.getWidth()
    	});
    }
	return this;
};
Graph.prototype.xAxisRender = function(cfg) {
	this.xAxis = new Frost.XAxis({
		parent: cfg.parent, 
		container: cfg.container, 
		xSpace: cfg.xSpace,
		ySpace: cfg.ySpace,
	}).render();
};
Graph.prototype.yAxisRender = function(cfg) {
	this.yAxis = new Frost.YAxis({
		parent: cfg.parent, 
		container: cfg.container, 
		xSpace: cfg.xSpace,
		ySpace: cfg.ySpace,
		width: cfg.width
	}).render();
};
Graph.prototype.legendRender = function(cfg) {
	this.legend = new Frost.Legend({
		parent: cfg.parent, 
		container: cfg.container,
		seriesName: cfg.seriesName,
		colorList: cfg.colorList,
		xSpace: cfg.xSpace
	}).render();
};
Frost.Graph = Graph;