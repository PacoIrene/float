/*! Frost.js 0.1.5 2014-06-10 */
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
	extend: function(subClass,superClass){
	    var subClzPrototype = subClass.prototype;
        subClass.superclass = superClass.prototype;
        var F = function() {
        };
        F.prototype = superClass.prototype;

        subClass.prototype = new F();
        for(var prop in subClzPrototype) {
            if(subClzPrototype.hasOwnProperty(prop)) {
                subClass.prototype[prop] = subClzPrototype[prop];
            }
        }
        subClass.prototype.constructor = subClass;
        if(superClass.prototype.constructor == Object.prototype.constructor) {
            superClass.prototype.constructor = superClass;
        }
        return subClass;
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
	},
	/**
     * Guide Web Browswer is support SVG.
     * @method Frost.isArray
     * @param {Object} obj The Object to guide.
     */
	testSVG: function(){
　　var ns = {'svg': 'http://www.w3.org/2000/svg'};
　　return !!document.createElementNS && !!document.createElementNS(ns.svg, 'svg').createSVGRect;
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
		'#387aa3',
		'#57306f',
		'#514c76',
		'#646583',
		'#738394',
		'#6b9c7d',
		'#84b665',
		'#a7ca50',
		'#bfe746',
		'#e2f528',
		'#fff726',
		'#ecdd00',
		'#d4b11d',
		'#de8800',
		'#de4800',
		'#c91515',
		'#9a0000',
		'#7b0429',
		'#580839',
		'#31082b'
	];
	var returnColor = [];
	for(var i = 0; i != n; i++) {
		returnColor.push(constColor[i%constColor.length]);
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
	this.detail = cfg.detail;
	this.hasDetail = cfg.hasDetail || false;
	this.hasContent = cfg.hasContent || false;
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
	var that = this;
	function mousemove(d) {
		var x0 = d3.mouse(this)[0] + (that.getWidth() / 500 -1) * 50;
		var y0 = d3.mouse(this)[1] + (that.getHeight() / 300 -1) * 10;
		that.detail.setContent({position: {x: x0, y:y0},contentValue: d.name + ": "+d.value});
	}
	var x = this.getParent().getXScale();
	var y = this.getParent().getYScale();
	var height = this.getHeight();
	this._groupContainer = this._container.append("g");
	var node = this._groupContainer.selectAll(".frost_bar")
		      					.data(this.getData())
		    					.enter().append("rect")
		      					.attr("class", "frost_bar")
		      					.attr("x", function(d) {return x(d.name); })
		      					.attr("y", function(d) { return y(d.value); })
		      					.attr("height", function(d) { return height - y(d.value); })
		      					.attr("width", x.rangeBand())
		      					.attr("fill", this.getColor());
    if(this.hasDetail) {
		node.on("mouseover", function() {that.detail.show(); })
	        .on("mouseout", function() { that.detail.hide();})
	        .on("mousemove", mousemove);
	}
	if(this.hasContent) {
		this._groupContainer.selectAll(".frost_text")
			      					.data(this.getData())
			    					.enter().append("text")
			    					.attr("class", "frost_text")
								    .attr("dy", ".75em")
								    .attr("y", function(d) { return y(d.value)+6;})
								    .attr("x", function(d) {return x(d.name)+x.rangeBand()/2; })
								    .attr("text-anchor", "middle")
								    .text(function(d) { return d.value; });
	}
    return this;

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
	this.detail = cfg.detail;
	this.hasDetail = cfg.hasDetail || false;
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
	var that = this;
	function mousemove(d) {
		var x0 = d3.mouse(this)[0]+groupNodeMouseX + (that.getWidth() / 500 -1) * 50;
		var y0 = d3.mouse(this)[1] + (that.getHeight() / 300 -1) * 10;
		that.detail.setContent({position: {x: x0, y:y0},contentValue: d.name + ": "+d.value});
	}
	var groupNodeMouseX = 0;
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
	groupNode.on("mousemove", function(d) {groupNodeMouseX = x(d.name);});
	var node = groupNode.selectAll("rect")
				     .data(function(d) { return d.data; })
				     .enter().append("rect")
				     .attr("width", x1.rangeBand())
				     .attr("x", function(d) { return x1(d.name); })
				     .attr("y", function(d) { return y(d.value); })
				     .attr("height", function(d) { return height - y(d.value); })
				     .style("fill", function(d,i) { return colorList[i]; });
	if(this.hasDetail) {
		node.on("mouseover", function() {that.detail.show(); })
	        .on("mouseout", function() { that.detail.hide();})
	        .on("mousemove", mousemove);
	}
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
	this.detail = cfg.detail;
	this.hasDetail = cfg.hasDetail || false;
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
	var that = this;
	function mousemove(d) {
		var x0 = x(d.name) + d3.mouse(this)[0] +  (that.getWidth() / 500 -1) * 50;
		var y0 = d3.mouse(this)[1] + (that.getHeight() / 300 -1) * 10;
		var content = d.name + ": " +d.total +"<br><br>";
		for(var i = 0; i != d.data.length; i++) {
			content += d.data[i].name+ ": " + (d.data[i].y1 - d.data[i].y0) + "  "+ ((((d.data[i].y1 - d.data[i].y0)/d.total).toFixed(4))*100).toFixed(2)+"%"+"<br>";
		}
		that.detail.setContent({position: {x: x0, y:y0},contentValue: content});
	}
	var groupNodeMouseX = 0;
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
		// colorList = Frost.Util.getColorList(this.getData(), this.getSeriesName().length);
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
  	var node = groupNode.selectAll("rect")
					     .data(function(d) { return d.data; })
					     .enter().append("rect")
					     .attr("width", x.rangeBand())
					     .attr("y", function(d) { return y(d.y1); })
					     .attr("height", function(d) { return y(d.y0) - y(d.y1); })
					     .style("fill", function(d, i) { return colorList[i]; });
	if(this.hasDetail) {
		groupNode.on("mouseover", function() {that.detail.show(); })
	        .on("mouseout", function() { that.detail.hide();})
	        .on("mousemove", mousemove);
	}
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
Frost.namespace("Frost.Areas");

function Areas(cfg) {
	this.height = cfg.height;
	this.width = cfg.width;
	this._container = cfg.container;
	this._parent = cfg.parent;
	this.data = cfg.data;
	this.colorList = cfg.colorList;
	this._seriesName = cfg.seriesName;
	this.isXLinear = cfg.isXLinear || false;
	this.lineType = cfg.lineType || "linear";
	this._areaList = [];
	this.detail = cfg.detail;
	this.timeXAxis = cfg.timeXAxis || false;
}
Areas.prototype.getType = function() {
	return this.type;
};
Areas.prototype.getHeight = function() {
	return this.height;
};

Areas.prototype.setHeight = function(data) {
	this.height = data;
};

Areas.prototype.getWidth = function() {
	return this.width;
};

Areas.prototype.setWidth = function(data) {
	this.Width = data;
};
Areas.prototype.getContainer = function() {
	return this._container;
};
Areas.prototype.setContainer = function(data) {
	this._container = data;
};
Areas.prototype.getParent = function() {
	return this._parent;
};
Areas.prototype.getData = function() {
	return this.data;
};
Areas.prototype.getColorList = function() {
	return this.colorList;
};
Areas.prototype.getSeriesName = function() {
	return this._seriesName;
};
Areas.prototype.getAreaList = function() {
	return this._areaList;
};
Areas.prototype.getChildrenContainer = function() {
	return this.childrenContainer;
};
Areas.prototype.render = function() {
	this.childrenContainer = this._container.append("g")
											.attr("class", "forst_AreasContainer");
	for(var i = 0; i != this.getData().length; i++) {
		this._areaList.push(new Frost.Area({
					width: this.getWidth(), 
					height: this.getHeight(), 
					data: this.getData()[i].data, 
					container: this.childrenContainer, 
					parent: this,
					color: this.getColorList()[i],
					seriesName: this.getSeriesName(),
					isXLinear: this.isXLinear,
					lineType: this.lineType,
					detail: this.detail,
					timeXAxis: this.timeXAxis
				}).render());
	}
	return this;
};

Frost.Areas = Areas;
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
	this.detail = cfg.detail;
	this.timeXAxis = cfg.timeXAxis || false;
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
	if(!this.timeXAxis && this.isXLinear == true) {
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
	if(this.timeXAxis) {
		var area = d3.svg.area()
	    .x(function(d) { return x(d.name); })
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
	this.detail = cfg.detail;
	this.timeXAxis = cfg.timeXAxis || false;
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
	var x = this.getParent().getParent().getXScale();
	var y = this.getParent().getParent().getYScale();
	if(!this.timeXAxis && this.isXLinear == true) {
		x = d3.scale.linear().range([0, this.getWidth()])
	    x.domain([0,this.getParent().getParent().getNameDomain().length - 1]);
	    this.getParent().getParent().setXScale(x);
	    var line = d3.svg.line()
				    	 .x(function(d, i) { return x(i); })
				    	 .y(function(d) { return y(d.value); });
	} else {
		var line = d3.svg.line()
			     .x(function(d, i) { 
			     	return x(d.name) + x.rangeBand() / 2; })
			     .y(function(d) { return y(d.value); });
	}
	if(this.timeXAxis) {
		var line = d3.svg.line()
			     .x(function(d, i) { 
			     	return x(d.name)})
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
Frost.namespace("Frost.Lines");

function Lines(cfg) {
	this.height = cfg.height;
	this.width = cfg.width;
	this._container = cfg.container;
	this._parent = cfg.parent;
	this.data = cfg.data;
	this.colorList = cfg.colorList;
	this._seriesName = cfg.seriesName;
	this.isXLinear = cfg.isXLinear || false;
	this.lineType = cfg.lineType || "linear";
	this._lineList = [];
	this.detail = cfg.detail;
	this.timeXAxis = cfg.timeXAxis || false;
}
Lines.prototype.getType = function() {
	return this.type;
};
Lines.prototype.getHeight = function() {
	return this.height;
};

Lines.prototype.setHeight = function(data) {
	this.height = data;
};

Lines.prototype.getWidth = function() {
	return this.width;
};

Lines.prototype.setWidth = function(data) {
	this.Width = data;
};
Lines.prototype.getContainer = function() {
	return this._container;
};
Lines.prototype.setContainer = function(data) {
	this._container = data;
};
Lines.prototype.getParent = function() {
	return this._parent;
};
Lines.prototype.getData = function() {
	return this.data;
};
Lines.prototype.getColorList = function() {
	return this.colorList;
};
Lines.prototype.getSeriesName = function() {
	return this._seriesName;
};
Lines.prototype.getLineList = function() {
	return this._lineList;
};
Lines.prototype.getChildrenContainer = function() {
	return this.childrenContainer;
};
Lines.prototype.render = function() {
	this.childrenContainer = this._container.append("g")
											.attr("class", "forst_linesContainer");
	for(var i = 0; i != this.getData().length; i++) {
		this._lineList.push(new Frost.Line({
					width: this.getWidth(), 
					height: this.getHeight(), 
					data: this.getData()[i].data, 
					container: this.childrenContainer, 
					parent: this,
					color: this.getColorList()[i],
					seriesName: this.getSeriesName(),
					isXLinear: this.isXLinear,
					lineType: this.lineType,
					detail: this.detail,
					timeXAxis: this.timeXAxis
				}).render());
	}
	return this;
};

Frost.Lines = Lines;
Frost.namespace("Frost.Pie");

function Pie(cfg) {
	this.height = cfg.height;
	this.width = cfg.width;
	this._container = cfg.container;
	this._parent = cfg.parent;
	this.data = cfg.data;
	this.colorList = cfg.colorList;
	this._seriesName = cfg.seriesName;
	this.detail = cfg.detail;
	this.hasDetail = cfg.hasDetail || false;
	this.hasContent = cfg.hasContent || false;
}
Pie.prototype.getType = function() {
	return this.type;
};
Pie.prototype.getHeight = function() {
	return this.height;
};

Pie.prototype.setHeight = function(data) {
	this.height = data;
};

Pie.prototype.getWidth = function() {
	return this.width;
};

Pie.prototype.setWidth = function(data) {
	this.Width = data;
};
Pie.prototype.getContainer = function() {
	return this._container;
};
Pie.prototype.setContainer = function(data) {
	this._container = data;
};
Pie.prototype.getParent = function() {
	return this._parent;
};
Pie.prototype.getData = function() {
	return this.data;
};
Pie.prototype.getColorList = function() {
	return this.colorList;
};
Pie.prototype.getSeriesName = function() {
	return this._seriesName;
};
Pie.prototype.render = function() {
	this.getParent().hasXAxis = false;
	this.getParent().hasYAxis = false;
	var that = this;
	var width = this.getWidth();
	var height = this.getHeight();
	var total = Frost.Util.getTotal([{data:this.getData()}]);
	function mousemove(d) {
		var x0 = d3.mouse(this)[0] + width / 2 + (that.getWidth() / 500 -1) * 50;
		var y0 = d3.mouse(this)[1] + height / 2 + (that.getHeight() / 300 -1) * 10;
		that.detail.setContent({position: {x: x0, y: y0},contentValue: d.data.name + ": "+d.data.value + "<br/>" + "    " + ((d.data.value/total)*100).toFixed(2) + "%"});
	}
	var radius = Math.min(width, height) / 2;
	var colorList = this.getColorList();
	this._groupContainer = this._container.append("g")
										  .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
	var arc = d3.svg.arc()
				    .outerRadius(radius - 10)
				    .innerRadius(0);

	var pie = d3.layout.pie()
			    .sort(null)
			    .value(function(d) { return d.value; });
	var g = this._groupContainer.selectAll(".frost_pie")
			      				.data(pie(this.getData()))
			    				.enter().append("g")
			      				.attr("class", "frost_pie");

	var node = g.append("path").attr("d", arc)
							.attr("isSelected", 0)
	      					.style("fill", function(d, i) { return colorList[i]; });
	if(this.hasDetail) {
		node.on("mouseover", function() {that.detail.show(); })
	        .on("mouseout", function() { that.detail.hide();})
	        .on("mousemove", mousemove);
	        // .on("click", function() {
	        // 	var isSelected = Number(d3.select(this).attr("isSelected"));
	        // 	if(isSelected) {
	        // 		g.classed({"pieScalesmall": false});
	        // 		d3.select(this).classed({"pieScalebig": false});
	        // 	} else {
	        // 		d3.select(this).attr("isSelected", 1)
	        // 		g.classed({"pieScalesmall": true});
	        // 		d3.select(this).classed({"pieScalebig": true});
	        // 	}
	        // });
	}
	if(this.hasContent) {
		g.append("text")
	 .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
	 .attr("dy", ".35em")
	 .style("text-anchor", "middle")
	 .text(function(d) { 
	 	return d.data.name; 
	 });
	}
};

Frost.Pie = Pie;
Frost.namespace("Frost.Bubble");

function Bubble(cfg) {
	this.height = cfg.height;
	this.width = cfg.width;
	this._container = cfg.container;
	this._parent = cfg.parent;
	this.data = cfg.data;
	this.colorList = cfg.colorList;
	this._seriesName = cfg.seriesName;
	this.detail = cfg.detail;
	this.hasDetail = cfg.hasDetail || false;
	this.hasContent = cfg.hasContent || false;
}
Bubble.prototype.getType = function() {
	return this.type;
};
Bubble.prototype.getHeight = function() {
	return this.height;
};

Bubble.prototype.setHeight = function(data) {
	this.height = data;
};

Bubble.prototype.getWidth = function() {
	return this.width;
};

Bubble.prototype.setWidth = function(data) {
	this.Width = data;
};
Bubble.prototype.getContainer = function() {
	return this._container;
};
Bubble.prototype.setContainer = function(data) {
	this._container = data;
};
Bubble.prototype.getParent = function() {
	return this._parent;
};
Bubble.prototype.getData = function() {
	return this.data;
};
Bubble.prototype.getColorList = function() {
	return this.colorList;
};
Bubble.prototype.getSeriesName = function() {
	return this._seriesName;
};
Bubble.prototype.render = function() {
	this.getParent().hasXAxis = false;
	this.getParent().hasYAxis = false;
	var that = this;
	function mousemove(d) {
		var x0 = d3.mouse(this)[0] + d.x + (that.getWidth() / 500 -1) * 50;
		var y0 = d3.mouse(this)[1] + d.y + (that.getHeight() / 300 -1) * 10;
		that.detail.setContent({position: {x: x0, y: y0},contentValue: d.name + ": "+d.value});
	}
	var width = this.getWidth();
	var height = this.getHeight();
	var colorList = Frost.Util.getColorListForBubble(this.getData(), this.getData().length);
	var legendColor = []
	var bubble = d3.layout.pack()
	    .sort(null)
	    .size([width, height])
	    .padding(1.5);
	this._groupContainer = this._container.append("g").attr("class", "frost_bubble");
	var formatData = Frost.Util.formatDataForBubble(this.getData());
	var node = this._groupContainer.selectAll(".forst_bubble_node")
      			  .data(bubble.nodes(formatData)
      			  .filter(function(d) { return !d.children; }))
    			  .enter().append("g")
      			  .attr("class", "forst_bubble_node")
      			  .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

 	// node.append("title")
  //     	.text(function(d) { return d.name + ": " + d.value;});

  	node.append("circle")
      	.attr("r", function(d) { return d.r; })
      	.style("fill", function(d, i) { legendColor.push(colorList[d.package]); return colorList[d.package]; });
    if(this.hasContent) {
    	node.append("text")
	      	.attr("dy", ".3em")
	      	.style("text-anchor", "middle")
	      	.text(function(d) { return d.name.substring(0, d.r / 3);});
	      }
    this.getParent().setColorList(Frost.Util.filterSome(legendColor));
    if(this.hasDetail) {
		node.on("mouseover", function() {that.detail.show(); })
	        .on("mouseout", function() { that.detail.hide();})
	        .on("mousemove", mousemove);
	}
    return this;
};

Frost.Bubble = Bubble;
Frost.namespace("Frost.Arc");

function Arc(cfg) {
	this.height = cfg.height;
	this.width = cfg.width;
	this._container = cfg.container;
	this._parent = cfg.parent;
	this.data = cfg.data;
	this.colorList = cfg.colorList;
	this._seriesName = cfg.seriesName;
	this.detail = cfg.detail;
	this.hasDetail = cfg.hasDetail || false;
}
Arc.prototype.getType = function() {
	return this.type;
};
Arc.prototype.getHeight = function() {
	return this.height;
};

Arc.prototype.setHeight = function(data) {
	this.height = data;
};

Arc.prototype.getWidth = function() {
	return this.width;
};

Arc.prototype.setWidth = function(data) {
	this.Width = data;
};
Arc.prototype.getContainer = function() {
	return this._container;
};
Arc.prototype.setContainer = function(data) {
	this._container = data;
};
Arc.prototype.getParent = function() {
	return this._parent;
};
Arc.prototype.getData = function() {
	return this.data;
};
Arc.prototype.getColorList = function() {
	return this.colorList;
};
Arc.prototype.getSeriesName = function() {
	return this._seriesName;
};

Arc.prototype.render = function() {
	this.getParent().hasXAxis = false;
	this.getParent().hasYAxis = false;
	var that = this;
	var width = this.getWidth();
	var height = this.getHeight();
	var total = Frost.Util.getTotal([{data:this.getData()}]);
	function mousemove(d) {
		var x0 = d3.mouse(this)[0] + width / 2 + (that.getWidth() / 500 -1) * 50;
		var y0 = d3.mouse(this)[1] + height / 2 + (that.getHeight() / 300 -1) * 10;
		that.detail.setContent({position: {x: x0, y: y0},contentValue: d.data.name + ": "+d.data.value+ "<br/>" + "    " + ((d.data.value/total)*100).toFixed(2) + "%"});
	}
	var radius = Math.min(width, height) / 2;
	var colorList = this.getColorList();
	this._groupContainer = this._container.append("g")
										  .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
	var arc = d3.svg.arc()
				    .outerRadius(radius/4)
				    .innerRadius(radius/1.2);

	var pie = d3.layout.pie()
			    .sort(null)
			    .value(function(d) { return d.value; });
	var g = this._groupContainer.selectAll(".frost_pie")
			      				.data(pie(this.getData()))
			    				.enter().append("g")
			      				.attr("class", "frost_pie");

	var node = g.append("path").attr("d", arc)
	      				    	.style("fill", function(d, i) { return colorList[i]; });
	if(this.hasDetail) {
		node.on("mouseover", function() {that.detail.show(); })
	        .on("mouseout", function() { that.detail.hide();})
	        .on("mousemove", mousemove);
	}
	// g.append("text")
	//  .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
	//  .attr("dy", ".35em")
	//  .style("text-anchor", "middle")
	//  .text(function(d) { 
	//  	return d.data.name; 
	//  });
};

Frost.Arc = Arc;
Frost.namespace("Frost.Scatter");

function Scatter(cfg) {
	this.height = cfg.height;
	this.width = cfg.width;
	this._container = cfg.container;
	this._parent = cfg.parent;
	this.data = cfg.data;
	this.colorList = cfg.colorList;
	this._seriesName = cfg.seriesName;
	this.maxRadius = Math.min(this.width, this.height) * 0.25 /2;
	this.detail = cfg.detail;
	this.hasDetail = cfg.hasDetail || false;
}
Scatter.prototype.getType = function() {
	return this.type;
};
Scatter.prototype.getHeight = function() {
	return this.height;
};

Scatter.prototype.setHeight = function(data) {
	this.height = data;
};

Scatter.prototype.getWidth = function() {
	return this.width;
};

Scatter.prototype.setWidth = function(data) {
	this.Width = data;
};
Scatter.prototype.getContainer = function() {
	return this._container;
};
Scatter.prototype.setContainer = function(data) {
	this._container = data;
};
Scatter.prototype.getParent = function() {
	return this._parent;
};
Scatter.prototype.getData = function() {
	return this.data;
};
Scatter.prototype.getColorList = function() {
	return this.colorList;
};
Scatter.prototype.getSeriesName = function() {
	return this._seriesName;
};

Scatter.prototype.render = function() {
	var that = this;
	function mousemove(d) {
		var x0 = d3.mouse(this)[0] +  (that.getWidth() / 500 -1) * 50;
		var y0 = d3.mouse(this)[1] + (that.getHeight() / 300 -1) * 10;
		that.detail.setContent({position: {x: x0, y:y0},contentValue: d.package + ": "+d.value});
		// d.style("stroke", "#123456");
	}
	var x = this.getParent().getXScale();
	var y = this.getParent().getYScale();
	y.domain([0, this.getParent().getYScaleMaxValue() * 1.2]);
	var width = this.getWidth();
	var height = this.getHeight();
	var colorList = Frost.Util.getColorListForBubble(this.getData(), this.getData().length);
	this._formatData = Frost.Util.formatDataForScatter(this.getData(), this.maxRadius);
	this._groupContainer = this._container.append("g").attr("class", "frost_scatter");
	this._node = this._groupContainer.selectAll(".frost_scatter_dot")
					      			 .data(this._formatData)
					    			 .enter().append("circle")
					      			 .attr("class", "frost_scatter_dot")
							         .attr("r", function(d) {return d.radius;})
							         .attr("cx", function(d) { return x(d.name) + x.rangeBand() / 2; })
							         .attr("cy", function(d) { return y(d.value); })
							         .style("fill", function(d) { return colorList[d.package]; });
	if(this.hasDetail) {
		this._node.on("mouseover", function() {that.detail.show(); })
		        .on("mouseout", function() { that.detail.hide();})
		        .on("mousemove", mousemove);
	}
	return this;
};

Frost.Scatter = Scatter;
Frost.namespace("Frost.Force");

function Force(cfg) {
	this.height = cfg.height;
	this.width = cfg.width;
	this._container = cfg.container;
	this._parent = cfg.parent;
	this.data = cfg.data;
	this.colorList = cfg.colorList;
	this._seriesName = cfg.seriesName;
	this.padding = 1.5, // separation between same-color nodes
    this.clusterPadding = 6, // separation between different-color nodes
	this.maxRadius = Math.min(this.width, this.height) * 0.25 /2;
	this.detail = cfg.detail;
	this.hasDetail = cfg.hasDetail || false;
}
Force.prototype.getType = function() {
	return this.type;
};
Force.prototype.getHeight = function() {
	return this.height;
};

Force.prototype.setHeight = function(data) {
	this.height = data;
};

Force.prototype.getWidth = function() {
	return this.width;
};

Force.prototype.setWidth = function(data) {
	this.Width = data;
};
Force.prototype.getContainer = function() {
	return this._container;
};
Force.prototype.setContainer = function(data) {
	this._container = data;
};
Force.prototype.getParent = function() {
	return this._parent;
};
Force.prototype.getData = function() {
	return this.data;
};
Force.prototype.getColorList = function() {
	return this.colorList;
};
Force.prototype.getSeriesName = function() {
	return this._seriesName;
};

Force.prototype.render = function() {	
	this.getParent().hasXAxis = false;
	this.getParent().hasYAxis = false;
	var that = this;
	function mousemove(d) {
		var x0 = d3.mouse(this)[0] + (that.getWidth() / 500 -1) * 50;
		var y0 = d3.mouse(this)[1] + (that.getHeight() / 300 -1) * 10;
		that.detail.setContent({position: {x: x0, y:y0},contentValue: d.package + "->" + d.name +": "+d.value});
	}
	function tick(e) {
	  node.each(that.cluster(10 * e.alpha * e.alpha))
	      .each(that.collide(.5))
	      .attr("cx", function(d) { return d.x; })
	      .attr("cy", function(d) { return d.y; });
	}
	var width = this.getWidth();
	var height = this.getHeight();
	var formatData = Frost.Util.formatDataForForce(this.getData(), this.maxRadius);
	this._groupContainer = this._container.append("g").attr("class", "frost_force");
	var colorList = Frost.Util.getColorListForBubble(this.getData(), this.getData().length);
	// var legendColor = [];
	this.clusters = formatData.clusters;
	this._formatData = formatData.data;
	var force = d3.layout.force()
    					 .nodes(this._formatData)
    				     .size([width, height])
    					 .gravity(.02)
    					 .charge(0)
    					 .on("tick", tick)
    					 .start();
	var node = this._groupContainer.selectAll("circle")
		    		  .data(this._formatData)
		  			  .enter().append("circle")
		    		  .style("fill", function(d) { return colorList[d.package]; })
		    		  .call(force.drag);
	if(this.hasDetail) {
		node.on("mouseover", function() {that.detail.show(); })
	        .on("mouseout", function() { that.detail.hide();})
	        .on("mousemove", mousemove);
	}
    node.append("text")
      	.attr("dy", ".3em")
      	// .style("text-anchor", "middle")
      	// .text(function(d) { return d.name.substring(0, d.r / 3);});
      	.text("123");  	  	
	node.transition()
	    .duration(750)
	    .delay(function(d, i) { return i * 5; })
	    .attrTween("r", function(d) {
	      var i = d3.interpolate(0, d.radius);
	      return function(t) { return d.radius = i(t); };
	    });
	this._node = node;
	return this;
};

Force.prototype.cluster = function(alpha) {
	var that = this;
	return function(d) {
	    var cluster = that.clusters[d.cluster];
	    if (cluster === d) return;
	    var x = d.x - cluster.x,
	        y = d.y - cluster.y,
	        l = Math.sqrt(x * x + y * y),
	        r = d.radius + cluster.radius;
	    if (l != r) {
		    l = (l - r) / l * alpha;
		    d.x -= x *= l;
		    d.y -= y *= l;
		    cluster.x += x;
		    cluster.y += y;
    	}
    };
};

Force.prototype.collide = function(alpha) {
	var that = this;
    var quadtree = d3.geom.quadtree(that._formatData);
	return function(d) {
	    var r = d.radius + that.maxRadius + Math.max(that.padding, that.clusterPadding),
	        nx1 = d.x - r,
	        nx2 = d.x + r,
	        ny1 = d.y - r,
	        ny2 = d.y + r;
	    quadtree.visit(function(quad, x1, y1, x2, y2) {
	      if (quad.point && (quad.point !== d)) {
	        var x = d.x - quad.point.x,
	            y = d.y - quad.point.y,
	            l = Math.sqrt(x * x + y * y),
	            r = d.radius + quad.point.radius + (d.cluster === quad.point.cluster ? that.padding : that.clusterPadding);
	        if (l < r) {
	          l = (l - r) / l * alpha;
	          d.x -= x *= l;
	          d.y -= y *= l;
	          quad.point.x += x;
	          quad.point.y += y;
	        }
	      }
	      return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
	    });
	};
};
Frost.Force = Force;
Frost.namespace("Frost.Detail");

function Detail(cfg) {
	this._container = cfg.container;
	this.detailNode = null;
	this._parent = cfg.parent;
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
Frost.namespace("Frost.XAxis");

function XAxis(cfg) {
	// this.domainRange = cfg.length;
	this.width = cfg.width;
	this.height = cfg.height;
	this._parent = cfg.parent;
	this.xSpace = cfg.xSpace || 0;
	this.ySpace = cfg.ySpace || 0;
	this._container = cfg.container;
	this.hasStandard = cfg.hasStandard || false;
	this.timeXAxis = cfg.timeXAxis || false;
}
XAxis.prototype.getWidth = function() {
	return this.width;
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
	    .tickPadding(4)
	    .orient("bottom");
	if(this.hasStandard) {
		xAxis.tickSize(-this.height);
		this.xAxisNode.attr("class", "frost_axis frost_xAxis frost_xAxis_withStandard");
	} else {
		xAxis.tickSize(1);
	}
	if(this.timeXAxis) {
		
	}
	this.xAxisNode.call(xAxis)
	.append("text")
      .attr("class", "label")
      .attr("x", this.getWidth())
      .attr("y", -6)
      .style("text-anchor", "end")
      .text("");
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
	return max / 0.8;
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
Util.getColorListForBubble = function(series, length) {
	var list = {};
	if(series[0].color) {
		for(var i = 0; i != series.length; i++) {
			list[series[i].name] = series[i].color;
		}
	} else {
		var colors = Frost.ColorConst(length);
		for(var i = 0; i != series.length; i++) {
			list[series[i].name] = colors[i];
		}
	}
	return list;
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
			if(series[i].color) {
				obj["color"] = series[i].color;
			}
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
Util.formatDataForBubble = function(series) {
	var objList = {children: []};
	for(var i = 0; i != series.length; i++) {
		for(var j = 0; j != series[i].data.length; j++) {
			var obj = {};
			obj["package"] = series[i].name;
			obj["name"] = series[i].data[j].name;
			obj["value"] = series[i].data[j].value;
			objList.children.push(obj);
		}
	}
	return objList;
};
Util.formatDataForForce = function(series, maxRadius) {
	var m = series.length;
	var total = this.getMaxValue(series);
	var objList = [];
	var clusters = new Array(m);
	for (var i = 0; i != series.length; i++) {
		for(var j = 0; j != series[i].data.length; j++) {
			var obj = {};
			obj["name"] = series[i].data[j].name;
			obj["value"] = series[i].data[j].value;
			obj["package"] = series[i].name;
			obj["cluster"] = i;
			obj["radius"] = obj["value"] / total * maxRadius;
			objList.push(obj);
			if (!clusters[i] || (obj["radius"] > clusters[i].radius)) clusters[i] = obj;
		}
	}
	return {data: objList, clusters: clusters};
};
Util.formatDataForScatter = function(series, maxRadius) {
	var m = series.length;
	var total = this.getMaxValue(series);
	var objList = [];
	for (var i = 0; i != series.length; i++) {
		for(var j = 0; j != series[i].data.length; j++) {
			var obj = {};
			obj["name"] = series[i].data[j].name;
			obj["value"] = series[i].data[j].value;
			obj["package"] = series[i].name;
			obj["radius"] = obj["value"] / total * maxRadius;
			objList.push(obj);
		}
	}
	return objList;
};
Util.filterSome = function(array) {
	var temp = {};
	var returnArray = [];
	for(var i = 0; i != array.length; i++) {
		if(temp[array[i]] != 1) {
			temp[array[i]] = 1;
			returnArray.push(array[i]);
		}
	}
	return returnArray;
};
Util.getTotal = function(series) {
	var number = 0;
	for(var i = 0; i != series.length; i++) {
		for(var j = 0; j != series[i].data.length; j++) {
			number = number +series[i].data[j].value;
		}
	}
	return number;
};
Util.getDateRange = function(series) {
	var parseDate = d3.time.format("%Y-%m-%d").parse;
	var min = parseDate(series[0].data[0].name);
	var max = parseDate(series[0].data[series[0].data.length - 1].name);
	for(var i = 0; i != series.length; i++) {
		for(var j = 0; j != series[i].data.length; j++) {
			if(parseDate(series[i].data[j].name) < min) {
				min = parseDate(series[i].data[j].name);
			}
			if(parseDate(series[i].data[j].name) > min) {
				max = parseDate(series[i].data[j].name);
			}
		}
	}
	return {"min": min, "max": max};
};
Util.formatDataForDate = function(series) {
	var parseDate = d3.time.format("%Y-%m-%d").parse;
	for(var i = 0; i != series.length; i++) {
		for(var j = 0; j != series[i].data.length; j++) {
			series[i].data[j].name = parseDate(series[i].data[j].name);
		}
	}
	return series;
};

Frost.Util = Util;
Frost.namespace("Frost.YAxis");

function YAxis(cfg) {
	this._parent = cfg.parent;
	this._container = cfg.container;
	this.xSpace = cfg.xSpace || 0;
	this.ySpace = cfg.ySpace || 0;
	this.width = cfg.width;
	this.hasStandard = cfg.hasStandard || false;
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
	    .tickPadding(4)
	    .orient("left");
	if(this.hasStandard) {
		yAxis.tickSize(-this.getWidth());
		this.yAxisNode.attr("class", "frost_axis frost_yAxis frost_yAxis_withStandard");
	} else {
		yAxis.tickSize(-4);
	}
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
	this.series = cfg.series || {};
	this.width = cfg.width || 0;
	this.height = cfg.height || 0;
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
Graph.prototype.getYScaleMaxValue = function(data) {
	return this.yScaleMaxValue;
};
Graph.prototype.setLegendName = function(data) {
	this.legendName = data;
};
/**
 * Render the Chart.
 * @method Frost.Graph.render
 */
Graph.prototype.render = function() {
	if(!Frost.testSVG()) {
		var node = document.getElementById(this.node.slice(1));
		node.innerHTML = "Your Browser doesn't support SVG<br>Please Use Chrome or Firfox!";
		return;
	}
	var rootNode = d3.select(this.node).append("div")
									   .attr("class", "frost_rootNode")
									   .style("height", this.getHeight() + "px")
									   .style("width", this.getWidth() + "px");
	var legnedRootNode = rootNode.append("div")
								.attr("class", "frost_legendRootNode");
	var svgNode = rootNode.append("svg")
							.attr("width", this.getWidth())
							.attr("height", this.getHeight());
	if(!this.IsHasXAxis()) {
		this.leftGap = 0;
	}
	if(!this.IsHasYAxis()) {
		this.topGap = 0;
	}
	this._container = svgNode.append("g")
    						.attr("transform", "translate(" + this.getLeftGap() + "," + this.getTopGap() + ")");
	this.detail = new Frost.Detail({container: rootNode, parent: this}).render();
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
    if(this.getCfg().timeXAxis) {
    	var data = Frost.Util.getDateRange(this.getSeries());
    	this.xScale = d3.time.scale()
   				 .range([0, actaulWidth]);
   		this.xScale.domain([data.min, data.max]);
   		console.log(data);
   		this.setSeries(Frost.Util.formatDataForDate(this.getSeries()));
    }
	switch(this.getType().toLowerCase()) {
		case "bar":
			if(this.getSeries().length == 1) {
				this.chartObject.push(new Frost.SingleBar({
					width: actaulWidth, 
					height: actualHeight, 
					data: this.getSeries()[0].data, 
					container: this._container, 
					parent: this,
					color: this.getColorList()[0],
					detail: this.detail,
					hasDetail: this.getCfg().hasDetail,
					hasContent: this.getCfg().hasContent
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
						type: this.getCfg().barType,
						detail: this.detail,
						hasDetail: this.getCfg().hasDetail
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
						type: this.getCfg().barType,
						detail: this.detail,
						hasDetail: this.getCfg().hasDetail
					}).render());
				}
			}
			
			break;
		case "area":
			if(!this.IsStack()) {
				this.chartObject.push(new Frost.Areas({
					width: actaulWidth, 
					height: actualHeight, 
					data: this.getSeries(), 
					container: this._container, 
					parent: this,
					colorList: this.getColorList(),
					seriesName: seriesName,
					isXLinear: this.getCfg().isXLinear,
					lineType: this.getCfg().lineType,
					detail: this.detail,
					timeXAxis: this.getCfg().timeXAxis
				}).render());
			} else {
				this.chartObject.push(new Frost.StackArea({
						width: actaulWidth, 
						height: actualHeight,
						data: this.getSeries(), 
						container: this._container, 
						parent: this,
						seriesName: seriesName,
						colorList: this.getColorList(),
						isXLinear: this.getCfg().isXLinear,
						lineType: this.getCfg().lineType,
						detail: this.detail,
						timeXAxis: this.getCfg().timeXAxis
					}).render());
			}
			break;
		case "line":
			this.chartObject.push(new Frost.Lines({
				width: actaulWidth, 
				height: actualHeight, 
				data: this.getSeries(), 
				container: this._container, 
				parent: this,
				colorList: this.getColorList(),
				seriesName: seriesName,
				isXLinear: this.getCfg().isXLinear,
				lineType: this.getCfg().lineType,
				detail: this.detail,
				timeXAxis: this.getCfg().timeXAxis
			}).render());
			break;
		case "pie":
			if(this.getSeries().length == 1) {
				this.colorList = Frost.Util.getColorList(this.getSeries(), this.getSeries()[0].data.length);
				this.setLegendName(this.getNameDomain());
				this.chartObject.push(new Frost.Pie({
					width: actaulWidth, 
					height: actualHeight,
					data: this.getSeries()[0].data, 
					container: this._container, 
					parent: this,
					seriesName: seriesName,
					colorList: this.getColorList(),
					detail: this.detail,
					hasDetail: this.getCfg().hasDetail,
					hasContent: this.getCfg().hasContent
				}).render());
			} else {

			}
			break;
		case "arc":
			if(this.getSeries().length == 1) {
				this.colorList = Frost.Util.getColorList(this.getSeries(), this.getSeries()[0].data.length);
				this.setLegendName(this.getNameDomain());
				this.chartObject.push(new Frost.Arc({
					width: actaulWidth, 
					height: actualHeight,
					data: this.getSeries()[0].data, 
					container: this._container, 
					parent: this,
					seriesName: seriesName,
					colorList: this.getColorList(),
					detail: this.detail,
					hasDetail: this.getCfg().hasDetail
				}).render());
			} else {

			}
			break;
		case "bubble":
			this.colorList = Frost.Util.getColorList(this.getSeries(), this.getSeries().length);
			this.setLegendName(seriesName);
			this.chartObject.push(new Frost.Bubble({
				width: actaulWidth, 
				height: actualHeight,
				data: this.getSeries(), 
				container: this._container, 
				parent: this,
				seriesName: seriesName,
				colorList: this.getColorList(),
				detail: this.detail,
				hasDetail: this.getCfg().hasDetail,
				hasContent: this.getCfg().hasContent
			}).render());
			break;
		case "force":
			this.colorList = Frost.Util.getColorList(this.getSeries(), this.getSeries().length);
			this.setLegendName(seriesName);
			this.chartObject.push(new Frost.Force({
				width: actaulWidth, 
				height: actualHeight,
				data: this.getSeries(), 
				container: this._container, 
				parent: this,
				seriesName: seriesName,
				colorList: this.getColorList(),
				detail: this.detail,
				hasDetail: this.getCfg().hasDetail
			}).render());
			break;
		case "scatter":
			this.colorList = Frost.Util.getColorList(this.getSeries(), this.getSeries().length);
			this.setLegendName(seriesName);
			this.chartObject.push(new Frost.Scatter({
				width: actaulWidth, 
				height: actualHeight,
				data: this.getSeries(), 
				container: this._container, 
				parent: this,
				seriesName: seriesName,
				colorList: this.getColorList(),
				detail: this.detail,
				hasDetail: this.getCfg().hasDetail
			}).render());
			break;
		default: 
			break;
	}
	if(this.IsHasXAxis()) {
    	this.xAxisRender({
    		height: actualHeight,
			parent: this, 
			container: this._container, 
			xSpace: 0,
			width: actaulWidth,
			ySpace: this.getHeight()-this.getBottomGap() - this.topGap,
			hasStandard: this.getCfg().hasStandard,
			timeXAxis: this.getCfg().timeXAxis
		});
    }
    if(this.IsHasYAxis()) {
    	this.yAxisRender({
			parent: this, 
			container: this._container, 
			xSpace: 0,
			ySpace: 0,
			width: actaulWidth,
			hasStandard: this.getCfg().hasStandard
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
    this._bindUI();
	return this;
};
Graph.prototype._bindUI = function() {
	if(this.legend) {
		var legend = this.legend;
	}
	d3.select(".frost_rootNode").on("click", function() {
		if(legend) {
			legend.setPosition(d3.mouse(this)[0], d3.mouse(this)[1]);
		}
	}, true);
};
Graph.prototype.xAxisRender = function(cfg) {
	this.xAxis = new Frost.XAxis({
		height: cfg.height,
		parent: cfg.parent, 
		container: cfg.container, 
		xSpace: cfg.xSpace,
		ySpace: cfg.ySpace,
		width: cfg.width,
		hasStandard: cfg.hasStandard,
		timeXAxis: cfg.timeXAxis
	}).render();
};
Graph.prototype.yAxisRender = function(cfg) {
	this.yAxis = new Frost.YAxis({
		parent: cfg.parent, 
		container: cfg.container, 
		xSpace: cfg.xSpace,
		ySpace: cfg.ySpace,
		width: cfg.width,
		hasStandard: cfg.hasStandard
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