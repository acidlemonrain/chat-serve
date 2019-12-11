import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';

@WebSocketGateway(  { namespace: 'anoys' })
export class ChatGateway implements OnGatewayConnection,OnGatewayInit,OnGatewayDisconnect{
  @WebSocketServer() server;

  history = []
  onlineUser = []

  afterInit(server ): any {
    setInterval(()=>{
      this.history = []
    },1000*60*10)
  }

  handleConnection(client , ...args: any[]): any {
    console.log('有人加入匿名聊天室');
    this.onlineUser.push(client)
    this.server.emit('onlineUser',this.onlineUser.length)
    this.history.forEach(msg=>{
      this.server.to(client.id).emit('chat', msg);
    })
  }

  handleDisconnect(client ): any {
   let idx =  this.onlineUser.map(user=>user.id).indexOf(client.id)
   this.onlineUser.splice(idx,1)
    this.server.emit('onlineUser',this.onlineUser.length)
  }

  //聊天
  @SubscribeMessage('chat')
  async chat(client,data){
    this.server.emit('chat',data)
    this.history.push(data)
    if(this.history.length>20) this.history.shift()
  }


}
