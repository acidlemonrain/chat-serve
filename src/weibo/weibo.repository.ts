import {EntityRepository, Repository} from "typeorm";
import { Weibo } from './weibo.entity';


@EntityRepository(Weibo)
export  class  WeiboRepository extends Repository<Weibo>  {

}
