const { src, parallel, watch, dest } = require('gulp');
const browserSync = require('browser-sync');

exports.browsersync = () => {
    browserSync.init({
        server: { baseDir: 'src' },
        notify: false,
        online: true,
    })
};

exports.scripts = () => {

}