const path = require('path')
const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const AssetsPlugin = require('assets-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const globalConfig = {
  CSS_SOURCE_MAP: false,
  rootPath: path.join(__dirname)
}

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

  resolve : {
    alias: {
      '@jquery': path.join(__dirname, "/assets/vendors/JQuery"),
      '@react': path.join(__dirname, "/assets/vendors/React"),
      '@fotorama': path.join(__dirname, "/assets/vendors/fotorama"),
      '@rangeslider': path.join(__dirname, "/assets/vendors/rangeslider"),
      '@components': path.join(__dirname, "/assets/components/")
    }
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
      require('./webpack/rules/css').rules(globalConfig)[0],
      require('./webpack/rules/css').rules(globalConfig)[1],

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
