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
 * @attr {String} name title string
 */
function Title(title) {
	this.name = title;
}
/**
 * render the title node to the parent node.
 * @method Title.render
 * @param {String} element The String of the parent node.
 */
Title.prototype.render = function(element) {
	d3.select(element).append("div")
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