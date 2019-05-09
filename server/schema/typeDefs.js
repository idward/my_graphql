const {gql} = require('apollo-server-express')

const typeDefs = gql`
  type Book {
    title: String
    author: String
  }
  
  type Author {
    id: String
    books: [Book]
  }
  
  type Query {
    books: [Book]
    author(id:ID!): Author
  }
`
module.exports = typeDefs
