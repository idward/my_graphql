const {find, filter} = require('lodash')

const book1 = [
  {
    title: 'Harry Potter and the Chamber of Secrets11',
    author: 'J.K. Rowling',
  },
  {
    title: 'Harry Potter and the Chamber of Secrets22',
    author: 'J.K. Rowling',
  }
]

const book2 = [
  {
    title: 'Jurassic Park11',
    author: 'Michael Crichton',
  }
]

const books = [
  ...book1,
  ...book2
]

const authors = [
  {id: '001', name: 'J.K. Rowling', books: book1},
  {id: '002', name: 'Michael Crichton', books: book2}
]

const resolvers = {
  Query: {
    books: () => books,
    author(parent, args, context, info) {
      return find(authors, {id: args.id})
    }
  },
  Author: {
    books(author) {
      return filter(books, {author: author.name})
    }
  }
}

module.exports = resolvers
