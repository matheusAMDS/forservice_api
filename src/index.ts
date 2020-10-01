import 'dotenv/config'
import 'reflect-metadata'
import './database/connection'
import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import { buildSchema } from 'type-graphql'

import resolvers from './app/resolvers'

(async () => {
  const PORT = process.env.PORT || 8000

  const app = express()
  const server = new ApolloServer({ 
    schema: await buildSchema({
      resolvers,
      validate: false
    })
  })

  server.applyMiddleware({ app })
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))
})()
