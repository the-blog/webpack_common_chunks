const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  watch: true,

  entry: './assets/index.js',

  output: {
    filename: 'bundle.js'
  },

  plugins: [
    new UglifyJsPlugin()
  ],

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      }
    ]
  }
};
