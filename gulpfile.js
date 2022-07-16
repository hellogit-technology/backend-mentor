const gulp = require('gulp')
const concat = require('gulp-concat')
const cleanCSS = require('gulp-clean-css')
const imagemin = require('gulp-imagemin')
const terser = require('gulp-terser')
const randomstring = require('randomstring')

const idJS = randomstring.generate({
    length: 15
});

const idCSS = randomstring.generate({
    length: 15
})

// Bundle js files
gulp.task('global-js', () => {
    return gulp
        .src('assets/js/global/*.js')
        .pipe(concat(`global-${idJS}.bundle.js`))
        .pipe(terser({
            compress: true,
            mangle: true
        }))
        .pipe(gulp.dest('public/js'))
})

gulp.task('login-js', () => {
    return gulp
        .src('assets/js/login/*.js')
        .pipe(concat(`login-${idJS}.bundle.js`))
        .pipe(terser({
            compress: true,
            mangle: true
        }))
        .pipe(gulp.dest('public/js'))
})

gulp.task('status-js', () => {
    return gulp
        .src('assets/js/status/*.js')
        .pipe(concat(`status-${idJS}.bundle.js`))
        .pipe(terser({
            compress: true,
            mangle: true
        }))
        .pipe(gulp.dest('public/js'))
})


// Minify css files
gulp.task('global-css', () => {
    return gulp
        .src('assets/css/global/*.css')
        .pipe(concat(`global-${idCSS}.min.css`))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('public/css'))
})

gulp.task('login-css', () => {
    return gulp
        .src('assets/css/login/*.css')  
        .pipe(concat(`login-${idCSS}.min.css`))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('public/css'))
})

gulp.task('status-404', () => {
    return gulp
        .src('assets/css/status/404.css')  
        .pipe(concat(`404-${idCSS}.min.css`))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('public/css'))
})

gulp.task('status-403', () => {
    return gulp
        .src('assets/css/status/403.css')  
        .pipe(concat(`403-${idCSS}.min.css`))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('public/css'))
})

gulp.task('status-500', () => {
    return gulp
        .src('assets/css/status/500.css')  
        .pipe(concat(`500-${idCSS}.min.css`))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('public/css'))
})

// Optimize images
gulp.task('images', () => {
    return gulp
        .src('assets/img/*')
        .pipe(imagemin({optimizationLevel: 5}))
        .pipe(gulp.dest('public/img'))
})


// Run tasks
gulp.task('minify-files', 
    gulp.parallel(
        'global-js', 
        'login-js', 
        'status-js',
        'global-css',
        'login-css',
        'status-404',
        'status-403',
        'status-500',
        'images'
    )) 


// Watch and run tasks
gulp.task('watch-files', () => {
    gulp.watch(
        [
            'assets/js/global/*.js', 
            'assets/js/login/*.js', 
            'assets/js/status/*.js',
        ], 
    gulp.series('global-js', 'login-js', 'status-js'))

    gulp.watch(
        [
            'assets/css/global/*.css', 
            'assets/css/login/*.css', 
            'assets/css/status/*.css'
        ], 
    gulp.series('global-css', 'login-css', 'status-404', 'status-403', 'status-500'))

    gulp.watch('assets/img/*', gulp.series('images'))
})


