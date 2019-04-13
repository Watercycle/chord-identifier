const path = require('path')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const TerserPlugin = require('terser-webpack-plugin')
const WorkboxPlugin = require('workbox-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const WebpackPwaManifest = require('webpack-pwa-manifest')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

const AddWorkboxOfflineSupport = new WorkboxPlugin.GenerateSW({
  swDest: 'service-worker.js',
  clientsClaim: true,
  skipWaiting: true,

  runtimeCaching: [{
    urlPattern: /\.(?:js)$/,
    handler: 'CacheFirst',

    options: {
      cacheName: 'soundfonts',
      expiration: {
        maxEntries: 3,
      },
    },
  }]
})

const CleanOutputFolder = new CleanWebpackPlugin()

const GenerateIndexFile = new HtmlWebpackPlugin({
  template: './src/static/index.html'
})

const GenerateFavIcons = new FaviconsWebpackPlugin({
  logo: './src/static/piano-icon.png',
  prefix: 'favicons/icons-[hash]'
})

const InjectManifestIntoIndexFile = new WebpackPwaManifest({
  name: 'Chord Identifier',
  short_name: 'CI',
  description: 'Get good at identifying piano chords!',
  theme_color: '#373737',
  background_color: '#373737',
  crossorigin: 'use-credentials',
  icons: [
    {
      src: path.resolve('src/static/piano-icon.png'),
      sizes: [96, 128, 192, 256, 384, 512],
      destination: 'icons'
    }
  ]
})

const CopyOverStaticResources = new CopyPlugin([
  {from: 'src/static/soundfonts', to: 'soundfonts'}
])

const ExtractCssToFile = new MiniCssExtractPlugin({
  filename: "styles.[hash].css"
})

const rules = [
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
    exclude: /(node_modules|static)/
  },

  // Isomorphic Rendering (renders app to index.html)
  {
    test: /index\.html/,
    include: [path.resolve(__dirname, "src")],
    loader: 'prerender-loader?string'
  },

  // Makes stylus url's happy
  {
    test: /\.(png)$/,
    loader: 'file-loader',
  }
]

module.exports = {
  mode: 'production',
  entry: ['./src/index.tsx'],
  output: {
    path: path.resolve(__dirname, '../server/public'),
    filename: 'bundle.[hash].js'
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.styl'],
    alias: {
      'inferno': `inferno/dist/index.esm.js`,
    }
  },
  optimization: {
    minimizer: [
      new TerserPlugin()
    ],
  },
  plugins: [
    CleanOutputFolder,
    CopyOverStaticResources,
    ExtractCssToFile,
    GenerateIndexFile,
    InjectManifestIntoIndexFile,
    GenerateFavIcons,
    AddWorkboxOfflineSupport
  ],
  module: {
    rules: rules,
  }
}
