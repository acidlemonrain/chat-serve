import { Module } from '@nestjs/common';
import { TipController } from './tip.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotifyRepository } from '../notify/notify.repository';
import { UserRepository } from '../user/user.repository';
import { TipRepository } from './tip.repository';

@Module({
  imports:[TypeOrmModule.forFeature([NotifyRepository,TipRepository])],
  controllers: [TipController]
})
export class TipModule {}
