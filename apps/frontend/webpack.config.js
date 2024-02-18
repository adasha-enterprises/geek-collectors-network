const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const TEMPLATES_PATH = path.resolve(__dirname, 'templates');
const DIST_PATH = path.resolve(__dirname, 'dist');
const ASSETS_PATH = path.resolve(__dirname, 'assets');

const SRC_PATH = path.resolve(__dirname, 'src');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: {
    main: path.join(SRC_PATH, 'index.tsx'),
  },
  output: {
    path: DIST_PATH,
    filename: '[name].[contenthash].js',
    clean: true,
  },
  devServer: {
    static: DIST_PATH,
    hot: true,
    port: process.env.PORT,
    historyApiFallback: true,
  },
  module: {
    rules: [
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      { test: /\.s[ac]ss$/, use: ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader'] },
      { test: /\.(jpg|jpeg|png|svg|ico|webp|gif)$/, type: 'asset/resource' },
      { test: /\.tsx?$/, use: 'ts-loader', exclude: /node_modules/ },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(TEMPLATES_PATH, 'index.html'),
      base: '/',
    }),
    // new CopyPlugin({
    //   patterns: [{ from: PUBLIC_PATH, to: DIST_PATH }],
    // }),
  ],
}
