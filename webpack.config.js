const path = require('path')
const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const AssetsPlugin = require('assets-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const NODE_ENV = process.env.NODE_ENV || 'development'

const isDev = NODE_ENV === 'development'
const isProd = NODE_ENV === 'production'
const CSS_SOURCE_MAP = isDev

const globalConfig = {
  rootPath: path.join(__dirname),

  isDev: isDev,
  isProd: isProd,
  SOURCE_MAP: CSS_SOURCE_MAP
}

const componentsPath = globalConfig.rootPath + "/assets/components"

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
      '@rangeslider': "@vendors/rangeslider",

      '@font-awesome': "./vendors/fontawesome",
      '@bootstrap':    "./vendors/bootstrap"
    }
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: componentsPath,
        use: cssLoader()
      },

      {
        test: /\.css$/,
        include: componentsPath,
        use: componentsCSSLoader()
      },

      {
        test: /.(woff|woff2|eot|ttf)$/,
        use: fontsLoader()
      },

      {
        test: /.(png|gif|jpg|jpeg)$/,
        use: imagesLoader()
      },

      {
        test: /.svg$/,
        use: svgLoader()
      },

      {
        test : /.(js|jsx)$/,
        use: jsLoader()
      },

      {
        test: /.s(a|c)ss$/,
        use: sassLoader()
      }
    ]
  },

  plugins: [
    null,
    addUglifyJsPlugin(),

    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    }),

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: nodeEnv()
      }
    }),

    new webpack.HashedModuleIdsPlugin(),

    new webpack.optimize.CommonsChunkPlugin({
      name: "manifest",
      minChunks: Infinity
    }),

    // https://github.com/webpack/webpack/issues/4638
    // new webpack.optimize.CommonsChunkPlugin({
    //   async: 'jquery',
    //   children: true,
    //   minChunks: (m) => /node_modules\/(?:jquery|react|bootstrap)/.test(m.context)
    // }),
    //
    // new webpack.optimize.CommonsChunkPlugin({
    //   async: 'react',
    //   children: true,
    //   minChunks: (m) => /node_modules\/(?:react|bootstrap)/.test(m.context)
    // }),
    //
    // new webpack.optimize.CommonsChunkPlugin({
    //   async: 'bootstrap',
    //   children: true,
    //   minChunks: (m) => /node_modules\/(?:bootstrap)/.test(m.context)
    // }),

    new AssetsPlugin(),
    new BundleAnalyzerPlugin({openAnalyzer: false})
  ].filter(Boolean),
}

// HELPERS

function addUglifyJsPlugin () {
  if (isDev) return null
  return new UglifyJsPlugin()
}

function nodeEnv () {
  return JSON.stringify(NODE_ENV)
}

// LOADERS

function fontsLoader () {
  return [
    defaultFileLoader()
  ]
}

function imagesLoader () {
  return [
    defaultFileLoader(),

    {
      loader: 'image-webpack-loader',
      options: {
        mozjpeg: {
          progressive: true,
          quality: 65
        },
        optipng: {
          enabled: true,
        },
        pngquant: {
          quality: '65-90',
          speed: 4
        },
        gifsicle: {
          interlaced: false,
        }
      }
    }
  ]
}

function svgLoader() {
  return [
    defaultFileLoader(),

    {
      loader: 'svgo-loader',

      options: {
        plugins: [
          { removeTitle: true },
          { convertColors: {shorthex: true} },
          { convertPathData: true }
        ]
      }
    }
  ]
}

function jsLoader() {
  return [
    { loader : 'babel-loader' }
  ]
}

function sassLoader() {
  return [
    defaultStyleLoader(),
    defaultCSSLoader(),
    { loader: "sass-loader" }
  ]
}

function componentsCSSLoader() {
  return [
    defaultStyleLoader(),

    {
      loader: 'css-loader',
      options: {
        importLoaders: 1,
        sourceMap: CSS_SOURCE_MAP,

        modules: true,
        localIdentName: '[hash:base64:5]'
      }
    },

    defaultPostCSSLoader()
  ]
}

function cssLoader() {
  return [
    defaultStyleLoader(),
    defaultCSSLoader(),
    defaultPostCSSLoader()
  ]
}

function defaultStyleLoader () {
  return {
    loader: 'style-loader',
    options: { sourceMap: CSS_SOURCE_MAP }
  }
}

function defaultFileLoader () {
  return {
    loader: 'file-loader',
    options: { name: "assets/[name]_[hash:6].[ext]" }
  }
}

function defaultPostCSSLoader () {
  return {
    loader: 'postcss-loader',
    options: { sourceMap: CSS_SOURCE_MAP }
  }
}

function defaultCSSLoader () {
  return {
    loader: 'css-loader',
    options: {
      importLoaders: 1,
      sourceMap: CSS_SOURCE_MAP,
    }
  }
}
