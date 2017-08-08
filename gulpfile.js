//要监听的项目
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');
var gulp = require('gulp');
var plumber = require('gulp-plumber');
let imagemin = require('gulp-imagemin');
let concat = require('gulp-concat');
let browserSync = require('browser-sync').create();
let ts = require('gulp-typescript');
var webpack = require("webpack");
var htmlMin = require('gulp-htmlmin');
var webpackConfig = require("./webpack.config.js");
var myConfig = Object.create(webpackConfig);
var contentIncluder = require('gulp-content-includer');
gulp.task("webpack", function(callback) {//webpack模块
	var myConfig = Object.create(webpackConfig);
	return webpack(myConfig, function(err, stats) {
		callback();
	});
});
//图片压缩
//gulp.task('image-min',function(){
//	gulp.src('./build/Public/images/*.{jpg,png,gif}')
//	.pipe(imagemin({
//          optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
//          progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
//          interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
//          multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
//      }))
//	.pipe(gulp.dest('./src/Public/images'))
//});
//启动配置服务器
gulp.task('serve', function() {//服务监听
		gulp.watch(`./src/*/js/*.js`, ['webpack']);
		gulp.watch(`./src/*/js/*.jsx`, ['webpack']);
});
gulp.task('default',['serve']);