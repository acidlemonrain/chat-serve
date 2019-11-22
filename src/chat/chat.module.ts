import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistoryRepository } from '../history/history.repository';
import { UserRepository } from '../user/user.repository';

@Module({
  imports:[TypeOrmModule.forFeature([HistoryRepository,UserRepository])],
  providers: [ChatGateway, ChatService],

})
export class ChatModule {}
