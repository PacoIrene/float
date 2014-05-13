module.exports = function(grunt) {
	// grunt.initConfig({
	// 	pkg: grunt.file.readJSON("package.json"),
	// 	concat: {
	// 		domop: {
	// 			src:['src/Frost.js', 'src/Frost.BaseChart.js','src/Frost.Title.js', 
	// 			'src/Frost.XAxis.js','src/Frost.Util.js', 
	// 			'src/Frost.Detail.js', 'src/Frost.YAxis.js', 'src/Frost.Lines.js',
	// 			'src/Frost.Column.js','src/Frost.Columns.js', 'src/Frost.Graph.js'],
	// 			dest: 'build/frost.js'
	// 		}
	// 	},
	// 	uglify: {
	// 		options: {
	// 			banner: '/*! <%= pkg.name %> <%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
	// 		}, 
	// 		build: {
	// 			src: 'build/frost.js',
	// 			dest: 'build/frost.min.js'
	// 		}
	// 	}
	// });
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		concat: {
			domop: {
				src:['srcc/Frost.js', 'srcc/Frost.ColorConst.js', 
				'srcc/Frost.SingleBar.js', 'srcc/Frost.GroupBar.js',
				'srcc/Frost.Legend.js', 'srcc/Frost.StackBar.js',
				'srcc/Frost.XAxis.js','srcc/Frost.Util.js',  
				'srcc/Frost.YAxis.js',  'srcc/Frost.Graph.js'],
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