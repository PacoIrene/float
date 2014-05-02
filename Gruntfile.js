module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		concat: {
			domop: {
				src:['src/Frost.js', 'src/Frost.Title.js', 'src/Frost.XAxis.js',
				'src/Frost.Column.js','src/Frost.Columns.js', 'src/Frost.Graph.js'],
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