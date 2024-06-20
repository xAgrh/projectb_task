import { ApiProperty } from '@nestjs/swagger';

export class BrowsePaginatedFEQuery {
  @ApiProperty({
    example: '',
    required: false,
    description: 'Search string. You can search by _id or by an email',
  })
  q: string = '';

  @ApiProperty({
    example: '1',
    required: false,
    description: 'On which page you are currently',
  })
  page: string; // TODO: fix type

  @ApiProperty({
    example: '25',
    required: false,
    description: 'How many results you want to see for a specific page',
  })
  limit: string; // TODO: fix type
}

export class DbPaginatedQuery {
  where?: any;

  offset?: number = 0;

  limit?: number = 25;
}
