import { forwardRef, Module } from '@nestjs/common';
import { ManagerController } from './manager.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '../user/user.repository';
import { RequestRepository } from '../request/request.repository';
import { HistoryRepository } from '../history/history.repository';

@Module({
  imports: [ TypeOrmModule.forFeature([ UserRepository ,RequestRepository,HistoryRepository]) ],
  controllers: [ManagerController]
})
export class ManagerModule {}
