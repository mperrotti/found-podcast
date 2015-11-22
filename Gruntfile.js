module.exports = function(grunt) {

	require( 'load-grunt-tasks' )( grunt );

	var DIR_BOWER = './bower_components/',
			DIR_SASS = '_assets/scss/',
			DIR_CSS = '_assets/css/',
			DIR_JS = '_assets/js/',
			DIR_IMG = '_assets/img/';

	grunt.initConfig({
		bower: grunt.file.readJSON('bower.json'),

		'sass': {
			dist: {
				files: {
					'css/sq2.css': DIR_BOWER + 'sassquatch2/sass/sassquatch.scss',
					'_assets/css/main.css': DIR_SASS + 'main.scss'
				}
			}
		},

		'csslint' : {
			test : {
				options : {
					import : 2
				},
				src : [ DIR_CSS + 'main.css' ]
			}
		},

		'cssmin' : {
			dist : {
				src : DIR_CSS + 'main.css',
				dest : DIR_CSS + 'main.min.css'
			}
		},

		'concat' : {
			dist : {
				src : [ DIR_CSS + '*.css' ],
				dest : 'css/main.css',
			}
		},

		'uglify': {

			options: {
				sourceMap: true
			},

			separated_js: {
				files: {
					'_assets/js/dist/scripts.min.js': [
						DIR_JS + 'src/*.js'
					],
				}
			}

		},

		'clean': {
			css: [DIR_CSS],
			js: DIR_JS + 'dist/'
		},

		'shell' : {
			jekyllBuild : {
				command : 'jekyll build'
			},
			jekyllServe : {
				command : 'jekyll serve'
			}
		},

		'watch': {

			markup: {
				files: [ '_layouts/*.html',
								'_posts/*.markdown',
								'_config.yml',
								'index.html',
								'404.html' ],
				tasks: ['shell:jekyllServe'],
				options: {
					livereload: true,
					spawn: false,
				}
			},

			scripts: {
				files: [DIR_JS + 'src/*.js'],
				tasks: ['uglify', 'shell:jekyllServe'],
				options: {
					livereload: true,
					spawn: false,
				}
			},

			css: {
				files: ['_assets/scss/*.scss'],
				tasks: ['sass', 'shell:jekyllServe'],
				options: {
					livereload: true,
					spawn: false,
				}
			}

		}
	});
	grunt.registerTask('default', ['watch']);
	grunt.registerTask('build', ['clean', 'uglify', 'sass']);
	grunt.registerTask( 'deploy', [ 'concat', 'cssmin', 'shell:jekyllBuild' ] );
};
