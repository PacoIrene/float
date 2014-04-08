/*
 * The main use in float
 */
YUI({modules: {
	"float": {
		fullpath: "../src/Float.js"
	}}}).use("float", function(Y){
	Float = Y.vb.Float;
	var graph = new Float({element:"#node"});
});