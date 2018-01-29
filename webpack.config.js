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
      {
        test: /\.css$/,
        include: path.resolve(__dirname, "assets/components"),
        use: [
          {
            loader: 'style-loader',
            options: { sourceMap: CSS_SOURCE_MAP }
          },

          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              sourceMap: CSS_SOURCE_MAP,
              localIdentName: '[hash:base64:5]'
            }
          },

          {
            loader: 'postcss-loader',
            options: { sourceMap: CSS_SOURCE_MAP }
          }
        ]
      },

      {
        test: /\.css$/,
        exclude: path.resolve(__dirname, "assets/components"),
        use: [
          {
            loader: 'style-loader',
            options: { sourceMap: CSS_SOURCE_MAP }
          },

          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              sourceMap: CSS_SOURCE_MAP,
            }
          },

          {
            loader: 'postcss-loader',
            options: { sourceMap: CSS_SOURCE_MAP }
          }
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
