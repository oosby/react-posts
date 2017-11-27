const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');

module.exports = {
  entry: path.join(__dirname, 'src/main'),
  output: {
    filename: 'posts.js',
    path: path.resolve(__dirname, 'dist'),
},
 module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, 'src')
        ],
        exclude: [
          path.resolve(__dirname, 'node_modules')
        ],
        loader: 'babel-loader',
        options: {
          presets: ['env', 'react']
        }
      },
      {
        test: /\.scss$/,
        include: [
          path.resolve(__dirname, 'src/')
        ],
        exclude: [
          path.resolve(__dirname, 'node_modules' )
        ],
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          //use: 'css-loader?sass-loader',
          use: 'css-loader?modules=false&localIdentName=[name]__[local]___[hash:base64:5]!sass-loader',
        }),
      }
    ]
  },
  node: {
    net: 'empty',
    tls: 'empty',
    dns: 'empty',
    fs: 'empty'
  },
  watch: true,
  plugins: [
    new ExtractTextPlugin("style.css"),
  ],
  devtool: 'source-map'
  
}
