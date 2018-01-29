function rules(globalConfig) {
  const CSS_SOURCE_MAP = globalConfig.CSS_SOURCE_MAP
  const componentsPath = globalConfig.rootPath + "/assets/components"

  return [
    {
      test: /\.css$/,
      include: componentsPath,
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
      exclude: componentsPath,
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
    }
  ]
}

module.exports.rules = rules
