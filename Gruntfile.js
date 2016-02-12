module.exports = function(grunt) {
    // Project configuration
    grunt.initConfig({
        inline: {
            dist: {
                files: [{
                    src: 'index_dev.html',
                    dest: 'index.html'
                }]
            }
        },
        responsive_images: {
            dev: {
                options: {
                    engine: 'im',
                    sizes: [{
                        width: 320,
                        quality: 60
                    }, {
                        width: 640,
                        quality: 60,
                    }, {
                        width: 1024,
                        quality: 60
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
                src: ['img', 'views/img']
            }
        },
        mkdir: {
            dev: {
                options: {
                    create: ['img', 'views/img']
                }
            }
        },
        copy: {
            dev: {
                expand: true,
                cwd: 'views/img_src/fixed/',
                src: '*.{gif,jpg,png}',
                dest: 'views/img/'
            }
        }
    });
    grunt.loadNpmTasks('grunt-responsive-images');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-mkdir');
    grunt.loadNpmTasks('grunt-inline');
    grunt.registerTask('default', ['clean','mkdir', 'copy', 'responsive_images', 'inline']);
};
