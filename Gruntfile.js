module.exports = function (grunt) {

  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.initConfig({
    connect: {
      root: {
        options: {
          keepalive: true
        }
      }
    }
  });

};
