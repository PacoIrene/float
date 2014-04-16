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