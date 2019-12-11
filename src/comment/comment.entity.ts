import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity, JoinColumn, JoinTable,
  ManyToMany, ManyToOne, OneToMany, OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Weibo } from '../weibo/weibo.entity';


@Entity()
export  class Comment extends  BaseEntity{

  //系统信息 😁
  @PrimaryGeneratedColumn() id:number;
  @CreateDateColumn() gen;


  //基本信息
  @Column()  content:string;

  @ManyToOne(type => User)
  author:User

  @ManyToOne(type => Weibo,weibo => weibo.comments,{onDelete:'CASCADE'})
  weibo:Weibo

  @Column() weiboId :number


}
