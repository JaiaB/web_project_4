const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
  devtool: 'inline-source-map',
  entry: {
    main: './src/index.js',
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: ""
  },
  target: ['web', 'es5'],
  stats: {children: true},
  mode: 'development',
  devServer: {
    contentBase: path.resolve(__dirname, './dist'),
    compress: true,
    port: 8080,
    open: true
  },
  //devtool: 'cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        use:  'babel-loader',
        exclude: '/node_modules/'
      },
      {
        test: /\.css$/,
        type: 'asset/resource',
        use: [
          MiniCssExtractPlugin.loader,
        { 
          loader: 'css-loader', 
          options: { importLoaders: 1 } 
        }, 'postcss-loader']
      },
      {
        test: /\.(woff|woff2|svg|png|jpg)$/,
        use: 'file-loader'
      },
      {
        test: /\.html$/,
        use: 'html-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new MiniCssExtractPlugin(),
    new CleanWebpackPlugin(),
  ]
};