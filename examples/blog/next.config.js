module.exports = (nextConfig) => {
  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      config.module.rules.push({
        test: /\.+(js|jsx|mjs|ts|tsx)$/,
        loader: options.defaultLoaders.babel,
        include: (path) => path.includes('widgets/src'),
      })

      config.resolve = config.resolve || {}
      config.resolve.alias = config.resolve.alias || {}
      config.resolve.alias.react = require.resolve('react')

      return config
    },
  })
}
