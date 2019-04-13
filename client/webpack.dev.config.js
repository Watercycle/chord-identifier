// TODO: this is way out of sync right now. Only use `npm run build`

const path = require('path')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const dev = process.env.NODE_ENV === 'development'
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const CompressionPlugin = require("compression-webpack-plugin")
const TerserPlugin = require('terser-webpack-plugin')
const WorkboxPlugin = require('workbox-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: ['./src/index.tsx'],
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.styl'],
    alias: {
      'inferno': `inferno/dist/index${dev ? '.dev' : ''}.esm.js`,
    }
  },
  optimization: {
    minimizer: [new TerserPlugin()],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "styles.css"
    }),
    new WorkboxPlugin.GenerateSW({
      swDest: 'service-worker.js',
      globDirectory: './src/static/',
      globPatterns: ['**/*.{ico,json,js,png,html,css,svg}'],
      clientsClaim: true,
      skipWaiting: true
    })
  ],
  module: {
    rules: [
      // Stylus CSS
      {
        test: /\.styl$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'stylus-loader'
        ],
      },

      // Typescript
      {
        test: /\.(js|jsx|tsx|ts)$/,
        loaders: 'babel-loader',
        exclude: /node_modules/
      }
    ],
  },
}