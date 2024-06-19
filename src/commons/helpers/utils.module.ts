import { Module } from '@nestjs/common';
import { QueryUtils } from './query.utils';

@Module({
  providers: [QueryUtils],
  exports: [QueryUtils],
})
export class UtilsModule {}
