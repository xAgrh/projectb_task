import { Injectable } from '@nestjs/common';
import { Saga, ICommand, ofType } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EmployeeCreatedSuccessEvent } from '../../employees/events/employee-created-success.event';
import { AddMailJobToQueueCommand } from '../commands/add-mail-job-to-queue.command';

@Injectable()
export class SendNotificationSaga {
  @Saga()
  sendSignupMail = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(EmployeeCreatedSuccessEvent),
      map((event: EmployeeCreatedSuccessEvent) => {
        return new AddMailJobToQueueCommand(
          event._id,
          event.employee.email,
          event.employee.firstName,
          event.employee.lastName,
        );
      }),
    );
  };
}
