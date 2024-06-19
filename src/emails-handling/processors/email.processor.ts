import { MailerService } from '@nestjs-modules/mailer';
import { Processor, Process, OnQueueActive } from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import { Job } from 'bull';

@Injectable()
@Processor('email')
export class EmailConsumer {
  private logger: Logger = new Logger(this.constructor.name);
  constructor(private readonly mailerService: MailerService) {}

  @Process()
  async sendEmail(
    job: Job<{ email: string; firstName: string; lastName: string }>,
  ) {
    const { data } = job;
    const { email, firstName, lastName } = data;

    await this.mailerService.sendMail({
      to: email,
      from: '"Projectb" <test.us.fast@gmail.com>',
      subject: 'Welcome!',
      template: 'email', // Name of the email template (create the template in the 'templates' folder)
      context: {
        body: `Welcome to a system ${firstName} ${lastName}`,
      },
    });
  }

  @OnQueueActive()
  onActive(job: Job) {
    this.logger.log(
      `Processing job ${job.id} of type ${job.name} with data ${job.data}...`,
    );
  }
}
