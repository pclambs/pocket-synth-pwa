const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const WebpackPwaManifest = require('webpack-pwa-manifest')
const { GenerateSW } = require('workbox-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: './src/js/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.bundle.js',
        publicPath: '',
    },
    devServer: {
        hot: true,
    },
    performance: {
        hints: false,
    },
    module: {
        rules: [
          {
            test: /\.css$/i,
            use: [MiniCssExtractPlugin.loader, 'css-loader']
          },
          {
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            type: 'asset/resource',
          },
          {
            test: /\.(?:js|mjs|cjs)$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                  ['@babel/preset-env', { targets: "defaults" }]
                ]
              }
            }
          }
        ]
      },
      optimization: {
        minimizer: [
          new CssMinimizerPlugin()
        ],
      },
      plugins: [
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
          template: './src/index.html'
        }),
        new WebpackPwaManifest({
          name: "Pocket Synth PWA",
          short_name: "Pocket Synth",
          description: "A small synth anyone can play.",
          background_color: 'pink',
          theme_color: 'pink',
          display: 'standalone',
          icons: [
            {
              src: path.resolve('src/images/background-dark-1.png'),
              sizes: [96, 128, 192, 256, 300, 512],
            }
          ]
        }),
        // new GenerateSW({
        //   swDest: './sw.js'
        // })
      ]
}