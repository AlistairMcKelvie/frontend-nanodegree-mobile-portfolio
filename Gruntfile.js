module.exports = function(grunt) {
    // Project configuration
    grunt.initConfig({
        inline: {
            dev: {
                options: {
                    cssmin: true
                },
                files: [{
                    src: 'index_dev.html',
                    dest: 'tmp/index.html'
                }]
            }
        },
        responsive_images: {
            dev: {
                options: {
                    engine: 'im',
                    sizes: [{
                        width: 100,
                        quality: 40
                    }, {
                        width: 320,
                        quality: 40
                    }, {
                        width: 640,
                        quality: 40
                    }, {
                        width: 1024,
                        quality: 40
                    }]
                },

                files: [{
                    expand: true,
                    src: ['*.{gif,jpg,png}'],
                    cwd: 'img_src/',
                    dest: 'img'
                }, {
                    expand: true,
                    src: ['*.{gif,jpg,png}'],
                    cwd: 'views/img_src/',
                    dest: 'views/img'
                }]
            }
        },
        clean: {
            dev: {
                src: ['img', 'views/img', 'tmp']
            }
        },
        mkdir: {
            dev: {
                options: {
                    create: ['img', 'views/img', 'tmp']
                }
            }
        },
        copy: {
            dev: {
                files: [{
                    expand: true,
                    cwd: 'views/img_src/fixed/',
                    src: '*.{gif,jpg,png}',
                    dest: 'views/img/'
                }, {
                    expand: true,
                    cwd: 'img_src/fixed/',
                    src: '*.{gif,jpg,png}',
                    dest: 'img/'
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
                    src: 'tmp/index.html',
                    dest: 'index.html'
                }]
            }
        },
        imagemin: {
            dev: {
                files: [{
                    expand: true,
                    cwd: 'img/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'img/'
                }, {
                    expand: true,
                    cwd: 'views/img/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'views/img/'
                }]
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
    grunt.registerTask('default', ['clean','mkdir', 'copy', 'responsive_images', 'inline', 'htmlmin', 'imagemin']);
};
