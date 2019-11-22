import { Body, Controller, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentRepository } from '../comment/comment.repository';
import { BoardRepository } from './board.repository';

@Controller('board')
export class BoardController {
  constructor(
    @InjectRepository(BoardRepository)
    private boardDb: BoardRepository,
  ) {}

  @Post('/')
  async  create(@Body() body){
   return  await this.boardDb.save(body);
  }


}
