'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // BASE_URI: '"/"'
  BASE_URI: '"http://192.168.0.147:8082/"'
  // BASE_URI: '"http://39.107.78.209:8088/"'
})
