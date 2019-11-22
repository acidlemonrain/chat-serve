import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HistoryRepository } from '../history/history.repository';
import { User } from '../user/user.entity';
import { UserRepository } from '../user/user.repository';
import { History } from '../history/history.entity';

@Injectable()
export class ChatService {
  constructor( @InjectRepository(HistoryRepository)
               private  historyDb:HistoryRepository,
               @InjectRepository(User)
               private  userDb: UserRepository,){}
      //在线用户
   onlineUsers ={

   }


  async keepHistory(data){
    let history = new History()
     const _usera = await this.userDb.findOne(data.fromId)
     const _userb = await this.userDb.findOne(data.toId)
    history.msg = data.msg
    history.fromId = data.fromId
    history.toId = data.toId
    history.belongers=[_usera,_userb]
   await this.historyDb.save(history)
   }

  addonlineUsers(user){
       this.onlineUsers[user.id] = user
  }





}
