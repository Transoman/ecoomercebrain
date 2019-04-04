module.exports = function() {
    $.gulp.task('server', function() {
        $.browserSync.init({
            proxy: 'ecommercebrain.loc'
            // server: './build'
        });
    });
};