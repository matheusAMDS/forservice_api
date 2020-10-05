import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { Field, ID, ObjectType } from 'type-graphql'

@ObjectType()
@Entity('categories')
class Category extends BaseEntity {
  @Field(type => ID)
  @PrimaryGeneratedColumn()
  public id: number

  @Field()
  @Column()
  public name: string
}

export default Category