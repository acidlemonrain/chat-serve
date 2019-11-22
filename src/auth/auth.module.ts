
import {forwardRef, Module} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import {UserModule} from "../user/user.module";
import {JwtStrategy} from './jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotifyRepository } from '../notify/notify.repository';
import { UserRepository } from '../user/user.repository';


@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    forwardRef(()=>UserModule),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60m' },
    }),
  ],
  providers: [AuthService, LocalStrategy,JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
