import { IQuery } from '@nestjs/cqrs';
import { DbPaginatedQuery } from '../../../commons/dto/db-paginated-query.dto';

export class BrowseEmployeesQuery implements IQuery {
  constructor(public readonly query: DbPaginatedQuery) {}
}
