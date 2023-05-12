const config = require('./webpack.config.js');
const webpackMerge = require('webpack-merge');

module.exports = webpackMerge.merge(config, {
    mode: 'production',
    devtool: 'cheap-module-source-map'
});