'use strict';

const webpack = require('webpack');
const path = require('path');
const CompressionPlugin = require('compression-webpack-plugin');

const productionPlugins = [
  new webpack.optimize.UglifyJsPlugin({
    mangle: {
      except: [ '$super', '$', 'exports', 'require' ]
    }
  }),
  new CompressionPlugin()
];

module.exports = {

  entry: './app/assets/scripts/bundle.js',

  output: {
    path: path.resolve('./public/assets/scripts'),
    publicPath: '',
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

  devtool: process.env.NODE_ENV === 'development' ? 'source-map' : null,

  plugins: process.env.NODE_ENV === 'production' ? productionPlugins : []

};
