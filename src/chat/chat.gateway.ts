import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { InjectRepository } from '@nestjs/typeorm';

import { HistoryRepository } from '../history/history.repository';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection,OnGatewayInit,OnGatewayDisconnect{
  constructor(private readonly  chatService : ChatService,  @InjectRepository(HistoryRepository)
  private  historyDb:HistoryRepository){}
  @WebSocketServer() server;

  clientIdToUserIdTable= {

  }

  afterInit(server): any {

  }

 async handleConnection(client) {

  }

  //离线
  handleDisconnect(client): any {
  this.disconnect(client)
  }
  //离线
  @SubscribeMessage('logout')
  async disconnect(client){
    let _user = (this.chatService.onlineUsers[this.clientIdToUserIdTable[client.id]]);
    delete this.chatService.onlineUsers[this.clientIdToUserIdTable[client.id]]
    console.log(this.chatService.onlineUsers);
    if(_user) {
      _user.friends.forEach(fd => {
        if(this.chatService.onlineUsers[fd.id]){
          console.log('hahah');
          this.sendTo(fd.id,'offline',_user)
        }
      })
    }
  }


  //加入服务器
  @SubscribeMessage('login')
    async connect(client,user){
    console.log(client.id);
    this.clientIdToUserIdTable[client.id] = user.id
    client.join(user.id)
    this.chatService.addonlineUsers(user)
    this.notify(user)
  }

  //聊天
  @SubscribeMessage('chat')
  async chat(client,data){

    this.sendTo(data.toId,'chat',data)
    this.sendTo(data.fromId,'chat',data)
    this.chatService.keepHistory(data)
  }

  notify(user){
    //
    user.friends.forEach(fd=>{
      if(this.chatService.onlineUsers[fd.id]){
        this.sendTo(user.id,'online',this.chatService.onlineUsers[fd.id])
        this.sendTo(fd.id,'online',user)
      }
    })
  }

  sendToAll(eventname,data){
    this.server.emit(eventname.toString(),data)
  }

  sendTo(room,eventname,data){
    this.server.to(room).emit(eventname, data);
  }

}
