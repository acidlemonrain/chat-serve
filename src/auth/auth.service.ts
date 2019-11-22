import { Injectable } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { UserRepository } from '../user/user.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private userDb: UserRepository,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    let user: any = await this.userDb.findOne({
      where: { username: username },
      relations: ['friends', 'notifies', 'froms', 'tos','froms.from','tos.to','weibos'],
    })

    user = this.transform_user_friend(user);

    if (user) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      user: user,
      access_token: this.jwtService.sign(payload),
    };
  }

  transform_user_friend(user) {
    user.friends = user.friends.map(user => {
      return { ...user, ...{ notify: 0 } };
    });

    user.notifies.forEach(notify => {
      let notifyU = user.friends.find(u => {
        return u.id == notify.fromId;
      });
      if (notifyU) {
        console.log(notifyU);
        console.log('hyc! handsome man');
        notifyU.notify = notify.nums;
      }
    });

    return user;
  }
}
