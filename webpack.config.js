const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');

const baseConfig = {
  entry: path.resolve(__dirname, './src/index.tsx'),
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test:  /\.ts$|tsx/,
        use: { loader: 'babel-loader' },
        exclude: /node_modules/,
      },
      {
        test: /\.(c|sa|sc)ss$/i,
        exclude: /felipec\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.jsx'],
  },
  devServer: {
    historyApiFallback: true,
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, './dist'),
    assetModuleFilename: 'assets/[name][ext]',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './public/index.html'),
      filename: 'index.html',
    }),
    new ESLintPlugin({ extensions: ['ts'] }),
    new MiniCssExtractPlugin({
      filename: 'style.[contenthash].css',
    }),
    new CleanWebpackPlugin(),
    new Dotenv({
      path: './.env',
      systemvars: true
    }),
  ],
};

module.exports = ({ mode }) => {
  const isProductionMode = mode === 'prod';
  const envConfig = isProductionMode 
    ? require('./webpack.prod.config')
    : require('./webpack.dev.config');

  return merge(baseConfig, envConfig);
};