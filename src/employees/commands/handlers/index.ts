import { CreateEmployeeCommandHandler } from "./create-employee.command-handler";
import { DeleteEmployeeCommandHandler } from "./delete-employee.command-handler";
import { EditEmployeeCommandHandler } from "./edit-employee.command-handler";

export const EmployeesCommandHandlers = [
  CreateEmployeeCommandHandler,
  EditEmployeeCommandHandler,
  DeleteEmployeeCommandHandler,
];