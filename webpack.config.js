const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // Entry point of app
  entry: './src/js/index.js',
  output: {
    // Relative path to output folder
    path: path.resolve(__dirname, 'dist'),
    // Name of the output file
    filename: 'js/bundle.js'
  },
  devServer: {
    // Folder in which to serve from
    contentBase: './dist'
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html'
    })
  ]
};