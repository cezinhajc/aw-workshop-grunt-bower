module.exports = function(grunt) {

    // Configurações do nosso projeto
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        
        watch: {
            js_app: {
                files: ['desenvolvimento/js/**/*.js', 'desenvolvimento/js/*.js'],
                tasks: ['concat', 'uglify']
            },
            html_app: {
                files: ['desenvolvimento/*.html'],
                tasks: ['htmlmin']
            },
            image_app: {
                files: ['desenvolvimento/img/*'],
                tasks: ['imagemin']
            },
            css_app: {
                files: ['desenvolvimento/css/*'],
                tasks: ['cssmin']
            },
            copy: {
                files: ['desenvolvimento/**/*'],
                tasks: ['copy']
            }
        },
		
		copy: {
            desenvolvimento: {
                expand: true,
				cwd: 'desenvolvimento/',
				src: ['**', '!img/**', '!js/**', '!css/**'],
                dest: 'producao/',
            },
        },
		
        concat: {
            js_app: {
                src: ['desenvolvimento/js/*.js'],
                dest: 'producao/js/aplicativo.js'
            }
        },
		
        uglify: {
            js_app: {
                files: {
                    'producao/js/aplicativo.min.js': ['producao/js/aplicativo.js']
                }
            }
        },
		
        cssmin: {
            dist: {
                options: {
                    banner: '/* Meus arquivos css minificados (<%= pkg.name %> <%= pkg.version %>) */'
                },
                expand: true,
                files: {
                    'producao/css/estilo.css': ['desenvolvimento/css/*.css']
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
                    cwd: 'desenvolvimento/img',
                    src: '{,*/}*.{png,jpg,jpeg}',
                    dest: 'producao/img'
                }]
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
                    cwd: 'desenvolvimento',
                    src: ['*.html'],
                    dest: 'producao/'
                }, ]
            }
        },		
										
		
    });

    // Carregando os plugins
	/*
    grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	*/
	require('load-grunt-tasks')(grunt);



    // Tasks
    // Padrão é obrigatória
    grunt.registerTask('default', ['copy', 'cssmin', 'imagemin', 'htmlmin', 'concat', 'uglify', 'watch']); //, 'watch'
	//grunt.registerTask('watch', ['watch']);

};