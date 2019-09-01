const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'development',
    context: __dirname,
    target: 'web',
    devtool: 'source-map',
    devServer: {
        contentBase: './dist',
        port: 3000,
        stats: {
            modules: false,
            version: false,
            timings: false,
            builtAt: false,
            hash: false,
            excludeAssets: /\.(woff2?|ttf|eot)$/
        }
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    entry: {
        app: ['babel-polyfill', 'zone.js/dist/zone', './src/index.ts']
    },
    output: {
        filename: '[name].js',
        chunkFilename: 'js/[name].bundle.js',
        publicPath: '',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
        }),
        new HtmlWebpackPlugin({
            "template": "./docs/index.html"
        }),
        new CopyWebpackPlugin([
            { from: './src/manifest.json' }
        ]),
        // Removes warnings regarding Critical dependency
        new webpack.ContextReplacementPlugin(/\@angular(\\|\/)core(\\|\/)fesm5/, path.join(__dirname, './src')),
    ],
    module: {
        rules: [
            { test: /\.ts$/, loaders: ['ts-loader', 'angular-router-loader', 'angular2-template-loader'] },
            {
              // Mark files inside `@angular/core` as using SystemJS style dynamic imports.
              // Removing this will cause deprecation warnings to appear.
              test: /[\/\\]@angular[\/\\]core[\/\\].+\.js$/,
              parser: { system: true },
            },
            { test: /\.html$/, loader: 'html-loader' },
            { test: /\.(c|sa|sc)ss$/, use: [ "style-loader", "css-loader", "sass-loader" ] },
            { test: /\.(jpe?g|png|gif)$/i, loader: 'file-loader?name=assets/images/[name].[ext]' },
            { test: /\.ico$/, loader: 'file-loader?name=[name].[ext]' },
            { test: /\.eot(\?v=\d+.\d+.\d+)?$/, loader: 'file-loader?prefix=font/&limit=5000&name=assets/fonts/[name].[ext]' },
            { test: /\.(woff|woff2)$/, loader: 'file-loader?prefix=font/&limit=5000&name=assets/fonts/[name].[ext]' },
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader?limit=10000&mimetype=application/octet-stream&name=assets/fonts/[name].[ext]' },
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader?limit=10000&mimetype=image/svg+xml&name=assets/svgs/[name].[ext]' }
        ]
    },
    node: {
        console: false,
        global: true,
        process: true,
        Buffer: false,
        setImmediate: false
    }
};