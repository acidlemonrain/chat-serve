
import { EntityRepository, Repository } from 'typeorm';
import { Notify } from './notify.entity';

@EntityRepository(Notify)
export  class  NotifyRepository extends Repository<Notify>  {

}
