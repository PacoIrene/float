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
Frost.namespace("Frost.BaseChart");

function BaseChart(cfg) {
	this.x = cfg.x;
	this.y = cfg.y;
	this.series = cfg.series;
	this._container = cfg.container;
	this._parent = cfg.parent;
	this.xSpace = 0;
	this.ySpace = 0;
	if(this.getParent().IsHasXAxis()) {
		this.xSpace = this.x * xSpaceRate;
		this.x = this.x - this.xSpace;
	}
	if(this.getParent().IsHasYAxis()) {
		this.ySpace = this.y * ySpaceRate;
		this.y = this.y - this.ySpace;
	}
}

BaseChart.prototype.getX = function() {
	return this.x;
};

BaseChart.prototype.setX = function(data) {
	this.x = data;
};

BaseChart.prototype.getY = function() {
	return this.y;
};

BaseChart.prototype.setY = function(data) {
	this.y = data;
};

BaseChart.prototype.getSeries = function() {
	return this.series;
};
BaseChart.prototype.setSeries = function(data) {
	this.series = data;
};
BaseChart.prototype.getContainer = function() {
	return this._container;
};

BaseChart.prototype.setContainer = function(data) {
	this._container = data;
};
BaseChart.prototype.getParent = function() {
	return this._parent;
};
BaseChart.prototype.getGap = function() {
	return this.getSingleWidth() / 2;
};
BaseChart.prototype.getSingleWidth = function() {
	var number = this.getSeries().length * 3 + 1;
	var singleWidth = this.getX() / number;
	return singleWidth * 2;
};
BaseChart.prototype.getSingleHeight = function(actualHeight) {
	return actualHeight / this.getMaxSerie() * this.getY();
};
BaseChart.prototype.getMaxSerie = function() {
	var max = this.getSeries()[0].y;
	for(var i = 0; i != this.getSeries().length; i++) {
		if(this.getSeries()[i].y > max) {
			max = this.getSeries()[i].y;
		}
	}	
	return max;
};

BaseChart.prototype.getData = function() {
	var lineData = [];
	for(var i = 0; i != this.getSeries().length; i++) {
		var x = this.getGap() * (i+1) + this.getSingleWidth() * i + this.ySpace;
		var y = this.getY() - this.getSingleHeight(this.getSeries()[i].y);
		var obj = {"x": x, "y": y};
		lineData.push(obj);
	}
	return lineData;
};

Frost.BaseChart = BaseChart;
/**
 * The Frost.Title is the title of the chart
 * There are a attribute and a function in Frost.Title
 * name is the title 
 * render is the function to add the title node to the document
 * 
 * Author: Chu Zhenyang
 * Date:   2014-4-16 21:55
 */ 
Frost.namespace("Frost.Title");

/**
 * Title Class
 * @attr {object} cfg own title and parent node
 */
function Title(cfg) {
	this.name = cfg.title;
	this._container = cfg.container; 
}
/**
 * get the name of Frost Title.
 * @method Title.getName
 */
Title.prototype.getName = function() {
	return this.name;
};
/**
 * set the name of Frost Title.
 * @method Title.setName
 * @param {String} data The String of the Title name.
 */
Title.prototype.setName = function(data) {
	this.name = data;
};
/**
 * get the parent node of Frost Title.
 * @method Title.getContainer
 */
Title.prototype.getContainer = function() {
	return this._container;
};
/**
 * set the parent node of Frost Title.
 * @method Title.setContainer
 * @param {Node} data The parent node.
 */
Title.prototype.setContainer = function(data) {
	this._container = data;
};
/**
 * render the title node to the parent node.
 * @method Title.render
 */
Title.prototype.render = function() {
	this._container.append("div")
				  .attr("class", "frost_title")
				  .html(this.name);
};

Frost.Title = Title;
Frost.namespace("Frost.XAxis");

function XAxis(cfg) {
	this.domainRange = cfg.length;
	this.width = cfg.width;
	this._parent = cfg.parent;
	this.xSpace = cfg.xSpace || 0;
	this.ySpace = cfg.ySpace || 0;
	this.valueList = cfg.valueList;
	this.outerPadding = cfg.outerPadding;
	this.padding = cfg.padding;
	this.step = cfg.step;
	this._container = cfg.container;
}

XAxis.prototype.getDomainRange = function() {
	return this.domainRange;
};

XAxis.prototype.getValueList = function() {
	return this.valueList;
};

XAxis.prototype.getOuterPadding = function() {
	return this.outerPadding;
};

XAxis.prototype.getStep = function() {
	return this.step;
};

XAxis.prototype.getPadding = function() {
	return this.padding;
};

XAxis.prototype.getWidth = function() {
	return this.width;
};

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
	var step = this.getStep();
	var paddingRate = this.getPadding() / step;
	var outerPaddingRate = this.getOuterPadding() / step;
	this.xAxisNode = this._container.append("g")
							  .attr("class", "frost_xAxis")
							  .attr("transform", "translate("+ this.getxSpace() + ","+ this.getySpace() +")");
	var x = d3.scale.ordinal()
	    .domain(d3.range(this.getDomainRange()))
	    .rangeBands([0, this.getWidth()], paddingRate, outerPaddingRate);
	var xAxis = d3.svg.axis()
	    .scale(x)
	    .tickSize(1)
	    .tickPadding(4)
	    .orient("bottom");
	this.xAxisNode.call(xAxis);
	return this;
};

Frost.XAxis = XAxis;
Frost.namespace("Frost.Detail");

function Detail(cfg) {
	this._container = cfg.container;
	this.detailNode = null;
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
Detail.prototype.render = function() {
	this.detailNode = this._container.append("div")
									 .attr("class", "frost_detail");
	return this;
};

Frost.Detail = Detail;
Frost.namespace("Frost.YAxis");

function YAxis(cfg) {
	this.domainRange = cfg.length;
	this.height = cfg.height;
	this._parent = cfg.parent;
	this._container = cfg.container;
	this.outerPadding = cfg.outerPadding || 0;
	this.padding = cfg.padding || 0;
	this.step = cfg.step || 0; 
	this.xSpace = cfg.xSpace || 0;
	this.ySpace = cfg.ySpace || 0;
}

YAxis.prototype.getOuterPadding = function() {
	return this.outerPadding;
};

YAxis.prototype.getStep = function() {
	return this.step;
};

YAxis.prototype.getPadding = function() {
	return this.padding;
};

YAxis.prototype.getDomainRange = function() {
	return this.domainRange;
};

YAxis.prototype.getHeight = function() {
	return this.height;
};

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
	var step = this.getStep() == 0?1:this.getStep();
	var paddingRate = this.getPadding() / step;
	var outerPaddingRate = this.getOuterPadding() / step;
	this.yAxisNode = this._container.append("g")
							  .attr("class", "frost_yAxis")
							  .attr("transform", "translate("+ this.getxSpace() +", "+this.getySpace()+")");
	var y = d3.scale.ordinal()
	    .domain(d3.range(this.getDomainRange()))
	    .rangeBands([this.getHeight(), 0]);
	var yAxis = d3.svg.axis()
	    .scale(y)
	    .tickSize(1)
	    .tickPadding(4)
	    .orient("left");
	this.yAxisNode.call(yAxis);
	return this;
}

Frost.YAxis = YAxis;
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
Frost.namespace("Frost.Column");

function Column(cfg) {
	this.value = cfg.value;
	this.x = cfg.x;
	this.y = cfg.y;
	this.height = cfg.height;
	this.width = cfg.width;
	this.color = cfg.color || "steelblue";
	this.name = cfg.name || "";
	this._container = cfg.container;
	this._parent = cfg.parent;
	this._isHighLight = false;
}

Column.prototype.getValue = function() {
	return this.value;
};

Column.prototype.setValue = function(data) {
	this.value = data;
};

Column.prototype.getX = function() {
	return this.x;
};

Column.prototype.setX = function(data) {
	this.x = data;
};

Column.prototype.getY = function() {
	return this.y;
};

Column.prototype.setY = function(data) {
	this.y = data;
};

Column.prototype.getHeight = function() {
	return this.height;
};

Column.prototype.setHeight = function(data) {
	this.height = data;
};

Column.prototype.getWidth = function() {
	return this.width;
};

Column.prototype.setWidth = function(data) {
	this.Width = data;
};

Column.prototype.getColor = function() {
	return this.color;
};

Column.prototype.setColor = function(data) {
	this.color = data;
};

Column.prototype.getName = function() {
	return this.name;
};

Column.prototype.setName = function(data) {
	this.name = data;
};

Column.prototype.getContainer = function() {
	return this._container;
};

Column.prototype.setContainer = function(data) {
	this._container = data;
};
//return Columns
Column.prototype.getParent = function() {
	return this._parent;
};
Column.prototype.getRectNode = function() {
	return this._rectNode;
};
Column.prototype.isHighLight = function() {
	return this._isHighLight;
}
Column.prototype.setHighLight = function() {
	this._isHighLight = true;
	this.getRectNode().attr("fill", "#0870B4");
};
Column.prototype.deleteHighLight = function() {
	this._isHighLight = false;
	this.getRectNode().attr("fill", this.getColor());
};
Column.prototype.render = function() {
	this._rectNode = this._container.append("rect")
				  					.attr("x", this.getX())
								  	.attr("y", this.getY())
								  	.attr("width", this.getWidth())
								  	.attr("height", this.getHeight())
								  	.attr("fill", this.getColor());
	this._bindUI();
	return this;
};

Column.prototype._bindUI = function() {
	var that = this;
	var detailNode = that.getParent().getParent().getDetail();
	this._rectNode.on("mouseover", function() {
		var position = d3.mouse(this);
		detailNode.setContent(that.getName() + ":" + that.getValue());
		detailNode.setPosition({x: position[0], y: position[1]});
		detailNode.show();
	});
	this._rectNode.on("mousemove", function() {
		var position = d3.mouse(this);
		detailNode.setPosition({x: position[0] + 8, y: position[1]});
	});
	this._rectNode.on("mouseleave", function() {
		detailNode.hide();
	});
	this._rectNode.on("click", function() {
		d3.event.stopPropagation();
		if(that.isHighLight()) {
			that.deleteHighLight();
		} else {
			that.setHighLight();
		}
	});
};
Frost.Column = Column;
Frost.namespace("Frost.Columns");
var ySpaceRate = 20 / 300;
var xSpaceRate = 20 / 500;

function Columns(cfg) {
	this.x = cfg.x;
	this.y = cfg.y;
	this.series = cfg.series;
	this._container = cfg.container;
	this.columnList = [];
	this._parent = cfg.parent;
	this.xSpace = 0;
	this.ySpace = 0;
	if(this.getParent().IsHasXAxis()) {
		this.xSpace = this.x * xSpaceRate;
		this.x = this.x - this.xSpace;
	}
	if(this.getParent().IsHasYAxis()) {
		this.ySpace = this.y * ySpaceRate;
		this.y = this.y - this.ySpace;
	}
}
Columns.prototype.getX = function() {
	return this.x;
};

Columns.prototype.setX = function(data) {
	this.x = data;
};

Columns.prototype.getY = function() {
	return this.y;
};

Columns.prototype.setY = function(data) {
	this.y = data;
};

Columns.prototype.getSeries = function() {
	return this.series;
};
Columns.prototype.setSeries = function(data) {
	this.series = data;
};
Columns.prototype.getContainer = function() {
	return this._container;
};

Columns.prototype.setContainer = function(data) {
	this._container = data;
};

Columns.prototype.getGap = function() {
	return this.getSingleWidth() / 2;
};
Columns.prototype.getSingleWidth = function() {
	var number = this.getSeries().length * 3 + 1;
	var singleWidth = this.getX() / number;
	return singleWidth * 2;
};
Columns.prototype.getSingleHeight = function(actualHeight) {
	return actualHeight / this.getMaxSerie() * this.getY();
};
Columns.prototype.getMaxSerie = function() {
	var max = this.getSeries()[0].y;
	for(var i = 0; i != this.getSeries().length; i++) {
		if(this.getSeries()[i].y > max) {
			max = this.getSeries()[i].y;
		}
	}	
	return max;
};

//return Graph
Columns.prototype.getParent = function() {
	return this._parent;
};
Columns.prototype.render = function() {
	var valueList = [];
	this._groupContainer = this._container.append("g");
	for(var i = 0; i != this.getSeries().length; i++) {
		valueList.push(this.getSeries()[i].name);
		var column = new Frost.Column({
			value: this.getSeries()[i].y,
			x: this.getGap() * (i+1) + this.getSingleWidth() * i + this.ySpace,
			y: this.getY() - this.getSingleHeight(this.getSeries()[i].y),
			width: this.getSingleWidth(),
			height: this.getSingleHeight(this.getSeries()[i].y),
			color: this.getSeries()[i].color,
			name: this.getSeries()[i].name,
			container: this._groupContainer,
			parent: this
		});
		this.columnList.push(column.render());
	}
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
			valueList: valueList,
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
	this.bindUI();
	return this;
};
Columns.prototype.bindUI = function() {
	var columnList = this.columnList;
	this.getParent().getContainer().on("click", function() {
		for(var i = 0; i != columnList.length; i++) {
			if(columnList[i].isHighLight()) {
				columnList[i].deleteHighLight();
			}
		}
	});
};
Frost.Columns = Columns;
Frost.namespace("Frost.Graph");

function Graph(cfg) {
	this.node = cfg.element || "body";
	this.series = cfg.series;
	this.type = cfg.type;
	this.width = cfg.width;
	this.height = cfg.height;
	this.chartObject = null;
	this.detail = null;
	this.hasXAxis = cfg.xAxis || false;
	this.hasYAxis = cfg.yAxis || false;
}

Graph.prototype.getNode = function() {
	return this.node;
};
Graph.prototype.setNode = function(data) {
	this.node = data;
};

Graph.prototype.getSeries = function() {
	return this.series;
};
Graph.prototype.setSeries = function(data) {
	this.series = data;
};

Graph.prototype.getType = function() {
	return this.type;
};
Graph.prototype.setType = function(data) {
	this.type = data;
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

Graph.prototype.getDetail = function() {
	return this.detail;
};
Graph.prototype.getContainer = function() {
	return this.container;
};
Graph.prototype.IsHasYAxis = function() {
	return this.hasYAxis;
};
Graph.prototype.IsHasXAxis = function() {
	return this.hasXAxis;
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
	this.container = rootNode.append("svg")
							.attr("width", this.getWidth())
							.attr("height", this.getHeight());
	this.detail = new Frost.Detail({container: rootNode}).render();
	switch(this.getType().toLowerCase()) {
		case "column":
			this.chartObject = new Frost.Columns({
				x: this.getWidth(), 
				y: this.getHeight(), 
				series: this.getSeries(), 
				container: this.container, 
				parent: this
			});
			this.chartObject.render();
			return this;
			break;
		case "line":
			this.chartObject = new Frost.Lines({
				x: this.getWidth(), 
				y: this.getHeight(), 
				series: this.getSeries(), 
				container: this.container, 
				parent: this
			});
			this.chartObject.render();
			return this;
			break;
		default: 
			break;
	}
};

Frost.Graph = Graph;