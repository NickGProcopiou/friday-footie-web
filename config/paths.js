/**
 * Created by procopiou_nick on 21/09/2015.
 */

var path = require("path");

var paths = {};

paths.ROOT = path.join(__dirname, '..');

paths.SCRIPTS = path.join(paths.ROOT, 'scripts');

paths.STYLES = path.join(paths.ROOT, 'styles');

paths.SERVER_ROOT = path.join(paths.ROOT, 'app');

paths.SRC = {
    JS: path.join(paths.SCRIPTS),
    JS_PAGES: path.join(paths.SCRIPTS, 'pages'),
    SASS: path.join(paths.STYLES, 'sass'),
    SASS_PAGES: path.join(paths.STYLES, 'sass', 'pages', '*.scss')
};

paths.DEST = {
    JS: path.join(paths.SERVER_ROOT, 'generated'),
    CSS: path.join(paths.SERVER_ROOT, 'generated')
};

module.exports = paths;