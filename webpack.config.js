// In webpack.config.js
// const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglify-js-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: path.resolve(__dirname, 'src/index.html'),
  filename: 'index.html',
  inject: 'body',
  links: [
    'https://fonts.googleapis.com/css?family=Roboto',
  ],
});
const config = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        loader: 'babel-loader',
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: [/\.scss$/, /\.css$/],
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
        }),
      },
      {
        test: /\.json$/,
        use: 'json-loader',
      },
      {
        test: /\.(eot|woff|woff2|svg|ttf)([?]?.*)$/, loader: 'file-loader',
      },
    ],
  },
  performance: {
    hints: 'warning', // enum
    maxAssetSize: 200000, // int (in bytes),
    maxEntrypointSize: 400000, // int (in bytes)
    assetFilter: assetFilename => (
      assetFilename.endsWith('.css') ||
      assetFilename.endsWith('.js')
    ),
  },
  devtool: 'source-map', // enum
  devServer:{
    compress: true,
    proxy: {
      "/api/**": {
        target: 'http://localhost:3000', 
        secure: false,
        bypass: function(req, res, proxyOptions) {
          if (req.headers.accept.indexOf("html") !== -1) {
            console.log("Skipping proxy for browser request.");
            return "/index.html";
          }
        },
        pathRewrite: {
          '^/api': '/'
        },
        changeOrigin: true,
      }
    },
  },
  plugins: [
    HTMLWebpackPluginConfig,
    new UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
    new ExtractTextPlugin({
      filename: 'app.css',
      allChunks: true,
    }),
  ],
};
module.exports = config;

