const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      //generate html
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'JOT-JATE'
      }),
      //service worker
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'src-sw.js',
      }),
      //options for manifest
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: 'JOT-JATE',
        description: 'JOT PWA',
        background_color: '#ffffff',
        theme_color: '#FFC300',
        start_url: './',
        publicPath: './',
        icons: {
          src: path.resolve('src/images/logo.png'),
          sizes: [96, 128, 192, 256, 384, 512],
          destination: path.join('assets', 'icons'),
        }
      }),
    ],

    module: {
      rules: [
        //use css loader
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            option: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread',
                '@bebel/transform-runtime'],
            },
          },
        },
      ],
    },
  };
};
