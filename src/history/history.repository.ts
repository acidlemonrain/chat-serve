import { History } from './history.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(History)
export  class  HistoryRepository extends Repository<History>  {

}
