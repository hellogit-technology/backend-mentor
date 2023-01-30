const gulp = require('gulp')
const concat = require('gulp-concat')
const cleanCSS = require('gulp-clean-css')
const imagemin = require('gulp-imagemin')
const terser = require('gulp-terser')
const strip = require('gulp-strip-comments');
const randomstring = require('randomstring')

// Make ID file
const idJS = randomstring.generate({length: 15});
const idCSS = randomstring.generate({length: 15})

// Watch change JS files
const jsDirectory = [
    'assets/js/global/*.js', 
    'assets/js/login/*.js',
    'assets/js/status/*.js',
    'assets/js/validation/message.js', 
    'assets/js/validation/method-validation.js', 
    'assets/js/validation/admin/*.js',
    'assets/js/helpers/*.js',
    'assets/js/toast/*.js'
]

// Watch change CSS files
const cssDirectory = [
    'assets/css/global/*.css',
    'assets/css/login/*.css',
    'assets/css/status/404.css',
    'assets/css/status/403.css',
    'assets/css/status/500.css',
    'assets/css/validation/*.css',
    'assets/css/toast/*.css'
]


// Bundle js files
gulp.task('global-js', () => {
    return gulp
        .src('assets/js/global/*.js')
        .pipe(strip())
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
        .pipe(strip())
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
        .pipe(strip())
        .pipe(concat(`status-${idJS}.bundle.js`))
        .pipe(terser({
            compress: true,
            mangle: true
        }))
        .pipe(gulp.dest('public/js'))
})

gulp.task('validate-js', () => {
    return gulp
        .src([
            'assets/js/validation/message.js', 
            'assets/js/validation/method-validation.js', 
            'assets/js/validation/admin/*.js',
        ])
        .pipe(strip())
        .pipe(concat(`validation-${idJS}.bundle.js`))
        .pipe(terser({
            compress: true,
            mangle: true
        }))
        .pipe(gulp.dest('public/js'))
})

gulp.task('helpers-js', () => {
    return gulp
        .src('assets/js/helpers/*.js')
        .pipe(strip())
        .pipe(concat(`helpers-${idJS}.bundle.js`))
        .pipe(terser({
            compress: true,
            mangle: true
        }))
        .pipe(gulp.dest('public/js'))
})

gulp.task('toast-js', () => {
    return gulp
        .src('assets/js/toast/*.js')
        .pipe(strip())
        .pipe(concat(`toast-${idJS}.bundle.js`))
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

gulp.task('validate-css', () => {
    return gulp
        .src('assets/css/validation/*.css')
        .pipe(concat(`validation-${idCSS}.min.css`))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('public/css'))
})

gulp.task('toast-css', () => {
    return gulp
        .src('assets/css/toast/*.css')
        .pipe(concat(`toast-${idCSS}.min.css`))
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


// Move all library to public file
gulp.task('move-library', () => {
    return gulp
        .src(['assets/lib*/**/*', 'assets/helpers*/**/*'])
        .pipe(gulp.dest('public'))
})


// Run tasks
gulp.task('minify-files', 
    gulp.parallel(
        'global-js', 
        'login-js', 
        'status-js',
        'validate-js',
        'helpers-js',
        'toast-js',
        'global-css',
        'login-css',
        'status-404',
        'status-403',
        'status-500',
        'validate-css',
        'toast-css',
        'images',
        'move-library'
    )
) 



