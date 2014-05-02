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
	extend: function(SubClass, SuperClass) {
		SubClass.prototype = new SuperClass();
		SubClass.prototype.constructor = SubClass;
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
Frost.namespace("Frost.Column");

function Column(cfg) {
	this.x = cfg.x;
	this.y = cfg.y;
	this.height = cfg.height;
	this.width = cfg.width;
	this.color = cfg.color;
	this.name = cfg.name;
	this._container = cfg.container;
}

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
	this._rectNode.on("mouseover", function(e) {
		console.log(this.getName());
	}.bind(this));
};
Frost.Column = Column;
Frost.namespace("Frost.Columns");

function Columns(cfg) {
	this.x = cfg.x;
	this.y = cfg.y;
	this.series = cfg.series;
	this._container = cfg.container;
	this.columnList = [];
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
	var number = this.getSeries().length * 2 + 1;
	var singleWidth = this.getX() / number;
	return singleWidth;
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
Columns.prototype.render = function() {
	var groupContainer = this._container.append("g");
	for(var i = 0; i != this.getSeries().length; i++) {
		var column = new Frost.Column({
			x: this.getGap() * (i+1) + this.getSingleWidth() * i,
			y: this.getY() - this.getSingleHeight(this.getSeries()[i].y),
			width: this.getSingleWidth(),
			height: this.getSingleHeight(this.getSeries()[i].y),
			color: this.getSeries()[i].color,
			name: this.getSeries()[i].name,
			container: groupContainer
		});
		this.columnList.push(column.render());
	}
	return this;
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

/**
 * Render the Chart.
 * @method Frost.Graph.render
 */
Graph.prototype.render = function() {
	var container = d3.select(this.node).append("svg")
								   .attr("width", this.getWidth())
								   .attr("height", this.getHeight());
	switch(this.getType().toLowerCase()) {
		case "column":
			this.chartObject = new Frost.Columns({x: this.getWidth(), y: this.getHeight(), series: this.getSeries(), container: container});
			this.chartObject.render();
			return this;
			break;
		default: 
			break;
	}
};

Frost.Graph = Graph;