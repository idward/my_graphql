const express = require('express')
const path = require('path')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackConfig = require('../webpack.config')
const {ApolloServer} = require('apollo-server-express')
const typeDefs = require('./schema/typeDefs')
const resolvers = require('./schema/resolvers')

const app = express()

const compiler = webpack(webpackConfig)

app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  quiet: true,
  publicPath: webpackConfig.output.publicPath
}))

app.use(webpackHotMiddleware(compiler, {
  log: false
}))

app.use(express.static(path.resolve(__dirname, 'public')))

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.applyMiddleware({app, path: '/graphql'})

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../public', 'index.html'))
})

app.listen('3000', () => {
  console.log('server is listening on port 3000')
})
