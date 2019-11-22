import { Body, Controller, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HistoryRepository } from '../history/history.repository';
import { RequestRepository } from './request.repository';
import { UserRepository } from '../user/user.repository';

@Controller('request')
export class RequestController {
  constructor(
    @InjectRepository(RequestRepository)
    private reqDb: RequestRepository,
    @InjectRepository(UserRepository)
    private userDb: UserRepository,
  ) {

  }

  @Post('/')
  async make(@Body() body) {
    let req = await this.reqDb.findOne({
      where: { toId: body.toId, fromId: body.fromId, status: 0 },
    });
    if (req) {
      return false;
    } else {
      return await this.reqDb.save(body);
    }
  }

  @Post('/agree')
  async ag(@Body() body) {
    const req = await this.reqDb.findOne(
      { id: body.id },
      { relations: ['to', 'from', 'to.friends', 'from.friends'] },
    );
    let _userA = req.from;
    let _userB = req.to;
    _userA.friends.push(_userB);
    _userB.friends.push(_userA);
    await this.userDb.save(_userB);
    await this.userDb.save(_userA);

    return await this.reqDb.update(body.id, { status: 1 });
  }

  @Post('/refuse')
  async ref(@Body() body) {
    return await this.reqDb.update(body.id, { status: -1 });
  }

  @Post('delete')
  async DELETE (@Body() body){
    let req = await this.reqDb.findOne(body.id)
    if(body.userId == req.fromId && !req.toDel){
        return  this.reqDb.update(body.id,{fromDel:true})
    }
    if(body.userId == req.fromId  && req.toDel){
      return  this.reqDb.remove(req)
    }
    if(body.userId == req.toId  && !req.fromDel){
      return  this.reqDb.update(body.id,{toDel:true})
    }
    if(body.userId == req.toId  && req.fromDel){
      return  this.reqDb.remove(req)
    }




  }
}
