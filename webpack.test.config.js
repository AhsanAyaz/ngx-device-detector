const helpers = require('./config/helpers');
const webpack = require('webpack');
const path = require('path');
module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    resolve: {
        extensions: ['.ts', '.js'],
        modules: [helpers.root('src'), 'node_modules']
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: 'source-map-loader',
                exclude: [
                    helpers.root('node_modules/@angular')
                ]
            },
            {
                test: /\.ts$/,
                use: [
                    {
                        loader: 'ts-loader',
                    },
                    'angular-router-loader',
                    'angular2-template-loader'
                ],
                exclude: [/\.e2e\.ts$/]
            },
            {
                test: /[\/\\]@angular[\/\\]core[\/\\].+\.js$/,
                parser: { system: true },
            },
            {
                test: /(\.css|\.scss|\.sass)$/,
                use: ['to-string-loader', 'style-loader', 'css-loader', 'sass-loader'],
                exclude: [helpers.root('docs/index.html')]
            },
            {
                test: /\.html$/,
                loader: 'raw-loader',
                exclude: [helpers.root('docs/index.html')]
            },
            {
                enforce: 'post',
                test: /\.(js|ts)$/,
                loader: 'istanbul-instrumenter-loader',
                query: {
                    esModules: true
                },
                include: helpers.root('src'),
                exclude: [/\.(e2e|spec)\.ts$/, /node_modules/]
            },
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'test')
        }),
        new webpack.ContextReplacementPlugin(
            /\@angular(\\|\/)core(\\|\/)f?esm5/, path.join(__dirname, './src')
        )
    ],
    performance: {
        hints: false
    },
    node: {
        global: true,
        crypto: 'empty',
        process: false,
        module: false,
        clearImmediate: false,
        setImmediate: false,
        fs: 'empty'
    }
};