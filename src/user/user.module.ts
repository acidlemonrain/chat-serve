import {forwardRef, Module} from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserRepository} from "./user.repository";
import {AuthModule} from "../auth/auth.module";

import { RequestRepository } from '../request/request.repository';


@Module({
  imports: [ TypeOrmModule.forFeature([ UserRepository ,RequestRepository]) ,forwardRef(()=>AuthModule)],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
