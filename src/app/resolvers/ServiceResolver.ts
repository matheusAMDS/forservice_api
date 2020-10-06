import { ForbiddenError, UserInputError } from "apollo-server-express"
import { 
  Args, 
  ArgsType, 
  Authorized, 
  Field, 
  Float, 
  Mutation, 
  Resolver,
  Ctx, Query, ID, InputType, Arg
} from "type-graphql"

import Category from "../models/Category"
import Service from "../models/Service"
import { Context } from "../lib/context"
import User from "../models/User"

@ArgsType()
class ServiceQuery {
  @Field(type => ID, { nullable: true })
  category?: number 

  @Field(type => ID, { nullable: true })
  user?: string
}

@ArgsType()
class CreateServiceParams {
  @Field()
  title: string 

  @Field()
  description: string

  @Field(type => Float)
  value: number

  @Field(type => ID)
  category: number
}

@Resolver()
class ServiceResolver {
  @Query(type => [Service])
  public async services(@Args() query: ServiceQuery) {
    const services = await Service.find({
      relations: ['category', 'user'],
      where: query
    })

    return services
  }

  @Authorized()
  @Mutation(type => Boolean)
  public async createService(@Args() params: CreateServiceParams, @Ctx() ctx: Context) {
    const { title, description, value, category } = params
    const loadedCategory = await Category.findOne({ id: category })

    if (!loadedCategory)
      throw new UserInputError('Invalid category for a service.')

    const user = await User.findOne({ id: ctx.user.id })

    if (!user)
      throw new ForbiddenError('Invalid user')

    await Service.create({ 
      title,
      description,
      value: value || 0,
      category: loadedCategory,
      user
    }).save()

    return true
  }

  @Authorized()
  @Mutation(type => Boolean)
  public async deleteService(@Arg('userId') userId: string) {
    await Service.delete({ user: { id: userId }})

    return true
  }
}

export default ServiceResolver