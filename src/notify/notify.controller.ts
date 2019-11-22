import { Body, Controller, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotifyRepository } from './notify.repository';
import { UserRepository } from '../user/user.repository';

@Controller('notify')
export class NotifyController {

  constructor(
    @InjectRepository(NotifyRepository)
    private  notifyDb:NotifyRepository,
    @InjectRepository(UserRepository)
    private  userDb:UserRepository
  ){

  }


  @Post('/')
  async create(@Body() body){
   let notify = await  this.notifyDb.findOne({toId:body.toId,fromId:body.fromId})
    if(notify){
      console.log('离线留言');
     return  await this.notifyDb.increment({id:notify.id},'nums',1)
    }else{
      console.log('nothing');
       let belonger = await this.userDb.findOne(body.toId);
       return  await  this.notifyDb.save({
         belonger:belonger,
         nums:0,
         fromId:body.fromId,
         toId:body.toId
       })
    }
  }


}
