import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, BeforeInsert } from 'typeorm'
import bcrypt from 'bcryptjs'
import { Field, ID, ObjectType } from 'type-graphql'

@ObjectType()
@Entity('users')
class User extends BaseEntity {
  @Field(type => ID)
  @PrimaryGeneratedColumn('uuid')
  public id: string
  
  @Field()
  @Column({ name: 'first_name' })
  public firstName: string 
  
  @Field()
  @Column({ name: 'last_name' })
  public lastName: string
  
  @Field()
  @Column()
  public email: string 
    
  @Field()
  @Column()
  public password: string

  @BeforeInsert()
  private async encryptPassword() {
    this.password = await bcrypt.hash(this.password, 10)
  }
}

export default User 