/*
 * The main use in float
 */
YUI.GlobalConfig = {
	charset:'utf-8',
    modules: {
        float: '../src/Float.js',
        chart: '../src/Chart.js',
        column: '../src/Column.js',

        // module2: '/path/to/my/module2.js',
        // module3: {
        //     fullpath: '/path/to/my/module3.js',
        //     requires: [ 'node', 'event', 'dd', 'yql']
        // }
    }
};
YUI().use("float", function(Y){
	Float = Y.vb.Float;
	var graph = new Float({
        element:"#node", 
        title: "Column Chart on XX", 
        width: 300, 
        height: 300,
        series: [{
            color: "red",
            x: 0,
            y: 10
        }]

    });
	graph.render();
});