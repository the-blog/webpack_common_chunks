const path = require('path')
const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const AssetsPlugin = require('assets-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const CSS_SOURCE_MAP = false

module.exports = {
  watch: true,

  entry: {
    index: './assets/index.js'
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

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),

    new webpack.HashedModuleIdsPlugin(),

    // https://github.com/webpack/webpack/issues/4638
    new webpack.optimize.CommonsChunkPlugin({
        async: 'jquery',
        children: true,
        minChunks: (m) => /node_modules\/(?:jquery|react)/.test(m.context)
    }),

    new webpack.optimize.CommonsChunkPlugin({
        async: 'react',
        children: true,
        minChunks: (m) => /node_modules\/(?:react)/.test(m.context)
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: "manifest",
      minChunks: Infinity
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
      },

      {
        test : /\.jsx?/,
        exclude: /\.css/,
        loader : 'babel-loader'
      }
    ]
  }
};
