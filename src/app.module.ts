import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatModule } from './chat/chat.module';
import { RequestModule } from './request/request.module';
import { HistoryModule } from './history/history.module';
import { WeiboModule } from './weibo/weibo.module';
import { CommentModule } from './comment/comment.module';
import { NotifyModule } from './notify/notify.module';
import { BoardModule } from './board/board.module';
import { FileModule } from './file/file.module';
import { ManagerModule } from './manager/manager.module';
import { TipModule } from './tip/tip.module';


@Module({
  imports: [UserModule,TypeOrmModule.forRoot(), ChatModule, RequestModule, HistoryModule, WeiboModule, CommentModule, NotifyModule, BoardModule, FileModule, ManagerModule, TipModule ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
