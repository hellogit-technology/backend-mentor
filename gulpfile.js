const gulp = require('gulp')
const concat = require('gulp-concat')
const cleanCSS = require('gulp-clean-css')
const imagemin = require('gulp-imagemin')
const terser = require('gulp-terser')
const strip = require('gulp-strip-comments');

const processScript = (src, bundleName, dest) => {
    return gulp.src(src)
    .pipe(strip())
    .pipe(concat(bundleName))
    .pipe(terser({
        compress: true,
        mangle: true
    }))
    .pipe(gulp.dest(dest))
}

const processStyle = (src, minifyName, dest) => {
    return gulp.src(src)
    .pipe(concat(minifyName))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest(dest))
}


// Optimize images
gulp.task('images', () => {
    return gulp.src('assets/img/*')
        .pipe(imagemin({optimizationLevel: 5}))
        .pipe(gulp.dest('public/img'))
})


// Optimize global
gulp.task('script', () => {
    const source = ['assets/global/plugins.js', 'assets/global/scripts.js']
    return processScript(source, 'global.bundle.min.js', 'public/global')
})
gulp.task('style', () => {
    const source = ['assets/global/plugins.css', 'assets/global/style.css']
    return processStyle(source, 'global.min.css', 'public/global')
})
gulp.task('font', () => {
    return gulp.src(['assets/global/fonts*/**/*'])
        .pipe(gulp.dest('public/global'))
})
gulp.task('global', gulp.parallel('script', 'style', 'font'))


// Optimize login
gulp.task('login-script', () => {
    return processScript('assets/js/login/*.js', 'login.bundle.min.js', 'public/js')
})
gulp.task('login-style', () => {
    return processStyle('assets/css/login/*.css', 'login.min.css', 'public/css')
})
gulp.task('login', gulp.parallel(
    'login-script',
    'login-style'
))


// Optimize validation
gulp.task('validation-method', () => {
    const source = ['assets/js/validation/message.js', 'assets/js/validation/method-validation.js']
    return processScript(source, 'methods.bundle.min.js', 'public/js')
})
gulp.task('validation-admin', () => {
    return processScript('assets/js/validation/admin/*.js', 'validation-ad23.bundle.min.js', 'public/js')
})
gulp.task('validation-club', () => {
    return processScript('assets/js/validation/club/*.js', 'validation-cl23.bundle.min.js', 'public/js')
})
gulp.task('validation-style', () => {
    return processStyle('assets/css/validation/*.css', 'validation.min.css', 'public/css')
})
gulp.task('validation', gulp.parallel(
    'validation-method',
    'validation-admin',
    'validation-club',
    'validation-style'
))


// Optimize toast
gulp.task('toast-script', () => {
    return processScript('assets/js/toast/*.js', 'toast.bundle.min.js', 'public/js')
})
gulp.task('toast-style', () => {
    return processStyle('assets/css/toast/*.css', 'toast.min.css', 'public/css')
})
gulp.task('toast', gulp.parallel(
    'toast-script',
    'toast-style'
))


// Optimize status 
gulp.task('404', () => {
    return processStyle('assets/css/status/404.css', '404.min.css', 'public/css')
})
gulp.task('403-style', () => {
    return processStyle('assets/css/status/403.css', '403.min.css', 'public/css')
})
gulp.task('403-script', () => {
    return processScript('assets/js/status/403.js', '403.bundle.min.js', 'public/js')
})
gulp.task('500', () => {
    return processStyle('assets/css/status/500.css', '500.min.css', 'public/css')
})
gulp.task('status', gulp.parallel(
    '404',
    '403-style',
    '403-script',
    '500'
))


// Optimize event
gulp.task('event', () => {
    return processStyle('assets/css/event/*.css', 'event.min.css', 'public/css')
})

// Move library
gulp.task('library', () => {
    return gulp.src(['assets/lib*/**/*'])
        .pipe(gulp.dest('public'))
})


// Run tasks
gulp.task('minify', 
    gulp.parallel(
        'global', 
        'login',
        'images',
        'validation',
        'toast',
        'status',
        'library',
        'event'
))



