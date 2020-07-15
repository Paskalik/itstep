const preprocessor = 'sass';

const { src, parallel, watch, dest } = require('gulp');
const browserSync = require('browser-sync');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
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
    watch(`src/**/${preprocessor}/**/*.${preprocessor}`, exports.styles);
    watch('src/**/*.html').on('change', browserSync.reload)
}

exports.styles = function styles() {
    return src([
        `src/${preprocessor}/styles.${preprocessor}`
    ])
        .pipe((preprocessor === 'sass') ? sass() : less())
        .pipe(concat('styles.min.css'))
        .pipe(autoPrefixer({overrideBrowsersList: ['last 10 versions']}))
        .pipe(cleanCss({level: 1, compatibility: 'ie8'}))
        .pipe(dest('src/css'))
        .pipe(browserSync.stream())
}


exports.default = parallel(exports.styles, exports.scripts, exports.browsersync, exports.startWatcher);