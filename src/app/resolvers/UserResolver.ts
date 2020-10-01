import { UserInputError } from "apollo-server-express"
import { Arg, InputType, Field, Mutation, Resolver, Query } from "type-graphql"

import User from "../models/User"

@InputType()
class CreateUserInput {
  @Field()
  firstName: string 

  @Field()
  lastName: string 

  @Field()
  email: string

  @Field()
  password: string
}

@Resolver()
class UserResolver {
  @Query(() => [User]!)
  public async getUsers() {
    return await User.find()
  }
  
  @Mutation(() => Boolean)
  public async createUser(@Arg('params') params: CreateUserInput) {
    let user = await User.findOne({ email: params.email })

    if (user)
      throw new UserInputError('Email already being used.')

    await User.create(params).save()

    return true
  }
}

export default UserResolver