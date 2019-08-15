const merge = require('webpack-merge'),
      common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devServer: {    
    stats: 'errors-only',    
    historyApiFallback: true,
    inline: true,
    port: 3000,
    public: 'react-night-owls.glitch.me',
    allowedHosts: ['*.react-night-owls.glitch.me',
                   '*.api.glitch.com',
                   '*.glitch.com'
                  ],
    proxy: {
      '/api' : {
        target: 'http://localhost:8080',
        pathRewrite : {'^/api' : ''},
        secure: true
      }
    }     
  }    
});