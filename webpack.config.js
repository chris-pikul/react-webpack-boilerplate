/**
 * This file holds the Webpack configuration.
 * It uses webpack-merge to split up the configuration into 2 files.
 * Then depending on the environment mode (development|production),
 * it either loads and merges the webpack.dev.js file,
 * or the webpack.prod.js file.
 */

const Path = require('path');
const Merge = require('webpack-merge');

const CleanPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;

const Package = require(Path.resolve(__dirname, 'package.json'));

const Common = {
    context: Path.resolve(__dirname, 'src'),
    entry: 'index.js',

    output: {
        filename: `${Package.name}.js`,
        chunkFilename: '[name].bundle.js',
        publicPath: '/',
    },

    module: {
        rules: [
            //JS Transforming
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },

            //CSS Transforming comes from child configs
        ],
    },

    plugins: [
        new CleanPlugin(),
    ],

    resolve: {
        extensions: [ '.js', '.jsx', '.json' ],
        alias: {
            JS: Path.resolve(__dirname, 'src'),
            Style: Path.resolve(__dirname, 'style'),
        },
        modules: [
            Path.resolve(__dirname, 'src'),
            Path.resolve(__dirname, 'style'),
            'node_modules',
        ],
    },

    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
    },
};

module.exports = function(env) {
    if(env && env.production || (process.env.NODE_ENV && process.env.NODE_ENV === 'production')) {
        console.log('Webpack is using PRODUCTION configuration!\n');
        return Merge(Common, require(Path.resolve(__dirname, 'webpack.prod.js')));
    }

    console.log('Webpack is using DEVELOPMENT configuration\n');
    return Merge(Common, require(Path.resolve(__dirname, 'webpack.dev.js')));
};

