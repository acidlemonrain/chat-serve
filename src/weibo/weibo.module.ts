import { Module } from '@nestjs/common';
import { WeiboController } from './weibo.controller';
import { WeiboService } from './weibo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistoryRepository } from '../history/history.repository';
import { WeiboRepository } from './weibo.repository';

@Module({
  imports:[TypeOrmModule.forFeature([WeiboRepository])],
  controllers: [WeiboController],
  providers: [WeiboService]
})
export class WeiboModule {}
