const preprocessor = 'sass';

const { src, parallel, watch, dest } = require('gulp');
const browserSync = require('browser-sync');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const customizeBootstrap = require('gulp-customize-bootstrap');
const sass = require('gulp-sass');
const less = require('gulp-less');
const cleanCss = require('gulp-clean-css');
const autoPrefixer = require('gulp-autoprefixer');

exports.browsersync = function browsersync() {
    browserSync.init({
        server: { baseDir: 'src' },
        notify: false,
        online: true,
    })
};

exports.scripts = function scripts() {
    return src([
        'node_modules/jquery/dist/jquery.min.js',
        'src/js/script.js'
    ])
        .pipe(concat('script.min.js'))
        .pipe(uglify())
        .pipe(dest('src/js/'))
        .pipe(browserSync.stream())
}

exports.startWatcher = function startWatcher() {
    watch(['src/**/*.js', '!src/**/*.min.js'], exports.scripts);
    watch([`src/**/${preprocessor}/**/*.${preprocessor}`, 'src/**/scss/*.scss'], exports.styles);
    watch('src/**/*.html').on('change', browserSync.reload)
}

exports.compileBootstrap = function compileBootstrap() {
    return src([
        (preprocessor === 'less') ? 'node_modules/bootstrap/less/bootstrap.less' : 'node_modules/bootstrap/scss/bootstrap.scss'
    ])
        .pipe(customizeBootstrap((preprocessor === 'less') ? 'src/less/*.less' : 'src/scss/*.scss'))
        .pipe((preprocessor === 'sass') ? sass() : less())
        //.pipe(dest('styles/'));
}

exports.styles = function styles() {
    return src([
        (preprocessor === 'less') ? `src/${preprocessor}/styles.${preprocessor}` : 'src/scss/*.scss'
    ])
        .pipe((preprocessor === 'sass') ? sass() : less())
        .pipe(concat('styles.min.css'))
        .pipe(autoPrefixer({overrideBrowsersList: ['last 10 versions']}))
        .pipe(cleanCss({level: 1, compatibility: 'ie8'}))
        .pipe(dest('src/css'))
        .pipe(browserSync.stream())
}


exports.default = parallel(exports.compileBootstrap, exports.styles, exports.scripts, exports.browsersync, exports.startWatcher);