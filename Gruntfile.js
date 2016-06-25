/**
 * Created by Administrator on 2016/6/19.
 */
module.exports = function (grunt) {
    //grunt 三部曲（config、loadTask、register）
    //配置插件参数及各种路径
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            build: {
                src: ["lib/util.js", 'source/*.js'],
                dest: "dist/tt.js"
            },
            web: {
                files: {
                    'dist/util.min.js': 'lib/util.js'
                }
            },
            test: {
                files: [
                    {src: 'lib/util.js', dest: 'dist/util.min.js'},
                    {src: 'source/*.js', dest: 'dist/tt.js'}
                ]
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: "",
                    src: ['source/*.js', 'lib/util.js'],
                    dest: 'dist/'
                }]
            }
        },
        clean:{
            all:{
                src:['dist/', 'dest/'],
                options:{
                    force:true
                }
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true,
                    minifyCSS:true,
                    minifyJS:true
                },
                files: [{
                    expand: true,
                    cwd: '',
                    src: '**/*.html',
                    dest: 'dist/'
                }]
            }
        },
        copy:{
            main:{
                expand: true,
                dest:'dest/',
                src:['**/*.*', '!node_modules/**/*.*', '!dist/**/*.*','!Gruntfile.js', '!package.json'],
                filter:'isFile'
            }
        },
        watch:{
            main:{
                files:['**/*.*', '!node_modules/**/*.*', '!dist/**/*.*','!Gruntfile.js', '!package.json','!dest/**/*.*'],
                tasks:['copy:main']
            }
        },
        imagemin:{
            main:{
                expand:true,
                cwd:'images/',
                src:['*.gif','*.png'],
                dest:'dest/images/',
                filter:'isFile'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-imagemin');

    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    //加载插件
    grunt.loadNpmTasks('grunt-contrib-uglify');

    //加载copy插件
    grunt.loadNpmTasks('grunt-contrib-copy');

    ////注册自动化任务
    //grunt.registerTask('default', ['uglify:build']);

};