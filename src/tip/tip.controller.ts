import { Body, Controller, Get, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RequestRepository } from '../request/request.repository';
import { UserRepository } from '../user/user.repository';
import { TipRepository } from './tip.repository';

@Controller('tip')
export class TipController {

  constructor(
    @InjectRepository(TipRepository)
    private tipDb: TipRepository,
  ) {

  }

  @Get('')
  async  get_all(){
    return  await  this.tipDb.find({relations:['to','from']})
  }

  @Post('')
   async make_tip(@Body() body){
    return  await this.tipDb.save(body)
  }
}
