import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistoryRepository } from '../history/history.repository';
import { CommentRepository } from './comment.repository';

@Module({
  imports:[TypeOrmModule.forFeature([CommentRepository])],
  controllers: [CommentController]
})
export class CommentModule {}
