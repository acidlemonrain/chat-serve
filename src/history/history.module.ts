import { Module } from '@nestjs/common';
import { HistoryController } from './history.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistoryRepository } from './history.repository';

import { NotifyRepository } from '../notify/notify.repository';

@Module({
  imports:[TypeOrmModule.forFeature([HistoryRepository,NotifyRepository])],
  controllers: [HistoryController]
})
export class HistoryModule {}
