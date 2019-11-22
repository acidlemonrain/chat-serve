import { Body, Controller, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentRepository } from './comment.repository';

@Controller('comment')
export class CommentController {
  constructor(
    @InjectRepository(CommentRepository)
    private  commentDb:CommentRepository
  ){

  }

  //创建评论
  @Post('/create')
  async make(@Body() body){
    return  await  this.commentDb.save(body)
  }
}
