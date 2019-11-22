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
export  class Request  extends  BaseEntity{
  //系统信息 😁
  @PrimaryGeneratedColumn() id:number;

  //发送方
  @ManyToOne(type => User, user => user.tos)
  from: User;

  @ManyToOne(type => User, user => user.froms)
  to: User;

  @Column() fromId:number

  @Column() toId:number

  @Column() msg:string

  @Column({default:0}) status:number;

  @Column( {type:'boolean',default:false}  ) fromDel:Boolean;

  @Column({type:'boolean',default:false}) toDel:Boolean;


}
