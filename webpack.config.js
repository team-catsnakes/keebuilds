const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { webpack } = require('webpack');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: path.resolve(__dirname, './client/index.js'),
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'bundle.js',
    publicPath: '/build'
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, './build'),
      publicPath: '/',
    },
    proxy: {
      '/api':'http://localhost:3000',
    },
    compress: false,
    host: 'localhost',
    port: 8080,
    hot: true,
  },
  plugins: [new HtmlWebpackPlugin({ template: './client/index.html' })],
  module: {
    rules: [
      // babel rules
      {
        test: /\.jsx?/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          }
        }
      },
      // css rules
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.png$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              mimetype: 'image/png'
            }
          }
        ]
      }
    ]
  }
};