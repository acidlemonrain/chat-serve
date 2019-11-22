import {
  Body,
  Controller,
  Get,
  HttpCode, Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth/auth.service';
import { ancestorWhere } from 'tslint';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { Like } from 'typeorm';
import { transform_user_friend } from '../transfer_user';
import { cities } from '../city';
var randomName = require('chinese-random-name');
//路由控制c



@Controller('user')
export class UserController {
  constructor(
    @InjectRepository(User)
    private userDb: UserRepository,
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {

    for (let i =0 ; i<100 ; i++){
      this.makeuser()
    }



  }

  makeuser(){
    const datas = 'abcdefghijkmnmopqrstuvwxyz1234567890'
    const chatset = datas.split('')

    let user = new User()
    user.username = ''
    //设置用户名
    for (let i = 0; i<12; i++ ){
      let random_index = Math.floor(Math.random()*chatset.length)
      user.username += chatset[random_index]
    }
    //设置昵称
    var pres :any = '沉默0认真0美丽0k开心0痛苦0完美0迷人0帅气0聪明0乐观0奇妙0高级0高贵0动人0无知0冷淡0得力0优秀0现实0怕人'
    pres = pres.split('0')
    var nons : any = '学生0猫咪0熊猫0狐狸0海滩0乌龟0兔子0骑士0法师0牛奶0饼干0热狗0果汁0汽水0面包0平民0学者0苹果'
    nons = nons.split('0')
    let pres_index = Math.floor(Math.random()*pres.length)
    let nons_index = Math.floor(Math.random()*nons.length)
    user.nickname = pres[pres_index] + '之' + nons[nons_index]
    user.age =  10 + Math.floor(Math.random()*60)
    user.password = '123'
    user.birth = new Date()
    user.city = '海南省'
    user.sex = Math.random()>0.4
    user.lastLogin = new Date()
    user.des = '大家好~'
    user.email = '9922@qq.com'
    this.userDb.save(user)
  }

  @Post('get')
  async get(@Body() body) {
    let pages = await  this.userDb.count()
    pages = Math.ceil(pages/15)
    let res = await  this.userDb.find({take:15,skip:15*(body.page-1),relations:['friends']})
    return  {
      pages:pages,
      users:res
    }
  }
  //用户注册--路由
  @Post('/register')
  async createUser(@Body() body) {
    console.log('注册路由');
    if (await this.userService.createUser(body)) {
      console.log('注册成功');
      return true;
    } else {
      console.log('失败成功');
      return false;
    }
  }

  //选择用户
  @Post('/')
  async findUser(@Body() body) {
    let user: any = await this.userDb.findOne({
      where: { id: body.id },
      relations: ['friends', 'notifies'],
    });
    user.friends = user.friends.map(user => {
      return { ...user, ...{ notify: 0 } };
    });
    user.notifies.forEach(notify => {
      let notifyU = user.friends.find(u => {
        return u.id == notify.fromId;
      });
      if (notifyU) {
        notifyU.notify = notify.nums;
      }
    });
    return user;
  }

  //用户登录--路由
  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(@Body() body, @Request() req) {
    this.userService.updateLastLogin(req.user.username);
    return this.authService.login(req.user);
  }

  //用户获取详细信息--路由
  @Post('/detail')
  async detail(@Body() body, @Request() req) {
    return await this.userDb.findOne({
      where: { id: body.id },
      relations: ['weibos','boards','boards.author'],
    });
  }

  //获取模式用户--路由
  @UseGuards(AuthGuard('jwt'))
  @Post('/userPlaza')
  async findFriend(@Body() body) {
    return await this.userService.getAllUsers(body);
  }

  //刷新用户--路由
  @Post('/refresh')
  async makeRefresh(@Body() body) {
    let user = await this.userDb.findOne(body.id, {
      relations: [
        'friends',
        'notifies',
        'froms',
        'tos',
        'froms.from',
        'tos.to',
        'weibos'
      ],
    });
    user = transform_user_friend(user);
    return {
      user: user,
      access_token: null,
    };
  }

  //搜索用户路由
  @Post('/search')
  async find_user_line(@Body() body) {
    return await this.userDb.find({ nickname: Like(`%${body.nickname}%`) });
  }


  //修改基本信息
  @Post('/update')
  async  patch(@Body() body){
    console.log(body);
    return  await  this.userDb.update(body.id,{
      avatar:body.avatar,
      nickname:body.nickname,
      age:body.age,
      sex:body.sex,
      birth:body.birth,
      email:body.email,
      des:body.des,

    });
  }
}
