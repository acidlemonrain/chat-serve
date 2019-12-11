import {
  Body,
  Controller,
  Get,
  Logger,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HistoryRepository } from '../history/history.repository';
import { WeiboRepository } from './weibo.repository';
import { FileInterceptor } from '@nestjs/platform-express';

import { diskStorage } from 'multer';
import { CommentRepository } from '../comment/comment.repository';
const uuidv1 = require('uuid/v1');
@Controller('weibo')
export class WeiboController {
  constructor(
    @InjectRepository(WeiboRepository)
    private weiboDb: WeiboRepository,
    @InjectRepository(CommentRepository)
    private commentDb: CommentRepository,
  ) {}

  //获取weibo
  @Post('/')
  async getawll(@Body() body) {
    let pages = await  this.weiboDb.count();
    pages = Math.ceil(pages/7);
    let weibos = await this.weiboDb.find({
      relations: ['author'],
      order: { gen: 'DESC' },
      skip: (body.page - 1)*7,
      take:10
    });
    return  {
      pages:pages,
      weibos:weibos
    }
  }

  //获取评论
  @Post('/comments')
  async getcomments(@Body() body) {
    return await this.weiboDb.findOne({
      where: { id: body.id },
      relations: ['comments', 'comments.author'],
    });
  }

  //创建新的微博
  @Post('create')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './file',
        filename: (req, file, cb) => {
          var type = 'jpg';
          if (file.minetype == 'image/jpeg') type = 'jpg';
          return cb(null, uuidv1() + '.' + type);
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file, @Body() body) {
    if (file) {
      this.weiboDb.save({
        author: body.author,
        content: body.content,
        image: file.filename,
      });
    } else {
      this.weiboDb.save({
        author: body.author,
        content: body.content,
      });
    }
  }

  //删除weibo
  @Post('/remove')
 async remove(@Body() body){
    let weibo = await  this.weiboDb.findOne(body.id,{relations:['comments']})
    let comments = weibo.comments
    comments.forEach( async (cmt)=>{
     await this.commentDb.remove(cmt)
    })
   return  await this.weiboDb.remove(body)
  }
}
