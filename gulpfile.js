// initial modules
let gulp = require('gulp');
let concat = require('gulp-concat');
let uglify = require('gulp-uglify');
let sass = require('gulp-sass');
let maps = require('gulp-sourcemaps');
let img = require('gulp-imagemin');
let connect = require('gulp-connect');
let del = require('del');

// task for mapping, concatinating, minifying js files to dist folder
gulp.task('scripts', function(){
  return gulp.src(['js/circle/*.js', 'js/global.js'])
  .pipe(maps.init())
  .pipe(uglify())
  .pipe(concat('all.min.js'))
  .pipe(maps.write('./'))
  .pipe(gulp.dest('dist/scripts'))
})

// map, concat, minify sass files to dist folder with a listener for livereload with connect
gulp.task('styles', function(){
  return gulp.src('sass/**/*.scss')
  .pipe(maps.init())
  .pipe(sass({outputStyle: 'compressed'}))
  .pipe(concat('all.min.css'))
  .pipe(maps.write('./'))
  .pipe(gulp.dest('dist/styles'))
  .pipe(connect.reload())
})

// minify jpg and png files to dist folder
gulp.task('images', function(){
  return gulp.src(['images/*.jpg', 'images/*.png'])
  .pipe(img())
  .pipe(gulp.dest('dist/content'))
})

// task for deleting all folders and files in dist directory
gulp.task('clean', function(){
  return del.sync('./dist/*')
})

// task to build all previous tasks at once
gulp.task('build', ['clean', 'scripts', 'styles', 'images'])

// setting config for the webserver for live reloading
gulp.task('webserver', function(){
  connect.server(
    {
      livereload: true
    }
  )
})

// task for watching all the scss files for changes and calling styles task when there is
gulp.task('watch', function(){
  gulp.watch('sass/**/*.scss', ['styles'])
})

// default task to build all tasks, start webserver and watch scss files
gulp.task('default', ['build', 'webserver', 'watch'])
