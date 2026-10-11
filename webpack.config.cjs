const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, 'src/main.jsx'),
  output: { path: path.resolve(__dirname, 'dist'), filename: 'js/[name].[contenthash].js', publicPath: '/', clean: true },
  resolve: { extensions: ['.js', '.jsx', '.json'] },
  module: { rules: [
    { test: /\.[jt]sx?$/, exclude: /node_modules/, use: { loader: 'babel-loader', options: { presets: [['@babel/preset-env', { targets: 'defaults' }], ['@babel/preset-react', { runtime: 'automatic' }]] } } },
    { test: /\.css$/i, use: ['style-loader', 'css-loader'] },
    { test: /\.(png|jpe?g|gif|svg|avif|webp)$/i, type: 'asset/resource', generator: { filename: 'assets/[name][ext]' } }
  ] },
  plugins: [new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'public/index.html') })],
  devServer: { 
    port: 5173, 
    historyApiFallback: true, 
    hot: true, 
    static: { directory: path.resolve(__dirname, 'public') },
    proxy: [
      {
        context: ['/api'],
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false
      }
    ]
  },
};