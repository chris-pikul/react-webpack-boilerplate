const Path = require('path');

const Webpack = require('webpack');
const NunjucksPlugin = require('nunjucks-webpack-plugin');
const CSSPlugin = require('mini-css-extract-plugin');

const Package = require('./package.json');

module.exports = {
    mode: 'production',
    devtool: false,

    output: {
        path: Path.resolve(__dirname, 'dist'),
        filename: `${Package.name}-v${Package.version}.js`,
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
                    { loader: 'postcss-loader' },
                    { loader: 'sass-loader' },
                ],
            }
        ]
    },

    plugins: [
        new Webpack.DefinePlugin({
            ENVIRONMENT: JSON.stringify('PRODUCTION'),
            VERSION: JSON.stringify( Package.version ),
        }),

        new CSSPlugin({
            filename: `${Package.name}-v${Package.version}.css`,
        }),

        new NunjucksPlugin({
            templates: [
                {
                    from: Path.resolve(__dirname, 'html', 'index.njk'),
                    to: Path.resolve(__dirname, 'dist', 'index.html'),
                    context: {
                        Package,
                        Dev: false,
                    },
                },
            ]
        }),
    ],
}