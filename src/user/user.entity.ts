import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Request } from '../request/request.entity';
import { History } from '../history/history.entity';
import { Weibo } from '../weibo/weibo.entity';
import { Notify } from '../notify/notify.entity';
import { Board } from '../board/board.entity';
import { Tip } from '../tip/tip.entity';

@Entity()
export class User extends BaseEntity {
  //系统信息 😁
  @PrimaryGeneratedColumn() id: number;
  @CreateDateColumn() gen;
  @UpdateDateColumn() update;
  @Column({ type: Date }) lastLogin: Date;

  //基本信息

  //名字
  @Column({ type: 'varchar', length: 14 }) username: string;

  //名字
  @Column({ type: 'varchar', length: 8 }) nickname: string;

  //头像
  @Column({default:0}) avatar:number;

  //出生日期

  @Column() birth: Date;

  //密码
  @Column({ type: 'varchar', length: 10, default: '123' }) password: string;

  //简介
  @Column({ type: 'text' }) des;

  //年龄
  @Column({ default: 18 }) age: number;

  //性别
  @Column({ default: true }) sex: boolean;

  //城市
  @Column() city:string

  //
  @Column( { default: '1999-9-10' }) freezeDate:Date;

  //emial
  @Column({ type: 'varchar', length: 20, default: '992273994@qq.com' })
  email: string;

  //好友
  @ManyToMany(type => User)
  @JoinTable()
  friends: User[];

  @OneToMany(type => Request, req => req.to)
  froms: Request[];

  @OneToMany(type => Request, req => req.from)
  tos: Request[];

  @ManyToMany(type => History, history => history.belongers)
  @JoinTable()
  histories: History[];

  @OneToMany(type => Weibo, weibo => weibo.author)
  weibos: Weibo[];

  @OneToMany(type => Notify, noti => noti.belonger)
  notifies: Notify[];

  @OneToMany(type => Board, b => b.belonger)
  boards: Board;

  @OneToMany(type => Tip,tip => tip.to)
  tips:Tip
}
