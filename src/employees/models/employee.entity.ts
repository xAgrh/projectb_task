import { Field, InputType, ObjectType } from '@nestjs/graphql';

// TODO: mix with existing DTO
@ObjectType()
export class EmployeeSubGraph {
  @Field({ nullable: true })
  _id: string;
  @Field({ nullable: true })
  email: string;
  @Field({ nullable: true })
  firstName: string;
  @Field({ nullable: true })
  lastName: string;
  @Field({ nullable: true })
  jobTitle: string;
  @Field({ nullable: true })
  department: string;
}

@ObjectType()
@InputType('browseEmployeeInput')
export class BrowsePaginatedFEQuerySubGraph {
  @Field({ nullable: true })
  q: string = '';

  @Field({ nullable: true })
  page: string; // TODO: fix type

  @Field({ nullable: true })
  limit: string; // TODO: fix type
}

@ObjectType()
export class BrowsePaginatedFEOutputSubGraph {
  @Field()
  totalRecords: number;
  @Field()
  totalPages: number;
  @Field()
  page: number;
  @Field()
  limit: number;
  @Field(() => [EmployeeSubGraph])
  data: EmployeeSubGraph[];
}

// TODO: mix with existing DTO
@ObjectType('createEmployee')
@InputType('createEmployeeInput')
export class CreateEmployeeDtoSubGraph {
  @Field({ nullable: true })
  _id: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  firstName: string;

  @Field({ nullable: true })
  lastName: string;

  @Field({ nullable: true })
  jobTitle: string;

  @Field({ nullable: true })
  department: string;
}

// TODO: mix with existing DTO
@ObjectType('updateEmployee')
@InputType('updateEmployeeInput')
export class UpdateEmployeeDtoSubGraph {
  @Field({ nullable: true })
  email: string;

  @Field({ nullable: true })
  firstName: string;

  @Field({ nullable: true })
  lastName: string;

  @Field({ nullable: true })
  jobTitle: string;

  @Field({ nullable: true })
  department: string;
}

// TODO: mix with existing DTO
@ObjectType('deleteEmployee')
@InputType('deleteEmployeeId')
export class JustIdOfEmployeeSubGraph {
  @Field()
  _id: string;
}
