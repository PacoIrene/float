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