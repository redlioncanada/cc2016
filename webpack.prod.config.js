var webpack = require('webpack'),
    path = require('path'),
    autoprefixer = require('autoprefixer'),
    precss = require('precss'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    WebpackStripLoader = require('strip-loader'),
    CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin"),
    stripLoader = {
     test: [/\.js$/, /\.es6$/],
     exclude: /node_modules/,
     loader: WebpackStripLoader.loader('console.log')
    },
    HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
        template: __dirname + '/app/index.html',
        filename: 'index.html',
        inject: 'body'
    })

module.exports = {
  entry: [
    './app/js/index.js'
  ],
  loaders: [
    {
      test: /\.scss$/,
      loader: "style-loader!css-loader!postcss-loader"
    },
    stripLoader
  ],
  output: {
    path: __dirname + '/dist',
    filename: "index.compiled.js"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: __dirname + '/app',
        loader: "babel-loader",
        query: {
            presets: ['react', 'es2015', 'stage-0']
        }
      },
      {
        test: /\.scss$/,
        loader: "style-loader!css-loader!postcss-loader!sass-loader?sourceMap"
      },
      {
        test: /\.jpg|.jpeg|.png|.gif$/,
        loader: "file?name=images/[name].[ext]"
      },
      {
          test: /\.(eot|svg|ttf|woff|woff2)$/,
          loader: 'file?name=fonts/[name].[ext]'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ],
    sassLoader: {
      includePaths: [path.resolve(__dirname, "./app/index.scss")]
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    HTMLWebpackPluginConfig,
    new CommonsChunkPlugin("commons.chunk.js"),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
  ],
  postcss: function () {
      return [precss, autoprefixer];
  }
};