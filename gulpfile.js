let gulp = require('gulp'),
    sass = require('gulp-sass');



gulp.task('sass', () => {
    return gulp.src('./sass/**/*.sass')
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(gulp.dest('./public/css'))
});



gulp.task('sass-w', () => {
    gulp.watch('./sass/**/*.sass', ['sass'])
});