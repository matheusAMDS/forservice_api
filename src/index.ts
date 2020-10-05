import 'dotenv/config'
import 'reflect-metadata'
import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import { buildSchema } from 'type-graphql'

import './database/connection'
import resolvers from './app/resolvers'
import { authenticate, authChecker } from './app/lib/auth'

(async () => {
  const PORT = process.env.PORT || 8000

  const app = express()
  const server = new ApolloServer({ 
    schema: await buildSchema({
      resolvers,
      validate: false,
      authChecker
    }),
    context: ({ req }) => ({
      req,
      user: authenticate(req)
    })
  })

  server.applyMiddleware({ app })
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}/graphql`)
  })
})()
