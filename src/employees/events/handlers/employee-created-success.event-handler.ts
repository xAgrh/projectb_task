import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { EmployeeCreatedSuccessEvent } from '../employee-created-success.event';

@EventsHandler(EmployeeCreatedSuccessEvent)
export class EmployeeCreatedSuccessEventHandler implements IEventHandler<EmployeeCreatedSuccessEvent> {
  private logger: Logger = new Logger(this.constructor.name);

  constructor() {}
  async handle(event: EmployeeCreatedSuccessEvent): Promise<void> {
    this.logger.verbose(`EVENT TRIGGERED: ${event.constructor.name}}`);
    const { _id, employee, source } = event;
    try {
      // await this.repository.sendEmailNotification(employee);
      // await this.enchargeService.createUser(user, meta);
      // this.emailService.sendNotificationEmail();
    } catch (error) {
      this.logger.error(`Failed to add employee of id ${_id}`);
      this.logger.log(error.message);
      this.logger.debug(error.stack);
    }
  }
}
