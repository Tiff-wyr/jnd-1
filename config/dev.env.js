'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_URI: '"https://www.9nengdai.com/"'
  // BASE_URI: '"http://192.168.0.109:8082"'
  // BASE_URI: '"http://192.168.0.120:8082"'
})