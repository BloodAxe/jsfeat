module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
      concat: {
        options: {
            separator: ';'
        },

        jsfeat: {
            src: [
                'src/jsfeat.js',
                'src/jsfeat_geom.js',
                'src/jsfeat_struct.js',
                'src/jsfeat_cache.js',
                'src/jsfeat_math.js',
                'src/jsfeat_mat_math.js',
                'src/jsfeat_linalg.js',
                'src/jsfeat_motion_estimator.js',
                'src/jsfeat_imgproc.js',
                'src/jsfeat_fast_corners.js',
                'src/jsfeat_yape06.js',
                'src/jsfeat_yape.js',
                'src/jsfeat_orb.js',
                'src/jsfeat_optical_flow_lk.js',
                'src/jsfeat_haar.js',
                'src/jsfeat_bbf.js',
                'src/jsfeat_export.js'
            ],
            dest: 'build/<%= pkg.name %>.js',
        }
      },
        
      jshint: {
        files: ['Gruntfile.js', 'jsfeat/src/*.js'],
        options: {
          // options here to override JSHint defaults
          globals: {
            jQuery: true,
            console: true,
            module: true,
            document: true
          }
        }
      },

      uglify: {
        options: {
          banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
        },
        build: {
          src: 'build/<%= pkg.name %>.js',
          dest: 'build/<%= pkg.name %>.min.js'
        }
      },

      mocha_phantomjs: {
        all: {
          options: {
            enableTimeouts: false,
            urls: [
              'http://localhost:8000/test/index.html'
            ]
          }
        }
      },
      connect: {
        server: {
          options: {
            port: 8000,
            base: '.',
          }
        }
      }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-mocha-phantomjs');
  grunt.loadNpmTasks('grunt-contrib-connect');

  // Default task(s).
  grunt.registerTask('default', ['concat', 'uglify']);
  grunt.registerTask('lint',    ['concat', 'jshint']);
  grunt.registerTask('test',    ['default', 'connect', 'mocha_phantomjs']);
};