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
export  class Notify extends  BaseEntity{
  //系统信息 😁
  @PrimaryGeneratedColumn() id:number;

  @Column() nums:number

  @Column() fromId:number

  @Column() toId:number

  @ManyToOne(type => User,user => user.notifies)
  belonger:User

}
