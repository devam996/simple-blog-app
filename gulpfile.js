const gulp = require('gulp');
const clc = require('cli-color');
const path = require('path');
const runSequence = require('run-sequence');
let plugins = require('gulp-load-plugins')({
	pattern: ['gulp-*', 'gulp.*'],
	replaceString: /\bgulp[\-.]/,
	camelize: true,
	lazy: true
});

var development = plugins.environments.development;
var production = plugins.environments.production;

if (!production()) {
	plugins.environments.current('development');
}

var gulp_src = gulp.src;
gulp.src = function() {
	return gulp_src.apply(gulp, arguments)
		.pipe(plugins.plumber(function(error) {
			plugins.util.log(clc.red.bold('Error (' + error.plugin + '): ' + error.message));
			plugins.util.log(clc.yellow.bold('Error File:' + error.fileName));
			plugins.util.log(clc.blue.bold('Error Cause: ' + error.cause));
			plugins.util.log(clc.red.bold('ERROR' + error));
			this.emit('end');
		}));
};

gulp.task('script::vendors', function() {
	var basePath = './resources/js/vendors/';
	var vendorFilesArray = [
		'lodash.min.js',
        'moment.min.js',
        'locales.min.js',
        'moment-with-locales.min.js',
		'store.everything.min.js',
		'angular.min.js',
		'angular-aria.min.js',
		'angular-animate.min.js',
		'angular-sanitize.min.js',
        'angular-route.min.js',
        'angular-messages.min.js',
		'angular-ui-router.min.js',
		'angular-material.min.js',
		'angular-validate-match.min.js',
		'quill/quill.min.js',
		'quill/ng-quill.min.js',
	];

	var vendorSrc = vendorFilesArray.map(function(file) {
		return path.join(basePath, file);
	});

	return gulp.src(vendorSrc)
		.pipe(plugins.concat('vendor.js'))
        .pipe(gulp.dest('./public/js'));
});

gulp.task('template::build', function(){
    return gulp.src('./resources/templates/**/*.html')
		.pipe(plugins.htmlmin({
			collapseWhitespace: true
		}))
        .pipe(gulp.dest('./public/templates'));
});

gulp.task('sass::build', function() {
    return gulp.src('./resources/sass/**/*.scss')
		.pipe(development(plugins.sourcemaps.init()))
		.pipe(plugins.sass({
			outputStyle: production() ? 'compressed' : 'expanded'
		}))
		.pipe(plugins.autoprefixer('last 2 versions'))
		.pipe(development(plugins.sourcemaps.write()))
        .pipe(gulp.dest('./public/css/'));
});

gulp.task('script::build', function() {
	var src_ang_path = [];
	var angular_files_order = ['module', 'config', 'service', 'factory', 'filter', 'directive', 'controller', 'animation', ''];

	src_ang_path = angular_files_order.map(function(file) {
		return path.join('./resources/js/src', '/**/*' + file + '.js');
	});

	return gulp.src(src_ang_path)
		.pipe(production(plugins.sourcemaps.init()))
		.pipe(plugins.concat('app.js'))
		.pipe(production(plugins.uglify()))
		.pipe(production(plugins.sourcemaps.write('./')))
		.pipe(gulp.dest('./public/js'));
});

function isChanged(file) {
	if (file.extname == '.js') {
        return runSequence('script::build');
	} else if (file.extname == '.scss') {
        return runSequence('sass::build');
	} else if (file.extname == '.html') {
        return runSequence('template::build');
	}
}

var watchFilter = plugins.filter(isChanged);

gulp.task('watch', ['script::build', 'sass::build', 'template::build'], function() {

	return gulp.src('*', {
			read: false
		})
		.pipe(plugins.watch(['./resources/**/*'], {
			read: false
		}))
        .pipe(watchFilter);
});

gulp.task('build', ['script::vendors', 'script::build', 'sass::build', 'template::build']);

