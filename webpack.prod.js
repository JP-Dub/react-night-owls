const merge  = require('webpack-merge'),
      common = require('./webpack.common.js');

module.export = merge(common, {
  mode: 'production'
});