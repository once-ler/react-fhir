var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var strip = require('strip-loader');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var assetsPath = path.resolve(__dirname, '../static/dist');

module.exports = {
  devtool: 'source-map',
  context: path.resolve(__dirname, '..'),
  entry: {
    app: [ './src/client.js' ]
  },
  output: {
    // filename: '[name].min.js',
    filename: '[name]-[chunkhash].js',
    chunkFilename: '[name]-[chunkhash].js',
    path: assetsPath,
    publicPath: ''
  },
  progress: true,
  resolve: {
    modulesDirectories: [
      'src',
      'node_modules'
    ],
    extensions: ['', '.json', '.js', '.jsx', '.scss']
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      },
      '__DEVTOOLS__': false
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }),
    new ExtractTextPlugin('[name]-[contenthash].css', { allChunks: true }),
    new HtmlWebpackPlugin({
      title: 'Animal Census',
      filename: 'index.html',
      template: 'index.template.html',
      favicon: path.resolve(__dirname, '../static/favicon.ico')
    })
  ],
  module: {
    loaders: [
      { test: /\.scss$/, loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=2&sourceMap!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded&sourceMap=true&sourceMapContents=true') },
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader')},
      { test: /\.jsx?$/, exclude: /node_modules/, loaders: [strip.loader('debug'), 'babel']},
    ]
  }
};