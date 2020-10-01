import { Args, ArgsType, Field, Mutation, Resolver } from "type-graphql"
import bcrypt from 'bcryptjs'
import { ForbiddenError, UserInputError } from "apollo-server-express"

import User from "../models/User"
import { generateAccessToken } from "../lib/auth"

@ArgsType()
class LoginArgs {
  @Field()
  email: string 

  @Field()
  password: string
}

@Resolver()
class SessionResolver {
  @Mutation(() => String)
  public async login(@Args() { email, password }: LoginArgs) {
    const user = await User.findOne({ email })

    if (!user)
      throw new UserInputError('Email not registered.')

    if (!await bcrypt.compare(password, user.password))
      throw new ForbiddenError('Wrong password.')
    
    return generateAccessToken({ id: user.id })
  }
}

export default SessionResolver