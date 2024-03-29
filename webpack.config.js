const HtmlWebpackPlugin = require('html-webpack-plugin'),
      webpack = require('webpack'),
      path    = require('path');

module.exports = {
   mode   : 'development',
   target : 'node',
   devtool: 'source-map',
   entry  : './public/index.js',
   output: {
      path: path.join(__dirname, 'dist'),
      filename: 'bundle.js',
      publicPath: '/'
   },
   devServer: {  
     contentBase: path.join(__dirname, 'dist'),
     publicPath: '/',
     compress: true,
     stats: 'errors-only',    
     historyApiFallback: true,
     inline: true,
     port: 3000,
     public: 'react-night-owls.glitch.me',
     allowedHosts: ['*.react-night-owls.glitch.me'],
     proxy: {
       '/api' : {
         target: 'http://localhost:' + process.env.PORT,
         pathRewrite : {'^/api' : ''},
         secure: true
       }
     }   
 
   },
   module: {
      rules: [
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            options: {
               presets: ['@babel/preset-env', '@babel/preset-react']
            }
         }, {
             test: /\.css$/,
             include: path.resolve(__dirname, './public/css'),
             use: [
                 'style-loader',
                 'css-loader'
             ]
         }, {
             test: /\.(png|jpe?g|gif|svg|ttf|woff|woff2|ttf)$/,
             include: path.resolve(__dirname, './public'),
             use: [
                 {
                loader: 'file-loader',
                options: {},
               },
            ],
          },
      ],
   },
   plugins:[
     new HtmlWebpackPlugin({
         template: './dist/index.html'
      }),
   ]
}
//'http://localhost:8080'

/*
     proxy: {
       '/api' : {
         target: 'http://localhost:3000',
         pathRewrite : {'^/api' : ''},
         secure: true
       }
     }   
*/

/*
,
                    '*.api.glitch.com',
                    '*.glitch.com' 
*/