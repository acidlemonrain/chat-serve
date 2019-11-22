import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Weibo } from '../weibo/weibo.entity';

@Entity()
export class Board extends BaseEntity {
  //系统信息 😁
  @PrimaryGeneratedColumn() id: number;
  @CreateDateColumn() gen;

  //内容
  @Column() content: string;

  //作者
  @ManyToOne(type => User)
  author: User;

  //属于
  @ManyToOne(type => User, u => u.boards)
  belonger: User;
}
