import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AddMailJobToQueueCommand } from '../add-mail-job-to-queue.command';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@CommandHandler(AddMailJobToQueueCommand)
export class AddMailJobToQueueCommandHandler
  implements ICommandHandler<AddMailJobToQueueCommand>
{
  constructor(@InjectQueue('email') private readonly emailQueue: Queue) {}

  async execute(command: AddMailJobToQueueCommand) {
    const job = await this.emailQueue.add({
      _id: command._id,
      email: command.email,
      firstName: command.firstName,
      lastName: command.lastName,
    });

    return {
      jobId: job.id,
    };
  }
}
