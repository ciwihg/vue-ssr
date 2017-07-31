const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin= require('extract-text-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
 module.exports={
   output:{
     path:path.resolve(__dirname, '../compile-res'),
     publicPath:'/compile-res/',
     filename:'[name].[chunkhash].js'
   },
   module:{
     noParse:/es6-promise\.js$/,
     rules:[
       {
      test: /\.vue$/,
      loader: 'vue-loader',
      options: {
        preserveWhitespace: false
      }
    },
    {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    },
    {
      test: /\.(png|jpg|gif|svg)$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: '[name].[ext]?[hash]'
      }
    }
     ]
   },
   performance: {
    maxEntrypointSize: 300000,
    hints:  false
  }
 }
