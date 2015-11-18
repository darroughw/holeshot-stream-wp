'use strict';

/*
	
WORDPRESS GULP FILE

This gulp file processes the theme assets. It is to be used with a css and js concat/uglify plugin of your choice.

See commands near the bottom of this file.

For single theme folder development use:

	 - gulp dev
	 - gulp build	


For multi-theme folder development use:

	The folder names-
	
	/main-dev/
	/main-test/
	/main/
	
	 - gulp dev
	 - gulp test
	 - gulp build

	
*/
var manifest      = '../../../manifest.json';
var gulp          = require('gulp'),
	
	autoprefixer  = require('gulp-autoprefixer'),
	browserSync   = require('browser-sync'),
	compass       = require('gulp-compass'),
	concat        = require('gulp-concat'),
	gulpif        = require('gulp-if'),
	gutil         = require('gulp-util'),
	htmlhint      = require("gulp-htmlhint"),
	imagemin      = require('gulp-imagemin'),
	jeditor       = require("gulp-json-editor"),
	jshint        = require('gulp-jshint'),
	modernizr     = require('gulp-modernizr'),
	notify        = require('gulp-notify'),
	plumber       = require('gulp-plumber'),
	rename        = require("gulp-rename"),
	sourcemaps    = require('gulp-sourcemaps'),
	svgmin        = require('gulp-svgmin'),
	uglify        = require('gulp-uglify'),
	useref        = require('gulp-useref'),
	
	reload        = browserSync.reload,
	config        = require( manifest ),
    devDest       = ( config.devDest.length )? config.devDest : '.',
    testDest      = ( config.testDest.length )? config.testDest : '.',
    prodDest      = ( config.prodDest.length )? config.prodDest : '.',
    assets        = ( config.assets.length )? config.assets+'/' : '';
    
	

// Gulp plumber error handler
var onError = function(err) {
	//console.log(err); // Commenting out because it's mostly annoying. Enable as needed.
	//this.emit('end');
};


// Removes unicode and ANSI from notify messages
var colorReplace = function( input, replace ) {
    
    var replaceColors = {
            "0;31" : "{r",
            "1;31" : "{R",
            "0;32" : "{g",
            "1;32" : "{G",
            "0;33" : "{y",
            "1;33" : "{Y",
            "0;34" : "{b",
            "1;34" : "{B",
            "0;35" : "{m",
            "1;35" : "{M",
            "0;36" : "{c",
            "1;36" : "{C",
            "0;37" : "{w",
            "1;37" : "{W",
            "1;30" : "{*",
            "0" : "{x"
    };

    if ( replace ){
        for( k in replaceColors ){
            var re = new RegExp( "\\033\\[" + k + "m" );
            input = input.replace( re, replaceColors[ k ] );
        }
    } else {
        input = input.replace( /\033\[[0-9;]*m/g, "" );
        input = input.replace(/[\uE000-\uF8FF]/g, '');
    }

    return input;
};


// Modernizr settings. Feel free to modify as needed.
var modernizrSettings = {
    "options" : [
        "setClasses",
        "addTest",
        "html5shiv"
    ]
};

// These are the theme php files to move from dev to test.
var filesToMoveTest = [
        './classes/**/*.*',
        './inc/**/*.*',
        './**/*.php',
        './screenshot.png',
        './screenshot-full.png',
    ];




/*
	IMAGE/SVG TASKS
------------------------------------------------------*/

// Compresses images for production.
gulp.task('images', function() {
	return gulp.src( './'+assets+'images/**/*.{jpg,jpeg,png,gif}' )
		.pipe(imagemin())
		.pipe(gulp.dest( './'+assets+'images/' ));
});

// Compresses SVG files for production.
gulp.task('svg', function() {
    return gulp.src( './'+assets+'images/**/*.svg' )
        .pipe(svgmin({
            js2svg: {
                pretty: true
            }
        }))
        .pipe(gulp.dest( './'+assets+'images/'))
});

// Compresses images for production.
gulp.task('test:images', function() {
	return gulp.src( './'+assets+'images/**/*.{jpg,jpeg,png,gif}' )
		.pipe(imagemin())
		.pipe(gulp.dest( testDest+assets+'images/' ));
});

// Compresses SVG files for production.
gulp.task('test:svg', function() {
    return gulp.src( './'+assets+'images/**/*.svg' )
        .pipe(svgmin({
            js2svg: {
                pretty: true
            }
        }))
        .pipe(gulp.dest( testDest+assets+'images/'))
});




/*
	JAVASCRIPT TASKS	
------------------------------------------------------*/

// Development JS creation. 
// Checks for errors and concats. Does not minify.
gulp.task('js', function () {
    return gulp.src( [ './'+assets+'js/*.js', '!./'+assets+'js/modernizr.js'] )
   		.pipe(plumber({errorHandler: onError}))
		.pipe(jshint())
		.pipe(jshint.reporter('fail'))
		.pipe(notify(function (file) {
		    if (file.jshint.success) {
		    	return { message : 'JS much excellent success!', title : file.relative, sound: false};
		    }
		
		    var errors = file.jshint.results.map(function (data) {
		       	if (data.error) {
		        	return "(" + data.error.line + ':' + data.error.character + ') ' + data.error.reason;
		        }
		    }).join("\n");
		    return { message : file.relative + " (" + file.jshint.results.length + " errors)\n" + errors, sound: "Frog", emitError : true, title : 'JSHint Error' };
    	}))
    	.pipe(reload({stream: true}));
});

// This does one final error check for production.
gulp.task('build:js', function () {
    return gulp.src( [ './'+assets+'js/*.js', '!./'+assets+'js/modernizr.js'] )
   		.pipe(plumber({errorHandler: onError}))
		.pipe(jshint())
		.pipe(jshint.reporter('fail'))
		.pipe(notify(function (file) {
		    if (file.jshint.success) {
		        return { message : 'JS much excellent success!', title : file.relative, sound: false };
		    }
		
			var errors = file.jshint.results.map(function (data) {
		       	if (data.error) {
					return "(" + data.error.line + ':' + data.error.character + ') ' + data.error.reason;
		       	}
		    }).join("\n");
			return { message : file.relative + " (" + file.jshint.results.length + " errors)\n" + errors, sound: "Frog", emitError: true, title : 'JSHint Error' };
    	}))
		.pipe( gulp.dest( './'+assets+'js/' ));
});

// This does one final error check and creates a map file for production.
gulp.task('test:js', function () {
    return gulp.src( [ './'+assets+'js/*.js', '!./'+assets+'js/modernizr.js'] )
   		.pipe(plumber({errorHandler: onError}))
		.pipe(jshint())
		.pipe(jshint.reporter('fail'))
		.pipe(notify(function (file) {
		    if (file.jshint.success) {
		        return { message : 'JS much excellent success!', title : file.relative, sound: false };
		    }
		
			var errors = file.jshint.results.map(function (data) {
		       	if (data.error) {
					return "(" + data.error.line + ':' + data.error.character + ') ' + data.error.reason;
		       	}
		    }).join("\n");
			return { message : file.relative + " (" + file.jshint.results.length + " errors)\n" + errors, sound: "Frog", emitError: true, title : 'JSHint Error' };
    	}))
    	.pipe(sourcemaps.init())
		   .pipe(uglify()) 
		.pipe(sourcemaps.write( './' ))
		.pipe( gulp.dest( testDest+assets+'js/' ));
});

// modernizr will crawl your css and js to look for any reference to tests. 
// Ex. if you use .svg or .video in your css, modernizer will add the tests for them.
gulp.task('modernizr', function() {
  gulp.src([ './'+assets+'js/app.js', './'+assets+'css/*.css'])
  	.pipe(plumber({errorHandler: onError}))
    .pipe(modernizr(modernizrSettings))
    .on('error', notify.onError(function( err ){ 
			return { message: colorReplace(err.message), title : 'Modernizr Error', sound: "Frog"}; 
		})
	)
    .pipe(gulp.dest( './'+assets+"js/"))
});

// This will copy over to the app/js folder and minimize modernizr for production
gulp.task('test:modernizr', function() {
  gulp.src([ './'+assets+'js/modernizr.js'])
  	.pipe(plumber({errorHandler: onError}))
    .pipe(uglify())
    .on('error', notify.onError(function( err ){ 
			return { message: colorReplace(err.message), title : 'Modernizr Error', sound: "Frog"}; 
		})
	)
    .pipe(gulp.dest( testDest+assets+"js/"))
});




/*
	CSS TASKS
------------------------------------------------------*/

// Development CSS creation. 
// Checks for errors and concats. Does not minify.
gulp.task('scss', function() {
	return gulp.src( './'+assets+'scss/**/*.scss')
		.pipe(plumber({errorHandler: onError}))
		.pipe(compass({
			css: './',
			sass: './'+assets+'scss/',
			image: './'+assets+'images/',
		}))
		.on('error', notify.onError(function( err ){ 
				return { message: colorReplace(err.message), title : 'CSS Error', sound: "Frog"}; 
			})
		)
		.pipe(autoprefixer({browsers: ['last 2 versions', 'ie >= 8', '> 1%']}))
		.pipe(gulp.dest( './'))
		.on('error', notify.onError(function( err ){ 
				return { message: colorReplace(err.message), title : 'CSS Error', sound: "Frog"}; 
			})
		)
		.pipe(notify({ message: 'Styles much compiled success!', title : 'style.css', sound: false }))
		.pipe(reload({stream: true}));
});

// This does one final error check, creates a map file and compresses the css for production.
gulp.task('build:scss', function() {
	return gulp.src( './'+assets+'scss/**/*.scss')
		.pipe(plumber({errorHandler: onError}))
		.pipe(compass({
			css: './',
			sass: './'+assets+'scss/',
			sourcemap : true,
			style : 'compressed',
			image: assets+'images/',
		}))
		.on('error', notify.onError(function( err ){ 
				return { message: colorReplace(err.message), title : 'CSS Error', sound: "Frog"}; 
			})
		)
		.pipe(autoprefixer({browsers: ['last 2 versions', 'ie >= 8', '> 1%']}))
		.pipe(gulp.dest( testDest+'/'))
		.on('error', notify.onError(function( err ){ 
				return { message: colorReplace(err.message), title : 'CSS Error', sound: "Frog"}; 
			})
		)
		.pipe(notify({ message: 'Styles much compiled success!', title : 'style.css', sound: false }));
});

// This does one final error check, creates a map file and compresses the css for production.
gulp.task('test:scss', function() {
	return gulp.src( './'+assets+'scss/**/*.scss')
		.pipe(plumber({errorHandler: onError}))
		.pipe(compass({
			css: testDest+'/',
			sass: './'+assets+'scss/',
			sourcemap : true,
			style : 'compressed',
			image: testDest+assets+'images/'
		}))
		.on('error', notify.onError(function( err ){ 
				return { message: colorReplace(err.message), title : 'CSS Error', sound: "Frog"}; 
			})
		)
		.pipe(autoprefixer({browsers: ['last 2 versions', 'ie >= 8', '> 1%']}))
		.pipe(gulp.dest( testDest+'/'))
		.on('error', notify.onError(function( err ){ 
				return { message: colorReplace(err.message), title : 'CSS Error', sound: "Frog"}; 
			})
		)
		.pipe(notify({ message: 'Styles much compiled success!', title : 'style.css', sound: false }));
});




/*
	FILE MIGRATIONS
------------------------------------------------------*/

gulp.task('test:move', function(){
    
	// Copy over your fonts
	gulp.src( './'+assets+'fonts/**/*.{ttf,woff,woff2,eof,eot,svg}')
		.pipe(gulp.dest( testDest+assets+'fonts'));
	
	// Copy over any videos
	gulp.src( './'+assets+'videos/**/*.{mp4,ogv,ogg,webm}')
		.pipe(gulp.dest( testDest+assets+'videos'));
	
	// Copy over any audio
	gulp.src( './'+assets+'audio/**/*.{mp4,mp3}')
		.pipe(gulp.dest( testDest+assets+'audio'));
		
	return gulp.src(filesToMoveTest, { base: './' })
		.pipe(gulp.dest( testDest+'/' ));
	
});

gulp.task('prod:move', function(){
    		
	return gulp.src( testDest+'/**/*' )
		.pipe(gulp.dest( prodDest+'/' ));
	
});




/*
	MANIFEST THEME AND ENV CHANGES
------------------------------------------------------*/

// This swtiches the env to test
gulp.task('test:env', function(){
	return gulp.src( manifest )
		.pipe(jeditor({
			'env': 'test',
			'theme': 'main-test'
  		}))
  		.pipe(gulp.dest( testDest ))
  		.pipe(gulp.dest( './' ));
});


// This swtiches the env to production
gulp.task('prod:env', function(){
	return gulp.src( manifest )
		.pipe(jeditor({
			'env': 'prod',
			'theme': 'main'
  		}))
  		.pipe(gulp.dest( prodDest ))
  		.pipe(gulp.dest( './' ));
});



/*
	BUILD
------------------------------------------------------*/

// This runs all the tasks for production.
gulp.task('build:app', [ 'images', 'svg', 'build:js', 'build:scss', 'modernizr'], function () {		
        
    browserSync({ proxy : config.hostname});

});



/*
	TEST BUILD
------------------------------------------------------*/

// This runs all the tasks for production.
gulp.task('test:app', [ 'test:images', 'test:svg', 'test:js', 'test:scss', 'test:modernizr', 'test:move', 'test:env'], function () {		
        
    browserSync({ proxy : config.hostname});

});




/*
	PRODUCTION BUILD
------------------------------------------------------*/

// This runs all the tasks for production.
gulp.task('prod:app', ['prod:move','prod:env'], function () {		
        
    browserSync({ proxy : config.hostname});

});




/*
	BOWER ASSETS
------------------------------------------------------*/

// Pulls some of the bower assets to the src folders.
// Add/modify as needed.
gulp.task('bower-assets', function(){
	
	// This copies the bower normalize css file over to the scss components folder.
	// If you updated normalize it will get updated in your app src on next [gulp serve].
	gulp.src( "./bower/normalize.css/normalize.css" )
		.pipe(rename("_normalize.scss"))
		.pipe(gulp.dest( './'+assets+"scss/components/"));
	
	// Copies over animate.css from bower to scss components folder.
	gulp.src( "./bower/animate.css/animate.css")
		.pipe(rename("_animate.scss"))
		.pipe(gulp.dest( './'+assets+"scss/components/"));
	
	// Sass easing
	gulp.src( "./bower/sass-easing/_sass-easing.scss")
		.pipe(gulp.dest( './'+assets+"scss/components/"));
	
	// This swtiches to the main-dev theme
	gulp.src( manifest )
		.pipe(jeditor({
			'theme': 'main-dev',
			'env': 'dev'
  		}))
  		.pipe(gulp.dest("./"));

});




/*
	COMMANDS	
------------------------------------------------------

[gulp dev] - Development task

[gulp build] - Build task

[gulp test] - Test task
- This task will compile the assets, create map files.

[gulp prod] - Production task
- This task is a copy of test

*/

// gulp dev	
gulp.task('dev', ['bower-assets'], function () {
	
    browserSync( { 
	    			proxy : config.hostname, 
	    			files: ['{partials,classes,inc}/**/*.php', '*.php'],  
	    			snippetOptions: { 
		    			whitelist: ['/wp-admin/admin-ajax.php'], 
		    			blacklist: [ '/wp-admin/**', './.sass-cache/']
		    		}
		    	});

	// The rest... watch the files and run the task(s).
    gulp.watch( assets+"scss/**/*.scss", ['scss']);
    gulp.watch([ assets+"js/**/*.js", '!./'+assets+'js/modernizr.js'], ['js']);
    gulp.watch([ assets+"css/style.css", assets+"js/app.js"], ['modernizr']);
 
});

// gulp build
gulp.task('build', ['build:app']);

// gulp test
gulp.task('test', ['test:app']);

// gulp prod
gulp.task('prod', ['prod:app']);