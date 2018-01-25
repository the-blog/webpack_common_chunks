const path = require('path')
const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const AssetsPlugin = require('assets-webpack-plugin')

module.exports = {
  watch: true,

  entry: {
    index: './assets/index.js',
    rangeslider: './assets/rangeslider.js',
    fotorama: './assets/fotorama.js'
  },

  output: {
    publicPath: './bundles/',
    path: path.join(__dirname, 'bundles'),
    filename: "[name].[chunkhash].js"
  },

  plugins: [
    new UglifyJsPlugin(),

    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: "commonChunk",
      filename: "[name].[chunkhash].js",
      chunks: ["index", "rangeslider", "fotorama"],
      minChunks: 3
    }),

    new AssetsPlugin()
  ],

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000'
      }
    ]
  }
};
