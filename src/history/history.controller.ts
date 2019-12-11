import { Body, Controller, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HistoryRepository } from './history.repository';
import { Any, In } from 'typeorm';
import { NotifyRepository } from '../notify/notify.repository';
import { UserRepository } from '../user/user.repository';

@Controller('history')
export class HistoryController {

  constructor(
    @InjectRepository(HistoryRepository)
    private  historyDb:HistoryRepository,
    @InjectRepository(NotifyRepository)
    private  notifyDb:NotifyRepository,
    @InjectRepository(UserRepository)
    private  userDb:UserRepository,
  ){

  }

  //查看与好友的历史聊天记录
  @Post('/')
  async history(@Body() body)
  {
    return await this.historyDb.find({where:{toId:In([body.toId,body.fromId]) ,fromId:In([body.toId,body.fromId])}})
  }

  //获取没有查看的chat
  @Post('/notify')
  async getnotifyhistroy(@Body() body){
   let _notify = await this.notifyDb.findOne({where:{toId:body.fromId,fromId:body.toId}})
    _notify.nums = 0;
    this.notifyDb.save(_notify)
    return await this.historyDb.find({where:{toId:In([body.toId,body.fromId]) ,fromId:In([body.toId,body.fromId])},take:body.nums,order:{gen:'ASC'}})
  }
}
