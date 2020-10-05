import { Field, Float, ID, ObjectType } from 'type-graphql'
import { 
  BaseEntity, 
  Column, 
  Entity, 
  JoinColumn, 
  ManyToOne, 
  OneToOne, 
  PrimaryGeneratedColumn 
} from 'typeorm'

import Category from './Category'
import User from './User'

@ObjectType()
@Entity('services')
class Service extends BaseEntity {
  @Field(type => ID)
  @PrimaryGeneratedColumn()
  public id: number 

  @Field()
  @Column()
  public title: string 

  @Field()
  @Column()
  public description: string 

  @Field(type => Float)
  @Column({ type: 'float' })
  public value: number

  @Field(type => User)
  @ManyToOne(type => User, user => user.services)
  @JoinColumn({ name: 'user_id' })
  public user: User

  @Field(type => Category)
  @OneToOne(type => Category)
  @JoinColumn({ name: 'category_id' })
  public category: Category
}

export default Service