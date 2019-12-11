import { Body, Controller, Get, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { UserRepository } from '../user/user.repository';
import { History } from '../history/history.entity';
import { HistoryRepository } from '../history/history.repository';

import * as moment from 'moment'


@Controller('manager')
export class ManagerController {
  constructor(
    @InjectRepository(History) private historyDb: HistoryRepository,
    @InjectRepository(User) private userDb: UserRepository,
  ) {
      historyDb.find().then(hs=>{
        hs.forEach(h=>{

        })
      })
  }



  @Post('history')
  async  gethistory(@Body() body)
  {
    return  await  this.historyDb.find({where:{fromId:body.id},relations:['to']})
  }

  @Get('history')
  async history(){
    return await this.historyDb.find({order:{'gen':'DESC'}})
  }


  @Get('usercity')
  async get_all_user_city(){
    return  await  this.userDb.find({select:['city']})
  }

  @Post('freezeuser')
  async black(@Body() body){
    let now = moment(new Date())
    let blackDate = now.add(body.days,'days').format('YYYY-MM-DD');
    return  await  this.userDb.update(body.id,{freezeDate:blackDate})
  }

  @Post('/usermanage')
  async  usermanage(@Body() body){
    return  await this.userDb.findOne({where:{id:body.id},relations:['friends','weibos','tips']})
  }


}
