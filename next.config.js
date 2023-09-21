/** @type {import('next').NextConfig} */
// const nextConfig = {
//   webpack: (config, options) => {
//     config.module.rules.push({
//       test: /\.(glsl|vs|fs)$/,
//       loader: 'ts-shader-loader'
//     })
//   }
// }

// module.exports = nextConfig

module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }) => {
    // Important: return the modified config
    //console.log('config', config.resolve.extensions)
    config.resolve.extensions.push('glsl')
    config.module.rules.push({
      test: /\.(glsl|vs|fs)$/,
      loader: 'ts-shader-loader'
    })
    return config
  }
}
