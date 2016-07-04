var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync');
var sass        = require('gulp-sass');
var prefix      = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var browserify = require('browserify');
var babel = require('gulp-babel');
gulp.task('babel', function(){
  return gulp.src(['app/assets/jsx/*.jsx'])
    .pipe(babel({
      presets: ['react']
    }))
    .pipe(gulp.dest('_build/assets/js'));
  });
gulp.task('scripts', function() {
  return gulp.src(['app/assets/js/*.js'])
  	.pipe(sourcemaps.init())    
    .pipe(concat('main.min.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('_build/assets/js/'));
});

gulp.task('compress', function() {
  return gulp.src('_build/assets/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('.'));
});

gulp.task('rebuild', function () {
    browserSync.reload();
});

gulp.task('browser-sync', ['sass'], function() {
    browserSync({
        server: {
            baseDir: '_build'
        }
    });
});

gulp.task('copy', function(){
  return gulp.src('app/*.html')
  .pipe(gulp.dest('_build'));
})

gulp.task('copyResources', function(){
 return gulp.src('app/assets/img/*.*')
 .pipe(gulp.dest('_build/assets/img'));
})

gulp.task('sass', function () {
  gulp.src('app/assets/sass/**/*.sass')
  	.pipe(sourcemaps.init())
    .pipe(sass({    
    	includePaths: ['app/assets/sass'],
    	outputStyle: 'nested'
    }).on('error', sass.logError))
    .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
    .pipe(sourcemaps.write())    
    .pipe(browserSync.reload({stream:true}))
    .pipe(gulp.dest('_build/assets/css'))
});

gulp.task('watch', function() {
  gulp.watch(['app/assets/sass/*.sass','app/assets/sass/**/*.sass'], ['sass']);
  gulp.watch(['app/assets/jsx/*.jsx'], ['babel']);
  gulp.watch(['app/assets/js/*.js'], ['scripts']);
  gulp.watch(['app/*.html'], ['copy']);
  gulp.watch(['app/assets/img/*.*'],['copyResources'])
  gulp.watch(['_build/*.html'], ['rebuild']);
});

gulp.task('default', ['copy', 'copyResources', 'scripts', 'watch', 'browser-sync' ]);  