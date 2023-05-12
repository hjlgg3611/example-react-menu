const config = require('./webpack.config.js');
const webpackMerge = require('webpack-merge');

module.exports = webpackMerge.merge(config, {
    mode: 'development',
    devServer: {
        port: 3000,
        client: {
            overlay: true
        },
        historyApiFallback: true,
    }
});