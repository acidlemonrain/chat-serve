import { Module } from '@nestjs/common';
import { RequestController } from './request.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistoryRepository } from '../history/history.repository';
import { NotifyRepository } from '../notify/notify.repository';
import { RequestRepository } from './request.repository';
import { UserRepository } from '../user/user.repository';

@Module({

  imports:[TypeOrmModule.forFeature([RequestRepository,UserRepository])],
  controllers: [RequestController]
})
export class RequestModule {}
