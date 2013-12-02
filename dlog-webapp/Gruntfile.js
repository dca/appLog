var adminPid = '/tmp/pids/admin.pid'
module.exports = function(grunt) {

    grunt.initConfig({
        clean: {
            build: {
                src: [ 'public/build']
            }
        },

        copy: {
            elastic: {
                files: [{
                    expand: true,
                    cwd: 'public/components/elastic.js/dist',
                    src: ['**/*.min.js'],
                    dest: 'public/build/javascripts/elastic/',
                }]
            }
        },

        less:{
            bootstrap: {
                options: {
                      paths: ['public/components/bootstrap/less'],
                      // report: 'gzip',
                      // compress: true,
                      cleancss: true
                },
                files: {
                    "public/build/stylesheets/bootstrap.min.css": "public/stylesheets/bootstrap/bootstrap.less"
                }
            },
            style: {
                options: {
                      cleancss: true
                },
                files: {
                    "public/build/stylesheets/style.min.css": "public/stylesheets/style.less"
                }
            }
        },

        concat: {
            dist: {
                src: ['public/javascripts/app/**/*.js'],
                dest: 'public/build/javascripts/app.js'
            }
        },

        uglify: {
            build: {
                options: {
                    beautify: true,
                    mangle: false
                },
                files: {
                    'public/build/javascripts/app.min.js': ['public/build/javascripts/app.js']
                }
            }
        },

        watch: {
            options: {
                  livereload: true,
                  interrupt: true,
            },
            bootstrap: {
                files: 'public/stylesheets/bootstrap/*.less',
                tasks: ['less:bootstrap'],
            },
            style: {
                files: 'public/stylesheets/*.less',
                tasks: ['less:style'],
            },
            jade: {
                files: 'views/**/*.jade',
            },
            appjs: {
                files: 'public/javascripts/app/**/*.js',
                tasks: ['concat', 'uglify'],
            }
            // server: {
            //     files: ['app.js', 'routes/**/*', 'config/**/*'],
            //     tasks: ['connect:dev'],
            //     options: {
            //     },
            // },
        },

    });

    // linting
    grunt.loadNpmTasks('grunt-contrib-watch');

    //compile
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // utils
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');


    grunt.registerTask('default', [ ]);

    grunt.registerTask('build', [ 'clean:build', 'concat', 'uglify', 'less:bootstrap', 'less:style', 'copy']);

};
