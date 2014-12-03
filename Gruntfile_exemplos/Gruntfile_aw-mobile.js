module.exports = function(grunt) {

    //usemin -> https://github.com/yeoman/grunt-usemin

    require('time-grunt')(grunt);

    var config = {
        app: 'app',
        dist: 'www'
    };

    grunt.initConfig({

        config: config,

        watch: {
            js_app: {
                files: ['<%= config.app %>/js/app/**/*.js', '<%= config.app %>/js/app/*.js'],
                tasks: ['newer:uglify:js_app', 'newer:concat:js_app', 'newer:notify:js']
            },
            html_app: {
                files: ['<%= config.app %>/views/*.html'],
                tasks: ['newer:htmlmin']
            },
            image_app: {
                files: ['<%= config.app %>/img/*'],
                tasks: ['newer:imagemin']
            },
            css_app: {
                files: ['<%= config.app %>/css/*'],
                tasks: ['newer:cssmin']
            },
            less: {
                files: ['<%= config.app %>/css/less/*.less'],
                tasks: ['less', 'notify:less']
            },
            sass: {
                files: ['<%= config.app %>/css/sass/*.scss'],
                tasks: ['sass', 'notify:sass']
            },
            copy: {
                files: ['%= config.app %>/**/*'],
                tasks: ['copy']
            }
        },

        concat: {
            js_app: {
                src: ['<%= config.app %>/js/app/**/*.js', '<%= config.app %>/js/app/*.js'],
                dest: '<%= config.dist %>/js/aplicativo.js'
            }
        },

        uglify: {
            js_app: {
                files: {
                    '<%= config.dist %>/js/aplicativo.min.js': ['<%= config.dist %>/js/aplicativo.js'] //'<%= config.app %>/js/app/**/*.js','<%= config.app %>/js/app/*.js'
                }
            }
        },

        htmlmin: {
            html_app: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>/views',
                    src: ['*.html'],
                    dest: '<%= config.dist %>/views/'
                }, ]
            }
        },

        cssmin: {
            dist: {
                options: {
                    banner: '/* Meus arquivos css minificados */'
                },
                expand: true,
                files: {
                    '<%= config.dist %>/css/estilo.css': ['<%= config.app %>/css/*.css']
                }
            }
        },

        imagemin: {
            options: {
                cache: false
            },
            image_app: {
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>/img',
                    src: '{,*/}*.{png,jpg,jpeg}',
                    dest: '<%= config.dist %>/img'
                }]
            }
        },

        less: {
            dist: {
                options: {
                    paths: ["<%= config.dist %>/css", "<%= config.app %>/css/less"]
                },
                files: {
                    '<%= config.dist %>/css/base.css': '<%= config.app %>/css/less/base.less'
                }
            }
        },

        sass: {
            dist: {
                options: {
                    style: 'expanded', //nested, compact, compressed, expanded.
                    sourcemap: true
                },
                files: {
                    '<%= config.dist %>/css/base.css': '<%= config.app %>/css/sass/base.scss'
                }
            }
        },

        copy: {
            dist: {
                expand: true,
                cwd: '<%= config.app %>/',
                //src: ['<%= config.app %>/**'], // '!/css/less/*.less', , '/views/!*.html', '!*.img', '!*.js'
                src: ['**', '!img/**', '!js/**', '!css/**', '!views/**'],
                dest: '<%= config.dist %>/'
            }

        },


        notify: {
            js: {
                options: {
                    message: 'Arquivos JS concatenados and minificados'
                }
            },
            less: {
                options: {
                    message: 'LESS compilados'
                }
            },
            sass: {
                options: {
                    message: 'SASS compilados'
                }
            },
            copypg: {
                options: {
                    title: 'grunt copy-pg',
                    message: 'Arquivos compiados...'
                }
            }
        },

		useminPrepare: {
		  dist: {
			src: ['<%= config.app %>/index.html']
		  }
		},
		
		usemin: {
		  html: '<%= config.dist %>/index.html'
		},		

        connect: {
            server: {
                options: {
                    port: 1830,
                    base: '<%= config.dist %>',
                    keepalive: true
                }
            }
        },

        concurrent: {
            dev: {
                tasks: ['watch', 'connect'],
                options: {
                    logConcurrentOutput: true
                }
            }
        }


    });

    /*
        grunt.loadNpmTasks('grunt-contrib-uglify');
        grunt.loadNpmTasks('grunt-contrib-concat');
        grunt.loadNpmTasks('grunt-contrib-watch');
        grunt.loadNpmTasks('grunt-contrib-less');
        grunt.loadNpmTasks('grunt-contrib-sass');
        grunt.loadNpmTasks('grunt-contrib-copy');
        grunt.loadNpmTasks('grunt-notify');
        grunt.loadNpmTasks('grunt-newer');
        grunt.loadNpmTasks('grunt-contrib-htmlmin');
        grunt.loadNpmTasks('grunt-contrib-imagemin');
        grunt.loadNpmTasks('grunt-contrib-cssmin');
    */
    require('load-grunt-tasks')(grunt);

    grunt.registerTask('default', ['build', 'concurrent']);
    grunt.registerTask('build', ['useminPrepare','copy', 'concat', 'uglify', 'htmlmin', 'cssmin', 'imagemin','usemin']); //,'less','sass'
    grunt.registerTask('servidor', ['connect', 'watch']);
    grunt.registerTask('copy-www', ['copy', 'notify:copypg']);
    grunt.registerTask('cssmin-www', ['cssmin']);

    /*
        grunt.registerTask('watch-js', ['watch:js_app']);
        grunt.registerTask('watch-less', ['watch:less']);
        grunt.registerTask('watch-sass', ['watch:sass']);
        grunt.registerTask('concat-app', ['concat:js_app']);
        grunt.registerTask('uglify-app', ['uglify:js_app']);
        grunt.registerTask('uglify-libs', ['uglify:js_libs']);
    */


};