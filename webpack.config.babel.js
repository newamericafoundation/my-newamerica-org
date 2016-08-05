import webpack from 'webpack';
import path from 'path';
import CompressionPlugin from 'compression-webpack-plugin';

const productionPlugins = [
  new webpack.optimize.UglifyJsPlugin({
    mangle: {
      except: [ '$super', '$', 'exports', 'require' ]
    }
  }),
  new CompressionPlugin()
];

const {NODE_ENV} = process.env;

export default {

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

  devtool: NODE_ENV === 'development' ? 'source-map' : null,

  plugins: NODE_ENV === 'production' ? productionPlugins : []

};
