import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity, JoinTable,
  ManyToMany, ManyToOne, OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export  class Tip  extends  BaseEntity{
  //系统信息 😁
  @PrimaryGeneratedColumn() id:number;

  //gen
  @CreateDateColumn() gen;

  //发送方
  @ManyToOne(type => User)
  from: User;

  //被举报方
  @ManyToOne(type => User, user => user.tips)
  to: User;

  @Column() fromId:number

  @Column() toId:number

  @Column()  content:string




}
