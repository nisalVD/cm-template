const path = require( 'path' );
const webpack = require( 'webpack' );
const BrowserSyncPlugin = require( 'browser-sync-webpack-plugin' );

const config = require( './config.json' );

const webpackConfig = {
	entry: [
		'./src/index.js'
	],
	output: {
		filename: 'bundle.js',
		path: path.resolve( __dirname, 'dist' ),
		publicPath : '/'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loaders: [ 'babel-loader' ]
			},
			{
				test: /\.css$/,
				use: [
					{ loader: 'style-loader' },
					{
						loader: 'css-loader',
						options: {
							modules: true
						}
					}
				]
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: [
					'file-loader'
				]
			}
		]
	},
	devtool: "eval-source-map",
	plugins: [
		new webpack.optimize.UglifyJsPlugin(),
		new BrowserSyncPlugin( {
				proxy: config.proxyURL,
				files: [
					'**/*.php'
				],
				reloadDelay: 0
			}
		),
	]
};

module.exports = webpackConfig;