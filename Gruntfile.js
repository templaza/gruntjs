module.exports = function(grunt) {

    var configBridge = grunt.file.readJSON('./configBridge.json', { encoding: 'utf8' });

    // Project configuration.
    grunt.initConfig({

        topBanner: configBridge.config.topBanner.join('\n'),

        jshint: {
            options: {
                jshintrc: 'js/.jshintrc'
            },
            debugbar: ['**/*.js']
        },

        uglify: {
            bootstrap: {
                options: {
                    sourceMap: true,
                    sourceMapName: 'dist/js/script.map'
                },
                files: {
                    'dist/js/script.min.js': ['js/alert.js','js/button.js']
                }
            }
        },

        concat: {
            catscript: {
                src: [
                    'js/*.js'
                ],
                dest: 'dist/js/newscript.js'
            }
        },

        watch: {
            bootstrap: {
                files: ['js/*.js'],
                tasks: ['jshint:bootstrap']
            }
        },

        less: {
            compileCore: {
                options: {
                    strictMath: true,
                    sourceMap: true,
                    outputSourceFiles: true,
                    sourceMapURL: 'bootstrap.css.map',
                    sourceMapFilename: 'dist/css/bootstrap.css.map'
                },
                src: 'less/bootstrap.less',
                dest: 'dist/css/bootstrap.css'
            },
            compileTheme: {
                options: {
                    strictMath: true,
                    sourceMap: true,
                    outputSourceFiles: true,
                    sourceMapURL: 'bootstrap-theme.css.map',
                    sourceMapFilename: 'dist/css/bootstrap-theme.css.map'
                },
                src: 'less/theme.less',
                dest: 'dist/css/bootstrap-theme.css'
            }
        },

        autoprefixer: {
            options: {
                browsers: configBridge.config.autoprefixerBrowsers
            },
            core: {
                options: {
                    map: true
                },
                src: 'dist/css/bootstrap.css'
            },
            theme: {
                options: {
                    map: true
                },
                src: 'dist/css/bootstrap-theme.css'
            }
        },

        cssmin: {
            options: {
                compatibility: 'ie8',
                //keepSpecialComments: '*',
                advanced: false
            },
            minifyCore: {
                src: 'dist/css/bootstrap.css',
                dest: 'dist/css/bootstrap.min.css'
            },
            minifyTheme: {
                src: 'dist/css/bootstrap-theme.css',
                dest: 'dist/css/bootstrap-theme.min.css'
            },
            all: {
                files: [{
                    expand: true,
                    cwd: 'dist/css',
                    src: ['*.css', '!*.min.css', '!*.css.map'],
                    dest: 'dist/css',
                    ext: '.min.css'
                }]
            }
        },

        usebanner: {
            options: {
                position: 'top',
                banner: '<%= topBanner %>'
            },
            files: {
                src: 'dist/css/*.css'
            }
        },

        csslint: {
            options: {
                csslintrc: 'less/.csslintrc'
            },
            dist: [
                'dist/css/bootstrap.css',
                'dist/css/bootstrap-theme.css'
            ]
        }
    });

    // Load the plugin that provides the "uglify" task.
    //grunt.loadNpmTasks('grunt-contrib-uglify');
    //grunt.loadNpmTasks('grunt-contrib-less');
    //grunt.loadNpmTasks('grunt-contrib-jshint');
    //grunt.loadNpmTasks('grunt-contrib-csslint');
    //grunt.loadNpmTasks('grunt-contrib-watch');
    //grunt.loadNpmTasks('grunt-contrib-concat');
    //grunt.loadNpmTasks('grunt-contrib-cssmin');
    //grunt.loadNpmTasks('grunt-banner');

    // Load tasks.
    require('matchdep').filterDev(['grunt-*', '!grunt-legacy-util']).forEach( grunt.loadNpmTasks );

    grunt.registerTask('watch-bootstrap', ['watch:bootstrap']);
    grunt.registerTask('less-bootstrap', ['less:compileCore', 'less:compileTheme', 'usebanner:files']);
    grunt.registerTask('minify-bootstrap', ['cssmin:minifyCore', 'cssmin:minifyTheme']);
    grunt.registerTask('minify-all', ['cssmin:all']);
    grunt.registerTask('js-bootstrap', ['uglify:bootstrap']);
    grunt.registerTask('concat-js-bootstrap', ['concat:catscript']);

};