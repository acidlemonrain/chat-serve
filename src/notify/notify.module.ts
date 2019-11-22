import { Module } from '@nestjs/common';
import { NotifyController } from './notify.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotifyRepository } from './notify.repository';
import { UserRepository } from '../user/user.repository';

@Module({
  imports:[TypeOrmModule.forFeature([NotifyRepository,UserRepository])],
  controllers: [NotifyController]
})
export class NotifyModule {}
