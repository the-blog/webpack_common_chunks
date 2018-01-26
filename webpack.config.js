const path = require('path')
const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const AssetsPlugin = require('assets-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const CSS_SOURCE_MAP = false

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
      name: "manifest",
      minChunks: Infinity
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: "commonChunk",
      filename: "[name].[chunkhash].js",
      chunks: ["index", "rangeslider", "fotorama"],
      minChunks: 3
    }),

    new AssetsPlugin(),
    // new BundleAnalyzerPlugin()
  ],

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader', options: { sourceMap: CSS_SOURCE_MAP } },
          { loader: 'css-loader', options: { sourceMap: CSS_SOURCE_MAP } },
          { loader: 'postcss-loader', options: { sourceMap: CSS_SOURCE_MAP } }
        ]
      },

      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000'
      }
    ]
  }
};
