import { Request } from './request.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Request)
export  class  RequestRepository extends Repository<Request>  {

}
