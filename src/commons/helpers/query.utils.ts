import { Injectable } from '@nestjs/common';
import { isNil, isEmpty } from 'lodash';

@Injectable()
export class QueryUtils {
  getQueryParams(query: any) {
    return {
      offset: this.getOffset(query.page, query.limit),
      page: this.getPage(query.page),
      limit: this.getLimit(query.limit),
    };
  }

  getPage(page: any): number {
    let result = 1;

    if (isEmpty(page)) return result;

    if (!isNil(page)) result = parseInt(page, 10);
    if (result < 1) result = 1;

    return result;
  }

  getLimit(limit: any): number {
    let result = 25;

    if (isEmpty(limit)) return result;

    if (!isNil(limit)) result = parseInt(limit, 10);
    if (result < 1) result = 1;

    return result;
  }

  getOffset(page: any, limit: any): number {
    const tmpPage = this.getPage(page);
    const tmpLimit = this.getLimit(limit);

    return (tmpPage - 1) * tmpLimit;
  }
}
