module.exports = function(grunt) {

    // load all grunt tasks matching the ['grunt-*', '@*/grunt-*'] patterns
    require('load-grunt-tasks')(grunt);


    grunt.initConfig({

        ngtemplates: {
            src: '/src/**/*.html',
            dest: 'tmp/templates-cache.js',
            options: {
                module: 'tofi',
                standalone: false
            }
        }
    });


    grunt.registerTask('default', [
        'ngtemplates'
    ]);
};