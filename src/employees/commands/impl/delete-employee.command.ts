import { ICommand } from '@nestjs/cqrs';

export class DeleteEmployeeCommand implements ICommand {
  constructor(
    public readonly _id: string,
  ) {}
}
