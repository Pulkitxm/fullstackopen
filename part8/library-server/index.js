const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const Book = require('./models/library');
const Author = require('./models/author');
const User = require('./models/user');
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
require('dotenv').config()
const jwt = require('jsonwebtoken')
const MONGODB_URI = process.env.MONGODB_URI
const { GraphQLError } = require('graphql')
console.log('connecting to', MONGODB_URI)
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = `
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }
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
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(name:String,genre:String): [Book!]!
    allAuthors: [Author!]!
    me: User
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
    addBook: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError('You are not authorized', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.username,
          }
        })
      }
      console.log("add book");
      let author = await Author.find({ name: args.author })
      if (author.length == 0) {
        author = new Author({ name: args.author, bookCount: 0 })
        await author.save()
      }
      if (author.length == 1) {
        author = author[0]
      }
      console.log(author);
      const book = new Book({ ...args, author: author._id })
      await book.save();
      return await book.populate('author')
    },
    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError('You are not authorized', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.username,
          }
        })
      }
      return await Author.findOneAndUpdate({ name: args.name }, { born: args.setBornTo }, { new: true })
    },
    createUser: async (root, args) => {
      const user = new User({ username: args.username })
      return user.save()
        .catch(error => {
          throw new GraphQLError('Creating the user failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.username,
              error
            }
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      if (!user || args.password !== 'secret') {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }
      const userForToken = {
        username: user.username,
        id: user._id,
      }
      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    },
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.startsWith('Bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), process.env.JWT_SECRET
      )
      const currentUser = await User
        .findById(decodedToken.id).populate('friends')
      return { currentUser }
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})