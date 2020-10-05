import { Field, ID, ObjectType } from 'type-graphql'
import bcrypt from 'bcryptjs'
import { 
  Entity, 
  Column, 
  PrimaryGeneratedColumn,
  BaseEntity, 
  BeforeInsert, 
  AfterLoad, 
  OneToMany, JoinColumn 
} from 'typeorm'

import Service from './Service'

@ObjectType()
@Entity('users')
class User extends BaseEntity {
  @Field(type => ID)
  @PrimaryGeneratedColumn('uuid')
  public id: string
  
  @Column({ name: 'first_name' })
  public firstName: string 
  
  @Column({ name: 'last_name' })
  public lastName: string

  @Field()
  public name: string
  
  @Field()
  @Column()
  public email: string 
    
  @Field()
  @Column()
  public password: string

  @Field()
  @Column()
  public whatsapp: string 

  @Field(type => [Service])
  @OneToMany(type => Service, service => service.user)
  @JoinColumn()
  public services: Service[]

  @BeforeInsert()
  private async encryptPassword() {
    this.password = await bcrypt.hash(this.password, 10)
  }

  @AfterLoad()
  private getName() {
    this.name = `${this.firstName} ${this.lastName}`
  }
}

export default User 