const webpackNodeExternals = require('webpack-node-externals')

const rules = [
  {
    test: /\.jsx?$/,
    exclude: /(node_modules)/,
    use: {
      loader: require.resolve(`babel-loader`),
      options: {
        presets: [require.resolve('@babel/preset-react')],
        babelrc: false,
      },
    },
  },
]

module.exports = [
  {
    entry: './src/client-entry.js',
    output: {
      path: `${__dirname}/dist`,
      filename: 'bundle.js',
    },
    // plugins: [new HtmlWebpackPlugin()],
    module: {
      rules,
    },
    resolve: {
      alias: {
        react: require.resolve('react'),
      },
    },
  },
  {
    entry: './src/server-entry.js',
    output: {
      path: `${__dirname}/dist-server`,
      libraryTarget: 'commonjs2',
      filename: 'bundle.js',
    },
    externals: [webpackNodeExternals()],
    target: 'node',
    // plugins: [new HtmlWebpackPlugin()],
    module: {
      rules,
    },
  },
]
