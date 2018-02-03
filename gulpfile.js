var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');

// Compilar o sass
gulp.task('sass', function(){
  return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'])
  .pipe(sass())
  //.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError)) // compressed files
  .pipe(gulp.dest("src/assets/css"))
  .pipe(browserSync.stream());
});

// Mover JS src/js
gulp.task('js', function(){
  return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js', 'node_modules/popper.js/dist/umd/popper.min.js'])
  .pipe(gulp.dest("src/assets/js"))
  .pipe(browserSync.stream());
});


// Servidor para olhar os HTML/SCSS
gulp.task('server', ['sass'], function(){
  browserSync.init({
  server: "./src"
  });

  gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'node_modules/bootstrap/scss/_custom.scss', 'src/scss/*.scss'], ['sass']);
  gulp.watch("src/*.html").on('change', browserSync.reload);
});

gulp.task('default', ['js', 'server']);
