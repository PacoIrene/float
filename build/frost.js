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
	if(n >= constColor.length) {
		return constColor;
	} else {
		var returnColor = [];
		for(var i = 0; i != n; i++) {
			var index = Math.floor(Math.random() * constColor.length);
			returnColor.push(constColor.splice(index, 1)[0]);
		}
		return returnColor;
	}
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

Util.getColorList = function(series) {
	if(series[0].color) {
		var list = [];
		for(var i = 0; i != series.length; i++) {
			list.push(series[i].color);
		}
		return list;
	} else {
		return Frost.ColorConst(series.length);
	}
};

Frost.Util = Util;
Frost.namespace("Frost.YAxis");

function YAxis(cfg) {
	this._parent = cfg.parent;
	this._container = cfg.container;
	this.xSpace = cfg.xSpace || 0;
	this.ySpace = cfg.ySpace || 0;
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

YAxis.prototype.render = function() {
	this.yAxisNode = this._container.append("g")
							  .attr("class", "frost_axis frost_yAxis")
							  .attr("transform", "translate("+ this.getxSpace() +", "+this.getySpace()+")");    
	var yAxis = d3.svg.axis()
	    .scale(this.getParent().getYScale())
	    .tickSize(1)
	    .tickPadding(4)
	    .orient("left");
	this.yAxisNode.call(yAxis);
	return this;
}

Frost.YAxis = YAxis;
Frost.namespace("Frost.Graph");
var ySpaceRate = 20 / 300;
var xSpaceRate = 20 / 500;

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
	this.leftGap = this.width * xSpaceRate;
	this.bottomGap = this.height * ySpaceRate;
	this.rightGap = this.width * xSpaceRate / 2;
	this.topGap = this.height * ySpaceRate / 2;
	this.xScale = null;
	this.yScale = null;
}

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
	var colorList = Frost.Util.getColorList(this.getSeries());
	var actaulWidth = this.IsHasXAxis() ? (this.getWidth() - this.getLeftGap() - this.getRightGap()) : this.getWidth();
	var actualHeight = this.IsHasYAxis() ? (this.getHeight() - this.getBottomGap() - this.getTopGap()) : this.getHeight();
	this.xScale = d3.scale.ordinal()
    			 		  .rangeRoundBands([0, actaulWidth], .1);
    this.yScale = d3.scale.linear()
    					  .range([actualHeight, 0]);
    this.xScale.domain(Frost.Util.getNameDomain(this.getSeries()));
    this.yScale.domain([0, Frost.Util.getMaxValue(this.getSeries())]);
    if(this.IsHasXAxis()) {
    	this.xAxis = new Frost.XAxis({
			parent: this, 
			container: this._container, 
			xSpace: 0,
			ySpace: this.getHeight()-this.getBottomGap() - this.topGap,
		}).render();
    }
    if(this.IsHasYAxis()) {
    	this.yAxis = new Frost.YAxis({
			parent: this, 
			container: this._container, 
			xSpace: 0,
			ySpace: 0
		}).render();
    }
    if(this.IsHasLegend()) {
    	this.legend = new Frost.Legend({
    		parent: this, 
			container: legnedRootNode,
			seriesName: Frost.Util.getSeriesName(this.getSeries()),
			colorList: colorList,
			xSpace: this.getWidth()
    	}).render();
    }
	for(var i = 0; i != this.getSeries().length; i++) {
		switch(this.getType().toLowerCase()) {
			case "bar":
				this.chartObject.push(new Frost.SingleBar({
					width: actaulWidth, 
					height: actualHeight, 
					data: this.getSeries()[i].data, 
					container: this._container, 
					parent: this,
					color: colorList[i]
				}).render());
				break;
	// 		case "line":
	// 			this.chartObject.push(new Frost.Lines({
	// 				x: this.getWidth(), 
	// 				y: this.getHeight(), 
	// 				data: this.getSeries()[i].data, 
	// 				container: this.container, 
	// 				parent: this,
	// 				color: this.getSeries()[i].color
	// 			}).render());
	// 			break;
	// 		default: 
	// 			break;
		}
	}
	return this;
};

Frost.Graph = Graph;