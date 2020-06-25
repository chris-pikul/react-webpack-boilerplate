const Path = require('path');
const Webpack = require('webpack');

const NunjucksPlugin = require('nunjucks-webpack-plugin');
const CSSPlugin = require('mini-css-extract-plugin');

const Package = require( Path.resolve(__dirname, 'package.json') );

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',

    output: {
        path: Path.resolve(__dirname, 'build'),
    },

    devServer: {
        inline: true,
        port: 8080,
        contentBase: [
            Path.resolve(__dirname, 'build'),
            Path.resolve(__dirname, 'static'),
            Path.resolve(__dirname),
        ],
        watchOptions: {
            aggregateTimeout: 500,
            poll: true,
            ignored: /node_modules/
        },
        historyApiFallback: true,
    },

    module: {
        rules: [
            //CSS Processing
            {
                test: /\.s?css$/,
                exclude: /node_modules/,
                use: [
                    { loader: CSSPlugin.loader, options: { publicPath: 'dist/' } },
                    { loader: 'css-loader', options: { importLoaders: 1 } },
                    { loader: 'sass-loader' },
                ],
            }
        ]
    },

    plugins: [
        new Webpack.DefinePlugin({
            ENVIRONMENT: JSON.stringify('LOCAL'),
            VERSION: JSON.stringify( Package.version ),
        }),

        new CSSPlugin({
            filename: `${Package.name}.css`,
        }),

        new NunjucksPlugin({
            templates: [
                {
                    from: Path.resolve(__dirname, 'html', 'index.njk'),
                    to: Path.resolve(__dirname, 'build', 'index.html'),
                    context: {
                        Package,
                        Dev: true,
                    },
                },
            ]
        }),
    ]
};