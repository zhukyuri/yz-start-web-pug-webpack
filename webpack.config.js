const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const path = require('path');

const NODE_ENV = process.env.NODE_ENV;

const extractSass = new ExtractTextPlugin('style.css');

const config = {
	entry: ['./source/entry.js'],
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'entry.js'
	},
	module: {
		loaders: [
			{
				test: /\.pug$/,
				loader: 'pug-html-loader'
			},
			{
				test: /\.scss$/,
				loaders: NODE_ENV === 'development' ?
					['style-loader', 'css-loader', 'postcss-loader', 'sass-loader', 'import-glob-loader'] :
					extractSass.extract(['css-loader', 'postcss-loader', 'sass-loader', 'import-glob-loader']),
				include: path.resolve(__dirname, 'source/scss')
			}
		]
	},
	plugins: [
		extractSass,
		new HtmlWebpackPlugin({
			template: './source/pug/index.pug'
		}),
		new webpack.LoaderOptionsPlugin({
			options: {
				postcss: [ autoprefixer({ browsers: ['last 2 versions'] }) ]
			}
		}),
		new webpack.HotModuleReplacementPlugin()
	]
};

if (NODE_ENV === 'development') {
	config.entry.unshift('webpack/hot/only-dev-server');
}

module.exports = config;