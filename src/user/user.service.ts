import {Inject, Injectable} from '@nestjs/common';
import {User} from "./user.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {UserRepository} from "./user.repository";
import { RequestRepository } from '../request/request.repository';
import { Request } from '../request/request.entity';

@Injectable()
export class UserService {
      constructor(
      @InjectRepository(User)
      private  userDb: UserRepository,
      @InjectRepository(Request)
      private  reqDb:RequestRepository
    ) {

      
      }


    //所有用户--方法
    getAllUsers(obj){
        return this.userDb.find({skip:obj.skip,take:obj.take})
    }



    //寻找用户--方法
    async  findUser(username:string,id?:number):Promise<User>{
         if(username == null){
             let user = await this.userDb.findOne({id:id},{relations:['friends','tos','tos.to','tos.from','froms','froms.to','froms.from']});
             return user
         } else{
             let user = await this.userDb.findOne({username:username},{relations:['friends','tos','tos.to','tos.from','froms','froms.to','froms.from']});
             return user
         }
    }

    //用户注册流程--方法
    async createUser(body){
        let existuser = await this.userDb.findOne({username:body.username})
        if(!existuser){
            console.log(existuser)
            //用户基本信息
            let user = {...body, ...{ lastLogin:new Date(),des:''}}
            //在数据库中保存
           await this.userDb.save(user);
            return  true
        }else {
            console.log('错误--注册--用户名已经存在')
            return false
        }
    }





    //修改用户的登录时间
    async  updateLastLogin(username){
        let user = await this.findUser(username)
         user.lastLogin = new Date();
        this.userDb.save(user);
    }




    //修改请求状态
    async  touchReq(obj:{reqId:number,status:any}){
       await this.reqDb.update({id:obj.reqId},{status:obj.status})
    }



}
