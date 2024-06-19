import { Module } from '@nestjs/common';
import { EmailConsumer } from './processors/email.processor';
import { BullModule } from '@nestjs/bull';
import { SendNotificationSaga } from './sagas/send-notification.saga';
import { EmailsCommandHandlers } from './commands/handlers';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'email',
    }),
  ],
  providers: [...EmailsCommandHandlers, EmailConsumer, SendNotificationSaga],
  exports: [],
})
export class EmailsModule {}
