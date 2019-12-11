import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity, JoinColumn, JoinTable,
  ManyToMany, ManyToOne, OneToMany, OneToOne,
  PrimaryGeneratedColumn,

} from 'typeorm';

import { User } from '../user/user.entity';


@Entity()
export  class History extends  BaseEntity{
  //系统信息 😁
  @PrimaryGeneratedColumn() id:number;
  @CreateDateColumn() gen;

  //名字
  @Column({type:'varchar',length:255  }) msg:string

  @Column() fromId:number

  @Column() toId:number

  @ManyToMany(type => User, user => user.histories)
  belongers : User[]

  @ManyToOne(type => User)
  from:User

  @ManyToOne(type => User)
  to:User

}
