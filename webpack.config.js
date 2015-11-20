var webpack = require('webpack'),
	path = require('path');

module.exports = {

	entry: './app/assets/scripts/bundle.js',

	output: {
		path: path.resolve('./public/assets/scripts'),
		publicPath: 'http://localhost:3000/',
		filename: 'bundle.js'
	},

	module: {
		loaders: [
			{
	            test: /\.json$/,
	            loaders: ['json-loader']
	        },
			{
				test: /(\.js)|(\.jsx)$/,
				loader: 'babel-loader',
				query: {
					presets: [ 'es2015', 'react' ]
				}
			},
			{
				test: /\.scss$/,
				loaders: [ 'style', 'css', 'sass' ]
			}

		]
	},

	plugins: [
		// new webpack.optimize.UglifyJsPlugin({
		// 	mangle: {
		// 		except: [ '$super', '$', 'exports', 'require' ]
		// 	}
		// })
	]

}