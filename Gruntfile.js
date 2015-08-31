'use strict';

module.exports = function(grunt) {

	grunt.initConfig({

		dir: {
			webapp: 'src',
			tests: 'test',
			dist: 'dist',
			bower_components: 'bower_components',
			localServerTestUrl: 'http://localhost:8080/test-resources'
		},

		tests: {
			opaTimeout: 900000
		},

		connect: {
			options: {
				port: 8080,
				hostname: '*'
			},

			serve: {
				options: {
					open: {
						target: 'http://localhost:8080/index.html'
					}
				}
			},

			src: {},

			dist: {
				options: {
					open: {
						target: 'http://localhost:8080/index.html'
					}
				}
			}
		},

		openui5_connect: {
			options: {
				resources: [
					'<%= dir.bower_components %>/openui5-sap.ui.core/resources',
					'<%= dir.bower_components %>/openui5-sap.m/resources',
					'<%= dir.bower_components %>/openui5-themelib_sap_bluecrystal/resources'
				]
			},

			serve: {
				options: {
					appresources: '<%= dir.webapp %>',
					testresources: ['<%= dir.tests %>']
				}
			},

			src: {
				options: {
					appresources: '<%= dir.webapp %>',
					testresources: ['<%= dir.tests %>']
				}
			},
			dist: {
				options: {
					appresources: '<%= dir.dist %>'
				}
			}
		},

		openui5_preload: {
			component: {
				options: {
					resources: {
						cwd: '<%= dir.webapp %>',
						prefix: 'holcim/swipedemo'
					},
					dest: '<%= dir.dist %>'
				},
				components: true,
				compress: true
			}
		},

		clean: {
			dist: '<%= dir.dist %>/'
		},

		copy: {
			dist: {
				files: [{
					expand: true,
					cwd: '<%= dir.webapp %>',
					src: [
						'**',
						'!test/**'
					],
					dest: '<%= dir.dist %>'
				}]
			}
		},

		jshint: {
			all: {
				options: {
					eqeqeq: true,
					es3: true,
					unused: true,
					eqnull: true,
					camelcase: false,
					laxbreak: true,
					force: false,
					reporter: require('jshint-stylish'),
				},
				src: ["<%= dir.webapp %>/**/*.js"]
			},
		},

		qunit: {
			options: {
				/* for debugging*/
				'--remote-debugger-autorun': 'yes',
				'--remote-debugger-port': 8000
			},

			unit: {
				options: {
					urls: [
						'<%= dir.localServerTestUrl %>/unit/unitTests.qunit.html'
					]
				}

			}
		},

	});

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-openui5');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-qunit');

	// Server task
	grunt.registerTask('serve', function() {
		grunt.task.run('openui5_connect:serve' + ':keepalive');
	});

	// Linting task
	grunt.registerTask('hint', ['jshint:all']);

	// Build task
	grunt.registerTask('build', ['clean', 'openui5_preload', 'copy']);
	grunt.registerTask('buildRun', ['build', 'openui5_connect:dist:keepalive']);

	// Test task
	grunt.registerTask('test', ['openui5_connect:src', 'qunit:unit']);

	// Default task
	grunt.registerTask('default', [
		'jshint:all',
		'test'
	]);
};