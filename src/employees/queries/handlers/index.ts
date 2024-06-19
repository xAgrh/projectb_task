import { BrowseEmployeesQueryHandler } from './browse-employees.query-handler';
import { CountEmployeesQueryHandler } from './count-employees.query-handler';
import { ReadEmployeesQueryHandler } from './read-employees.query-handler';

export const EmployeesQueryHandlers = [
  BrowseEmployeesQueryHandler,
  ReadEmployeesQueryHandler,
  CountEmployeesQueryHandler,
];
