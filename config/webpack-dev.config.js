/**
 * Created by Procopiou Nick on 9/9/2015.
 */

var path = require('path');
var webpack = require('webpack');
var fs = require('fs');
var paths = require('./paths.js')
var srcPath = path.join(__dirname, '');

var entries = {};

var pages = fs.readdirSync(paths.SRC.JS_PAGES);

pages.forEach(function(page) {
    entries[page] = path.join(paths.SRC.JS_PAGES, page, 'index.js');
});

module.exports = {
    src: entries['user'],
    entry: entries,
    output: {
        path: paths.DEST.JS,
        filename: '[name].generated.js'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.ProvidePlugin({
            'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
        }),
    ],
    resolve: {
        root: srcPath,
        extensions: ['', '.js'],
        modulesDirectories: ['node_modules', 'scripts']
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel?cacheDirectory'
            },
            {
                test: /\.jsx$/,
                loader: 'jsx-loader'
            }
        ]
    },
    target: "web"
};