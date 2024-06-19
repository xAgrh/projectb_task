import { CreateEmployeeDto } from "../dto/create-employee.dto";

export class EmployeeCreatedSuccessEvent {
  constructor(
    public readonly _id: string,
    public readonly employee: Partial<CreateEmployeeDto>,
    public readonly source: string, // from which source entity was created
  ) {}
}