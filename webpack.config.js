const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'none',
    entry: './src/app.tsx',
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.(css|scss)$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/,
                use: ['file-loader']
            },
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader', 'ts-loader'],
            }
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            title: 'reactMenu',
            filename: 'index.html',
            template: './src/asset/index.html'
        })
    ],
    resolve: {
        extensions: ['.js', '.ts', '.tsx', '.css', '.scss', '...']
    },
}