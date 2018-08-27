let gulp = require('gulp');
let concat = require('gulp-concat');
let uglify = require('gulp-uglify');
let sass = require('gulp-sass');
let maps = require('gulp-sourcemaps');
let img = require('gulp-imagemin');
let connect = require('gulp-connect');
let del = require('del');

gulp.task('scripts', function(){
  return gulp.src(['js/circle/*.js', 'js/global.js'])
  .pipe(maps.init())
  .pipe(uglify())
  .pipe(concat('all.min.js'))
  .pipe(maps.write('./'))
  .pipe(gulp.dest('dist/scripts'))
})

gulp.task('styles', function(){
  return gulp.src('sass/**/*.scss')
  .pipe(maps.init())
  .pipe(sass({outputStyle: 'compressed'}))
  .pipe(concat('all.min.css'))
  .pipe(maps.write('./'))
  .pipe(gulp.dest('dist/styles'))
  .pipe(connect.reload())
})

gulp.task('images', function(){
  return gulp.src(['images/*.jpg', 'images/*.png'])
  .pipe(img())
  .pipe(gulp.dest('dist/content'))
})

gulp.task('clean', function(){
  return del.sync('./dist/*')
})

gulp.task('build', ['clean', 'scripts', 'styles', 'images'])

gulp.task('webserver', function(){
  connect.server(
    {
      livereload: true
    }
  )
})

gulp.task('watch', function(){
  gulp.watch('sass/**/*.scss', ['styles'])
})

gulp.task('default', ['build', 'webserver', 'watch'])
