import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity, JoinColumn, JoinTable,
  ManyToMany, ManyToOne, OneToMany, OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { FriendRequest } from '../friend-request/friendRequest.entity';
import { Request } from '../request/request.entity';
import { User } from '../user/user.entity';


@Entity()
export  class History extends  BaseEntity{
  //系统信息 😁
  @PrimaryGeneratedColumn() id:number;
  @CreateDateColumn() gen;

  //基本信息

  //名字
  @Column({type:'varchar',length:255  }) msg:string



  @Column() fromId:number

  @Column() toId:number


  @ManyToMany(type => User, user => user.histories)
  belongers : User[]









}
