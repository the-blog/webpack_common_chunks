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
    filename: "[name].[chunkhash].js",
    chunkFilename: "[chunkhash].js"
  },

  resolve : {
    extensions: [".js", ".json", ".sass", ".scss"],

    alias: {
      '@components':  `${globalConfig.rootPath}/assets/components/`,
      '@vendors':     `${globalConfig.rootPath}/assets/vendors`,

      '@jquery':      "@vendors/JQuery",
      '@react':       "@vendors/React",
      '@fotorama':    "@vendors/fotorama",
      '@rangeslider': "@vendors/rangeslider"
    }
  },

  module: {
    rules: [
      require('./webpack/rules/css').rules(globalConfig)[0],
      require('./webpack/rules/css').rules(globalConfig)[1],

      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        loader: 'file-loader',
        options: { name: "assets/[name]_[hash:6].[ext]" }
      },

      {
        test : /\.jsx?/,
        exclude: /\.css/,
        loader : 'babel-loader'
      },

      {
        test: /\.sass$/,
        use: [{
          loader: "style-loader"
        }, {
          loader: "css-loader"
        }, {
          loader: "sass-loader"
        }]
      },

      {
        test: /\.scss$/,
        use: [{
          loader: "style-loader"
        }, {
          loader: "css-loader"
        }, {
          loader: "sass-loader"
        }]
      }
    ]
  },

  plugins: [
    null,

    // new UglifyJsPlugin(),

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

    new webpack.optimize.CommonsChunkPlugin({
      name: "manifest",
      minChunks: Infinity
    }),

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

    new AssetsPlugin(),
    new BundleAnalyzerPlugin({openAnalyzer: false})
  ].filter(Boolean),
}
