import { Module } from '@nestjs/common';
import { BoardController } from './board.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistoryRepository } from '../history/history.repository';
import { UserRepository } from '../user/user.repository';
import { BoardRepository } from './board.repository';

@Module({
  imports:[TypeOrmModule.forFeature([BoardRepository])],
  controllers: [BoardController]
})
export class BoardModule {}
