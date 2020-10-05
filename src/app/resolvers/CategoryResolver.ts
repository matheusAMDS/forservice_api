import { Query, Resolver } from 'type-graphql'
import Category from '../models/Category'

@Resolver()
class CategoryResolver {
  @Query(type => [Category])
  public async categories() {
    const categories = await Category.find()

    return categories
  }
}

export default CategoryResolver