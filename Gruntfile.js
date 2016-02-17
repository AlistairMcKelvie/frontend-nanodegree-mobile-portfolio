'use strict'
var ngrok = require('ngrok');
module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt)
    // Project configuration
    grunt.initConfig({
        inline: {
            dev: {
                options: {
                    cssmin: true
                },
                files: [{
                    expand: true,
                    cwd: 'src',
                    src: 'index.html',
                    dest: 'dist'
                }]
            }
        },
        responsive_images: {
            dev: {
                options: {
                    engine: 'im',
                    sizes: [{
                        width: 100,
                    }, {
                        width: 320
                    }, {
                        width: 640,
                    }, {
                        width: 1024,
                    }]
                },
                files: [{
                    expand: true,
                    cwd: 'src/img',
                    src: '*.{gif,jpg,png}',
                    dest: 'dist/img'
                }, {
                    expand: true,
                    cwd: 'src/views/img',
                    src: '*.{gif,jpg,png}',
                    dest: 'dist/views/img'
                }]
            }
        },
        clean: {
            dev: {
                src: ['dist', 'dist/img', 'dist/views/img']
            }
        },
        mkdir: {
            dev: {
                options: {
                    create: ['dist/img', 'dist/views/img']
                }
            }
        },
        copy: {
            dev: {
                files: [{
                    expand: true,
                    cwd: 'src/views/img/fixed',
                    src: '*.{gif,jpg,png}',
                    dest: 'dist/views/img'
                }, {
                    expand: true,
                    cwd: 'src/img/fixed',
                    src: '*.{gif,jpg,png}',
                    dest: 'dist/img'
                }, {
                    expand: true,
                    cwd: 'src',
                    src: ['project-2048.html',
                          'project-webperf.html',
                          'project-mobile.html',
                          'js/*',
                          'css/*',
                          'views/pizza.html',
                          'views/css/*',
                          'views/js/*'
                    ], dest: 'dist'
                }]
            }
        },
        htmlmin: {
            dev: {
                options: {
                    removeComments: true,
                    collapseWhiteSpace: true,
                    minifyCSS: true,
                    minifyJS: true,
                    minifyURLs: true
                },
                files: [{
                    expand: true,
                    cwd: 'dist',
                    src: 'index.html',
                    dest: 'dist'
                }]
            }
        },
        imagemin: {
            dev: {
                files: [{
                    expand: true,
                    cwd: 'dist/img',
                    src: '*.{png,jpg,gif}',
                    dest: 'dist/img'
                }, {
                    expand: true,
                    cwd: 'dist/views/img',
                    src: '*.{png,jpg,gif}',
                    dest: 'dist/views/img'
                }]
            }
        },
        pagespeed: {
            options: {
                nokey: true,
                locale: 'en_GB',
                threshold: 40
            },
            local: {
                options: {
                    strategy: 'desktop'
                }
            },
            mobile: {
                options: {
                    strategy: 'mobile'
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-responsive-images');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-mkdir');
    grunt.loadNpmTasks('grunt-inline');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.registerTask('psi-ngrok', 'Run pagespeed with ngrok', function() {
        var done = this.async();
        var port = 8080;
        ngrok.connect(port, function(err, url) {
            if (err !== null) {
                grunt.fail.fatal(err);
                return done();
            }
            grunt.config.set('pagespeed.options.url', url);
            grunt.task.run('pagespeed');
            done();
        });
    });
    grunt.registerTask('default', ['clean','mkdir', 'copy', 'responsive_images', 'inline', 'htmlmin', 'imagemin']);
};
