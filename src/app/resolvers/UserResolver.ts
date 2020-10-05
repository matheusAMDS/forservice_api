import { UserInputError } from "apollo-server-express"
import { Args, ArgsType, Field, Mutation, Resolver, Query } from "type-graphql"

import User from "../models/User"

@ArgsType()
class CreateUserArgs {
  @Field()
  firstName: string 

  @Field()
  lastName: string 

  @Field()
  email: string

  @Field()
  password: string

  @Field()
  whatsapp: string
}

@Resolver()
class UserResolver {
  @Query(() => [User]!)
  public async users() {
    return await User.find({ relations: ['services'] })
  }
  
  @Mutation(() => Boolean)
  public async createUser(@Args() params: CreateUserArgs) {
    let user = await User.findOne({ email: params.email })

    if (user)
      throw new UserInputError('Email already being used.')

    await User.create(params).save()

    return true
  }
}

export default UserResolver