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
import { Comment } from '../comment/comment.entity';

@Entity()
export  class Weibo extends  BaseEntity{

  //系统信息 😁
  @PrimaryGeneratedColumn() id:number;
  @CreateDateColumn() gen;


  //基本信息

  @Column({type:'text'})  content:string;

  @Column({default:0}) likes :number

  @ManyToOne(type => User,user => user.weibos)
  author:User

  @Column({default:''})  image:string

  @OneToMany(type => Comment,comment => comment.weibo)
  comments: Comment[]

}
