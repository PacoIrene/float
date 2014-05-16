module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		concat: {
			options: {
				banner: '/*! <%= pkg.name %> <%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			}, 
			domop: {
				src:['src/Frost.js', 'src/Frost.ColorConst.js', 
				'src/Frost.SingleBar.js', 'src/Frost.GroupBar.js',
				'src/Frost.Legend.js', 'src/Frost.StackBar.js',
				'src/Frost.Area.js', 'src/Frost.StackArea.js',
				'src/Frost.Line.js', 'src/Frost.Lines.js',
				'src/Frost.Pie.js', 'src/Frost.Bubble.js',
				'src/Frost.Arc.js', 'src/Frost.Scatter.js',
				'src/Frost.Force.js', 'src/Frost.Detail.js',
				'src/Frost.XAxis.js','src/Frost.Util.js',  
				'src/Frost.YAxis.js',  'src/Frost.Graph.js'],
				dest: 'build/frost.js'
			}
		},
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			}, 
			build: {
				src: 'build/frost.js',
				dest: 'build/frost.min.js'
			}
		}
	});
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
 	// JS distribution task.
  	grunt.registerTask('default', ['concat', 'uglify']);
};