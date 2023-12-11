const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const Book = require('./models/library');
const Author = require('./models/author');
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
require('dotenv').config()
const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = `
  type Book {
    title: String! ,
    published: Int! ,
    author: Author! ,
    genres: [String]! ,
  }

  type Author {
    name: String! ,
    born: String ,
    bookCount: Int!
  }

  type Mutation {
    addBook(
    title:String! ,
    author:String! ,
    published:Int! ,
    genres:[String!]! ,
    ): Book

    editAuthor(
      name:String!,
      setBornTo:Int! ,
    ): Author
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(name:String,genre:String): [Book!]!
    allAuthors: [Author!]!
  }
`

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (args.name || args.genre) {
        const filteredBooks = await Book.find({
          $or: [
            { 'author.name': args.name },
            { genres: { $in: [args.genre] } }
          ]
        }).populate('author')
        return filteredBooks
      }
      return await Book.find({}).populate('author')
    },
    allAuthors: async (root, args) => {
      let authors = await Author.find({})
      authors = authors.map(author => author.toObject());
      for (let i = 0; i < authors.length; i++) {
        const author = authors[i];
        let books = await Book.find({}).populate('author')
        books = books.map(book => book.toObject());
        bookCount = books.filter(book => {
          return book.author && book.author.name == author.name
        }).length;
        authors[i] = { ...author, bookCount };
      }
      return authors
    }
  },
  Mutation: {
    addBook: async (root, args) => {
      console.log("add book");
      let author = await Author.find({ name: args.author })
      if (author.length == 0) {
        author = new Author({ name: args.author, bookCount: 0 })
        await author.save()
      }
      if (author.length == 1) {
        author=author[0]
      }
      console.log(author);
      const book = new Book({ ...args, author: author._id })
      await book.save();
      return await book.populate('author')
    },
    editAuthor: async (root, args) => {
      return await Author.findOneAndUpdate({ name: args.name }, { born: args.setBornTo }, { new: true })
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})